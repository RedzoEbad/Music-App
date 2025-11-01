import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js"; // correct path

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d",
  });
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Please add all fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "User logged in",
      status: "success",
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Register
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "Please add all fields" });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      playlists: [],
    });

    res.status(201).json({ message: "User registered successfully", status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
