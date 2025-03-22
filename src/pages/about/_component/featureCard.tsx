import { JSX } from "react";
import { FaUniversity, FaPiggyBank, FaCreditCard } from "react-icons/fa";

const features = [
  {
    icon: <FaUniversity className="text-5xl text-blue-600" />,
    title: "Secure & Reliable Banking",
    description:
      "At TransactSphere, we prioritize security and reliability. Our advanced banking infrastructure ensures your transactions are fast, secure, and seamless.",
  },
  {
    icon: <FaPiggyBank className="text-5xl text-green-600" />,
    title: "Smart Savings Plans",
    description:
      "Grow your wealth with our tailored savings plans. Enjoy high-interest rates and flexible withdrawal options designed to suit your financial goals.",
  },
  {
    icon: <FaCreditCard className="text-5xl text-purple-600" />,
    title: "Easy & Fast Payments",
    description:
      "Make payments effortlessly with our modern digital banking solutions. Whether it's online shopping or international transfers, we’ve got you covered.",
  },
];

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:px-20 justify-center  rounded-xl ">
      <div className="flex-1 flex justify-center">
        <div className="w-20 md:w-40 h-20 md:h-40 flex items-center justify-center bg-white rounded-full">
          {icon}
        </div>
      </div>
      <div className="flex-1 text-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const BankingFeatures = () => {
  return (
    <div className="max-w-6xl w-full mx-auto p-4 bg-blue-600/10 rounded-xl space-y-6 my-12">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
};

export default BankingFeatures;
