import { FaArrowRight } from "react-icons/fa";
import image from "../../../assets/images/personal.jpg";

const FinanceControl = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 max-w-6xl w-full mx-auto p-4 py-12 md:py-24">
      {/* Left Section: Finance Control UI */}
      <h2 className="text-4xl md:hidden text-center md:text-left font-semibold text-gray-900">
        Your personal finances,
        <br /> a few taps away.
      </h2>
      <div className="bg-blue-100 p-6 w-full md:w-1/2">
        <img src={image} className="w-full h-full" alt="Finance Control" />
      </div>

      {/* Right Section: Text & Button */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-4xl hidden md:block font-semibold text-gray-900">
          Your personal finances,
          <br /> a few taps away.
        </h2>
        <p className="text-gray-500 mt-3 ">
          When it’s easy to comply, employees do it. Compliance is that simple.
          Free your finance team from chasing employees at month-end—and have
          everything you need to close the books.
        </p>
        <p className="text-gray-500 mt-2">
          Built to make compliance and accountability easy, helping you close
          the books faster and keep everyone on budget in real-time.
        </p>
        <button className="mt-6 px-5 py-3 hover:bg-black hover:text-white border border-black font-medium rounded-full flex items-center space-x-2 ">
          <span>Learn more</span>
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default FinanceControl;
