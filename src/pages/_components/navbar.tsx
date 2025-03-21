import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex flex-col md:flex-row justify-between items-center z-20 backdrop-blur-2xl py-6 px-4 md:px-10 text-white transition-all duration-300 ${
        scrolling
          ? "bg-gradient-to-br from-purple-900 via-black to-blue-600 shadow-md "
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="text-2xl font-bold flex items-center space-x-2">
          <span className="text-white">🔗 PayWise</span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-white font-medium md:hidden">
            Sign In
          </Link>
          {isOpen ? (
            <FaTimes
              className="text-white text-2xl md:hidden cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <FaBars
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-2xl md:hidden cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <ul
        className={`flex flex-col mt-8 md:mt-0 items-center md:flex-row gap-8 ${
          isOpen ? "" : "hidden md:flex "
        }`}
      >
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "text-purple-400" : ""}`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Sign In & Get Started */}
      <div
        className={`flex items-center gap-4 mt-8 md:mt-0 ${
          isOpen ? "" : "hidden md:flex"
        }`}
      >
        {/* <FaUser className="text-white text-xl cursor-pointer" /> */}
        <Link to="/login" className="text-white font-medium md:block hidden">
          Sign In
        </Link>
        <button className="bg-white text-black font-bold px-4 py-2 rounded-full">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
