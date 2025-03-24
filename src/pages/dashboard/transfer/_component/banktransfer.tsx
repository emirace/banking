import { useState } from "react";
import { FaRegCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Loading from "../../../_components/loading";
import {
  makeTransfer,
  makeTransferWithCode,
} from "../../../../services/transaction";
import { useToastNotification } from "../../../../context/toastNotification";
import TransactionCode from "../../../transactionCode/_components/enterCode";

const BankTransfer = () => {
  const { addNotification } = useToastNotification();
  const [formData, setFormData] = useState({
    accountNumber: "",
    bankName: "",
    accountName: "",
    amount: "",
    iban: "",
    swiftCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [step, setStep] = useState("form");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.accountName)
      newErrors.accountName = "Account name is required.";
    if (!formData.accountNumber)
      newErrors.accountNumber = "Account number is required.";
    if (!formData.bankName) newErrors.bankName = "Bank name is required.";
    if (!formData.amount || parseFloat(formData.amount) <= 0)
      newErrors.amount = "Enter a valid withdrawal amount.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setLoading(true);
      await makeTransfer(formData);
      setStep("success");
    } catch (error: any) {
      if (error === "Require code") {
        setStep("code");
      } else {
        addNotification({ message: error, error: true });
      }
    }
  };

  const handleSubmitWithCode = async (code: string) => {
    try {
      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setLoading(true);
      await makeTransferWithCode({ ...formData, code });
      setStep("success");
    } catch (error: any) {
      addNotification({ message: error, error: true });
    }
  };

  const render = () => {
    switch (step) {
      case "form":
        return (
          <form onSubmit={handleSubmit} className="space-y-5 p-6 rounded-lg ">
            {/* Account Holder Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account Holder Name
              </label>
              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.accountName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter your name as per bank records"
              />
              {errors.accountName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.accountName}
                </p>
              )}
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bank Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.accountNumber
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter your account number"
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.accountNumber}
                </p>
              )}
            </div>

            {/* Bank Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bank Name
              </label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.bankName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter your bank name"
              />
              {errors.bankName && (
                <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>
              )}
            </div>

            {/* IBAN & Swift Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  IBAN Number
                </label>
                <input
                  type="text"
                  name="iban"
                  value={formData.iban}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your IBAN"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Swift Code
                </label>
                <input
                  type="text"
                  name="swiftCode"
                  value={formData.swiftCode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Swift Code"
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Transfer Amount ($)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.amount
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter withdrawal amount"
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Confirmation Message */}
            <p className="text-xs text-gray-500 flex items-center justify-center">
              <FaExclamationCircle className="text-gray-500 mr-1" />
              Please verify your details before submitting.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-all hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Loading size="sm" />} Transfer
            </button>
          </form>
        );
      case "code":
        return <TransactionCode onSubmitCode={handleSubmitWithCode} />;
      case "success":
        return (
          <div className="flex flex-col items-center text-green-600 space-y-2">
            <FaRegCheckCircle className="text-5xl" />
            <p className="text-lg font-semibold">Transfer Submitted!</p>
            <p className="text-gray-500 text-sm text-center">
              Your request is being processed. You will be notified once
              completed.
            </p>
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div className="h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Transfer Funds
      </h2>
      <p className="text-sm text-gray-500 border-b pb-4 mb-6">
        Please enter your transfer details carefully.
      </p>

      {render()}
    </div>
  );
};

export default BankTransfer;
