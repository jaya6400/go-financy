import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TransactionFilters, TransactionList, TransactionModal, ExportMenu } from '../components/transactions';
import useFinanceStore from '../store/useFinanceStore';

export default function Transactions() {
  const { role, getFilteredTransactions } = useFinanceStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (txn) => {
    setEditData(txn);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const filteredTransactions = getFilteredTransactions();

  return (
    <div className="flex flex-col gap-4">

      <div className="flex items-center justify-between">
        <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          Manage and explore your financial activity
        </p>
        <div className="flex items-center gap-2">
          <ExportMenu transactions={filteredTransactions} />
          {role === 'admin' && (
            <button
              onClick={() => { setEditData(null); setModalOpen(true); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <Plus size={16} />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      <TransactionFilters />
      <TransactionList onEdit={handleEdit} />
      <TransactionModal isOpen={modalOpen} onClose={handleClose} editData={editData} />

    </div>
  );
}