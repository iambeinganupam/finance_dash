import { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export default function SummaryCards() {
  const { state: { transactions, theme } } = useDashboard();

  const { income, expenses, balance } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    transactions.forEach(t => {
      if (t.type === 'income') inc += Number(t.amount);
      if (t.type === 'expense') exp += Number(t.amount);
    });
    return {
      income: inc,
      expenses: exp,
      balance: inc - exp
    };
  }, [transactions]);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const cardClass = "card glass-panel col-span-4 animate-slide-up flex flex-col justify-between p-6 transition-all duration-300";

  return (
    <div className="dashboard-grid mb-6">
      <div className={`${cardClass} stagger-1`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-secondary">Total Balance</span>
          <div className="p-3 bg-indigo-500/10 rounded-2xl">
            <Wallet size={20} className="text-indigo-500" />
          </div>
        </div>
        <h3 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{formatCurrency(balance)}</h3>
      </div>

      <div className={`${cardClass} stagger-2`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-secondary">Total Income</span>
          <div className="p-3 bg-emerald-500/10 rounded-2xl">
            <TrendingUp size={20} className="text-emerald-500" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-emerald-500">+{formatCurrency(income)}</h3>
      </div>

      <div className={`${cardClass} stagger-3`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-secondary">Total Expenses</span>
          <div className="p-3 bg-rose-500/10 rounded-2xl">
            <TrendingDown size={20} className="text-rose-500" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-rose-500">-{formatCurrency(expenses)}</h3>
      </div>
    </div>
  );
}
