import { NextResponse } from "next/server";
import databaseOperations from "../../database/db_operations";
export async function POST(request: Request) {
  const project: Project = await request.json();
  const DB = new databaseOperations();
  const {
    project_name,
    project_description,
    project_status,
    project_start_date,
    project_deadline,
  } = project;

  const response = await DB.createProject(
    project_name,
    project_description,
    project_status,
    project_start_date,
    project_deadline
  );

  return NextResponse.json(response);
}
