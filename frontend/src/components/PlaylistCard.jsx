import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SongContext } from "../Context/SongContext";
import { FaTrash } from "react-icons/fa";
import { CgPlayListAdd } from "react-icons/cg";
import { Link } from "react-router-dom";
import { FetchContext } from "../Context/FetchContext";
import { QueueContext } from "../Context/QueueContex";

const PlaylistCard = ({ playlistName, playlistId, noSongs }) => {
  const navigate = useNavigate();
  const { __URL__ } = useContext(SongContext);
  const { setFetchPlaylist } = useContext(FetchContext);
  const { list, dispatchList } = useContext(QueueContext);

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      try {
        const response = await fetch(`${__URL__}/api/v1/playlist/delete/${playlistId}`, {
          method: "DELETE",
          headers: {
            "x-auth-token": localStorage.getItem("access_token"),
          },
        });
        if (response.ok) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error deleting playlist:", error);
      }
    }
  };

  // Adding song to playlist
  const addSongToPlaylist = async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking add
    console.log(list);
    if (list.length === 0) return alert("Please select a song");
    const headers = {
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem("access_token"),
    };
    const { data, status } = await fetch(`${__URL__}/api/v1/playlist/add/${playlistId}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(list),
    });
    if (status === 200) {
      alert("Song added to playlist");
      setFetchPlaylist(prev => !prev);
      dispatchList({ type: "REMOVE_SONG", payload: list[0]['title'] });
    }
  };

  return (
    <div 
      onClick={() => navigate(`/playlist/${playlistId}`)}
      className="bg-white rounded-xl p-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer group relative border border-gray-200 shadow-sm hover:shadow-md"
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
        title="Delete Playlist"
      >
        <FaTrash size={16} />
      </button>

      {/* Playlist Content */}
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 pr-8">{playlistName}</h3>
        <div className="flex items-center justify-between">
          <p className="text-gray-600 text-sm">
            {noSongs} {noSongs === 1 ? "song" : "songs"}
          </p>
          <button 
            onClick={addSongToPlaylist}
            className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
            title="Add to Playlist"
          >
            <CgPlayListAdd size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
