import {
  FaInfoCircle,
  FaRegCopy,
  FaArrowUp,
  FaArrowRight,
  // FaArrowDown,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router";
import { useUser } from "../../../../context/user";

const BalanceCard = () => {
  const { user, stats } = useUser();

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.accountNumber || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-blue-600/10 p-6 rounded-xl  w-full ">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-medium">My Balance</span>
          <FaInfoCircle className="text-gray-400 cursor-pointer" />
        </div>
        <button className="flex items-center space-x-1 text-gray-600 bg-gray-100 px-3 py-1 rounded-lg text-sm">
          <span>
            {new Date().toLocaleString("default", { month: "long" })}{" "}
            {new Date().getDate()}
          </span>
        </button>
      </div>

      {/* Balance Display */}
      <div className="flex items-center space-x-3">
        <h1 className="text-4xl font-bold">${user?.balance}</h1>
        <div className="flex items-center bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-medium">
          <FaArrowUp className="text-xs mr-1" />
          {stats.increasePercentage.deposits}%
        </div>
      </div>

      {/* Card Number and Copy */}
      <div className="flex items-center space-x-3 my-3">
        <span className="text-lg font-mono tracking-wide">
          {user?.accountNumber}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded-lg text-sm"
        >
          <FaRegCopy className="mr-1" />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2 mt-4">
        <Link
          to="transfer"
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center text-lg font-medium"
        >
          <FaArrowRight className="mr-2" />
          Transfer
        </Link>
        {/* <Link
          to="deposit"
          className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg flex items-center justify-center text-lg font-medium"
        >
          <FaArrowDown className="mr-2" />
          Received
        </Link> */}
      </div>
    </div>
  );
};

export default BalanceCard;
