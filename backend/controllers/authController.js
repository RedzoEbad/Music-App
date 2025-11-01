import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import conn from "../config/db.js";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d",
  });
};

// @desc    Login User
// @route   POST /api/v1/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const db = conn.db("music_streaming");
    const collection = db.collection("users");

    const user = await collection.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User does not exists");
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        message: "User logged in",
        status: "success",
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.send(err.message);
  }
};

// @desc Register a new user
// @route POST /api/v1/auth/register
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const db = conn.db("music_streaming");
    const collection = db.collection("users");

    const userExists = await collection.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await collection.insertOne({
      fullName,
      email,
      password: hashedPassword,
      playlists: [],
    });

    if (user) {
      res.status(201).json({
        message: "user registered",
        status: "success",
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};
