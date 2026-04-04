import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { groupByMonth, formatCurrency } from '../../utils';
import useFinanceStore from '../../store/useFinanceStore';
import { format, parseISO, isWithinInterval } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#0a1628', color: '#fff', padding: '8px 12px', borderRadius: '12px', fontSize: '12px' }}>
        <p style={{ fontWeight: 600, marginBottom: 4 }}>{label}</p>
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
  const darkMode = useFinanceStore((s) => s.darkMode);

  const allDates = transactions.map((t) => t.date).sort();
  const minDate = allDates[0] || '2025-01-01';
  const maxDate = allDates[allDates.length - 1] || new Date().toISOString().slice(0, 10);

  const [fromDate, setFromDate] = useState(minDate);
  const [toDate, setToDate] = useState(maxDate);

  const filtered = transactions.filter((t) => {
    try {
      return isWithinInterval(parseISO(t.date), {
        start: parseISO(fromDate),
        end: parseISO(toDate),
      });
    } catch {
      return true;
    }
  });

  const monthly = groupByMonth(filtered);

  const data = monthly.map((m) => ({
    month: format(parseISO(`${m.month}-01`), 'MMM yy'),
    Income: m.income,
    Expenses: m.expenses,
    Savings: m.income - m.expenses,
  }));

  const gridColor = darkMode ? '#21262d' : '#e6f4ed';
  const axisColor = darkMode ? '#7d8590' : '#6b7f74';

  const inputStyle = {
    backgroundColor: 'var(--bg-page)',
    border: '1px solid var(--border-card)',
    color: 'var(--text-primary)',
    borderRadius: '8px',
    padding: '5px 10px',
    fontSize: '12px',
    outline: 'none',
  };

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Monthly Comparison</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Income vs expenses vs savings</p>
        </div>

        {/* Date range */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={inputStyle}
          />
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>to</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={inputStyle}
          />
          <button
            onClick={() => { setFromDate(minDate); setToDate(maxDate); }}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg"
            style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-card)', color: 'var(--text-muted)' }}
          >
            Reset
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No data for selected range</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Income" fill="#059669" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Expenses" fill="#e11d48" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Savings" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}

      <div className="flex items-center gap-4 mt-3 justify-center">
        {[
          { label: 'Income', color: '#059669' },
          { label: 'Expenses', color: '#e11d48' },
          { label: 'Savings', color: '#6366f1' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}