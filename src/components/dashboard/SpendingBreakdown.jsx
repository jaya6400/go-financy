import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { groupByCategory, formatCurrency } from "../../utils";
import useFinanceStore from "../../store/useFinanceStore";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "#0a1628",
          color: "#fff",
          padding: "8px 12px",
          borderRadius: "12px",
          fontSize: "12px",
        }}
      >
        <p style={{ fontWeight: 600 }}>{d.name}</p>
        <p style={{ color: "#94a3b8" }}>{formatCurrency(d.value)}</p>
      </div>
    );
  }
  return null;
};

export default function SpendingBreakdown() {
  const transactions = useFinanceStore((s) => s.transactions);
  const data = groupByCategory(transactions);
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const darkMode = useFinanceStore((s) => s.darkMode);

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="mb-2">
        <h2
          className="text-sm font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Spending Breakdown
        </h2>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
          Expenses by category
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)' }}>
       <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} cursor={false} />
          </PieChart>
       </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {data.slice(0, 4).map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span
                className="text-xs truncate max-w-28"
                style={{ color: "var(--text-primary)" }}
              >
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className="text-xs font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {formatCurrency(item.value)}
              </span>
              <span
                className="text-xs w-8 text-right"
                style={{ color: "var(--text-muted)" }}
              >
                {total > 0
                  ? `${Math.round((item.value / total) * 100)}%`
                  : "0%"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
