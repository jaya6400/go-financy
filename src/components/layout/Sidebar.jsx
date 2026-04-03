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
    <aside className="fixed top-0 left-0 h-screen w-60 bg-slate-900 flex flex-col z-50">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <TrendingUp size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Go<span className="text-emerald-400">Financy</span>
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                isActive
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-800">
        <p className="text-slate-500 text-xs">v1.0.0 · GoFinancy</p>
      </div>
    </aside>
  );
}