import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { LayoutDashboard, Receipt, PieChart, LogOut, Sun, Moon, Shield, ShieldCheck } from 'lucide-react';

export default function Sidebar() {
  const { state: { role, theme }, dispatch } = useDashboard();

  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' });
  
  const switchRole = () => {
    dispatch({ type: 'SET_ROLE', payload: role === 'Admin' ? 'Viewer' : 'Admin' });
  };

  return (
    <aside className="glass-panel" style={{ width: '260px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 2rem)', margin: '1rem 0 1rem 1rem', padding: '1.5rem', position: 'sticky', top: '1rem' }}>
      
      <div className="flex items-center gap-2 mb-6">
        <div style={{ background: 'var(--accent-color)', padding: '0.5rem', borderRadius: '12px', color: 'white' }}>
          <PieChart size={24} />
        </div>
        <h2 className="text-xl font-bold">FinDash</h2>
      </div>

      <nav className="flex-col gap-2" style={{ display: 'flex', flex: 1, marginTop: '2rem' }}>
        <a href="#" className="flex items-center gap-4 text-base font-medium" style={{ padding: '0.75rem 1rem', borderRadius: '8px', backgroundColor: 'var(--accent-color)', color: 'white' }}>
          <LayoutDashboard size={20} />
          Dashboard
        </a>
        <a href="#transactions" className="flex items-center gap-4 text-base font-medium text-secondary" style={{ padding: '0.75rem 1rem', borderRadius: '8px' }}>
          <Receipt size={20} />
          Transactions
        </a>
      </nav>

      <div className="flex-col gap-4" style={{ display: 'flex', marginTop: 'auto' }}>
        
        <div className="card text-sm" style={{ padding: '1rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', boxShadow: 'none' }}>
           <p className="font-semibold mb-2 flex items-center justify-between">
              Current Role
              {role === 'Admin' ? <ShieldCheck size={16} className="text-success" /> : <Shield size={16} className="text-secondary" />}
           </p>
           <span className={`role-badge ${role === 'Admin' ? 'role-admin' : 'role-viewer'}`}>
             {role}
           </span>
           <button onClick={switchRole} className="btn btn-outline" style={{ width: '100%', marginTop: '0.75rem', fontSize: '0.75rem', padding: '0.25rem' }}>
             Switch to {role === 'Admin' ? 'Viewer' : 'Admin'}
           </button>
        </div>

        <button onClick={toggleTheme} className="btn btn-outline flex items-center justify-between" style={{ padding: '0.75rem 1rem' }}>
          <span className="font-medium text-sm">Theme</span>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

      </div>
    </aside>
  );
}
