import { useState } from "react";
import { FaUniversity } from "react-icons/fa";
import Modal from "../_component/modal";
import BankTransfer from "./_component/banktransfer";
import Transactions from "./_component/transaction";

const paymentMethods = [
  {
    id: "wire-transfer",
    name: "Wire Transfer",
    icon: <FaUniversity className="text-blue-600 text-2xl" />,
    description: "Transfer funds securely from your bank account.",
  },
  // {
  //   id: "bitcoin",
  //   name: "Bitcoin",
  //   icon: <FaBitcoin className="text-orange-500 text-2xl" />,
  //   description: "Use Bitcoin for a fast and secure transaction.",
  // },
];

const Transfer = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [transferModal, setTransferModal] = useState(false);
  const [cryptoModal, setCryptoModal] = useState(false);

  const handleSelect = (method: string) => {
    setSelectedMethod(method);
  };

  const handleContinue = () => {
    if (selectedMethod) {
      if (selectedMethod === "wire-transfer") {
        setTransferModal(true);
      } else if (selectedMethod === "bitcoin") {
        setCryptoModal(true);
      }
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4 p-4">Transfer</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="border p-6 w-full md:w-1/3 rounded-lg max-w-md">
          <h2 className="text-lg font-semibold mb-2">Select Transfer Method</h2>
          <p className="text-gray-500 text-sm mb-4">
            Choose your preferred deposit method for a secure transaction.
          </p>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex flex-col p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
                onClick={() => handleSelect(method.id)}
              >
                <div className="flex items-center">
                  {method.icon}
                  <span className="ml-3 text-gray-700 font-medium">
                    {method.name}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
          <button
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:bg-gray-400 "
            onClick={handleContinue}
            disabled={!selectedMethod}
          >
            Continue
          </button>

          {transferModal && (
            <Modal
              isOpen={transferModal}
              onClose={() => setTransferModal(false)}
            >
              <BankTransfer />
            </Modal>
          )}
          {cryptoModal && (
            <Modal isOpen={cryptoModal} onClose={() => setCryptoModal(false)}>
              {/* <CryptoPayment price={2000} /> */}
            </Modal>
          )}
        </div>
        <div className="w-full md:w-2/3">
          <Transactions />
        </div>
      </div>
    </div>
  );
};

export default Transfer;
