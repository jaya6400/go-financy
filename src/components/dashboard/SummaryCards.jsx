import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils';
import useFinanceStore from '../../store/useFinanceStore';

const cards = [
  {
    key: 'balance',
    label: 'Total Balance',
    icon: Wallet,
    iconBg: '#dcfce7',
    iconColor: '#059669',
    valueColor: '#0d1f14',
    accentColor: '#059669',
  },
  {
    key: 'totalIncome',
    label: 'Total Income',
    icon: TrendingUp,
    iconBg: '#dbeafe',
    iconColor: '#2563eb',
    valueColor: '#059669',
    accentColor: '#2563eb',
  },
  {
    key: 'totalExpenses',
    label: 'Total Expenses',
    icon: TrendingDown,
    iconBg: '#ffe4e6',
    iconColor: '#e11d48',
    valueColor: '#e11d48',
    accentColor: '#e11d48',
  },
  {
    key: 'savingsRate',
    label: 'Savings Rate',
    icon: PiggyBank,
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    valueColor: '#0d1f14',
    accentColor: '#d97706',
  },
];

export default function SummaryCards() {
  const getSummary = useFinanceStore((s) => s.getSummary);
  const summary = getSummary();

  const getValue = (key) => {
    if (key === 'savingsRate') return formatPercent(summary.savingsRate);
    return formatCurrency(summary[key]);
  };

  const getSubtext = (key) => {
    if (key === 'balance') return 'Net across all time';
    if (key === 'totalIncome') return 'Credits across all time';
    if (key === 'totalExpenses') return 'Debits across all time';
    if (key === 'savingsRate') {
      const rate = summary.savingsRate;
      if (rate >= 30) return '🎯 Excellent saving habit';
      if (rate >= 15) return '👍 Good, keep it up';
      return '⚠️ Try to save more';
    }
  };

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map(({ key, label, icon: Icon, iconBg, iconColor, valueColor, accentColor }) => (
        <div
          key={key}
          className="rounded-2xl p-5 hover:-translate-y-0.5 cursor-default"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            boxShadow: 'var(--shadow-card)',
            borderLeft: `4px solid ${accentColor}`,
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-card)'}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              {label}
            </span>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: iconBg }}>
              <Icon size={20} style={{ color: iconColor }} />
            </div>
          </div>
          <p className="text-2xl font-extrabold tracking-tight" style={{ color: valueColor }}>
            {getValue(key)}
          </p>
          <p className="text-xs mt-1.5 font-medium" style={{ color: 'var(--text-muted)' }}>
            {getSubtext(key)}
          </p>
        </div>
      ))}
    </div>
  );
}