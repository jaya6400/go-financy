import { useState } from 'react';
import { useFinanceStore } from '../../store';
import { Sun, Moon, TrendingUp, ChevronLeft, ChevronRight, X, ChevronUp, ChevronDown, User, Settings, Shield, HelpCircle } from 'lucide-react';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const profileMenuItems = [
  { icon: User, label: 'Account' },
  { icon: Settings, label: 'General' },
  { icon: Shield, label: 'Privacy' },
  { icon: HelpCircle, label: 'Help' },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { role, setRole, darkMode, toggleDarkMode } = useFinanceStore();
  const [profileOpen, setProfileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-y-auto">

      {/* Greeting + collapse button */}
      <div
        className="px-4 pt-5 pb-4 border-b shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-start justify-between gap-2">
          {!collapsed && (
            <div>
              <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {getGreeting()},
              </p>
              <p className="text-base font-bold text-white mt-0.5">Jaya! 👋</p>
            </div>
          )}
          <button
            onClick={collapsed ? onToggle : onToggle}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors shrink-0 hidden lg:flex"
            style={{ color: 'rgba(255,255,255,0.4)', marginLeft: collapsed ? 'auto' : '0' }}
          >
            {collapsed
              ? <ChevronRight size={15} />
              : <ChevronLeft size={15} />
            }
          </button>
          <button
            onClick={onMobileClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors shrink-0 lg:hidden"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Role switcher */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-3 border-b shrink-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Role
          </p>
          <div className="flex rounded-xl p-1" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            {['viewer', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all duration-200"
                style={{
                  backgroundColor: role === r ? 'var(--accent)' : 'transparent',
                  color: role === r ? '#fff' : 'rgba(255,255,255,0.4)',
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Appearance */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-3 border-b shrink-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Appearance
          </p>
          <div className="flex rounded-xl p-1" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            {[
              { label: 'Light', icon: Sun, value: false },
              { label: 'Dark', icon: Moon, value: true },
            ].map(({ label, icon: Icon, value }) => (
              <button
                key={label}
                onClick={() => value !== darkMode && toggleDarkMode()}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
                style={{
                  backgroundColor: darkMode === value ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: darkMode === value ? '#fff' : 'rgba(255,255,255,0.4)',
                }}
              >
                <Icon size={12} />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1" />

      {/* Profile accordion */}
      {profileOpen && !collapsed && (
        <div
          className="mx-3 mb-2 rounded-xl overflow-hidden"
          style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {profileMenuItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-colors hover:bg-white/5"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Profile row */}
      <div className="border-t shrink-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <button
          onClick={() => !collapsed && setProfileOpen((p) => !p)}
          className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors"
        >
          <img
            src="public/avatar.png"
            alt="Jaya"
            className="w-8 h-8 rounded-full shrink-0"
          />
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-bold text-white">Jaya</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {role === 'admin' ? 'Admin Manager' : 'Viewer'}
                </p>
              </div>
              {profileOpen
                ? <ChevronUp size={13} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
                : <ChevronDown size={13} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
              }
            </>
          )}
        </button>
      </div>

      {/* GoFinancy branding */}
      <div
        className="px-4 py-3 border-t shrink-0 flex items-center gap-2.5"
        style={{ borderColor: 'rgba(255,255,255,0.04)' }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <TrendingUp size={14} className="text-white" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <span className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Go<span style={{ color: '#34d399' }}>Financy</span>
          </span>
        )}
      </div>

    </div>
  );

  return (
    <>
      <aside
        className="fixed top-0 left-0 h-screen z-50 hidden lg:flex flex-col transition-all duration-300"
        style={{
          backgroundColor: 'var(--sidebar-bg)',
          width: collapsed ? '60px' : '220px',
        }}
      >
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={onMobileClose}
        />
      )}

      <aside
        className="fixed top-0 left-0 h-screen z-50 flex lg:hidden flex-col transition-transform duration-300"
        style={{
          backgroundColor: 'var(--sidebar-bg)',
          width: '220px',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}