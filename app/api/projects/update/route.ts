import { NextRequest, NextResponse } from "next/server";
import databaseOperations from "../../../database/db_operations";

//New instance of the database operations.
const DB = new databaseOperations();

//Receives a request with a JSON containing the project data and take the project_id from the search parameters.
export async function PUT(req: NextRequest, res: NextResponse) {
  const projectData: Project = await req.json();
  const project_id = req.nextUrl.searchParams.get("project_id");

  try {
    const result = await DB.updateProject(
      projectData.project_description,
      projectData.project_status,
      projectData.project_start_date,
      projectData.project_deadline,
      project_id
    );
    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update project", err },
      { status: 500 }
    );
  }
}
