import {
  FaPaypal,
  FaStripe,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmazonPay,
  FaBitcoin,
  FaCcApplePay,
  FaGooglePay,
  FaCcAmex,
  FaCcDiscover,
  FaCcJcb,
  FaCcDinersClub,
  FaAlipay,
  FaWeixin,
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

const InternationalPayments = () => {
  // Payment method icons
  const paymentIcons = [
    { icon: <FaPaypal />, name: "PayPal" },
    { icon: <FaStripe />, name: "Stripe" },
    { icon: <FaCcVisa />, name: "Visa" },
    { icon: <FaCcMastercard />, name: "Mastercard" },
    { icon: <FaCcAmazonPay />, name: "Amazon Pay" },
    { icon: <FaBitcoin />, name: "Bitcoin" },
    { icon: <FaCcApplePay />, name: "Apple Pay" },
    { icon: <FaGooglePay />, name: "Google Pay" },
    { icon: <FaCcAmex />, name: "American Express" },
    { icon: <FaCcDiscover />, name: "Discover" },
    { icon: <FaCcJcb />, name: "JCB" },
    { icon: <FaCcDinersClub />, name: "UnionPay" },
    { icon: <FaAlipay />, name: "Alipay" },
    { icon: <FaWeixin />, name: "WeChat Pay" },
  ];

  return (
    <section className="bg-blue-600/10 py-16 px-6 text-center">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
        International Payments
      </h2>
      <p className="text-gray-600 mt-2">Collect payments from 50+ countries.</p>

      {/* Learn More Button */}
      <div className="mt-6 flex justify-center">
        <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-full text-gray-900 font-medium hover:bg-black hover:text-white transition">
          Learn more <FaArrowRight />
        </button>
      </div>

      {/* Payment Icons Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 justify-center items-center mt-10">
        {paymentIcons.map((payment, index) => (
          <div className="flex justify-center items-center">
            <div
              key={index}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl text-blue-600 hover:scale-110 transition-transform"
              title={payment.name}
            >
              {payment.icon}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InternationalPayments;
