import { useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';

const PAGE_TITLES = {
  '/dashboard': { title: 'Overview', subtitle: 'Your financial summary at a glance' },
  '/transactions': { title: 'Transactions', subtitle: 'Track every rupee in and out' },
  '/insights': { title: 'Insights', subtitle: 'Understand your spending patterns' },
};

export default function Header() {
  const location = useLocation();
  const { role, setRole } = useFinanceStore();
  const page = PAGE_TITLES[location.pathname] || { title: 'GoFinancy', subtitle: '' };

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-40">

      {/* Page title */}
      <div>
        <h1 className="text-base font-bold text-slate-900">{page.title}</h1>
        <p className="text-xs text-slate-400">{page.subtitle}</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">

        {/* Role switcher */}
        <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5">
          <span className="text-xs text-slate-500 font-medium">Role:</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="text-xs font-semibold text-slate-800 bg-transparent outline-none cursor-pointer"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Notification bell */}
        <button className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
          <Bell size={15} />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold">JD</span>
        </div>

      </div>
    </header>
  );
}