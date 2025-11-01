// config/db.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client = null;

/**
 * Connect to MongoDB manually when needed.
 * In tests, this will be replaced by an in-memory connection.
 */
export const connectDB = async (uri = process.env.MONGO_URI) => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log("🟢 MongoDB connected:", uri);
  }
  return client;
};

/**
 * Get the database reference
 */
export const getDB = (dbName = "music_streaming") => {
  if (!client) {
    throw new Error("Database not connected yet. Call connectDB() first.");
  }
  return client.db(dbName);
};

/**
 * Close connection
 */
export const closeDB = async () => {
  if (client) {
    await client.close();
    client = null;
    console.log("🔴 MongoDB connection closed");
  }
};

/**
 * Export an object to mimic your previous `conn`
 * (backward compatible with your controllers)
 */
const conn = {
  connect: connectDB,
  db: getDB,
  close: closeDB,
};

export default conn;
