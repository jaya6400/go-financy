import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { groupByCategory } from '../../utils';
import { formatCurrency } from '../../utils';
import useFinanceStore from '../../store/useFinanceStore';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs shadow-lg">
        <p className="font-semibold">{d.name}</p>
        <p className="text-slate-300">{formatCurrency(d.value)}</p>
      </div>
    );
  }
  return null;
};

export default function SpendingBreakdown() {
  const transactions = useFinanceStore((s) => s.transactions);
  const data = groupByCategory(transactions);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-slate-900">Spending Breakdown</h2>
        <p className="text-xs text-slate-400 mt-0.5">Expenses by category</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Category list */}
      <div className="flex flex-col gap-2 mt-2">
        {data.slice(0, 5).map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-slate-600">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-800">{formatCurrency(item.value)}</span>
              <span className="text-xs text-slate-400">
                {total > 0 ? `${Math.round((item.value / total) * 100)}%` : '0%'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}