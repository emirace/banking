import { FiCalendar } from "react-icons/fi";

const FinancialCard = ({
  title,
  amount,
}: {
  title: string;
  amount: string;
}) => {
  return (
    <div className="border rounded-xl p-6 w-full ">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-semibold">
          {title} <span className="text-gray-400">&#9432;</span>
        </h3>
        <div className="flex items-center gap-1 border p-2 rounded-lg text-gray-600">
          <FiCalendar size={16} />
          <span className="text-sm">
            {new Date().toLocaleString("default", { month: "long" })}
          </span>
        </div>
      </div>
      <h2 className="text-3xl font-bold mt-2">${amount}</h2>
    </div>
  );
};

export default FinancialCard;
