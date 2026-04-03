import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/insights', icon: Lightbulb, label: 'Insights' },
];

export default function Sidebar() {
  return (
    <aside
      className="fixed top-0 left-0 h-screen w-60 flex-col z-50 hidden lg:flex"
      style={{ backgroundColor: 'var(--sidebar-bg)' }}
    >
      <div className="px-6 py-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--accent)' }}>
            <TrendingUp size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Go<span style={{ color: '#34d399' }}>Financy</span>
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                isActive
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              )
            }
            style={({ isActive }) => isActive ? { backgroundColor: 'var(--accent)' } : {}}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-white/5">
        <p className="text-white/20 text-xs">v1.0.0 · GoFinancy</p>
      </div>
    </aside>
  );
}