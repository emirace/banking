import { FaSyncAlt, FaPaperPlane, FaExchangeAlt, FaWifi } from "react-icons/fa";
import { FcSimCardChip } from "react-icons/fc";
import { FaAsterisk } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-purple-900 pt-20  via-black to-blue-600 text-white min-h-screen flex w-full justify-center items-center ">
      <div className="flex flex-col md:flex-row p-4 max-w-6xl gap-10 w-full mx-auto">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-medium ">
            Streamline your banking experience
          </h1>
          <p className="text-lg text-gray-300 mt-4">
            Experience hassle-free banking card management and transactions with
            our platform with our user-friendly interface.
          </p>

          <div className="mt-6 flex justify-center md:justify-start bg-white p-2 rounded-full">
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-2 flex-1 text-black focus:outline-none"
            />
            <button className="bg-blue-600 px-6 py-2 md:py-3 font-bold rounded-full text-white">
              Get Started
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center md:justify-end">
          {/* Phone Mockup */}
          <div className="relative w-[70%] h-96 flex flex-col gap-5 items-center bg-gray-900 rounded-3xl p-6 border-2">
            <div className="text-gray-400 text-lg">Current Balance</div>
            <div className="flex items-center gap-2 text-white text-5xl font-semibold">
              $ <FaAsterisk className="text-xl" />
              <FaAsterisk className="text-xl" />
              <FaAsterisk className="text-xl" />
              <FaAsterisk className="text-xl" />
            </div>

            <div className="flex justify-around w-full mt-4">
              <button className="bg-gray-800 p-3 rounded-lg text-3xl">
                <FaSyncAlt />
              </button>
              <button className="bg-gray-800 p-3 rounded-lg text-3xl">
                <FaPaperPlane />
              </button>
              <button className="bg-gray-800 p-3 rounded-lg text-3xl">
                <FaExchangeAlt />
              </button>
            </div>

            {/* Card */}
            <div className="relative w-full">
              <div className="mt-4 absolute -left-12 flex flex-col gap-8  -right-12 bg-gradient-to-r from-blue-600 to-purple-500 p-4 rounded-xl text-white shadow-lg">
                <div className="flex justify-between text-2xl">
                  <FcSimCardChip className="opacity-50" />
                  <FaWifi className="rotate-45" />
                </div>
                <div className="text-4xl font-medium">567 428 513 741</div>
                <div className="flex justify-between text-sm">
                  <span>User Account</span>
                  <span>12/24</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
