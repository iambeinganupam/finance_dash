import React, { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Lightbulb, AlertTriangle, ArrowUpRight } from 'lucide-react';

export default function Insights() {
  const { state: { transactions } } = useDashboard();

  const { highestCategory, highestAmount, totalTransactions } = useMemo(() => {
    if (!transactions.length) return { highestCategory: 'N/A', highestAmount: 0, totalTransactions: 0 };
    
    const expensesMap = {};
    transactions.forEach(t => {
      if (t.type === 'expense') {
        expensesMap[t.category] = (expensesMap[t.category] || 0) + Number(t.amount);
      }
    });

    let maxCat = 'N/A';
    let maxAmt = 0;
    
    for (const [cat, amt] of Object.entries(expensesMap)) {
      if (amt > maxAmt) {
        maxAmt = amt;
        maxCat = cat;
      }
    }

    return {
      highestCategory: maxCat,
      highestAmount: maxAmt,
      totalTransactions: transactions.length
    };
  }, [transactions]);

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="card glass-panel mb-6 animate-slide-up stagger-4">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb size={20} className="text-accent" style={{ color: 'var(--accent-color)' }} />
        <h3 className="text-lg font-semibold text-secondary">Smart Insights</h3>
      </div>
      
      <div className="flex gap-4 flex-wrap">
        <div className="flex items-start gap-4 flex-1" style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '12px' }}>
          <div style={{ background: 'rgba(239,68,68,0.1)', padding: '0.5rem', borderRadius: '50%' }}>
            <AlertTriangle size={16} className="text-danger" />
          </div>
          <div>
            <p className="text-sm text-secondary font-medium">Highest Spending</p>
            <p className="font-semibold">{highestCategory} <span className="text-danger">({formatCurrency(highestAmount)})</span></p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 flex-1" style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '12px' }}>
           <div style={{ background: 'rgba(16,185,129,0.1)', padding: '0.5rem', borderRadius: '50%' }}>
            <ArrowUpRight size={16} className="text-success" />
          </div>
          <div>
            <p className="text-sm text-secondary font-medium">Activity</p>
            <p className="font-semibold">{totalTransactions} Total Transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
