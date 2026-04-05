import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp,
  ChevronLeft, ChevronRight, Settings, LogOut, ChevronUp, ChevronDown, Moon
} from 'lucide-react';
import clsx from 'clsx';
import useFinanceStore from '../../store/useFinanceStore';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/insights', icon: Lightbulb, label: 'Insights' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useFinanceStore();

  return (
    <aside
      className="fixed top-0 left-0 h-screen flex-col z-50 hidden lg:flex transition-all duration-300"
      style={{
        backgroundColor: 'var(--sidebar-bg)',
        width: collapsed ? '64px' : '240px',
      }}
    >
      {/* Logo + collapse */}
      <div
        className="flex items-center justify-between px-4 py-5 border-b shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        {!collapsed ? (
          <>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                <TrendingUp size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Go<span style={{ color: '#34d399' }}>Financy</span>
              </span>
            </div>
            <button
              onClick={onToggle}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              <ChevronLeft size={15} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 w-full">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <TrendingUp size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <button
              onClick={onToggle}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-5 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              clsx(
                'flex items-center rounded-xl text-sm font-medium transition-all',
                collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5',
                isActive
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              )
            }
            style={({ isActive }) => isActive ? { backgroundColor: 'var(--accent)' } : {}}
          >
            <Icon size={18} />
            {!collapsed && label}
          </NavLink>
        ))}

        {/* Dark mode toggle row */}
        {!collapsed ? (
          <div
            className="flex items-center justify-between px-3 py-2.5 rounded-xl mt-2"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
          >
            <div className="flex items-center gap-3">
              <Moon size={18} style={{ color: 'rgba(255,255,255,0.4)' }} />
              <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Dark mode
              </span>
            </div>
            <button
              onClick={toggleDarkMode}
              className="relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none shrink-0"
              style={{ backgroundColor: darkMode ? 'var(--accent)' : 'rgba(255,255,255,0.15)' }}
            >
              <span
                className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300"
                style={{ transform: darkMode ? 'translateX(20px)' : 'translateX(0)' }}
              />
            </button>
          </div>
        ) : (
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center py-2.5 rounded-xl hover:bg-white/5 transition-colors"
            title="Toggle dark mode"
          >
            <Moon size={18} style={{ color: darkMode ? 'var(--accent)' : 'rgba(255,255,255,0.4)' }} />
          </button>
        )}
      </nav>

      {/* Profile section */}
      <div
        className="shrink-0 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        {profileOpen && !collapsed && (
          <div className="px-2 pt-2 flex flex-col gap-1">
            <button
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left hover:bg-white/5 transition-colors"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              <Settings size={16} />
              Settings
            </button>
            <button
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left hover:bg-white/5 transition-colors"
              style={{ color: '#f87171' }}
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        )}

        {!collapsed ? (
          <button
            onClick={() => setProfileOpen((p) => !p)}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-white/5 transition-colors"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <span className="text-white text-xs font-bold">JD</span>
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-semibold text-white truncate">Jaya Dubey</p>
              <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>Admin Manager</p>
            </div>
            {profileOpen
              ? <ChevronUp size={14} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
              : <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
            }
          </button>
        ) : (
          <button
            onClick={() => setProfileOpen((p) => !p)}
            className="w-full flex items-center justify-center py-4 hover:bg-white/5 transition-colors"
            title="Jaya Dubey"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <span className="text-white text-xs font-bold">JD</span>
            </div>
          </button>
        )}
      </div>
    </aside>
  );
}