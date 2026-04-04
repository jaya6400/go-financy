import { InsightCard, MonthlyComparison, TopSpending, SmartObservations } from '../components/insights';
import { getTopCategory, groupByMonth, formatCurrency, formatPercent } from '../utils';
import useFinanceStore from '../store/useFinanceStore';

export default function Insights() {
  const transactions = useFinanceStore((s) => s.transactions);
  const monthly = groupByMonth(transactions);
  const topCat = getTopCategory(transactions);

  const latest = monthly[monthly.length - 1];
  const previous = monthly[monthly.length - 2];

  const savingsRate = latest
    ? Math.round(((latest.income - latest.expenses) / latest.income) * 100)
    : 0;

  const spendingChange = latest && previous
    ? Math.round(((latest.expenses - previous.expenses) / previous.expenses) * 100)
    : 0;

  const totalTransactions = transactions.length;

  return (
    <div className="flex flex-col gap-5">

      {/* Insight cards row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard
          title="Top Category"
          value={topCat ? topCat.name : 'N/A'}
          subtext={topCat ? `Total: ${formatCurrency(topCat.value)}` : 'No data yet'}
          icon="🏆"
          accentColor="#e11d48"
        />
        <InsightCard
          title="Last Month Savings"
          value={formatPercent(savingsRate)}
          subtext={savingsRate >= 30 ? '🎯 Excellent habit' : savingsRate >= 10 ? '👍 Keep going' : '⚠️ Save more'}
          icon="💰"
          accentColor="#059669"
        />
        <InsightCard
          title="Spending Change"
          value={`${spendingChange > 0 ? '+' : ''}${spendingChange}%`}
          subtext={spendingChange > 0 ? 'More than last month' : 'Less than last month'}
          icon={spendingChange > 0 ? '📈' : '📉'}
          accentColor={spendingChange > 0 ? '#e11d48' : '#059669'}
        />
        <InsightCard
          title="Total Transactions"
          value={totalTransactions}
          subtext="Across all months"
          icon="🔄"
          accentColor="#6366f1"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <MonthlyComparison />
        </div>
        <div className="lg:col-span-1">
          <TopSpending />
        </div>
      </div>

      {/* Observations */}
      <SmartObservations />

    </div>
  );
}