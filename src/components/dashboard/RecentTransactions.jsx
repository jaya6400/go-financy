import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { formatCurrency, formatDate, CATEGORY_COLORS } from '../../utils';
import useFinanceStore from '../../store/useFinanceStore';
import { useNavigate } from 'react-router-dom';

export default function RecentTransactions() {
  const transactions = useFinanceStore((s) => s.transactions);
  const navigate = useNavigate();

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="rounded-2xl p-5 flex flex-col" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-card)' }}>
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Recent Transactions</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Last 5 transactions</p>
        </div>
        <button
          onClick={() => navigate('/transactions')}
          className="text-xs font-semibold"
          style={{ color: 'var(--accent)' }}
        >
          View all →
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {recent.map((txn) => (
          <div
            key={txn.id}
            className="flex items-center justify-between py-1.5"
            style={{ borderBottom: '1px solid var(--border-card)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: txn.type === 'credit' ? '#dcfce7' : '#ffe4e6' }}
              >
                {txn.type === 'credit'
                  ? <ArrowDownLeft size={15} style={{ color: '#059669' }} />
                  : <ArrowUpRight size={15} style={{ color: '#e11d48' }} />
                }
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>{txn.merchant}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{formatDate(txn.date)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold" style={{ color: txn.type === 'credit' ? '#059669' : '#e11d48' }}>
                {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
              </p>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: `${CATEGORY_COLORS[txn.category]}18`,
                  color: CATEGORY_COLORS[txn.category],
                }}
              >
                {txn.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}