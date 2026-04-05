import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 64 : 240;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div style={{ width: sidebarWidth, flexShrink: 0, transition: 'width 0.3s' }} className="hidden lg:block" />
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((p) => !p)} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto" style={{ padding: '28px 32px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}