import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../context/user";
import EnterCode from "./_components/enterCode";
import VerifyCode from "./_components/verifyCode";

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
    if (!loading && user?.hasTransactionCode) {
      navigate("/home");
    }
    console.log(user);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {step === "enter" ? (
        <EnterCode onSubmitCode={handleCodeSubmission} />
      ) : (
        <VerifyCode transactionCode={transactionCode} />
      )}
    </>
  );
};

export default TransactionCode;
