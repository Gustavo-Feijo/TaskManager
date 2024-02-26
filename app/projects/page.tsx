import React from "react";
import databaseOperations from "../database/db_operations";
async function ProjectPage() {
  const db = new databaseOperations();
  const result = await db.getProjectList();
  console.log(result);
  return <div>ProjectPage</div>;
}

export default ProjectPage;
