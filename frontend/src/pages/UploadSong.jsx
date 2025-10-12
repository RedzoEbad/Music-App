import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// import { redirect } from "react-router-dom";
import { SidebarContext } from "../Context/SibebarContext";
import { useNavigate } from "react-router-dom";
import { SongContext } from "../Context/SongContext";
const UploadSong = () => {
  const navigate = useNavigate();
  // we are using this to close the sidebar when we land on this page
  const { showMenu, setShowMenu } = useContext(SidebarContext);
  const {__URL__} = useContext(SongContext)
  useEffect(() => {
    if (showMenu) setShowMenu(false);
  }, []);

  // we are using this to upload the file
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [album, setAlbum] = useState();
  const [description, setDescription] = useState();

  // we are using this to handle the file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // we are using this to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("album", album);
    formData.append("description", description);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-auth-token": localStorage.getItem("access_token"),
      },
    };
    const result = await axios.post(
      `${__URL__}/api/v1/song/upload`,
      formData,
      config
    );

    // if the file is uploaded successfully, we will redirect the user to the home page with alert message
    if (result.status === 201) {
      alert("File uploaded successfully");
      navigate("/explore");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10 px-5 lg:p-20">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">Upload Your Song</h1>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          <div className="space-y-4">
            <label className="block text-gray-700 font-medium" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 outline-none text-gray-700"
              placeholder="Enter the song title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            <label className="block text-gray-700 font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 outline-none text-gray-700 resize-none"
              placeholder="Enter the song description"
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="3"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-gray-700 font-medium" htmlFor="artist">
              Artist
            </label>
            <input
              type="text"
              name="artist"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 outline-none text-gray-700"
              placeholder="Enter the artist name"
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            <label className="block text-gray-700 font-medium" htmlFor="album">
              Album
            </label>
            <input
              type="text"
              name="album"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 outline-none text-gray-700"
              placeholder="Enter the album name"
              onChange={(e) => setAlbum(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            <label className="block text-gray-700 font-medium" htmlFor="audioFile">
              Audio File
            </label>
            <div className="relative">
              <input
                onChange={handleFileChange}
                type="file"
                name="file"
                accept="audio/*"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 outline-none text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
          </div>

          <button
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={!localStorage.getItem("access_token")}
          >
            Upload Song
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadSong;
