# Finance Dash 🚀

A premium, glassmorphic financial management dashboard built with **React**, **Vite**, and **Tailwind CSS v4**. Finance Dash provides a visually stunning and highly interactive way to monitor the income, expenses, and overall financial health.

## ✨ Features

### 💎 Premium UI/UX
- **Glassmorphism Design**: Sophisticated translucent panels with high-quality backdrop blurs.
- **Aurora Background**: A dynamic, animated WebGL background that shifts colors based on your active theme.
- **Micro-interactions**: Smooth hover effects, staggered entry animations, and responsive transitions.
- **Fully Responsive**: Optimized for everything from large 4K monitors to mobile devices.

### 📊 Financial Management
- **Live Overview**: Real-time summary cards for Total Balance, Income, and Expenses.
- **Interactive Charts**: Visual breakdown of spending categories and balance trends.
- **Transaction History**: A modern card-based list with category-specific icons.
- **Full CRUD**: Add, edit, and delete transactions with an intuitive modal interface.
- **Search & Filter**: Powerful filtering by type, category, or keyword.

### 🛠 Tools & Integration
- **CSV Export**: Instant export of your filtered transaction data for external analysis.
- **Role Switching**: Built-in "Admin" and "Viewer" roles to toggle between management and read-only modes.
- **Dark/Light Mode**: Seamless theme switching with persistent state.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/iambeinganupam/finance_dash.git
   cd finance-dash
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 🧠 Approach & Tech Stack

Finance Dash was architected with a focus on **performance and aesthetics**:

-   **Frontend**: React 18 + Vite for ultra-fast HMR and build times.
-   **Styling**: Tailwind CSS v4 for a modern, utility-first styling approach with advanced CSS-in-JS features.
-   **State Management**: React **Context API** (`DashboardContext`) for lightweight, global management of transactions, roles, and themes.
-   **Iconography**: **Lucide React** for a consistent and professional icon language.
-   **Animations**: Custom CSS keyframes and staggered animations for a premium "app-like" feel.
-   **Background**: Custom WebGL implementation for the "Aurora" effect.

## 📁 Project Structure

```text
src/
├── components/        # UI components (Charts, TransactionList, Navbar, etc.)
├── context/           # Global state management (DashboardContext.tsx)
├── data/              # Mock data and constants
├── hooks/             # Custom React hooks
└── index.css          # Global design system & animations
```

---

*Build with ❤️.*
