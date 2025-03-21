import { FaCoffee, FaCar, FaPaw, FaWifi } from "react-icons/fa";
import { FcSimCardChip } from "react-icons/fc";

const BillingPayment = () => {
  const transactions = [
    {
      icon: <FaCoffee />,
      name: "Mocha",
      category: "Coffee House",
      amount: "-$15.30",
      bg: "bg-purple-200",
    },
    {
      icon: <FaCar />,
      name: "Uber",
      category: "Transport",
      amount: "-$56.24",
      bg: "bg-yellow-200",
    },
    {
      icon: <FaPaw />,
      name: "Tommy",
      category: "Pet Service",
      amount: "-$34.10",
      bg: "bg-blue-200",
    },
  ];

  return (
    <section className="flex flex-col md:flex-row items-center gap-20 justify-between bg-white p-6 max-w-6xl w-full mx-auto py-20 ">
      {/* Left Section */}
      <div className="md:w-1/2">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
          Standards of <br /> billing and payment
        </h2>
        <p className="text-gray-600 mt-3">
          When it’s easy to comply, employees do it. Compliance is that simple.
          Free your finance team from chasing employees at month-end — and have
          everything you need to close the books.
        </p>
        <ul className="mt-5  text-gray-800 font-semibold text-xl">
          <li className="border-b py-3">
            <span className="font-bold">1.</span> Pay and get paid on your terms
          </li>
          <li className="border-b py-3">
            <span className="font-bold">2.</span> Control your customer
            experience
          </li>
          <li className="border-b py-3">
            <span className="font-bold">3.</span> Expand your book of business
          </li>
          <li className="border-b py-3">
            <span className="font-bold">4.</span> Automate your workflows
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center text-gray-700">
          <h3 className="font-semibold text-lg">Transactions</h3>
          <span className="text-gray-500">5 June</span>
        </div>

        {/* Transactions List */}
        <div className="mt-4 space-y-4">
          {transactions.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-white rounded-lg shadow"
            >
              <div className="flex items-center gap-3">
                <span className={`p-3 rounded-full text-lg ${item.bg}`}>
                  {item.icon}
                </span>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
              <p className="font-medium text-gray-900">{item.amount}</p>
            </div>
          ))}
        </div>

        {/* Payment Cards */}
        <div className="mt-6 flex gap-4">
          <div className="flex-1 flex flex-col gap-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-4 text-white">
            <div className="flex justify-between text-2xl">
              <FcSimCardChip className="opacity-50" />
              <FaWifi className="rotate-45" />
            </div>{" "}
            <p className="text-sm">567 428 513 741</p>
          </div>
          <div className="flex-1 flex flex-col gap-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-4 text-white">
            <div className="flex justify-between text-2xl">
              <FcSimCardChip className="opacity-50" />
              <FaWifi className="rotate-45" />
            </div>{" "}
            <p className="text-sm">567 428 513 741</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BillingPayment;
