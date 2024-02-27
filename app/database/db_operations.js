import createConnection from "./db_connect.js";

//Creates a connection.
const connection = await createConnection();

//Class with the methods to run queries on the database.
class DatabaseOperations {
  //Basic function to run queries on the database. Improves the readability and simplify the methods.
  //Receives the query to be run and passes any parameter if necessary.
  async executeQuery(query, params = []) {
    try {
      const [result] = await connection.execute(query, params);
      return result;
    } catch (err) {
      if (connection) {
        await connection.rollback();
      }
      throw err;
    }
  }

  //Run a query to select all information from the table projects.
  async getProjectList() {
    const query = "SELECT * FROM tb_project";
    return this.executeQuery(query);
  }

  //Receives as parameters the project information and insert it into the database.
  async createProject(
    project_name,
    project_description,
    project_status,
    project_start_date,
    project_deadline
  ) {
    const query =
      "INSERT INTO tb_project (project_name, project_description, project_status, project_start_date, project_deadline) VALUES (?, ?, ?, ?, ?)";
    return this.executeQuery(query, [
      project_name,
      project_description,
      project_status,
      project_start_date,
      project_deadline,
    ]);
  }

  //Receives as parameters the project information and updates it accordingly.
  async updateProject(
    project_description,
    project_status,
    project_start_date,
    project_deadline,
    project_id
  ) {
    const query =
      "UPDATE tb_project SET project_description = ?, project_status = ?, project_start_date = ?, project_deadline = ? WHERE project_id = ?";
    return this.executeQuery(query, [
      project_description,
      project_status,
      project_start_date,
      project_deadline,
      project_id,
    ]);
  }

  //Delete a project given a id.
  async deleteProject(project_id) {
    const query = "DELETE FROM tb_project WHERE project_id = ?";
    return this.executeQuery(query, [project_id]);
  }

  //Get the list of tasks for a given projeect.
  async getTaskList(projectId) {
    //If no project is given, return all the tasks.
    const query = projectId
      ? "SELECT * FROM tb_task WHERE project_id = ?"
      : "SELECT * FROM tb_task";
    return this.executeQuery(query, [projectId]);
  }

  //Create a new task.
  async createTask(
    project_id,
    task_name,
    task_description,
    task_user,
    task_start_date,
    task_deadline
  ) {
    const query =
      "INSERT INTO tb_task (project_id, task_name, task_description, task_user, task_start_date, task_deadline) VALUES (?, ?, ?, ?, ?, ?)";
    return this.executeQuery(query, [
      project_id,
      task_name,
      task_description,
      task_user,
      task_start_date,
      task_deadline,
    ]);
  }

  //Update a task.
  async updateTask(
    task_description,
    task_user,
    task_status,
    task_urgency,
    task_start_date,
    task_deadline,
    task_id
  ) {
    const query =
      "UPDATE tb_task SET task_description = ?, task_user = ?, task_status = ?, task_urgency = ?, task_start_date = ?, task_deadline = ? WHERE task_id = ?";
    return this.executeQuery(query, [
      task_description,
      task_user,
      task_status,
      task_urgency,
      task_start_date,
      task_deadline,
      task_id,
    ]);
  }

  //Get the list of user.
  async getUserList() {
    const query = "SELECT * FROM tb_user";
    return this.executeQuery(query);
  }

  //Get the name of a single user.
  async getUser(userId) {
    const query = "SELECT * FROM tb_user WHERE user_id = ?";
    return this.executeQuery(query, [userId]);
  }

  //Create a new user
  async createUser(userName) {
    const query = "INSERT INTO tb_user (user_name) VALUES (?)";
    return this.executeQuery(query, [userName]);
  }

  //Update a user information.
  async updateUser(userName, userId) {
    const query = "UPDATE tb_user SET user_name = ? WHERE user_id = ?";
    return this.executeQuery(query, [userName, userId]);
  }

  //Delete a user.
  async deleteUser(userId) {
    const query = "DELETE FROM tb_user WHERE user_id = ?";
    return this.executeQuery(query, [userId]);
  }
}

export default DatabaseOperations;
