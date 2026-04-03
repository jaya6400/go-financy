import { Search, X } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { CATEGORIES, PAYMENT_MODES } from '../../data';
import { getUniqueMonths } from '../../utils';
import { format, parseISO } from 'date-fns';

export default function TransactionFilters() {
  const { filters, setFilter, resetFilters, transactions } = useFinanceStore();
  const months = getUniqueMonths(transactions);

  const hasActiveFilters =
    filters.search || filters.category !== 'all' ||
    filters.type !== 'all' || filters.paymentMode !== 'all' ||
    filters.month !== 'all';

  const selectClass = "text-xs rounded-lg px-3 py-2 outline-none cursor-pointer font-medium border";
  const selectStyle = {
    backgroundColor: 'var(--bg-card)',
    borderColor: 'var(--border-card)',
    color: 'var(--text-primary)',
  };

  return (
    <div
      className="rounded-2xl p-4 flex flex-wrap gap-3 items-center"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search merchant, category..."
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
          className="w-full text-xs rounded-lg pl-8 pr-3 py-2 outline-none border"
          style={{
            backgroundColor: '#f4fbf7',
            borderColor: 'var(--border-card)',
            color: 'var(--text-primary)',
          }}
        />
      </div>

      {/* Category */}
      <select value={filters.category} onChange={(e) => setFilter('category', e.target.value)} className={selectClass} style={selectStyle}>
        <option value="all">All Categories</option>
        {Object.values(CATEGORIES).map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Type */}
      <select value={filters.type} onChange={(e) => setFilter('type', e.target.value)} className={selectClass} style={selectStyle}>
        <option value="all">All Types</option>
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
      </select>

      {/* Payment Mode */}
      <select value={filters.paymentMode} onChange={(e) => setFilter('paymentMode', e.target.value)} className={selectClass} style={selectStyle}>
        <option value="all">All Modes</option>
        {Object.values(PAYMENT_MODES).map((mode) => (
          <option key={mode} value={mode}>{mode}</option>
        ))}
      </select>

      {/* Month */}
      <select value={filters.month} onChange={(e) => setFilter('month', e.target.value)} className={selectClass} style={selectStyle}>
        <option value="all">All Months</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {format(parseISO(`${m}-01`), 'MMM yyyy')}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={`${filters.sortBy}_${filters.sortOrder}`}
        onChange={(e) => {
          const [sortBy, sortOrder] = e.target.value.split('_');
          setFilter('sortBy', sortBy);
          setFilter('sortOrder', sortOrder);
        }}
        className={selectClass}
        style={selectStyle}
      >
        <option value="date_desc">Newest First</option>
        <option value="date_asc">Oldest First</option>
        <option value="amount_desc">Highest Amount</option>
        <option value="amount_asc">Lowest Amount</option>
      </select>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg"
          style={{ backgroundColor: '#fee2e2', color: '#e11d48' }}
        >
          <X size={13} />
          Reset
        </button>
      )}
    </div>
  );
}