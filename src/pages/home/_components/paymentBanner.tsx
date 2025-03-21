import banking from "../../../assets/images/banking.jpg";
const PaymentBanner = () => {
  return (
    <div className="flex justify-center items-center py-10 px-6 ">
      <div className="relative bg-gradient-to-r from-purple-900 to-blue-900 text-white rounded-2xl p-8 md:px-20 max-w-6xl flex flex-col md:flex-row items-center gap-6 shadow-lg">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-semibold">
            Ready to level up your payment process?
          </h2>
          <p className="mt-4 text-gray-300">
            Experience hassle-free banking card management and transactions with
            our platform with our user-friendly interface.
          </p>
          <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full">
            Get Started
          </button>
        </div>
        <div className="flex-1 relative">
          <img
            src={banking}
            alt="Payment Illustration"
            className="rounded-xl w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentBanner;
