import { CATEGORIES } from "../data";

// ─── Category color map ───────────────────────────────────
// Used by charts + badges consistently across the app
export const CATEGORY_COLORS = {
  [CATEGORIES.FOOD]:          "#f97316",   // orange
  [CATEGORIES.GROCERIES]:     "#84cc16",   // lime
  [CATEGORIES.TRANSPORT]:     "#06b6d4",   // cyan
  [CATEGORIES.SHOPPING]:      "#a855f7",   // purple
  [CATEGORIES.BILLS]:         "#64748b",   // slate
  [CATEGORIES.ENTERTAINMENT]: "#ec4899",   // pink
  [CATEGORIES.HEALTH]:        "#22c55e",   // green
  [CATEGORIES.EDUCATION]:     "#3b82f6",   // blue
  [CATEGORIES.EMI]:           "#ef4444",   // red
  [CATEGORIES.SALARY]:        "#10b981",   // emerald
  [CATEGORIES.FREELANCE]:     "#f59e0b",   // amber
  [CATEGORIES.INVESTMENT]:    "#6366f1",   // indigo
};

// ─── Get unique months from transactions ─────────────────
// Returns ["2025-03", "2025-02", "2025-01"] for filter dropdown
export const getUniqueMonths = (transactions) => {
  const months = transactions.map((txn) => txn.date.slice(0, 7));
  return [...new Set(months)].sort((a, b) => (a > b ? -1 : 1));
};

// ─── Group transactions by category ──────────────────────
// Used by pie chart — returns [{ name, value, color }]
export const groupByCategory = (transactions) => {
  const map = {};
  transactions
    .filter((t) => t.type === "debit")
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });

  return Object.entries(map)
    .map(([name, value]) => ({
      name,
      value,
      color: CATEGORY_COLORS[name] || "#94a3b8",
    }))
    .sort((a, b) => b.value - a.value);
};

// ─── Group transactions by month ─────────────────────────
// Used by bar/line chart — returns [{ month, income, expenses }]
export const groupByMonth = (transactions) => {
  const map = {};

  transactions.forEach((txn) => {
    const month = txn.date.slice(0, 7);   // "2025-03"
    if (!map[month]) map[month] = { month, income: 0, expenses: 0 };

    if (txn.type === "credit") map[month].income += txn.amount;
    else map[month].expenses += txn.amount;
  });

  return Object.values(map).sort((a, b) => (a.month > b.month ? 1 : -1));
};

// ─── Get top spending category ────────────────────────────
export const getTopCategory = (transactions) => {
  const grouped = groupByCategory(transactions);
  return grouped.length > 0 ? grouped[0] : null;
};

// ─── Generate unique ID for new transactions ──────────────
export const generateId = () =>
  `txn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;