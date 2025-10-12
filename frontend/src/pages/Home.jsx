import React, { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../Context/SibebarContext";
import bg from "../assets/bg4.jpg";
import '../utils/style.css'
import { Link } from "react-router-dom";
import { FaMusic } from "react-icons/fa";

const Home = () => {
  const { showMenu, setShowMenu } = useContext(SidebarContext);
  useEffect(() => {
    if (showMenu) setShowMenu(false);
  }, []);

  const token = localStorage.getItem("access_token") || null;
  return (
    <div
      className="w-full min-h-screen flex justify-center items-center flex-col"
      style={{
        backgroundImage: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
     <div className="flex flex-col justify-center items-center space-y-6 bg-white/80 backdrop-blur-sm w-full h-screen lg:space-y-8 rounded-lg shadow-xl">
        <div className="flex items-center space-x-2">
          <FaMusic className="text-indigo-500 text-2xl" />
          <span className="text-xl font-bold text-gray-800">Ebad Playlist</span>
        </div>
        <p className="text-gray-700 text-2xl lg:text-4xl drop-shadow-md">
          Listen to your favorite songs
        </p>
        <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5">
          {
            (token ? ( <Link to={'/upload'} className="bg-indigo-500 hover:bg-indigo-600 w-32 py-1 rounded-md flex justify-center text-white transition-colors duration-300">Upload</Link>):(
                <Link to={'/login'} className="bg-indigo-500 hover:bg-indigo-600 w-32 py-1 rounded-md flex justify-center text-white transition-colors duration-300">Login</Link>
            ))
          }
          <Link to={'/explore'} className="bg-indigo-500 hover:bg-indigo-600 w-32 py-1 rounded-md flex justify-center text-white transition-colors duration-300">Stream</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
