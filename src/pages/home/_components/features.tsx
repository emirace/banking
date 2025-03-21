import { FaWallet, FaPaperPlane, FaCreditCard } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaWallet size={32} className="text-white" />,
      title: "Save, invest & Track",
      description: "Built make compliance easy, helping you close the books",
    },
    {
      icon: <FaPaperPlane size={32} className="text-white" />,
      title: "Send payments",
      description: "Built make compliance easy, helping you close the books",
    },
    {
      icon: <FaCreditCard size={32} className="text-white" />,
      title: "Tracking Daily Profit",
      description: "Built make compliance easy, helping you close the books",
    },
  ];

  return (
    <section className="text-center md:py-16 mt-20 px-4">
      <h2 className="text-4xl md:text-5xl font-semibold">
        Powerful Features just for you
      </h2>
      <p className="text-gray-600 mt-2">
        Our platform offers a range of powerful features designed to elevate
        your banking experience.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center max-w-xs text-center"
          >
            <div className="bg-indigo-600 p-4 rounded-full">{feature.icon}</div>
            <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-500 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
