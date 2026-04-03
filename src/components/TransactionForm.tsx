import React, { useState, useEffect, FormEvent } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { categories, Transaction } from '../data/mockData';

interface TransactionFormProps {
  existingTx?: Transaction | null;
  onClose: () => void;
}

export default function TransactionForm({ existingTx, onClose }: TransactionFormProps) {
  const { dispatch } = useDashboard();
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '' as string | number,
    category: categories[0],
    type: 'expense' as 'income' | 'expense'
  });

  useEffect(() => {
    if (existingTx) {
      setFormData({
        date: existingTx.date,
        amount: existingTx.amount,
        category: existingTx.category,
        type: existingTx.type
      });
    }
  }, [existingTx]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.amount || isNaN(Number(formData.amount))) return;

    if (existingTx) {
      dispatch({ 
        type: 'UPDATE_TRANSACTION', 
        payload: { ...existingTx, ...formData, amount: Number(formData.amount) } 
      });
    } else {
      dispatch({ 
        type: 'ADD_TRANSACTION', 
        payload: { 
          id: `t-${Date.now()}`, 
          ...formData, 
          amount: Number(formData.amount) 
        } 
      });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '12px' }}>
      <h4 className="font-semibold">{existingTx ? 'Edit Transaction' : 'Add New Transaction'}</h4>
      
      <div className="flex gap-4 flex-wrap">
        <div className="form-group flex-1">
           <label className="form-label">Type</label>
           <select 
             className="form-input"
             value={formData.type}
             onChange={(e) => setFormData({...formData, type: e.target.value as 'income' | 'expense'})}
           >
             <option value="expense">Expense</option>
             <option value="income">Income</option>
           </select>
        </div>

        <div className="form-group flex-1">
           <label className="form-label">Category</label>
           <select 
             className="form-input"
             value={formData.category}
             onChange={(e) => setFormData({...formData, category: e.target.value})}
           >
             {categories.map(c => <option key={c} value={c}>{c}</option>)}
           </select>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="form-group flex-1">
           <label className="form-label">Amount ($)</label>
           <input 
             type="number" 
             step="0.01"
             required
             className="form-input" 
             placeholder="0.00"
             value={formData.amount}
             onChange={(e) => setFormData({...formData, amount: e.target.value})}
           />
        </div>

        <div className="form-group flex-1">
           <label className="form-label">Date</label>
           <input 
             type="date"
             required 
             className="form-input"
             value={formData.date}
             onChange={(e) => setFormData({...formData, date: e.target.value})}
           />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
        <button type="submit" className="btn btn-primary">{existingTx ? 'Save Changes' : 'Add Transaction'}</button>
      </div>
    </form>
  );
}
