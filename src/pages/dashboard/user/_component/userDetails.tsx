import { useEffect, useState } from "react";
import { IUser } from "../../../../types/user";
import {
  removeCode,
  resetPin,
  updateUserById,
  deleteUser,
} from "../../../../services/user";
import { useToastNotification } from "../../../../context/toastNotification";
import { debitUser, fundUser } from "../../../../services/admin";
import Loading from "../../../_components/loading";
import { FaLock } from "react-icons/fa";

interface Props {
  user: IUser;
  onSave: () => void;
}

const UserDetails = ({ user, onSave }: Props) => {
  const { addNotification } = useToastNotification();
  const [editableUser, setEditableUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [codeDescription, setCodeDescription] = useState("");
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString(),
  );
  const [formData, setFormData] = useState({
    code: "",
    expire: new Date().toISOString(),
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeForm = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setEditableUser(user);
  }, [user]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const { _id, ...other } = editableUser;
      const res = await updateUserById(user._id, other);
      setEditableUser(res);
      onSave();
      setIsEditing(false);
      addNotification({ message: "Updated successfully" });
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCode = async () => {
    try {
      const res = await removeCode(user._id);
      setEditableUser(res);
      onSave();
      setIsEditing(false);
      addNotification({ message: "Code removed successfully" });
    } catch (error: any) {
      addNotification({ message: error, error: true });
    }
  };

  const [reseting, setReseting] = useState(false);
  const handleResetPin = async () => {
    try {
      setReseting(true);
      const res = await resetPin(user._id);
      setEditableUser(res);
      onSave();
      setIsEditing(false);
      addNotification({ message: "Pin Reset successfully" });
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setReseting(false);
    }
  };

  const [addingCode, setAddingCode] = useState(false);
  const handleAdddCode = async () => {
    try {
      if (formData.code.length < 5) {
        addNotification({ message: "Enter 5 digit number", error: true });
        return;
      }
      setAddingCode(true);
      const res = await updateUserById(user._id, {
        transactionCode: formData,
        codeDescription,
      });
      setEditableUser(res);
      onSave();
      setIsEditing(false);
      addNotification({ message: "Code added successfully" });
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setAddingCode(false);
    }
  };

  const handleFundOrDebit = async (type: "fund" | "debit") => {
    if (!amount || isNaN(Number(amount))) {
      addNotification({ message: "Please enter a valid amount", error: true });
      return;
    }

    try {
      setLoading(true);
      if (type === "fund") {
        await fundUser({
          userId: editableUser._id,
          amount: parseFloat(amount),
          createdAt: transactionDate,
        });
      } else {
        await debitUser({
          userId: editableUser._id,
          amount: parseFloat(amount),
          createdAt: transactionDate,
        });
      }
      onSave();
      addNotification({ message: `User ${type}ed successfully` });
      setAmount("");
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  const [deleting, setDeleting] = useState(false);
  const handleDeleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      setDeleting(true);
      await deleteUser(user._id);
      addNotification({ message: "User deleted successfully" });
      onSave();
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-4 h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="space-y-5">
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
          <label className="block text-sm font-medium">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={editableUser.accountNumber}
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
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="bg-blue-600/10 p-2 rounded-lg  ">
          <div className="flex items-center gap-3  ">
            <div className="block text font-medium">Balance</div>
            <div className="text-xl">{editableUser.balance}</div>
          </div>
          <div className="flex space-x-2 mb-3">
            <div>
              <div className="block text-sm font-medium">Amount</div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Date(Optional)
              </label>
              <input
                type="datetime-local"
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleFundOrDebit("fund")}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Fund User
            </button>
            <button
              onClick={() => handleFundOrDebit("debit")}
              disabled={loading}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Debit User
            </button>
          </div>
        </div>
        <div className="bg-purple-600/10 p-2 rounded-lg  ">
          <div className=" flex items-center justify-between mb-2">
            <div className="block font-medium">Transaction Code</div>
            {editableUser.hasTransactionCode && (
              <button
                onClick={handleRemoveCode}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded"
              >
                Clear Previous Code
              </button>
            )}
          </div>
          <div className="flex space-x-2 mb-3">
            <div>
              <div className="block text-sm font-medium">Code (5 digits)</div>
              <input
                type="text"
                value={formData.code}
                name="code"
                onChange={handleChangeForm}
                className="w-full p-2 border rounded"
                placeholder="Enter code"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Expires</label>
              <input
                type="datetime-local"
                value={formData.expire}
                name="expire"
                onChange={handleChangeForm}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="block text-sm font-medium">Description</div>
            <input
              type="text"
              value={codeDescription}
              name="code"
              onChange={(e) => setCodeDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter code description"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleAdddCode}
              disabled={addingCode}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Add
            </button>
            {addingCode && <Loading size="sm" />}
          </div>
        </div>

        <button
          onClick={handleResetPin}
          disabled={reseting}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full"
        >
          <FaLock />
          {reseting ? "Reseting..." : "Reset Pin"}
        </button>
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
          <div className="flex gap-2">
            <button
              onClick={handleDeleteUser}
              disabled={deleting}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              {deleting ? "Deleting..." : "Delete User"}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
