import React, { useState, useRef } from "react";
import { useUser } from "../../../context/user";

interface TransactionCodeProps {
  onSubmitCode: (code: string) => void;
}

const TransactionCode: React.FC<TransactionCodeProps> = ({ onSubmitCode }) => {
  const { user } = useUser();
  const [otp, setOtp] = useState(Array(5).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/\D/g, ""); // Allow only digits
    if (value.length > 1) return; // Prevent entering more than one digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredOtp = otp.join("");

    onSubmitCode(enteredOtp);
  };

  return (
    <div className="flex justify-center items-center min-h-full ">
      <div className="bg-blue-600/10 p-6 md:rounded-lg md:max-w-md h-screen md:h-auto w-full flex flex-col  ">
        <h2 className=" text-2xl font-bold mb-6">
          {user?.codeDescription || "Enter Transaction Code"}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el) as any}
                className="w-16 h-16 text-center text-lg rounded-full border border-blue-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 text-blue-600"
                maxLength={1}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <label htmlFor="terms" className="">
              This will be used to validate your transactions
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold mt-4 p-3 px-6 rounded-full"
            disabled={otp.some((digit) => digit === "")}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionCode;
