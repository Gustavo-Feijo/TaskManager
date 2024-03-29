import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config({
  path: "./app/database/credentials.env",
});

//Asynchronous function that, when called, creates a mysql connection and returns it.
async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    return connection;
  } catch (error) {
    throw error;
  }
}

export default createConnection;
