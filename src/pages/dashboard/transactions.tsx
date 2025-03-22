import React, { useEffect, useState } from "react";
import moment from "moment";
import { getUserTransactions } from "../../services/transaction";

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await getUserTransactions();
        setTransactions(res);
      } catch (err) {
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="w-full p-4 ">
      <div className="w-full p-4 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Transactions</h2>

        <div className="overflow-x-auto w-[calc(100vw-65px)] md:w-full">
          <table className="w-full border-collapse ">
            <thead>
              <tr className="bg-gray-100 py-4">
                <th className="py-2 text-left px-4">Date</th>
                <th className="py-2 text-left px-4">Type</th>
                <th className="py-2 text-left px-4">Amount</th>
                <th className="py-2 text-left px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="text-center text-red-500 py-4">
                    {error}
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No recent transactions
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <tr key={transaction._id} className="border-b">
                    <td className="py-2 px-4">
                      <div className="whitespace-nowrap">
                        {moment(transaction.createdAt).format(
                          "MMM Do YY - hh:mm a"
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-4">{transaction.type}</td>
                    <td
                      className={`py-2 px-4 font-bold ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ${transaction.amount.toLocaleString()}
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-md text-white text-sm 
                      ${
                        transaction.status === "Completed"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
