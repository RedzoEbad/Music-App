import React, { useEffect, useContext } from "react";
import axios from "axios";
import PlaylistCard from "../components/PlaylistCard";

//Importing Context
import { SidebarContext } from "../Context/SibebarContext";
import { FetchContext } from "../Context/FetchContext";
import { SongContext } from "../Context/SongContext";
import { QueueContext } from "../Context/QueueContex";

import { GrFormAdd } from "react-icons/gr";
import { FaMusic } from "react-icons/fa";

const CreatePlaylist = () => {
  const {fetchPlaylist} = useContext(FetchContext)
  const { showMenu, setShowMenu } = useContext(SidebarContext);
  const {__URL__} = useContext(SongContext)
  const {list} = useContext(QueueContext)
  console.log(list)
  const [cretePlaylist, setCreatePlaylist] = React.useState(false);
  const [playlists, setPlaylists] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // Open Create playlist card
  const createCardOpen = () => {
    setCreatePlaylist(true);
  };

  //Close create playlist card
  const createCardClose = () => {
    setCreatePlaylist(false);
  };

  let token = localStorage.getItem("access_token") || null;
  const headers = {
    "Content-Type": "application/json",
    "X-Auth-Token": localStorage.getItem("access_token"),
  };

  // Create a playlist
  const createPlaylist = async () => {
    if(!token) return alert("Please login to create a playlist")
    const playlistName = document.getElementById("playlistName").value;
    if (playlistName === "") return alert("Please enter a playlist name");
    const {data,status} = await axios.post(
      `${__URL__}/api/v1/playlist/create`,
      { playlistName },
      { headers }
    );
    if(status === 200){
      alert("Playlist created successfully")
      setCreatePlaylist(false)
      setLoading(true)
      setPlaylists(null)
      fetchPlaylists()
      setLoading(false)
    }
  };

  // fetching playlists
  const fetchPlaylists = async () => {
    const { data } = await axios.get(`${__URL__}/api/v1/playlist`, {
      headers,
    });
    setPlaylists(data["playlists"]);
  };

  useEffect(() => {
    if (showMenu) setShowMenu(false);
    setLoading(true);
    fetchPlaylists();
    setLoading(false);
  }, [fetchPlaylist]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <div className="bg-indigo-500 p-3 rounded-xl shadow-lg">
              <FaMusic className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Your Playlists</h1>
              <p className="text-gray-600 mt-1">Create and manage your music collections</p>
            </div>
          </div>
          <button
            onClick={createCardOpen}
            className="bg-indigo-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-600 transition-all duration-200 flex items-center space-x-2 group"
          >
            <GrFormAdd size={20} className="group-hover:rotate-90 transition-transform duration-200" />
            <span>Create New Playlist</span>
          </button>
        </div>

        {/* Playlist Grid */}
        {loading && playlists == null ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : !loading && playlists ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist._id}
                playlistName={playlist.playlistName}
                playlistId={playlist._id}
                noSongs={playlist.songs.length}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-indigo-100">
            <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMusic className="text-indigo-500 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Playlists Yet</h3>
            <p className="text-gray-600 mb-6">Start creating your first playlist to organize your music</p>
            <button
              onClick={createCardOpen}
              className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
            >
              Create Your First Playlist
            </button>
          </div>
        )}

        {/* Create Playlist Modal */}
        {cretePlaylist && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md relative transform transition-all shadow-xl">
              <button
                onClick={createCardClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-center mb-6">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMusic className="text-indigo-500 text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Create New Playlist</h2>
                <p className="text-gray-600 mt-2">Give your playlist a unique name</p>
              </div>
              <input
                type="text"
                id="playlistName"
                placeholder="Enter playlist name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-6 transition-all duration-200"
              />
              <button
                onClick={createPlaylist}
                className="w-full bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600 transition-all duration-200 font-medium"
              >
                Create Playlist
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePlaylist;
