import createConnection from "./db_connect.js";
let connection;

//Class with the methods to run queries on the database.
class databaseOperations {
  //Function to run queries on the database.
  async executeQuery(query, params = []) {
    try {
      connection = await createConnection();
      const [result] = await connection.execute(query, params);
      return result;
    } catch (err) {
      if (connection) {
        await connection.rollback();
      }
      throw err.message;
    } finally {
      if (connection) {
        connection.close();
      }
    }
  }

  //Query to get all the current projects on the database.
  async getProjectList() {
    const query = "SELECT * from tb_project";
    return this.executeQuery(query);
  }

  //Creates a new project.
  async createProject(projectName) {
    const query = "INSERT INTO tb_project (project_name) VALUES (?)";
    return this.executeQuery(query, [projectName]);
  }

  //Updates a project.
  async updateProject(project_description, project_status, project_id) {
    const query =
      "UPDATE tb_project set project_description = ?, project_status = ? WHERE project_id = ?";
    return this.executeQuery(query, [
      project_description,
      project_status,
      project_id,
    ]);
  }

  //Deletes a project.
  async deleteProject(project_id) {
    const query = "DELETE FROM tb_project WHERE project_id = ?";
    return this.executeQuery(query, [project_id]);
  }

  //Get the list of tasks.
  async getTaskList(projectId) {
    //Verifies if the call requires all tasks or only tasks from a given project.
    const query = projectId
      ? "SELECT * FROM tb_task WHERE project_id = ?"
      : "SELECT * FROM tb_task";
    return this.executeQuery(query, [projectId]);
  }

  //Query to create a new task on a project.
  async createTask(projectID, taskName) {
    const query =
      "INSERT INTO tb_task(project_id, task_name,task_description) VALUES(?,?,?)";
    return this.executeQuery(query, [projectID, taskName, ""]);
  }

  //Update a task based on the id.
  async updateTask(taskDescription, taskUser, taskStatus, taskUrgency, taskId) {
    const query =
      "UPDATE tb_task SET task_description = ?, task_user = ?, task_status = ?, task_urgency = ? WHERE task_id = ?";
    return this.executeQuery(query, [
      taskDescription,
      taskUser,
      taskStatus,
      taskUrgency,
      taskId,
    ]);
  }

  //Get a list of all the users.
  async getUserList() {
    const query = "SELECT * FROM tb_user";
    return this.executeQuery(query);
  }

  //Get a given user.
  async getUser(userID) {
    const query = "SELECT * FROM tb_user WHERE user_id = ?";
    return this.executeQuery(query);
  }

  //Query to create a new user.
  async createUser(userName) {
    const query = "INSERT INTO tb_user(user_name) VALUES(?)";
    return this.executeQuery(query, [userName]);
  }

  //Query to update a user.
  async updateUser(userName, userId) {
    const query = "UPDATE tb_user SET user_name = ? WHERE user_id = ?";
    return this.executeQuery(query, [userName, userId]);
  }

  //Query to delete a user.
  async deleteUser(userId) {
    const query = "DELETE FROM tb_user WHERE user_id = ?";
    return this.executeQuery(query, [userId]);
  }
}

export default databaseOperations;
