import React, { createContext, useReducer, useEffect, useContext, ReactNode } from 'react';
import { initialTransactions, Transaction } from '../data/mockData';

export type Role = 'Viewer' | 'Admin';
export type Theme = 'light' | 'dark';

export interface Filters {
  search: string;
  type: string;
  category: string;
  sortBy: string;
}

export interface DashboardState {
  transactions: Transaction[];
  filters: Filters;
  role: Role;
  theme: Theme;
}

type Action =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<Filters> }
  | { type: 'SET_ROLE'; payload: Role }
  | { type: 'TOGGLE_THEME' };

const initialState: DashboardState = {
  transactions: JSON.parse(localStorage.getItem('transactions') || 'null') || initialTransactions,
  filters: { search: '', type: 'all', category: 'all', sortBy: 'date-desc' },
  role: (localStorage.getItem('role') as Role) || 'Admin',
  theme: (localStorage.getItem('theme') as Theme) || 'dark',
};

export interface DashboardContextProps {
  state: DashboardState;
  dispatch: React.Dispatch<Action>;
  sortedTransactions: Transaction[];
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

function reducer(state: DashboardState, action: Action): DashboardState {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [...state.transactions, action.payload] };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) => (t.id === action.payload.id ? action.payload : t)),
      };
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter((t) => t.id !== action.payload) };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    default:
      return state;
  }
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem('role', state.role);
  }, [state.role]);

  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  const filteredTransactions = state.transactions.filter((t) => {
    const matchSearch = t.category.toLowerCase().includes(state.filters.search.toLowerCase());
    const matchType = state.filters.type === 'all' || t.type === state.filters.type;
    const matchCategory = state.filters.category === 'all' || t.category === state.filters.category;
    return matchSearch && matchType && matchCategory;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (state.filters.sortBy === 'date-desc') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (state.filters.sortBy === 'date-asc') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (state.filters.sortBy === 'amount-desc') {
      return b.amount - a.amount;
    }
    if (state.filters.sortBy === 'amount-asc') {
      return a.amount - b.amount;
    }
    return 0;
  });

  return (
    <DashboardContext.Provider value={{ state, dispatch, sortedTransactions }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
