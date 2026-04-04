import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockTransactions } from "../data";

// ─── Initial Filter State ──────────────────────────────────
// Kept separate so we can reset filters easily anytime
const initialFilters = {
  search: "",
  category: "all",
  type: "all",         // "all" | "credit" | "debit"
  paymentMode: "all",
  month: "all",        // "all" | "2025-03" | "2025-02" etc
  sortBy: "date",      // "date" | "amount"
  sortOrder: "desc",   // "asc" | "desc"
};

const useFinanceStore = create(
  persist(
    (set, get) => ({

      // ─── State ──────────────────────────────────────────
      transactions: mockTransactions,
      filters: initialFilters,
      role: "viewer",   // "viewer" | "admin"
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // ─── Role Actions ────────────────────────────────────
      setRole: (role) => set({ role }),

      // ─── Filter Actions ──────────────────────────────────
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      resetFilters: () => set({ filters: initialFilters }),

      // ─── Transaction Actions (admin only) ────────────────
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),

      editTransaction: (id, updatedData) =>
        set((state) => ({
          transactions: state.transactions.map((txn) =>
            txn.id === id ? { ...txn, ...updatedData } : txn
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((txn) => txn.id !== id),
        })),

      // ─── Derived / Computed (getter functions) ────────────
      // These are functions, not state — computed on demand
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let result = [...transactions];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          result = result.filter(
            (txn) =>
              txn.description.toLowerCase().includes(q) ||
              txn.merchant.toLowerCase().includes(q) ||
              txn.category.toLowerCase().includes(q)
          );
        }

        if (filters.category !== "all")
          result = result.filter((txn) => txn.category === filters.category);

        if (filters.type !== "all")
          result = result.filter((txn) => txn.type === filters.type);

        if (filters.paymentMode !== "all")
          result = result.filter((txn) => txn.paymentMode === filters.paymentMode);

        if (filters.month !== "all")
          result = result.filter((txn) => txn.date.startsWith(filters.month));

        result.sort((a, b) => {
          if (filters.sortBy === "amount") {
            return filters.sortOrder === "asc"
              ? a.amount - b.amount
              : b.amount - a.amount;
          }
          // default: sort by date
          return filters.sortOrder === "asc"
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        });

        return result;
      },

      getSummary: () => {
        const { transactions } = get();
        const totalIncome = transactions
          .filter((t) => t.type === "credit")
          .reduce((sum, t) => sum + t.amount, 0);

        const totalExpenses = transactions
          .filter((t) => t.type === "debit")
          .reduce((sum, t) => sum + t.amount, 0);

        const balance = totalIncome - totalExpenses;
        const savingsRate =
          totalIncome > 0
            ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
            : 0;

        return { totalIncome, totalExpenses, balance, savingsRate };
      },

    }),
    {
      name: "go-financy-storage",   // localStorage key
      partialState: (state) => ({
        transactions: state.transactions,
        role: state.role,
        darkMode: state.darkMode,
      }),
    }
  )
);

export default useFinanceStore;