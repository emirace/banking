import { useUser } from "../../../context/user";
import BalanceCard from "./_component/balance";
import FinancialCard from "./_component/financeCard";
import RecentTransactions from "./_component/recentYransaction";

function Overview() {
  const { user, stats } = useUser();
  return (
    <div className="p-4 flex flex-col gap-4 w-full">
      <div className="font-semibold text-xl">Welcome, {user?.fullName}</div>
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="md:w-1/2">
          <BalanceCard />
        </div>
        <div className="flex gap-4 flex-col md:w-1/2">
          <FinancialCard
            title="Monthly Spent"
            amount={`${stats.currentMonth.transfers}`}
          />
          <FinancialCard
            title="Monthly Income"
            amount={`${stats.currentMonth.deposits}`}
          />
        </div>
      </div>
      <RecentTransactions />
    </div>
  );
}

export default Overview;
