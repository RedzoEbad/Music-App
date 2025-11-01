import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  playlistName: { type: String, required: true, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

const Playlist = mongoose.model("Playlist", playlistSchema);
export default Playlist;
