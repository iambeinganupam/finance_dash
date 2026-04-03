import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { LayoutDashboard, Receipt, PieChart, Menu, X, Sun, Moon, Shield, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const { state: { role, theme }, dispatch } = useDashboard();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' });
  
  const switchRole = () => {
    dispatch({ type: 'SET_ROLE', payload: role === 'Admin' ? 'Viewer' : 'Admin' });
  };

  return (
    <>
      <nav className="glass-panel z-50 flex items-center justify-between" style={{ padding: '0.75rem 2rem', margin: 0, borderRadius: 0, position: 'sticky', top: 0, zIndex: 50, borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
        <div className="flex items-center gap-2">
          <div style={{ background: 'var(--accent-color)', padding: '0.5rem', borderRadius: '12px', color: 'white' }}>
            <PieChart size={24} />
          </div>
          <h2 className="text-xl font-bold hidden md:block" style={{ marginLeft: '0.5rem' }}>Finance Dash</h2>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4" style={{ display: 'none' }} id="desktop-nav">
          <a href="#" className="flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: 'var(--accent-color)', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', boxShadow: 'var(--shadow-glow)' }}>
            <LayoutDashboard size={18} />
            Dashboard
          </a>
          <a href="#transactions" className="flex items-center gap-2 text-sm font-medium text-secondary hover-bg-nav" style={{ padding: '0.5rem 1rem', borderRadius: '20px', transition: 'all 0.2s' }}>
            <Receipt size={18} />
            Transactions
          </a>
        </div>
        <style>{`
          .hover-bg-nav:hover {
            background-color: var(--bg-color);
            color: var(--text-primary);
          }
        `}</style>

        <style>{`
          @media (min-width: 768px) {
            #desktop-nav {
              display: flex !important;
            }
            #mobile-menu-btn {
              display: none !important;
            }
          }
          @media (max-width: 767px) {
            .mobile-sidebar {
              transform: translateX(-100%);
              transition: transform 0.3s ease-in-out;
            }
            .mobile-sidebar.open {
              transform: translateX(0);
            }
          }
        `}</style>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-4" style={{ display: 'none' }} id="desktop-controls">
          <button onClick={toggleTheme} className="btn btn-outline hover-bg-nav transition-colors" style={{ padding: '0.5rem', borderRadius: '12px', border: 'none' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            onClick={switchRole} 
            className="flex items-center gap-2 transition-all hover:opacity-90" 
            style={{ 
              background: role === 'Admin' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)', 
              color: role === 'Admin' ? 'var(--success-color)' : 'var(--accent-color)',
              padding: '0.5rem 1rem', 
              borderRadius: '20px', 
              border: `1px solid ${role === 'Admin' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
              cursor: 'pointer'
            }}
            title="Switch Role"
          >
            {role === 'Admin' ? <ShieldCheck size={18} /> : <Shield size={18} />}
            <span className="text-sm font-bold tracking-wide uppercase">{role}</span>
          </button>

          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)', margin: '0 0.5rem' }} />

          {/* Profile Section */}
          <div className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full hover-bg-nav transition-all" style={{ border: '1px solid var(--border-color)' }}>
             <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-color), var(--accent-hover))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem', boxShadow: 'var(--shadow-sm)' }}>
                {role[0]}
             </div>
             <div className="text-left hidden lg:block">
                <p className="text-sm font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>{role} User</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>fin.dash@test.com</p>
             </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            #desktop-controls {
              display: flex !important;
            }
          }
        `}</style>


        {/* Mobile Menu Button */}
        <button id="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)} className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '8px' }}>
          <Menu size={20} />
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] animate-fade-in" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`mobile-sidebar glass-panel ${mobileMenuOpen ? 'open' : ''}`}
        style={{ 
          position: 'fixed', top: 0, left: 0, bottom: 0, width: '310px', zIndex: 101, 
          margin: 0, borderRadius: '0 24px 24px 0', display: 'flex', flexDirection: 'column', 
          padding: '2rem 1.5rem', transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          background: 'var(--surface-color)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid var(--border-color)'
        }}
      >
        <div className="flex items-center justify-between mb-14">
          <div className="flex items-center gap-3">
            <div style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--accent-hover))', padding: '0.625rem', borderRadius: '14px', color: 'white', boxShadow: 'var(--shadow-glow)' }}>
              <PieChart size={22} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Finance Dash</h2>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-slate-500/10 rounded-xl transition-colors">
            <X size={24} className="text-secondary" />
          </button>
        </div>

        <nav className="flex-col gap-3" style={{ display: 'flex', flex: 1 }}>
          <a 
            href="#" 
            onClick={() => setMobileMenuOpen(false)} 
            className="flex items-center gap-4 text-base font-bold transition-all duration-300 animate-slide-up stagger-1" 
            style={{ 
              padding: '1rem', borderRadius: '16px', 
              backgroundColor: 'var(--accent-color)', color: 'white',
              boxShadow: '0 8px 20px -6px rgba(79, 70, 229, 0.4)'
            }}
          >
            <div className="bg-white/20 p-2 rounded-lg">
              <LayoutDashboard size={20} />
            </div>
            Dashboard
          </a>
          <a 
            href="#transactions" 
            onClick={() => setMobileMenuOpen(false)} 
            className="flex items-center gap-4 text-base font-semibold text-secondary hover:text-primary hover:bg-slate-500/5 transition-all duration-300 animate-slide-up stagger-2" 
            style={{ padding: '1rem', borderRadius: '16px' }}
          >
            <div className="bg-slate-500/10 p-2 rounded-lg group-hover:bg-indigo-500/10 group-hover:text-indigo-500 transition-colors">
              <Receipt size={20} />
            </div>
            Transactions
          </a>
        </nav>

        <div className="flex-col gap-4 mt-auto pt-6 border-t animate-slide-up stagger-3" style={{ display: 'flex', borderColor: 'var(--border-color)' }}>
          <div className="card text-sm relative overflow-hidden" style={{ padding: '1.25rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '20px' }}>
            <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '100px', height: '100px', background: 'var(--accent-color)', opacity: 0.05, filter: 'blur(30px)', borderRadius: '50%' }} />
            
            <p className="font-bold mb-3 flex items-center justify-between text-primary">
              Control Panel
              {role === 'Admin' ? <ShieldCheck size={18} className="text-success" /> : <Shield size={18} className="text-secondary" />}
            </p>
            
            <div className="flex flex-col gap-3">
               <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Access</span>
                  <span className={`role-badge ${role === 'Admin' ? 'role-admin' : 'role-viewer'}`} style={{ fontSize: '10px' }}>
                    {role}
                  </span>
               </div>
               <button onClick={switchRole} className="btn btn-outline w-full !rounded-xl !py-2 hover:border-indigo-500/50 transition-all font-bold">
                 Switch Account
               </button>
            </div>
          </div>

          <button onClick={toggleTheme} className="btn btn-outline flex items-center justify-between !py-3.5 !rounded-2xl hover:bg-indigo-500/5 transition-all">
            <div className="flex items-center gap-3">
              <div className="bg-slate-500/10 p-2 rounded-lg">
                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <span className="font-bold text-sm">Theme Mode</span>
            </div>
            <div className="text-xs font-bold uppercase text-secondary">
              {theme}
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
