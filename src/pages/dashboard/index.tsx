import { Outlet } from "react-router";
import Sidebar from "./_component/sidebar";
import Navbar from "./_component/navbar";
import { useEffect, useState } from "react";
import { ping } from "../../services/image";
import { useUser } from "../../context/user";
import { useNavigate } from "react-router";

function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    ping();
  }, []);

  useEffect(() => {
    if (!user?.hasPin) {
      navigate("/code");
    }
  }, [user]);

  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
        <div className="flex-1">
          <Navbar toggle={toggleSidebar} />
          <div className="h-full overflow-y-auto pb-20">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
