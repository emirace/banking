import React, { useEffect, useState } from "react";
import { FaSearch,  FaEye } from "react-icons/fa";
import Loading from "../../_components/loading";
import { useToastNotification } from "../../../context/toastNotification";
import { IUser } from "../../../types/user";
import Modal from "../_component/modal";
import UserDetails from "./_component/userDetails";
import { fetchAllUsers } from "../../../services/user";

const User: React.FC = () => {
  const { addNotification } = useToastNotification();
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const res = await fetchAllUsers({});
        setUsers(res);
      } catch (error: any) {
        addNotification({ message: error.message, error: true });
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Filter and paginate users
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginated = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="border  rounded-lg p-6 w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
      </div>
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm">
          {users.length} Users
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by Email"
            className="border w-full border-gray-300 rounded-md py-2 pl-8 pr-3 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-2 top-3 text-gray-500" />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto min-h-96 w-[calc(100vw-65px)] md:w-full">
          <table className="border-collapse w-full whitespace-nowrap ">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Balance</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((user, index) => (
                <tr key={user._id} className="border-b">
                  <td className="py-3 px-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-3 px-4 font-medium">{user.fullName}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.balance}</td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs capitalize ${
                        user.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-3">
                    <FaEye
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsOpen(true);
                      }}
                    />
                    {/* <FaEdit className="text-blue-500 cursor-pointer" /> */}
                    {/* <FaTrash className="text-red-500 cursor-pointer" /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-4 text-sm">
        <p>
          Showing {Math.min(currentPage * itemsPerPage, filteredUsers.length)}{" "}
          of {filteredUsers.length} entries
        </p>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-primary"
            }`}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1 ? "bg-primary text-white" : "text-primary"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-primary"
            }`}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <UserDetails onSave={fetchAllUsers} user={selectedUser!} />
      </Modal>
    </div>
  );
};

export default User;
