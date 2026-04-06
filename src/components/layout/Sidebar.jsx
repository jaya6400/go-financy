import { useState } from "react";
import { useFinanceStore } from "../../store";
import {
  Sun,
  Moon,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
  ChevronUp,
  ChevronDown,
  User,
  Settings,
  Shield,
  HelpCircle,
} from "lucide-react";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const profileMenuItems = [
  { icon: User, label: "Account" },
  { icon: Settings, label: "General" },
  { icon: Shield, label: "Privacy" },
  { icon: HelpCircle, label: "Help" },
];

// Consistent color tokens for sidebar text
const SIDEBAR_LABEL = "rgba(255,255,255,0.55)";
const SIDEBAR_INACTIVE = "rgba(255,255,255,0.65)";
const SIDEBAR_BORDER = "rgba(255,255,255,0.08)";
const SIDEBAR_SURFACE = "rgba(255,255,255,0.07)";

export default function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}) {
  const { role, setRole, darkMode, toggleDarkMode } = useFinanceStore();
  const [profileOpen, setProfileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Greeting + collapse button */}
      <div
        className="px-4 pt-5 pb-4 border-b shrink-0"
        style={{ borderColor: SIDEBAR_BORDER }}
      >
        <div className="flex items-start justify-between gap-2">
          {!collapsed && (
            <div>
              <p
                className="text-xs font-semibold"
                style={{ color: SIDEBAR_LABEL }}
              >
                {getGreeting()},
              </p>
              <p className="text-base font-bold text-white mt-0.5">Jaya! 👋</p>
            </div>
          )}
          {/* Desktop collapse */}
          <button
            onClick={onToggle}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors shrink-0 hidden lg:flex"
            style={{
              color: SIDEBAR_INACTIVE,
              marginLeft: collapsed ? "auto" : "0",
            }}
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
          {/* Mobile close */}
          <button
            onClick={onMobileClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors shrink-0 lg:hidden"
            style={{ color: SIDEBAR_INACTIVE }}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Role switcher */}
      {!collapsed && (
        <div
          className="px-4 pt-4 pb-4 border-b shrink-0"
          style={{ borderColor: SIDEBAR_BORDER }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: SIDEBAR_LABEL }}
          >
            Role
          </p>
          <div
            className="flex rounded-xl p-1"
            style={{ backgroundColor: SIDEBAR_SURFACE }}
          >
            {["viewer", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all duration-200"
                style={{
                  backgroundColor: role === r ? "var(--accent)" : "transparent",
                  color: role === r ? "#fff" : SIDEBAR_INACTIVE,
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
        <div
          className="px-4 pt-4 pb-4 border-b shrink-0"
          style={{ borderColor: SIDEBAR_BORDER }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: SIDEBAR_LABEL }}
          >
            Appearance
          </p>
          <div
            className="flex rounded-xl p-1"
            style={{ backgroundColor: SIDEBAR_SURFACE }}
          >
            {[
              { label: "Light", icon: Sun, value: false },
              { label: "Dark", icon: Moon, value: true },
            ].map(({ label, icon: Icon, value }) => (
              <button
                key={label}
                onClick={() => value !== darkMode && toggleDarkMode()}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all duration-200"
                style={{
                  backgroundColor:
                    darkMode === value
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                  color: darkMode === value ? "#fff" : SIDEBAR_INACTIVE,
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

      {/* Profile accordion menu */}
      {profileOpen && !collapsed && (
        <div className="sidebar-accordion mx-3 mb-2">
          {profileMenuItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="sidebar-accordion w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold transition-colors"
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Profile row */}
      <div
        className="border-t shrink-0"
        style={{ borderColor: SIDEBAR_BORDER }}
      >
        <button
          onClick={() => !collapsed && setProfileOpen((p) => !p)}
          className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors"
        >
          <img
            src="/avatar.png"
            alt="Jaya"
            className="w-8 h-8 rounded-full shrink-0 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://ui-avatars.com/api/?name=Jaya+Dubey&background=059669&color=fff&size=64&bold=true&rounded=true";
            }}
          />
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-bold text-white">Jaya</p>
                <p
                  className="text-xs font-medium"
                  style={{ color: SIDEBAR_LABEL }}
                >
                  {role === "admin" ? "Owner" : "Viewer"}
                </p>
              </div>
              {profileOpen ? (
                <ChevronUp
                  size={13}
                  style={{ color: SIDEBAR_LABEL, flexShrink: 0 }}
                />
              ) : (
                <ChevronDown
                  size={13}
                  style={{ color: SIDEBAR_LABEL, flexShrink: 0 }}
                />
              )}
            </>
          )}
        </button>
      </div>

      {/* GoFinancy branding */}
      <div
        className="px-4 py-3 border-t shrink-0 flex items-center gap-2.5"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <TrendingUp size={14} className="text-white" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <span
            className="text-sm font-bold"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Go<span style={{ color: "#34d399" }}>Financy</span>
          </span>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="fixed top-0 left-0 h-screen z-50 hidden lg:flex flex-col transition-all duration-300"
        style={{
          backgroundColor: "var(--sidebar-bg)",
          width: collapsed ? "60px" : "220px",
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={onMobileClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className="fixed top-0 left-0 h-screen z-50 flex lg:hidden flex-col transition-transform duration-300"
        style={{
          backgroundColor: "var(--sidebar-bg)",
          width: "220px",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
