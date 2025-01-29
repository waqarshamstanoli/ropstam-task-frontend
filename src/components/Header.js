import React from "react";
import logo from "../assets/logo.svg";
import {useAuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

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
          <h1 className="text-xl font-bold">Dashboard</h1>
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
