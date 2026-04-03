import { format, parseISO } from "date-fns";

// ─── Currency ─────────────────────────────────────────────
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// ─── Date ─────────────────────────────────────────────────
export const formatDate = (dateStr) => {
  return format(parseISO(dateStr), "dd MMM yyyy");       // 02 Mar 2025
};

export const formatMonthYear = (dateStr) => {
  return format(parseISO(dateStr), "MMM yyyy");          // Mar 2025
};

export const formatMonthKey = (dateStr) => {
  return format(parseISO(dateStr), "yyyy-MM");           // 2025-03 (for filters)
};

// ─── Percentage ───────────────────────────────────────────
export const formatPercent = (value) => `${value}%`;