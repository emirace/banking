import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../context/user";
import VerifyCode from "./_components/verifyCode";
import Loading from "../_components/loading";
import TransferPin from "./_components/transferpin";

const TransactionCode: React.FC = () => {
  const [step, setStep] = useState<"enter" | "verify">("enter");
  const [transactionCode, setTransactionCode] = useState("");
  const handleCodeSubmission = (code: string) => {
    setTransactionCode(code);
    setStep("verify");
  };
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
    if (!loading && user?.hasPin) {
      navigate("/home");
    }
    console.log(user);
  }, [user]);

  if (loading) {
    return (
      <div className="h-screen flex w-full justify-center items-center">
        <Loading />
      </div>
    );
  }
  return (
    <>
      {step === "enter" ? (
        <TransferPin onSubmitCode={handleCodeSubmission} newPin={true} />
      ) : (
        <VerifyCode transactionCode={transactionCode} />
      )}
    </>
  );
};

export default TransactionCode;
