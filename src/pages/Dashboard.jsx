import { SummaryCards, BalanceTrend, SpendingBreakdown, RecentTransactions } from '../components/dashboard';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      {/* Row 1 — Summary cards */}
      <SummaryCards />

      {/* Row 2 — Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <BalanceTrend />
        </div>
        <div className="lg:col-span-1">
          <SpendingBreakdown />
        </div>
      </div>

      {/* Row 3 — Recent transactions */}
      <RecentTransactions />
    </div>
  );
}