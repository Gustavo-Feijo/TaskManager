import { NextRequest, NextResponse } from "next/server";
import databaseOperations from "../../../database/db_operations";

const DB = new databaseOperations();

export async function GET(req: NextRequest, res: NextResponse) {
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
