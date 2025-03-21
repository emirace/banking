import { FaArrowRight, FaAsterisk, FaGlobe } from "react-icons/fa";

const PaymentFeature = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-20 py-16 px-4 max-w-6xl w-full mx-auto bg-purple-500/10 my-16">
      {/* Left Section: Text and Icon */}
      <div className="max-w-lg">
        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
          <FaGlobe className="text-indigo-600 text-xl" />
        </div>
        <h2 className="text-4xl md:text-5xl font-semibold mt-6">
          The universal way
          <br /> of payment
        </h2>
        <p className="text-gray-600 mt-4">
          When it’s easy to comply, employees do it. Compliance is that simple.
          Free your finance team from chasing employees of the month end - and
          have everything you need
        </p>

        <button className="mt-6 px-5 py-3 hover:bg-black hover:text-white border border-black font-medium rounded-full flex items-center space-x-2 ">
          <span>Learn more</span>
          <FaArrowRight />
        </button>
      </div>

      {/* Right Section: Stats Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-80">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">Statistics</span>
          <button className="text-gray-500 hover:text-gray-800">⟲</button>
        </div>
        <div className="">Current Balance</div>
        <div className="flex gap-2 items-center text-4xl font-bold mt-2">
          $ <FaAsterisk className="text-xl" />
          <FaAsterisk className="text-xl" />
          <FaAsterisk className="text-xl" />
          <FaAsterisk className="text-xl" />
        </div>

        {/* Example user icons */}
        <div className="flex justify-around w-full mt-8">
          <div className="w-10 h-10 flex items-center justify-center border rounded-2xl">
            D
          </div>
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl">
            W
          </div>
          <div className="w-10 h-10 flex items-center justify-center border rounded-2xl">
            M
          </div>
          <div className="w-10 h-10 flex items-center justify-center border rounded-2xl">
            Y
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentFeature;
