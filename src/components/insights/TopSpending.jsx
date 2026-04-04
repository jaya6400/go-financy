import { groupByCategory, formatCurrency } from '../../utils';
import useFinanceStore from '../../store/useFinanceStore';

export default function TopSpending() {
  const transactions = useFinanceStore((s) => s.transactions);
  const data = groupByCategory(transactions);
  const total = data.reduce((sum, d) => sum + d.value, 0);

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
        <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Top Spending Categories</h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Where your money is going</p>
      </div>

      <div className="flex flex-col gap-3">
        {data.slice(0, 6).map((item, index) => {
          const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                    {formatCurrency(item.value)}
                  </span>
                  <span className="text-xs w-8 text-right" style={{ color: 'var(--text-muted)' }}>
                    {percent}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: '#e6f4ed' }}>
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}