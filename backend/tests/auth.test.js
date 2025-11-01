import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import server from "../server.js"
import conn from "../config/db.js";

let mongoServer;
let client;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  client = new MongoClient(uri);
  await client.connect();

  // override the connection with in-memory DB
  conn.db = (dbName) => client.db(dbName);
});

afterAll(async () => {
  await client.close();
  await mongoServer.stop();
});

describe("Auth Controller", () => {
  it("should register a new user successfully", async () => {
    const res = await request(server)
      .post("/api/v1/auth/register")
      .send({
        fullName: "John Doe",
        email: "john@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");
  });

  it("should fail if user already exists", async () => {
    await request(server)
      .post("/api/v1/auth/register")
      .send({
        fullName: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
      });

    const res = await request(server)
      .post("/api/v1/auth/register")
      .send({
        fullName: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.text).toContain("User already exists");
  });

  it("should login successfully with correct credentials", async () => {
    const db = client.db("music_streaming");
    const users = db.collection("users");

    const hashedPassword = bcrypt.hashSync("mypassword", 10);
    await users.insertOne({
      email: "login@test.com",
      password: hashedPassword,
    });

    const res = await request(server)
      .post("/api/v1/auth/login")
      .send({
        email: "login@test.com",
        password: "mypassword",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.token).toBeDefined();
  });

  it("should fail login with invalid credentials", async () => {
    const res = await request(server)
      .post("/api/v1/auth/login")
      .send({
        email: "fake@test.com",
        password: "wrong",
      });

    expect(res.statusCode).toBe(400);
    expect(res.text).toContain("User does not exists");
  });
});
