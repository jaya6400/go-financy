import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { groupByMonth, formatCurrency } from '../../utils';
import useFinanceStore from '../../store/useFinanceStore';
import { format, parseISO } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs shadow-lg">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function BalanceTrend() {
  const transactions = useFinanceStore((s) => s.transactions);
  const monthly = groupByMonth(transactions);

  const data = monthly.map((m) => ({
    month: format(parseISO(`${m.month}-01`), 'MMM yy'),
    Income: m.income,
    Expenses: m.expenses,
    Balance: m.income - m.expenses,
  }));

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-slate-900">Balance Trend</h2>
        <p className="text-xs text-slate-400 mt-0.5">Monthly income vs expenses overview</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="Income" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} />
          <Line type="monotone" dataKey="Expenses" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4, fill: '#f43f5e' }} />
          <Line type="monotone" dataKey="Balance" stroke="#6366f1" strokeWidth={2} strokeDasharray="4 3" dot={false} />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-3 justify-center">
        {[
          { label: 'Income', color: '#10b981' },
          { label: 'Expenses', color: '#f43f5e' },
          { label: 'Balance', color: '#6366f1' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}