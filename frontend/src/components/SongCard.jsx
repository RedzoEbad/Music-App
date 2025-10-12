// This component is used to display the song card in the home page and the playlist page. The song card is used to display the song name, artist name, and the options to play, add to queue, add to playlist, and delete the song. The song card is also used to play the song when the user clicks on the song card.

//Importing libries
import React, { useContext, useState } from "react";
import { SongContext } from "../Context/SongContext";
import { QueueContext } from "../Context/QueueContex";
import { FetchContext } from "../Context/FetchContext";
import { Link, useNavigate } from "react-router-dom";
import { FaPlay, FaPause, FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdOutlinePlaylistAdd, MdQueuePlayNext } from "react-icons/md";
import { decodeToken } from "react-jwt";
import axios from "axios";

const SongCard = ({ title, artistName, songSrc, userId, songId, file }) => {
  const { song, audio, __URL__ } = useContext(SongContext);
  const { setFetchSong } = useContext(FetchContext);
  const { dispatchQueue, dispatchList } = useContext(QueueContext);
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  
  const token = localStorage.getItem("access_token");
  let decoded;
  if(token) { decoded = decodeToken(token) };

  const handlePlay = () => {
    // If clicking the same song that's currently playing, toggle play/pause
    if (song.songName === title) {
      if (song.isPlaying) {
        audio.pause();
        song.setIsPlaying(false);
      } else {
        audio.play();
        song.setIsPlaying(true);
      }
    } else {
      // If clicking a different song, stop current song and play new one
      audio.pause();
      song.setSongName(title);
      song.setArtistName(artistName);
      song.setSongUrl(`${__URL__}/api/v1/stream/${songSrc}`);
      audio.src = `${__URL__}/api/v1/stream/${songSrc}`;
      audio.load();
      audio.play();
      song.setIsPlaying(true);
    }
  };

  const deleteSong = async () => {
    try {
      const { status } = await axios.delete(
        `${__URL__}/api/v1/song/delete/${songId}?file=${file}`,
        {
          headers: {
            "x-auth-token": token
          }
        }
      );
      if(status === 200) setFetchSong(prev => !prev);
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const handleDelete = () => {
    if(confirm("Are you sure you want to delete this song?")) {
      deleteSong();
    }
  };

  const handleAddToPlaylist = () => {
    dispatchList({type: 'ADD_SONG', payload: {title, artistName, songSrc}});
    navigate("/playlists");
  };

  const handlePlayNext = () => {
    dispatchQueue({type: 'ADD_TO_QUEUE', payload: {title, artistName, songSrc}});
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={handlePlay}
            className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-200 transition-colors duration-200"
          >
            {song.songName === title && song.isPlaying ? (
              <FaPause size={16} />
            ) : (
              <FaPlay size={16} />
            )}
          </button>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
            <p className="text-sm text-gray-600 truncate">{artistName}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleAddToPlaylist}
            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors duration-200"
            title="Add to Playlist"
          >
            <MdOutlinePlaylistAdd size={20} />
          </button>

          <button
            onClick={handlePlayNext}
            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors duration-200"
            title="Play Next"
          >
            <MdQueuePlayNext size={20} />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors duration-200"
            >
              <BsThreeDotsVertical size={16} />
            </button>

            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                <Link
                  to={`/song/${songId}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  View Details
                </Link>
                {decoded && decoded.id === userId && (
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <MdDelete size={16} />
                    <span>Delete Song</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
