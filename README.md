# GoFinancy — Personal Finance Dashboard

A clean, interactive personal finance dashboard built as a frontend centric UI UX professional mindset. GoFinancy helps users track financial activity, understand spending patterns, and manage transactions — with support for role-based access, dark mode, and data export.

---

## 🚀 Live Deployment

> [Website Link](https://go-financy-jd.vercel.app/)

## 🚀 Demo

> [Click to watch the demo](https://youtu.be/w1lbFFnJC-g?si=AZrDy-rj7-9yBAl0)

---

## ✨ Features

### Dashboard (Pulse)
- Summary cards — Total Balance, Income, Expenses, Savings Rate
- Balance trend line chart — monthly income vs expenses vs balance
- Spending breakdown donut chart — by category
- Recent transactions preview with "View all" navigation

### Transactions (Ledger)
- Full transaction list with merchant, category, date, payment mode, amount
- Search by merchant, description, or category
- Filter by category, type (credit/debit), payment mode, and month
- Sort by date or amount (ascending/descending)
- **Admin only:** Add, edit, delete transactions
- Export filtered transactions as CSV or JSON

### Insights (Analytics)
- Summary insight cards — top category, savings rate, spending change, total transactions
- Monthly comparison bar chart with custom date range filter
- Top spending categories with progress bars and percentage breakdown
- Smart observations — auto-generated insights from transaction data

### Role-Based UI
- **Viewer:** Read-only access — can view all data, charts, and insights
- **Admin:** Full access — can add, edit, delete transactions
- Role switcher in the sidebar — no login required, simulated on frontend

### Additional Features
- 🌙 Dark mode — toggle between Light and Dark from the sidebar
- 💾 localStorage persistence — data and role survive page refresh
- 🎞️ Framer Motion animations — page transitions, staggered card reveals, row animations
- 📱 Responsive design — collapsible sidebar on desktop, drawer on mobile
- 🇮🇳 Indian financial context — UPI, Net Banking, ₹ formatting, local merchants

---

## 🛠️ Tech Stack

| Purpose | Tool |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| State Management | Zustand (with persist middleware) |
| Animations | Framer Motion |
| Routing | React Router v6 |
| Icons | Lucide React |
| Date Utilities | date-fns |
| Utilities | clsx |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/        # AppShell, Sidebar, Header, PageWrapper
│   ├── dashboard/     # SummaryCards, BalanceTrend, SpendingBreakdown, RecentTransactions
│   ├── transactions/  # TransactionList, TransactionFilters, TransactionModal, ExportMenu
│   ├── insights/      # InsightCard, MonthlyComparison, TopSpending, SmartObservations
│   └── ui/            # Reusable UI components
├── data/              # Mock transactions, categories, payment modes
├── pages/             # Dashboard, Transactions, Insights
├── store/             # Zustand store — transactions, filters, role, dark mode
├── utils/             # Currency/date formatters, helpers, export utilities
└── styles/            # Global CSS with CSS variable theming
```

The project follows an **MVC-inspired architecture**:
- **Model** — `data/` + `store/` (data shape + state)
- **View** — `components/` + `pages/` (UI)
- **Controller** — `store/` actions + `utils/` (logic + transformations)

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps

```bash
# Clone the repository
git clone https://github.com/jaya6400/go-financy.git
cd go-financy

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎭 Role Switching

The app simulates role-based access on the frontend. Switch roles using the toggle in the sidebar:

| Role | Access |
|---|---|
| **Viewer** | View dashboard, transactions, insights — read only |
| **Admin** | All viewer access + add, edit, delete transactions |

No login or authentication is required — this is a frontend simulation as per the assignment requirements.

---

## 💾 Data Persistence

Transaction data and role preference are saved to `localStorage` using Zustand's `persist` middleware. Data survives page refreshes and browser restarts.

To reset to original mock data:
1. Open DevTools → Application → Local Storage
2. Delete the `go-financy-storage` key
3. Refresh the page

---

## 📊 Mock Data

The app ships with 36 realistic mock transactions spanning January 2023 to April 2026, including:
- Salary credits from JD Tech Private Limited
- Freelance income from client projects
- UPI payments to Swiggy, Zomato, BigBasket
- EMI payments to HDFC Bank
- Utility bills, subscriptions, and more

All amounts are in Indian Rupees (₹). Payment modes include UPI, Card, Net Banking, and Cash.

---

## 🎨 Design Decisions

- **CSS Variables for theming** — all colors defined as CSS custom properties, enabling seamless dark mode without component changes
- **Tailwind for layout, variables for color** — Tailwind handles spacing/sizing, CSS variables handle all theme-aware colors
- **Recharts for data visualization** — chosen for its React-first API and responsive container support
- **Zustand over Redux** — simpler API, less boilerplate, built-in persistence middleware
- **MVC folder structure** — separates data, state, and UI concerns for maintainability
- **Indian context** — category names, merchant names, and currency formatting reflect real Indian financial activity

---

## 🧠 Approach

This was my first time building a full finance dashboard with:
- Date range filtering on charts
- Role-based UI behavior
- localStorage-backed state
- Dark mode via CSS variables

I focused on getting the architecture right first (store, data model, utils) before building UI, which made adding features like export and dark mode straightforward.

---

## 📝 Assignment Requirements Coverage

| Requirement | Status |
|---|---|
| Dashboard overview with summary cards | ✅ |
| Time-based visualization (balance trend) | ✅ |
| Categorical visualization (spending breakdown) | ✅ |
| Transaction list with date, amount, category, type | ✅ |
| Search, filter, sort | ✅ |
| Role-based UI (Admin/Viewer) | ✅ |
| Insights section | ✅ |
| State management (Zustand) | ✅ |
| Responsive design | ✅ |
| Empty state handling | ✅ |
| Dark mode | ✅ (optional enhancement) |
| Data persistence | ✅ (optional enhancement) |
| Export CSV/JSON | ✅ (optional enhancement) |
| Animations | ✅ (optional enhancement) |

---

## 📸 Screenshots

> Analytics of past month
![Analytics](/public/insights.PNG)

> Pulse Dashboard
![Dashboard](/public/Pulse.PNG)

> Add Transaction Card
![Transaction](/public/transactions.PNG)

---

## 👩‍💻 Author

**Jaya Dubey**
- LinkedIn: [linkedin.com/in/jaya6400](https://linkedin.com/in/jaya6400)
- GitHub: [@jaya6400](https://github.com/jaya6400)
- YouTube: [@iam_jd_dev](https://youtube.com/@iam_jd_dev)

---

> Built with React + Vite as a frontend centric focus on UI UX Dashboard development
