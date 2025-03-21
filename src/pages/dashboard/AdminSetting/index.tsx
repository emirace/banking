import BankingInfo from "./_component/bankInfo";
import CryptoInfo from "./_component/cryptoInfo";
import Email from "./_component/email";

function AdminSettings() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <BankingInfo />
      <CryptoInfo />
      <Email />
    </div>
  );
}

export default AdminSettings;
