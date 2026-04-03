import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils';
import useFinanceStore from '../../store/useFinanceStore';
import clsx from 'clsx';

const cards = [
  {
    key: 'balance',
    label: 'Total Balance',
    icon: Wallet,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    valueColor: 'text-slate-900',
  },
  {
    key: 'totalIncome',
    label: 'Total Income',
    icon: TrendingUp,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    valueColor: 'text-emerald-600',
  },
  {
    key: 'totalExpenses',
    label: 'Total Expenses',
    icon: TrendingDown,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    valueColor: 'text-rose-600',
  },
  {
    key: 'savingsRate',
    label: 'Savings Rate',
    icon: PiggyBank,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    valueColor: 'text-slate-900',
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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(({ key, label, icon: Icon, iconBg, iconColor, valueColor }) => (
        <div
          key={key}
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* Top row */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">{label}</span>
            <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center', iconBg)}>
              <Icon size={18} className={iconColor} />
            </div>
          </div>

          {/* Value */}
          <p className={clsx('text-2xl font-bold tracking-tight', valueColor)}>
            {getValue(key)}
          </p>

          {/* Subtext */}
          <p className="text-xs text-slate-400 mt-1">{getSubtext(key)}</p>
        </div>
      ))}
    </div>
  );
}