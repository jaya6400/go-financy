import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { groupByMonth, formatCurrency } from '../../utils';
import useFinanceStore from '../../store/useFinanceStore';
import { format, parseISO } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl px-3 py-2 text-xs shadow-lg" style={{ backgroundColor: '#0a1628', color: '#fff' }}>
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.fill }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MonthlyComparison() {
  const transactions = useFinanceStore((s) => s.transactions);
  const monthly = groupByMonth(transactions);

  const data = monthly.map((m) => ({
    month: format(parseISO(`${m.month}-01`), 'MMM yy'),
    Income: m.income,
    Expenses: m.expenses,
    Savings: m.income - m.expenses,
  }));

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div className="mb-4">
        <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Monthly Comparison</h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Income vs expenses vs savings per month</p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e6f4ed" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7f74' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#6b7f74' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="Income" fill="#059669" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Expenses" fill="#e11d48" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Savings" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}