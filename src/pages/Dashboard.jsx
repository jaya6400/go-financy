import { SummaryCards, BalanceTrend, SpendingBreakdown, RecentTransactions } from '../components/dashboard';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5 max-w-screen-xl mx-auto w-full">
      <div>
        <SummaryCards />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <BalanceTrend />
        </div>
        <div className="md:col-span-1">
          <SpendingBreakdown />
        </div>
      </div>
      <div>
        <RecentTransactions />
      </div>
    </div>
  );
}