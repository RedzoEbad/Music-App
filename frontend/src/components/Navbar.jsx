import React, { useContext } from "react";
import { SidebarContext } from "../Context/SibebarContext";
import { Link, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { ImBlog } from "react-icons/im";
import { TfiWrite } from "react-icons/tfi";
import { CgPlayList } from "react-icons/cg";
import { GiMusicSpell } from 'react-icons/gi'
import { BiWindowClose } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { FaMusic } from "react-icons/fa";

import "../utils/style.css";
import Logo from "../assets/Logo";

const Navbar = () => {
  const sideBar = useContext(SidebarContext);
  const toggleMenu = () => {
    sideBar.setShowMenu(!sideBar.showMenu);
  };
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <header className="z-50 w-full sticky bg-white text-gray-800 top-0 flex flex-col justify-between items-center py-1 lg:py-5 px-10 font-space shadow-md h-14 lg:h-16">
      <nav className="mx-auto w-full flex justify-between items-center sticky top-5">
        <div className="flex items-center space-x-2">
          <FaMusic className="text-indigo-500 text-2xl" />
          <span className="text-xl font-bold text-gray-800">Ebad Playlist</span>
        </div>
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-200"
          aria-label="Toggle Menu"
        >
          <FiMenu size={25} />
        </button>

        {/* ------------Mobile Nav------------ */}
        <div
          className={`lg:hidden text-2xl flex flex-col bg-white w-64 fixed z-50 top-0 p-6 h-screen items-start justify-start space-y-8 pt-20 transition-transform duration-300 ease-in-out shadow-xl ${
            sideBar.showMenu ? "right-0 transform-none" : "-right-64 transform"
          }`}
        >
          <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200">
            <GoHome />
            <span>Home</span>
          </Link>
          <Link to="/explore" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200">
            <GiMusicSpell />
            <span>Songs</span>
          </Link>
          <Link to="/upload" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200">
            <TfiWrite />
            <span>Upload</span>
          </Link>
          <Link to="/playlists" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200">
            <CgPlayList />
            <span>Playlist</span>
          </Link>

          {token ? (
            <button
              onClick={logOut}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Log Out
            </button>
          ) : (
            <div className="flex flex-col space-y-4 w-full">
              <Link
                to={"/login"}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-center"
              >
                Log In
              </Link>
              <Link
                to={"/register"}
                className="bg-indigo-100 text-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-200 transition-colors duration-200 text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
          <button
            onClick={toggleMenu}
            className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200"
          >
            <BiWindowClose />
            <span>Close</span>
          </button>
        </div>

        {/* -------Desktop Nav---------- */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200">
            <GoHome />
            <span>Home</span>
          </Link>
          <Link to="/explore" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200">
            <ImBlog />
            <span>Songs</span>
          </Link>
          <Link to="/upload" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200">
            <TfiWrite />
            <span>Upload</span>
          </Link>
          <Link to="/playlists" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200">
            <CgPlayList />
            <span>Playlists</span>
          </Link>

          {token ? (
            <button
              onClick={logOut}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Log Out
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to={"/login"}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Log In
              </Link>
              <Link
                to={"/register"}
                className="bg-indigo-100 text-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
