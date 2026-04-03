export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export const initialTransactions: Transaction[] = [
  { id: 't1', date: '2026-03-01', amount: 5000, category: 'Salary', type: 'income' },
  { id: 't2', date: '2026-03-02', amount: 1500, category: 'Rent', type: 'expense' },
  { id: 't3', date: '2026-03-05', amount: 120, category: 'Groceries', type: 'expense' },
  { id: 't4', date: '2026-03-08', amount: 60, category: 'Transport', type: 'expense' },
  { id: 't5', date: '2026-03-12', amount: 300, category: 'Freelance', type: 'income' },
  { id: 't6', date: '2026-03-15', amount: 80, category: 'Utilities', type: 'expense' },
  { id: 't7', date: '2026-03-18', amount: 200, category: 'Dining', type: 'expense' },
  { id: 't8', date: '2026-03-22', amount: 450, category: 'Electronics', type: 'expense' },
  { id: 't9', date: '2026-03-25', amount: 100, category: 'Groceries', type: 'expense' },
  { id: 't10', date: '2026-03-28', amount: 150, category: 'Entertainment', type: 'expense' },
  { id: 't11', date: '2026-03-29', amount: 5000, category: 'Salary', type: 'income' },
  { id: 't12', date: '2026-03-30', amount: 1500, category: 'Rent', type: 'expense' },
  { id: 't13', date: '2026-03-31', amount: 220, category: 'Groceries', type: 'expense' },
  { id: 't14', date: '2026-04-01', amount: 80, category: 'Transport', type: 'expense' },
  { id: 't15', date: '2026-04-02', amount: 95, category: 'Utilities', type: 'expense' },
];

export const categories = [
  'Salary', 'Rent', 'Groceries', 'Transport', 'Utilities', 'Dining', 'Freelance', 'Entertainment', 'Electronics', 'Other'
];
