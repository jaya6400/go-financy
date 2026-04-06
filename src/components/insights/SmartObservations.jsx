import { groupByMonth, groupByCategory, getTopCategory, formatCurrency } from '../../utils';
import useFinanceStore from '../../store/useFinanceStore';

const generateObservations = (transactions) => {
  const observations = [];
  const monthly = groupByMonth(transactions);

  if (monthly.length < 2) {
    observations.push({
      icon: '📊',
      text: 'Add more transactions across months to unlock spending observations.',
      color: '#6366f1',
    });
    return observations;
  }

  const latest = monthly[monthly.length - 1];
  const previous = monthly[monthly.length - 2];

  // Spending change
  const spendingChange = latest.expenses - previous.expenses;
  const spendingPct = previous.expenses > 0
    ? Math.abs(Math.round((spendingChange / previous.expenses) * 100))
    : 0;

  if (spendingChange > 0) {
    observations.push({
      icon: '',
      text: `You spent ${spendingPct}% more in ${latest.month} compared to ${previous.month}. Keep an eye on your expenses.`,
      color: '#e11d48',
    });
  } else {
    observations.push({
      icon: '',
      text: `Great job! You spent ${spendingPct}% less in ${latest.month} compared to ${previous.month}.`,
      color: '#059669',
    });
  }

  // Savings observation
  const latestSavings = latest.income - latest.expenses;
  const savingsRate = latest.income > 0
    ? Math.round((latestSavings / latest.income) * 100)
    : 0;

  if (savingsRate >= 30) {
    observations.push({
      icon: '',
      text: `You saved ${savingsRate}% of your income last month — excellent financial discipline!`,
      color: '#059669',
    });
  } else if (savingsRate >= 10) {
    observations.push({
      icon: '',
      text: `You saved ${savingsRate}% of your income last month. Try to push it above 30%.`,
      color: '#d97706',
    });
  } else {
    observations.push({
      icon: '',
      text: `Your savings rate was only ${savingsRate}% last month. Consider cutting non-essential spending.`,
      color: '#e11d48',
    });
  }

  // Top category
  const topCat = getTopCategory(transactions);
  if (topCat) {
    observations.push({
      icon: '',
      text: `Your biggest spending category overall is ${topCat.name} at ${formatCurrency(topCat.value)}.`,
      color: topCat.color,
    });
  }

  // Income consistency
  const incomes = monthly.map((m) => m.income);
  const avgIncome = incomes.reduce((a, b) => a + b, 0) / incomes.length;
  const isConsistent = incomes.every((i) => Math.abs(i - avgIncome) / avgIncome < 0.1);

  if (isConsistent) {
    observations.push({
      icon: '',
      text: `Your income has been consistent across all months — great financial stability.`,
      color: '#6366f1',
    });
  } else {
    observations.push({
      icon: '',
      text: `Your income varies month to month. Consider building a 3-month emergency fund.`,
      color: '#d97706',
    });
  }

  return observations;
};

export default function SmartObservations() {
  const transactions = useFinanceStore((s) => s.transactions);
  const observations = generateObservations(transactions);

  return (
    <div className="card p-5">
      <div className="mb-4">
        <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Smart Observations</h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Insights generated from your data</p>
      </div>

      <div className="flex flex-col gap-3">
        {observations.map((obs, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl"
            style={{ backgroundColor: `${obs.color}0f` }}
          >
            <span className="text-base shrink-0">{obs.icon}</span>
            <p className="text-xs leading-relaxed font-medium" style={{ color: 'var(--text-primary)' }}>
              {obs.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}