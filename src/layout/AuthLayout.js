import Header from "../components/Header";
import logo from "../assets/logo.svg";
import car from "../assets/car.svg";
import {Outlet, useNavigate, NavLink} from 'react-router-dom';
import {useAuthContext} from "../context/AuthContext";
import {useEffect, useState} from "react";

const AuthLayout = ({ children }) => {
  const {user, logout} = useAuthContext();
  const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        if (! user) {
            window.location.replace('/login')
        }
        console.log('auth')
    }, []);

    if (! user) {
        return (<></>);
    }
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };
      const account = () => {
        if (user) {
          logout();
        }else {
          navigate('/login');
        }
      } 

    return (
        <div className="flex h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transition-transform transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-64"
          } md:translate-x-0`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <img src={logo} alt="Logo" />
            <button
              className="text-gray-400 hover:text-white md:hidden"
              onClick={toggleSidebar}
            >
              {/* <X size={24} /> */}
            </button>
          </div>
          <div className="flex flex-col h-full">
            <nav className="flex-1 p-4 space-y-2">
              <ul>
                <li>
                  <a
                    href="/cars"
                    className="flex items-center p-2 text-gray-100 rounded active:text-blue-500 hover:bg-gray-700 hover:text-white"
                  >
                    <span>
                      <img src={car} alt="Car" />
                    </span>
                    <span className="ml-3 font-jakarta font-medium text-lg">Cars</span>
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href="/categories"
                    className="flex items-center p-2 text-gray-100 font-medium rounded hover:bg-gray-700 hover:text-white"
                  >
                    <span>
                      <img src={car} alt="Car" />
                    </span>
                    <span className="ml-3 font-jakarta font-medium text-lg">Categories</span>
                  </a>
                </li>
              </ul>
            </nav>
            <div className="pb-20 border-t border-gray-700">
              <a
                href="settings"
                className="flex items-center p-2 text-gray-100 font-medium rounded hover:bg-gray-700 hover:text-white"
              >
                <span>⚙️</span>
                <span className="ml-3 text-gray-100 font-jakarta text-lg">Settings</span>
              </a>

              <p className="text-gray-100   font-medium font-jakarta  text-lg" onClick={account}>
              <span>
      {!user ? '👤' : '🚪'} 
    </span>
  {!user ? 'Account' : 'Logout'}
</p>
            </div>
          </div>
        </aside>
  
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-0 md:ml-64"
          }`}
        >
          <Header></Header>
          <div className="flex-1 bg-zinc-900 p-4 text-black">
          <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Car List</h1>
        <div className="overflow-x-auto">
         <Outlet></Outlet>
        </div>
      </div>
          </div>
        </div>
      </div>
    )
}

export default AuthLayout;
