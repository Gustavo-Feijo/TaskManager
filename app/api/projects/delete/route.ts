import { NextRequest, NextResponse } from "next/server";
import databaseOperations from "../../../database/db_operations";
import { useSearchParams } from "next/navigation";
const DB = new databaseOperations();

export async function DELETE(req: NextRequest, res: NextResponse) {
  const project_id = req.nextUrl.searchParams.get("project_id");

  try {
    const result = await DB.deleteProject(project_id);
    if (Object.values(result)[1]) {
      return NextResponse.json(
        { message: "The project was deleted succesfully." },
        { status: 200 }
      );
    } else
      throw new Error("The project you attempted to delete doesn't exist.");
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to delete project", message: err.message },
      { status: 500 }
    );
  }
}
