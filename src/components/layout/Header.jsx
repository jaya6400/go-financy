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
    <header
      className="h-16 flex items-center justify-between px-6 sticky top-0 z-40"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-card)',
        boxShadow: '0 1px 8px rgba(16,185,129,0.06)',
      }}
    >
      <div>
        <h1 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{page.title}</h1>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{page.subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-1.5"
          style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-card)' }}
        >
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Role:</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="text-xs font-semibold bg-transparent outline-none cursor-pointer"
            style={{ color: 'var(--text-primary)' }}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-muted)' }}
        >
          <Bell size={15} />
        </button>

        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <span className="text-white text-xs font-bold">JD</span>
        </div>
      </div>
    </header>
  );
}