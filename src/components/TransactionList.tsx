import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { 
  Search, Trash2, Edit2, Plus, Download,
  Briefcase, Home, ShoppingCart, Truck, 
  Zap, Utensils, Monitor, Film, Package,
  ArrowUpRight, ArrowDownLeft
} from 'lucide-react';
import TransactionForm from './TransactionForm';
import { categories } from '../data/mockData';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Salary': return <Briefcase size={18} />;
    case 'Rent': return <Home size={18} />;
    case 'Groceries': return <ShoppingCart size={18} />;
    case 'Transport': return <Truck size={18} />;
    case 'Utilities': return <Zap size={18} />;
    case 'Dining': return <Utensils size={18} />;
    case 'Freelance': return <Monitor size={18} />;
    case 'Entertainment': return <Film size={18} />;
    case 'Electronics': return <Monitor size={18} />;
    default: return <Package size={18} />;
  }
};

export default function TransactionList() {
  const { state: { role, filters, theme }, dispatch, sortedTransactions } = useDashboard();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const handleExport = () => {
    if (!sortedTransactions.length) return alert('No transactions to export!');
    
    const headers = ['Date', 'Category', 'Type', 'Amount'];
    const rows = sortedTransactions.map(tx => [
      tx.date,
      tx.category,
      tx.type.toUpperCase(),
      tx.amount
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `findash_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  };

  const handleEdit = (tx: any) => {
    setEditingTx(tx);
    setShowAddForm(true);
  };

  return (
    <div className="card glass-panel animate-slide-up stagger-5" id="transactions">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Recent Activity</h3>
          <p className="text-secondary text-sm">Monitor your latest financial movements</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExport} className="btn btn-outline border-indigo-500/30 text-indigo-500 hover:bg-indigo-500/10 px-5 transition-all">
             <Download size={18} />
             <span>Export CSV</span>
          </button>
          {role === 'Admin' && (
            <button onClick={() => { setEditingTx(null); setShowAddForm(!showAddForm); }} className="btn btn-primary px-6 py-2.5 rounded-xl shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all">
               <Plus size={18} />
               <span>{showAddForm && !editingTx ? 'Cancel' : 'New Transaction'}</span>
            </button>
          )}
        </div>
      </div>

      {showAddForm && role === 'Admin' && (
         <div 
           className="fixed inset-0 flex items-center justify-center z-[1000] p-4 backdrop-blur-md bg-black/60"
           onClick={(e) => {
             if (e.target === e.currentTarget) {
               setShowAddForm(false); setEditingTx(null);
             }
           }}
         >
           <div className={`w-full max-w-[600px] animate-in zoom-in-95 duration-200 p-2 rounded-3xl shadow-2xl ${theme === 'dark' ? 'bg-slate-900/90 border border-slate-800' : 'bg-white/95 border border-slate-200'}`}>
              <TransactionForm 
                existingTx={editingTx} 
                onClose={() => { setShowAddForm(false); setEditingTx(null); }} 
              />
           </div>
         </div>
      )}

      {/* Modern Filter Toolbar */}
      <div className="flex gap-3 flex-wrap items-center mb-6">
        <div className={`flex items-center gap-2 pl-4 pr-2 py-2 rounded-2xl flex-1 min-w-[280px] border transition-all ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800 focus-within:border-indigo-500/50' : 'bg-white/40 border-slate-200 focus-within:border-indigo-500/50'}`}>
          <Search size={18} className="text-secondary" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={filters.search}
            onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { search: e.target.value } })}
            className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder:text-slate-500"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <select 
            className={`form-input !w-auto !rounded-2xl !py-2 !px-4 ${theme === 'dark' ? '!bg-slate-900/40' : '!bg-white/40'}`}
            value={filters.type}
            onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { type: e.target.value } })}
          >
            <option value="all">Every Type</option>
            <option value="income">Incomes</option>
            <option value="expense">Expenses</option>
          </select>
          
          <select 
            className={`form-input !w-auto !rounded-2xl !py-2 !px-4 ${theme === 'dark' ? '!bg-slate-900/40' : '!bg-white/40'}`}
            value={filters.category}
            onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { category: e.target.value } })}
          >
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select 
            className={`form-input !w-auto !rounded-2xl !py-2 !px-4 ${theme === 'dark' ? '!bg-slate-900/40' : '!bg-white/40'}`}
            value={filters.sortBy}
            onChange={(e) => dispatch({ type: 'SET_FILTERS', payload: { sortBy: e.target.value } })}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Enhanced List Layout with Fixed Height and Scrollbar */}
      <div className="grid grid-cols-1 gap-3 overflow-y-auto h-[450px] pr-2 custom-scrollbar content-start">
        {sortedTransactions.length ? sortedTransactions.map(tx => (
          <div 
            key={tx.id} 
            className={`group relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${
              theme === 'dark' 
                ? 'bg-slate-900/20 border-slate-800/50 hover:bg-slate-800/40 hover:border-indigo-500/30' 
                : 'bg-white/40 border-slate-200/50 hover:bg-white/80 hover:border-indigo-500/30 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl transition-colors ${
                tx.type === 'income' 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : 'bg-rose-500/10 text-rose-500'
              }`}>
                {getCategoryIcon(tx.category)}
              </div>
              <div>
                <h4 className={`font-bold transition-colors ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>{tx.category}</h4>
                <p className="text-secondary text-xs font-medium">{tx.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right flex flex-col items-end">
                <span className={`text-lg font-black flex items-center gap-1 ${
                  tx.type === 'income' ? 'text-emerald-500' : (theme === 'dark' ? 'text-white' : 'text-slate-900')
                }`}>
                  {tx.type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </span>
                <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md ${
                  tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                }`}>
                  {tx.type}
                </span>
              </div>
              
              {role === 'Admin' && (
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => handleEdit(tx)} className="p-2 hover:bg-indigo-500/10 rounded-lg text-secondary hover:text-indigo-500 transition-all">
                     <Edit2 size={16} />
                   </button>
                   <button onClick={() => handleDelete(tx.id)} className="p-2 hover:bg-rose-500/10 rounded-lg text-secondary hover:text-rose-500 transition-all">
                     <Trash2 size={16} />
                   </button>
                </div>
              )}
            </div>
          </div>
        )) : (
          <div className={`text-center py-20 rounded-3xl border-2 border-dashed ${theme === 'dark' ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
            <Package size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">No transactions found</p>
            <p className="text-sm">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
