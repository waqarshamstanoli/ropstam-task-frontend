import React from "react";
// import logo from "../assets/logo.svg";
// import {useAuthContext} from "../context/AuthContext";
// import {useNavigate} from "react-router-dom";

import bell from "../assets/bell.svg";
import avatar from "../assets/avatar.svg";


const Header = () => {



  return (
    <header className="flex items-center bg-black justify-between w-full h-32 py-4 px-4 text-white">
          <button
            className="text-gray-400 hover:text-white md:hidden"
            // onClick={toggleSidebar}
          >
            {/* <Menu size={24} /> */}
          </button>
          <div className="relative">
  <input
    type="text"
    placeholder="Search"
    className="w-full bg-zinc-900 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-100 py-3 pl-10 leading-8 transition-colors duration-200 ease-in-out"
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      fill="gray"
      d="M13.78 12.22a8 8 0 1 0-1.56 1.56l3.84 3.84a1 1 0 1 0 1.42-1.42l-3.84-3.84zm-3.78-.22A6 6 0 1 1 10 4a6 6 0 0 1 0 12z"
    />
  </svg>
</div>


          <div className="flex pr-16">
            <button className="px-4 py-2 text-sm rounded hover:bg-indigo-700">
              <img src={bell} alt="bell" />
            </button>
            <button className="px-4 py-2 text-sm rounded hover:bg-indigo-700">
              <img src={avatar} alt="avatar" />
            </button>
            <div>
              <h2 className="text-xl font-medium text-gray-100 font-jakarta">
                Waqar Shams
              </h2>
              <h6 className="text-gray-500 font-jakarta">Admin</h6>{" "}
            </div>
           
          </div>
        </header>
  );
}

export default Header;
