import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils';
import { CATEGORY_COLORS } from '../../utils';
import useFinanceStore from '../../store/useFinanceStore';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export default function RecentTransactions() {
  const transactions = useFinanceStore((s) => s.transactions);
  const navigate = useNavigate();

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Recent Transactions</h2>
          <p className="text-xs text-slate-400 mt-0.5">Last 5 transactions</p>
        </div>
        <button
          onClick={() => navigate('/transactions')}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
        >
          View all →
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {recent.map((txn) => (
          <div key={txn.id} className="flex items-center justify-between">
            {/* Icon + info */}
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
                  txn.type === 'credit' ? 'bg-emerald-50' : 'bg-rose-50'
                )}
              >
                {txn.type === 'credit'
                  ? <ArrowDownLeft size={16} className="text-emerald-600" />
                  : <ArrowUpRight size={16} className="text-rose-500" />
                }
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 leading-tight">{txn.merchant}</p>
                <p className="text-xs text-slate-400">{formatDate(txn.date)}</p>
              </div>
            </div>

            {/* Amount + category */}
            <div className="text-right">
              <p className={clsx(
                'text-sm font-bold',
                txn.type === 'credit' ? 'text-emerald-600' : 'text-rose-500'
              )}>
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