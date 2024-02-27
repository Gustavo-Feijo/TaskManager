import { NextRequest, NextResponse } from "next/server";
import databaseOperations from "../../../database/db_operations";

const DB = new databaseOperations();

export async function POST(req: NextRequest, res: NextResponse) {
  const projectData: Project = await req.json();

  try {
    const result = await DB.createProject(
      projectData.project_name,
      projectData.project_description,
      projectData.project_status,
      projectData.project_start_date,
      projectData.project_deadline
    );
    return NextResponse.json(
      { message: "The project was created." },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create project", message: err },
      { status: 500 }
    );
  }
}
