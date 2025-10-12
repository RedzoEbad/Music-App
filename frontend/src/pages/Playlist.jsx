import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FetchContext } from "../Context/FetchContext";
import { SongContext } from "../Context/SongContext";
import PlaylilstSong from "../components/PlaylilstSong";
import { MdDeleteForever } from "react-icons/md";
import { FaMusic } from "react-icons/fa";

const Playlist = () => {
  const { id } = useParams();  //getting the id from the url
  const navigate = useNavigate(); // for navigation
  const [playList, setPlayList] = useState(null); // state for the playlist
  const [loading, setLoading] = useState(false);
  const {fetchPlaylist} = useContext(FetchContext)
  const {__URL__} = useContext(SongContext)
  
  // headers for the api calls
  const headers = {
    "Content-Type": "application/json",
    "X-Auth-Token": localStorage.getItem("access_token"),
  };

  // delete playlist
  const deletePlaylist = async () => {
    setLoading(true);
    const { data, status } = await axios.delete(
      `${__URL__}/api/v1/playlist/delete/${id}`,
      { headers }
    );
    if (status === 200) {
      setLoading(false);
      alert("Playlist deleted successfully");
      navigate("/playlists");
    }
  };

  // confirm delete and handle delete
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      deletePlaylist();
    }
  };

  // get playlist
  const getPlaylist = async () => {
    const { data } = await axios.get(
      `${__URL__}/api/v1/playlist/${id}`,
      { headers }
    );
    setPlayList(data["playlist"]);
  };

  // fetch playlist on load
  useEffect(() => {
    getPlaylist();
  }, [fetchPlaylist]);

  if (loading || playList === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Playlist Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 p-4 rounded-xl">
                <FaMusic className="text-indigo-500 text-3xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{playList.playlistName}</h1>
                <p className="text-gray-600 mt-1">Songs - {playList.songs.length}</p>
              </div>
            </div>
            <button 
              onClick={handleDelete}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <MdDeleteForever size={25} />
            </button>
          </div>
        </div>

        {/* Songs List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {playList.songs.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMusic className="text-indigo-500 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No Songs in Playlist</h3>
              <p className="text-gray-600">Add some songs to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {playList.songs.map((song, index) => (
                <PlaylilstSong
                  key={index}
                  title={song.title}
                  artistName={song.artistName}
                  songSrc={song.songSrc}
                  playlistId={id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
