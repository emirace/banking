import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";

const Navbar = ({ toggle }: { toggle: () => void }) => {
  return (
    <header className="border-b w-full">
      <div className="container mx-auto px-4 py-3 flex md:justify-end justify-between items-center">
        <FaBars
          onClick={toggle}
          className="text-2xl md:hidden cursor-pointer"
        />
        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="relative">
            <FaBell className="text-xl text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              3
            </span>
          </button>
          <FaUserCircle className="text-3xl text-gray-700 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
