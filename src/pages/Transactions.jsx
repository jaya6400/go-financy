import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TransactionFilters, TransactionList, TransactionModal } from '../components/transactions';
import useFinanceStore from '../store/useFinanceStore';

export default function Transactions() {
  const { role } = useFinanceStore();
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

  return (
    <div className="flex flex-col gap-4">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            Manage and explore your financial activity
          </p>
        </div>
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

      {/* Filters */}
      <TransactionFilters />

      {/* List */}
      <TransactionList onEdit={handleEdit} />

      {/* Modal */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={handleClose}
        editData={editData}
      />

    </div>
  );
}