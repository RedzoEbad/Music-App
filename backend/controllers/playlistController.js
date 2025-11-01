import Playlist from "../models/playlistSchema.js";

// @desc Add new playlist
// @route POST /api/v1/playlist/create
// @access Private
export const addPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.create({
      playlistName: req.body.playlistName,
      createdBy: req.userId,
      songs: [],
    });
    res.status(201).json({ message: "Playlist added successfully", status: "success", playlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", status: "error" });
  }
};

// @desc Delete a playlist
// @route DELETE /api/v1/playlist/delete/:id
// @access Private
export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);
    if (!playlist) return res.status(404).json({ message: "Playlist not found", status: "error" });
    res.status(200).json({ message: "Playlist deleted successfully", status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", status: "error" });
  }
};

// @desc Add song to playlist
// @route POST /api/v1/playlist/add/:id
// @access Private
export const addSongToPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { $push: { songs: req.body.songId } },
      { new: true }
    );
    if (!playlist) return res.status(404).json({ message: "Playlist not found", status: "error" });
    res.status(200).json({ message: "Song added to playlist", status: "success", playlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", status: "error" });
  }
};

// @desc Remove song from playlist
// @route DELETE /api/v1/playlist/remove/:id
// @access Private
export const removeSongFromPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { $pull: { songs: req.query.songId } },
      { new: true }
    );
    if (!playlist) return res.status(404).json({ message: "Playlist not found", status: "error" });
    res.status(200).json({ message: "Song removed from playlist", status: "success", playlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", status: "error" });
  }
};

// @desc Get all playlists of user
// @route GET /api/v1/playlist
// @access Private
export const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ createdBy: req.userId }).populate("songs");
    if (!playlists.length) return res.status(404).json({ message: "No playlists found", status: "error" });
    res.status(200).json({ playlists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", status: "error" });
  }
};

// @desc Get single playlist
// @route GET /api/v1/playlist/:id
// @access Private
export const getPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("songs");
    if (!playlist) return res.status(404).json({ message: "Playlist not found", status: "error" });
    res.status(200).json({ playlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", status: "error" });
  }
};
