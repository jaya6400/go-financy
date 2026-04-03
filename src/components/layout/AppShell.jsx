import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#f4fbf7' }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden" style={{ marginLeft: '240px' }}>
        <Header />
        <main className="flex-1 overflow-y-auto" style={{ padding: '24px 28px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}