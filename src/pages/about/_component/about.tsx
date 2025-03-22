import { useState } from "react";
import about from "../../../assets/images/about.webp";

const AboutSection = () => {
  const [selectedTab, setSelectedTab] = useState<
    "Mission" | "Vision" | "Our Value"
  >("Mission");

  const tabContent = {
    Mission:
      "At Transactsphere, our mission is to revolutionize banking with secure, innovative, and customer-centric financial solutions. We strive to empower individuals and businesses by offering seamless transactions, personalized services, and cutting-edge digital banking experiences.",
    Vision:
      "Our vision is to be the leading global digital bank, setting new benchmarks in trust, efficiency, and financial inclusivity. We aim to create a banking ecosystem where financial services are accessible, convenient, and tailored to every customer’s unique needs.",
    "Our Value":
      "Integrity, transparency, and customer focus drive everything we do at Transactsphere. We are committed to delivering top-notch banking services while fostering financial growth and security for our clients. Our core values ensure that we remain a trusted partner in our customers' financial journeys.",
  };

  return (
    <div className="flex flex-col md:flex-row items-center p-4 gap-8 max-w-6xl mx-auto py-20">
      {/* Left Section */}
      <div className="md:w-1/2 text-left">
        <h2 className="text-4xl md:text-5xl font-semibold">
          About Transactsphere
        </h2>
        <p className=" mt-4">
          Transactsphere is a modern banking institution dedicated to providing
          top-tier financial services. Our team of experts combines innovation
          with traditional banking principles to offer secure, efficient, and
          customer-friendly financial solutions.
        </p>
        <div className="flex mt-6 space-x-4">
          {Object.keys(tabContent).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-semibold rounded-full transition-all ${
                selectedTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedTab(tab as keyof typeof tabContent)}
            >
              {tab}
            </button>
          ))}
        </div>
        <p className="mt-4 text-gray-700">{tabContent[selectedTab]}</p>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
        <div className="relative">
          <img
            src={about}
            alt="Banking Professional"
            className="w-full h-full rounded-2xl shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
