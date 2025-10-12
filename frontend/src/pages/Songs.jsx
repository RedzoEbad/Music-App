import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import SongCard from "../components/SongCard";
import { SidebarContext } from "../Context/SibebarContext";
import { FetchContext } from "../Context/FetchContext";
import { SongContext } from "../Context/SongContext";
import { QueueContext } from "../Context/QueueContex";

const Songs = () => {
  const { showMenu, setShowMenu } = useContext(SidebarContext);
  const { fetchSong } = useContext(FetchContext);
  const { queue, list } = useContext(QueueContext);
  const { __URL__ } = useContext(SongContext);
  
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    if (showMenu) setShowMenu(false);
    const fetchSongs = async () => {
      const { data } = await axios.get(`${__URL__}/api/v1/songs`);
      setSongs(data["songs"]);
    };
    setLoading(true);
    fetchSongs();
    setLoading(false);
  }, [fetchSong]);
 
  const closeMenu = () => {
    setShowMenu(false); 
  };

  return (
    <div onClick={closeMenu} className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">All Songs</h1>
          <p className="text-gray-600">Discover and play your favorite tracks</p>
        </div>

        {loading && songs == null ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : !loading && songs != null ? (
          <div className="grid gap-4">
            {songs.map((song, index) => (
              <div key={song._id} className="transform transition-all duration-200 hover:scale-[1.02]">
                <SongCard
                  title={song.title}
                  artistName={song.artist}
                  songSrc={song.song}
                  userId={song.uploadedBy}
                  songId={song._id}
                  file={song.file}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">No songs available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Songs;
