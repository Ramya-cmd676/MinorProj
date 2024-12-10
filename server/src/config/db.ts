import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const connectDB = async () => {
  try {
    const db = await open({
      filename: "./database.sqlite", // Corrected database file name
      driver: sqlite3.Database, // SQLite driver
    });
    console.log("Database connection established.");
    return db;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};
