import { useState } from "react";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import { Link } from "react-router";
import { useUser } from "../../../context/user";

const Navbar = ({ toggle }: { toggle: () => void }) => {
  const { logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="border-b w-full">
      <div className="container mx-auto px-4 py-3 flex md:justify-end justify-between items-center">
        <div className="md:hidden flex items-center gap-3">
          <FaBars onClick={toggle} className="text-2xl  cursor-pointer" />
          {/* <img src={logo} alt="logo" className="w-auto h-10" /> */}
        </div>
        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="relative">
            <FaBell className="text-xl text-gray-700" />
          </button>
          <div className="relative">
            <FaUserCircle
              className="text-3xl text-gray-700 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
              <div className="absolute right-0 top-[105%] bg-white shadow-lg rounded">
                <ul className="">
                  <li>
                    <Link
                      to="/dashboard/settings"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all cursor-pointer `}
                    >
                      <span className="text-base">Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/auth"
                      onClick={() => {
                        setIsOpen(false);
                        logout();
                      }}
                      className={`flex items-center text-red-500 space-x-3 px-4 py-3 rounded-lg transition-all cursor-pointer `}
                    >
                      <span className="text-base whitespace-nowrap">
                        Log out
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
