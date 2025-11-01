import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

// Importing routes
import authRoutes from "./routes/authRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import { getSongs, streamSong } from "./controllers/songController.js";
import { userJwtMiddleware } from "./middlewares/authMiddleware.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to MongoDB (skip in test mode)
if (process.env.NODE_ENV !== "test") {
  const mongoUri = process.env.MONGO_URI;

  mongoose
    .connect(mongoUri)
    .then(() => console.log("🟢 MongoDB connected successfully"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
} else {
  console.log("🧪 Skipping MongoDB connection for tests");
}

// Serve static files from the 'public' directory
app.use(express.static(path.join(path.resolve(), "public")));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/song", userJwtMiddleware, songRoutes);
app.use("/api/v1/playlist", userJwtMiddleware, playlistRoutes);
app.get("/api/v1/stream/:filename", streamSong);
app.get("/api/v1/songs", getSongs);

// Fallback to index.html for SPA
app.get("*", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

// ✅ Start the server only if not running tests
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 1337;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
}

export default app;
