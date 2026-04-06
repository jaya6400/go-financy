import { useLocation, NavLink } from "react-router-dom";
import { Activity, List, BarChart3, Bell, Menu } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/dashboard", label: "Pulse", icon: Activity },
  { to: "/transactions", label: "Ledger", icon: List },
  { to: "/insights", label: "Analytics", icon: BarChart3 },
];

export default function Header({ onMobileMenuOpen }) {
  const location = useLocation();

  return (
    <header
      className="h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40 shrink-0"
      style={{
        backgroundColor: "var(--bg-card)",
        borderBottom: "1px solid var(--border-card)",
        boxShadow: "0 1px 8px rgba(16,185,129,0.06)",
      }}
    >
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMobileMenuOpen}
          className="w-8 h-8 rounded-lg flex items-center justify-center lg:hidden"
          style={{
            backgroundColor: "var(--bg-page)",
            border: "1px solid var(--border-card)",
            color: "var(--text-muted)",
          }}
        >
          <Menu size={16} />
        </button>

        {/* Animated pill nav */}
        <nav>
          <div
            className="flex items-center rounded-xl p-1 gap-1 overflow-x-auto"
            style={{ backgroundColor: "var(--bg-page)" }}
          >
            {navItems.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <NavLink
                  key={to}
                  to={to}
                  className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold z-10 transition-colors duration-200 whitespace-nowrap shrink-0"
                  style={{ color: isActive ? "#fff" : "var(--text-muted)" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-lg z-[-1]"
                      style={{ backgroundColor: "var(--accent)" }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon size={14} />
                  {label}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Right */}
      <button
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{
          backgroundColor: "var(--bg-page)",
          border: "1px solid var(--border-card)",
          color: "var(--text-muted)",
        }}
      >
        <Bell size={15} />
      </button>
    </header>
  );
}
