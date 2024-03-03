import { NextRequest, NextResponse } from "next/server";
import databaseOperations from "../../../database/db_operations";

const DB = new databaseOperations();

export async function GET(req: NextRequest, res: NextResponse) {
  const project_id = req.nextUrl.searchParams.get("project_id");
  if (project_id) {
    try {
      const result = await DB.getProject(project_id);
      return NextResponse.json({ result }, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to get projectWs", err },
        { status: 500 }
      );
    }
  } else {
    try {
      const result = await DB.getProjectList();
      return NextResponse.json({ result }, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to get projects", err },
        { status: 500 }
      );
    }
  }
}
