import { useState } from "react";
import { IUser } from "../../../../types/user";
import { updateUserById } from "../../../../services/user";
import { useToastNotification } from "../../../../context/toastNotification";

interface Props {
  user: IUser;
  onSave: () => void;
}
const UserDetails = ({ user, onSave }: Props) => {
  const { addNotification } = useToastNotification();
  const [editableUser, setEditableUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await updateUserById(user._id, editableUser);
      setEditableUser(res);
      onSave();
      setIsEditing(false);
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg w-96 bg-white">
      <h2 className="text-lg font-bold mb-4">User Details</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="fullName"
            value={editableUser.fullName}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={editableUser.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            name="role"
            value={editableUser.role}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={editableUser.status}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
