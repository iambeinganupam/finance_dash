import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useDashboard } from '../context/DashboardContext';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function Charts() {
  const { state: { transactions, theme } } = useDashboard();

  const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0';

  const { areaData, pieData } = useMemo(() => {
    // Area Chart Data (Balance over time)
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let currentBalance = 0;
    const balanceMap = {};

    sorted.forEach(t => {
      if (t.type === 'income') currentBalance += Number(t.amount);
      if (t.type === 'expense') currentBalance -= Number(t.amount);
      balanceMap[t.date] = currentBalance;
    });

    const areaD = Object.keys(balanceMap).map(date => ({
      date,
      balance: balanceMap[date],
    }));

    // Pie Chart Data (Expenses by category)
    const expensesMap = {};
    transactions.forEach(t => {
      if (t.type === 'expense') {
        expensesMap[t.category] = (expensesMap[t.category] || 0) + Number(t.amount);
      }
    });

    const pieD = Object.keys(expensesMap).map(key => ({
      name: key,
      value: expensesMap[key],
    })).sort((a, b) => b.value - a.value);

    return { areaData: areaD, pieData: pieD };
  }, [transactions]);

  return (
    <div className="dashboard-grid mb-6">
      
      {/* Area Chart: Balance Trend */}
      <div className="card glass-panel col-span-8 animate-slide-up stagger-4" style={{ minHeight: '350px' }}>
        <h3 className="text-lg font-semibold mb-4 text-secondary">Balance Trend</h3>
        {areaData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="date" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={val => `$${val}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                itemStyle={{ color: 'var(--accent-color)' }}
              />
              <Area type="monotone" dataKey="balance" stroke="var(--accent-color)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
           <div className="flex items-center justify-center h-full text-secondary">No data available</div>
        )}
      </div>

      {/* Pie Chart: Spending Breakdown */}
      <div className="card glass-panel col-span-4 animate-slide-up stagger-4" style={{ minHeight: '350px' }}>
        <h3 className="text-lg font-semibold mb-2 text-secondary">Spending Breakdown</h3>
        {pieData.length > 0 ? (
           <ResponsiveContainer width="100%" height={280}>
             <PieChart>
               <Pie
                 data={pieData}
                 cx="50%"
                 cy="45%"
                 innerRadius={60}
                 outerRadius={85}
                 paddingAngle={5}
                 dataKey="value"
               >
                 {pieData.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                 ))}
               </Pie>
               <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                  formatter={(value) => `$${value}`}
               />
               <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: textColor }} />
             </PieChart>
           </ResponsiveContainer>
        ) : (
           <div className="flex items-center justify-center h-full text-secondary">No data available</div>
        )}
      </div>

    </div>
  );
}
