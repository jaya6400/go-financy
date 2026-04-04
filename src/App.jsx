import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppShell, PageWrapper } from './components/layout';
import { Dashboard, Transactions, Insights } from './pages';
import useFinanceStore from './store/useFinanceStore';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/transactions" element={<PageWrapper><Transactions /></PageWrapper>} />
          <Route path="/insights" element={<PageWrapper><Insights /></PageWrapper>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const darkMode = useFinanceStore((s) => s.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}