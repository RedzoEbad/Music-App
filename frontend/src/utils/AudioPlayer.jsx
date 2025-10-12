import React, { useState, useEffect, useContext } from "react";
import stereo from "../assets/stereo.jpg";
import { SongContext } from "../Context/SongContext";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { FiSkipBack, FiSkipForward } from "react-icons/fi";

const AudioPlayer = () => {
  const { song, audio } = useContext(SongContext);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Update duration when audio is loaded
  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, [audio]);

  // Update current time as song plays
  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, [audio]);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (song.songUrl === "") return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
      song.setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
      song.setIsPlaying(false);
    }
  };

  // Calculate time
  const calculateTime = (secs) => {
    if (isNaN(secs)) return "00:00";
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  // Handle seeking
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    audio.currentTime = seekTime;
    
    // If the song was playing before seeking, keep it playing
    if (isPlaying) {
      audio.play();
    }
  };

  return (
    <div className="fixed flex justify-between items-center bottom-0 right-0 left-0 bg-gray-900 text-white px-3 lg:px-5 py-2 shadow-xl">
      <div className="flex space-x-5">
        <img src={stereo} alt="" className="rounded-lg w-12" />
        <div>
          <h3 className="text-lg">{song.songName}</h3>
          <p className="text-sm">{song.songArtist}</p>
        </div>
      </div>

      <div className="flex flex-col items-center flex-1 mx-4">
        <div className="flex items-center space-x-3 lg:space-x-5 w-full">
          <button>
            <FiSkipBack />
          </button>
          <button onClick={togglePlayPause}>
            {song.isPlaying ? <CiPause1 size={24} /> : <CiPlay1 size={24} />}
          </button>
          <button>
            <FiSkipForward />
          </button>
        </div>

        <div className="flex items-center space-x-2 w-full mt-2">
          <span className="text-sm">{calculateTime(currentTime)}</span>
          <div className="relative w-full h-1 bg-gray-600 rounded-lg">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div 
              className="absolute h-full bg-indigo-500 rounded-lg transition-all duration-100"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-sm">{calculateTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
