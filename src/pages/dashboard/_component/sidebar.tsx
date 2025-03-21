import { Link, NavLink } from "react-router";
import {
  FaTh,
  FaExchangeAlt,
  FaUserFriends,
  FaArrowAltCircleRight,
  FaArrowAltCircleDown,
  FaSlidersH,
  FaTimes,
} from "react-icons/fa";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FaTh /> },
  { name: "Transactions", path: "transactions", icon: <FaExchangeAlt /> },
  { name: "Transfer", path: "transfer", icon: <FaArrowAltCircleRight /> },
  { name: "Deposit", path: "deposit", icon: <FaArrowAltCircleDown /> },
  { name: "Settings", path: "settings", icon: <FaSlidersH /> },
];

const adminNav = [
  {
    name: "User Management",
    path: "user",
    icon: <FaUserFriends />,
  },
  {
    name: "All Transactions",
    path: "all-transactions",
    icon: <FaExchangeAlt />,
  },
  { name: "Admin Settings", path: "admin-settings", icon: <FaSlidersH /> },
];

const Sidebar = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => {
  return (
    <aside
      className={`fixed md:relative left-0 top-0 h-screen overflow-y-auto w-64 bg-gradient-to-br from-purple-900  via-black to-blue-600 text-white flex flex-col p-6 rounded-tr-3xl ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      {/* Company Header */}
      <Link to="/" className="mb-8">
        <h2 className="text-xl font-bold">LOGO</h2>
      </Link>
      <FaTimes
        className="absolute top-4 right-4 text-xl md:hidden"
        onClick={toggle}
      />

      {/* Navigation Links */}
      <div className="flex-1">
        <nav className="mb-8">
          <ul className="space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={toggle}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                      isActive ? "bg-white/20 text-white" : "hover:bg-white/10"
                    }`
                  }
                  end
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-base">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-base font-bold mb-2">Admin</div>
        <nav className="">
          <ul className="space-y-4">
            {adminNav.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={toggle}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                      isActive ? "bg-white/20 text-white" : "hover:bg-white/10"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-base">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer Branding */}
      <div className="mt-auto text-center text-sm text-gray-400">
        <p>powered by</p>
        {/* <h3 className="font-bold text-white text-lg">Banct</h3> */}
      </div>
    </aside>
  );
};

export default Sidebar;
