// tests/auth.test.js
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import bcrypt from "bcryptjs";
import server from "../server.js"; // Make sure server.js exports app without app.listen()
import User from "../models/userSchema.js";
import { jest } from "@jest/globals";

jest.setTimeout(30000); // 30 seconds timeout for slow DB operations

let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Connect Mongoose to in-memory DB
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect Mongoose and stop in-memory DB
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clean all collections after each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
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

    // Verify user exists in DB
    const user = await User.findOne({ email: "john@example.com" });
    expect(user).not.toBeNull();
  });

  it("should fail if user already exists", async () => {
    // Create a user first
    await User.create({
      fullName: "Jane Doe",
      email: "jane@example.com",
      password: await bcrypt.hash("password123", 10),
    });

    // Attempt to register again
    const res = await request(server)
      .post("/api/v1/auth/register")
      .send({
        fullName: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain("User already exists");
  });

  it("should login successfully with correct credentials", async () => {
    const hashedPassword = await bcrypt.hash("mypassword", 10);
    await User.create({
      fullName: "Login User", // Required by schema
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
    expect(res.body.message).toContain("User does not exist"); // Fixed typo
  });
});
