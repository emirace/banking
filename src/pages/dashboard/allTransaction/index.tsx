import React, { useEffect, useState } from "react";
import { FaSearch, FaCheck, FaTimes } from "react-icons/fa";
import moment from "moment";
import Loading from "../../_components/loading";
import { useToastNotification } from "../../../context/toastNotification";
import {
  approveTransaction,
  declineTransaction,
  getAllTransactions,
} from "../../../services/transaction";

const TransactionTable: React.FC = () => {
  const { addNotification } = useToastNotification();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const res = await getAllTransactions();
        setTransactions(res);
      } catch (error: any) {
        addNotification({ message: error, error: true });
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, []);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction._id.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateStatus = async (
    id: string,
    status: "approved" | "declined"
  ) => {
    try {
      if (status === "approved") {
        await approveTransaction(id);
      } else {
        await declineTransaction(id, "");
      }

      addNotification({ message: `Transaction ${status}` });

      const res = await getAllTransactions();
      setTransactions(res);
    } catch (error: any) {
      addNotification({ message: error, error: true });
    }
  };

  return (
    <div className="border rounded-lg p-6 w-full overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <div className="flex items-center mb-4 gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by Transaction ID"
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
        <div className="overflow-x-auto">
          <table className="border-collapse w-full whitespace-nowrap">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction._id} className="border-b">
                    <td className="py-3 px-4 font-medium">{transaction._id}</td>
                    <td className="py-3 px-4">{transaction.user.fullName}</td>
                    <td className="py-3 px-4">
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 capitalize">
                      {transaction.status}
                    </td>
                    <td className="py-3 px-4">
                      {moment(transaction.createdAt).format(
                        "MMM D, YYYY HH:mm"
                      )}
                    </td>
                    <td className="py-3 px-4 flex gap-3">
                      {transaction.status === "Completed" ? (
                        <div className="font-semibold">Updated</div>
                      ) : (
                        <>
                          <button
                            className="text-green-500 cursor-pointer"
                            onClick={() =>
                              handleUpdateStatus(transaction._id, "approved")
                            }
                          >
                            <FaCheck />
                          </button>
                          <button
                            className="text-red-500 cursor-pointer"
                            onClick={() =>
                              handleUpdateStatus(transaction._id, "declined")
                            }
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
