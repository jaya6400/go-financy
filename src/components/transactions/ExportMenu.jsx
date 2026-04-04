import { useState, useRef, useEffect } from 'react';
import { Download, FileText, FileJson } from 'lucide-react';
import { exportToCSV, exportToJSON } from '../../utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExportMenu({ transactions }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleExport = (type) => {
    if (type === 'csv') exportToCSV(transactions);
    if (type === 'json') exportToJSON(transactions);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          color: 'var(--text-primary)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <Download size={15} />
        Export
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden z-50"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            }}
          >
            <button
              onClick={() => handleExport('csv')}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors"
              style={{ color: 'var(--text-primary)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-page)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <FileText size={15} style={{ color: '#059669' }} />
              Export as CSV
            </button>
            <div style={{ borderTop: '1px solid var(--border-card)' }} />
            <button
              onClick={() => handleExport('json')}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors"
              style={{ color: 'var(--text-primary)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-page)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <FileJson size={15} style={{ color: '#6366f1' }} />
              Export as JSON
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}