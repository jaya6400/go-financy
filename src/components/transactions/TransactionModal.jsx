import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES, PAYMENT_MODES, TRANSACTION_TYPES, createTransaction } from '../../data';
import { generateId } from '../../utils';
import useFinanceStore from '../../store/useFinanceStore';

const defaultForm = {
  merchant: '',
  description: '',
  amount: '',
  type: TRANSACTION_TYPES.DEBIT,
  category: CATEGORIES.FOOD,
  paymentMode: PAYMENT_MODES.UPI,
  date: new Date().toISOString().slice(0, 10),
};

export default function TransactionModal({ isOpen, onClose, editData }) {
  const { addTransaction, editTransaction } = useFinanceStore();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm({
        merchant: editData.merchant,
        description: editData.description,
        amount: String(editData.amount),
        type: editData.type,
        category: editData.category,
        paymentMode: editData.paymentMode,
        date: editData.date,
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [editData, isOpen]);

  const validate = () => {
    const e = {};
    if (!form.merchant.trim()) e.merchant = 'Merchant is required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid amount';
    if (!form.date) e.date = 'Date is required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    const txn = createTransaction({
      id: editData ? editData.id : generateId(),
      merchant: form.merchant.trim(),
      description: form.description.trim(),
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      paymentMode: form.paymentMode,
      date: form.date,
    });

    if (editData) {
      editTransaction(editData.id, txn);
    } else {
      addTransaction(txn);
    }
    onClose();
  };

  // Uses CSS variables — works in both light and dark mode
  const inputStyle = {
    backgroundColor: 'var(--bg-page)',
    border: '1px solid var(--border-card)',
    color: 'var(--text-primary)',
    borderRadius: '10px',
    padding: '8px 12px',
    fontSize: '13px',
    width: '100%',
    outline: 'none',
  };

  const labelStyle = {
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: '6px',
    display: 'block',
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="card w-full max-w-md p-6 flex flex-col gap-4"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
            {editData ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-page)',
              border: '1px solid var(--border-card)',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Type toggle */}
        <div
          className="card p-5 flex rounded-xl overflow-hidden"
        >
          {[TRANSACTION_TYPES.DEBIT, TRANSACTION_TYPES.CREDIT].map((t) => (
            <button
              key={t}
              onClick={() => setForm((f) => ({ ...f, type: t }))}
              className="flex-1 py-2.5 text-xs font-bold capitalize transition-colors"
              style={{
                backgroundColor: form.type === t
                  ? t === 'credit' ? '#059669' : '#e11d48'
                  : 'transparent',
                color: form.type === t ? '#fff' : 'var(--text-muted)',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Form grid */}
        <div className="grid grid-cols-2 gap-3">

          {/* Merchant */}
          <div className="col-span-2">
            <label style={labelStyle}>Merchant</label>
            <input
              style={{
                ...inputStyle,
                borderColor: errors.merchant ? '#e11d48' : 'var(--border-card)',
              }}
              placeholder="e.g. Swiggy"
              value={form.merchant}
              onChange={(e) => setForm((f) => ({ ...f, merchant: e.target.value }))}
            />
            {errors.merchant && (
              <p className="text-xs mt-1" style={{ color: '#e11d48' }}>{errors.merchant}</p>
            )}
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label style={labelStyle}>Description</label>
            <input
              style={inputStyle}
              placeholder="e.g. Dinner order"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>

          {/* Amount */}
          <div>
            <label style={labelStyle}>Amount (₹)</label>
            <input
              style={{
                ...inputStyle,
                borderColor: errors.amount ? '#e11d48' : 'var(--border-card)',
              }}
              type="number"
              placeholder="0"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            />
            {errors.amount && (
              <p className="text-xs mt-1" style={{ color: '#e11d48' }}>{errors.amount}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label style={labelStyle}>Date</label>
            <input
              style={{
                ...inputStyle,
                borderColor: errors.date ? '#e11d48' : 'var(--border-card)',
                colorScheme: 'dark light',
              }}
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            />
            {errors.date && (
              <p className="text-xs mt-1" style={{ color: '#e11d48' }}>{errors.date}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label style={labelStyle}>Category</label>
            <select
              style={inputStyle}
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            >
              {Object.values(CATEGORIES).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Payment mode */}
          <div>
            <label style={labelStyle}>Payment Mode</label>
            <select
              style={inputStyle}
              value={form.paymentMode}
              onChange={(e) => setForm((f) => ({ ...f, paymentMode: e.target.value }))}
            >
              {Object.values(PAYMENT_MODES).map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            style={{
              backgroundColor: 'var(--bg-page)',
              border: '1px solid var(--border-card)',
              color: 'var(--text-muted)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-colors"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {editData ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}