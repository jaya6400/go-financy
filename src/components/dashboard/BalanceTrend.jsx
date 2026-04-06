import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { groupByMonth, formatCurrency } from '../../utils';
import useFinanceStore from '../../store/useFinanceStore';
import { format, parseISO } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        color: 'var(--text-primary)',
        padding: '8px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
      }}>
        <p style={{ fontWeight: 700, marginBottom: 4, color: 'var(--text-muted)' }}>{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.color, fontWeight: 600 }}>
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
  const darkMode = useFinanceStore((s) => s.darkMode);
  const monthly = groupByMonth(transactions);

  const data = monthly.map((m) => ({
    month: format(parseISO(`${m.month}-01`), 'MMM yy'),
    Income: m.income,
    Expenses: m.expenses,
    Balance: m.income - m.expenses,
  }));

  const gridColor = darkMode ? '#1e293b' : '#e2e8f0';
  const axisColor = darkMode ? '#64748b' : '#94a3b8';

  return (
    <div className="card p-5">
      <div className="mb-4">
        <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Balance Trend</h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Monthly income vs expenses overview</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: axisColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: axisColor }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: 'var(--border-card)', strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="Income"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#10b981' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Expenses"
            stroke="#f43f5e"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#f43f5e' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Balance"
            stroke="#6366f1"
            strokeWidth={2}
            strokeDasharray="4 3"
            dot={false}
            activeDot={{ r: 5 }}
          />
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
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}