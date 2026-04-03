import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import Insights from './components/Insights';
import TransactionList from './components/TransactionList';
import { useDashboard } from './context/DashboardContext';
import Aurora from './components/Backgrounds/Aurora';

function App() {
  const { state: { theme } } = useDashboard();

  const auroraColors = theme === 'dark'
    ? ['#3b82f6', '#10b981', '#3b82f6'] // Vibrant for dark mode
    : ['#818cf8', '#a5f3fc', '#818cf8']; // Soft pastels for light mode

  return (
    <div className={`relative min-h-screen w-full overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <Aurora
          colorStops={auroraColors}
          blend={0.5}
          amplitude={1.0}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 mt-6 mb-12 px-8 md:px-16 lg:px-24 max-w-[1600px] w-full mx-auto">
          <header className="flex justify-between items-center mb-8 animate-fade-in">
            <div>
              <h1 className={`text-3xl font-bold mb-1 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Overview</h1>
              <p className={`text-sm transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Welcome back! Here's your financial summary.</p>
            </div>
          </header>

          <section className="space-y-6">
            <SummaryCards />
            <div className="grid grid-cols-1 gap-6">
              <Charts />
            </div>
            <div className="dashboard-grid">
              <div className="col-span-12">
                <Insights />
              </div>
            </div>
            <TransactionList />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;

