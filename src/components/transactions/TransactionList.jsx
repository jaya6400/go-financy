import { formatCurrency, formatDate, CATEGORY_COLORS } from '../../utils';
import { ArrowUpRight, ArrowDownLeft, Edit2, Trash2, ArrowLeftRight } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import clsx from 'clsx';

export default function TransactionList({ onEdit }) {
  const { role, deleteTransaction, getFilteredTransactions } = useFinanceStore();
  const transactions = getFilteredTransactions();

  if (transactions.length === 0) {
    return (
      <div
        className="rounded-2xl p-12 flex flex-col items-center justify-center gap-3"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#f0faf4' }}>
          <ArrowLeftRight size={24} style={{ color: 'var(--text-muted)' }} />
        </div>
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>No transactions found</p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Table header */}
      <div
        className="grid grid-cols-12 px-5 py-3 text-xs font-semibold uppercase tracking-wider"
        style={{
          backgroundColor: '#f0faf4',
          color: 'var(--text-muted)',
          borderBottom: '1px solid var(--border-card)',
        }}
      >
        <div className="col-span-4">Merchant / Description</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-1">Mode</div>
        <div className="col-span-2 text-right">Amount</div>
        {role === 'admin' && <div className="col-span-1 text-right">Actions</div>}
      </div>

      {/* Rows */}
      <div className="divide-y" style={{ borderColor: 'var(--border-card)' }}>
        {transactions.map((txn) => (
          <div
            key={txn.id}
            className="grid grid-cols-12 px-5 py-3.5 items-center hover:bg-emerald-50/40 transition-colors"
          >
            {/* Merchant */}
            <div className="col-span-4 flex items-center gap-3">
              <div
                className={clsx(
                  'w-8 h-8 rounded-xl flex items-center justify-center shrink-0'
                )}
                style={{
                  backgroundColor: txn.type === 'credit' ? '#dcfce7' : '#ffe4e6',
                }}
              >
                {txn.type === 'credit'
                  ? <ArrowDownLeft size={14} style={{ color: '#059669' }} />
                  : <ArrowUpRight size={14} style={{ color: '#e11d48' }} />
                }
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                  {txn.merchant}
                </p>
                <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                  {txn.description}
                </p>
              </div>
            </div>

            {/* Category */}
            <div className="col-span-2">
              <span
                className="text-xs px-2 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: `${CATEGORY_COLORS[txn.category]}18`,
                  color: CATEGORY_COLORS[txn.category],
                }}
              >
                {txn.category}
              </span>
            </div>

            {/* Date */}
            <div className="col-span-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              {formatDate(txn.date)}
            </div>

            {/* Mode */}
            <div className="col-span-1 text-xs" style={{ color: 'var(--text-muted)' }}>
              {txn.paymentMode}
            </div>

            {/* Amount */}
            <div className="col-span-2 text-right">
              <span
                className="text-sm font-bold"
                style={{ color: txn.type === 'credit' ? '#059669' : '#e11d48' }}
              >
                {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
              </span>
            </div>

            {/* Admin actions */}
            {role === 'admin' && (
              <div className="col-span-1 flex items-center justify-end gap-1">
                <button
                  onClick={() => onEdit(txn)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
                  style={{ color: '#3b82f6' }}
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => deleteTransaction(txn.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-rose-50 transition-colors"
                  style={{ color: '#e11d48' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{
          borderTop: '1px solid var(--border-card)',
          backgroundColor: '#f0faf4',
        }}
      >
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Showing <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{transactions.length}</span> transactions
        </p>
      </div>
    </div>
  );
}