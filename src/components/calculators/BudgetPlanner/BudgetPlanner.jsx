// src/components/calculators/BudgetPlanner/BudgetPlanner.jsx
import React, { useState, useEffect } from 'react';
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
// CurrencySelector is expected to be passed from App.jsx, or if you want one specific to this planner, uncomment the import
// import CurrencySelector from '../../common/CurrencySelector';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const formatCurrency = (amount, currencySymbol) => {
  if (amount === undefined || amount === null || isNaN(amount)) return `${currencySymbol || ''}0.00`;
  return `${currencySymbol || ''}${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const BudgetPlanner = ({ selectedCurrency, setSelectedCurrency }) => { // Assume selectedCurrency and setSelectedCurrency are passed from App.jsx
  const [incomeItems, setIncomeItems] = useState([]);
  const [expenseItems, setExpenseItems] = useState([]);

  const [newIncomeSource, setNewIncomeSource] = useState('');
  const [newIncomeAmount, setNewIncomeAmount] = useState('');

  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState('Housing'); // Default category

  const expenseCategories = ['Housing', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare', 'Personal Care', 'Education', 'Debt Payments', 'Savings/Investments', 'Gifts/Donations', 'Other'];

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedIncome = localStorage.getItem('budgetPlannerIncome');
    if (storedIncome) {
      setIncomeItems(JSON.parse(storedIncome));
    }
    const storedExpenses = localStorage.getItem('budgetPlannerExpenses');
    if (storedExpenses) {
      setExpenseItems(JSON.parse(storedExpenses));
    }
  }, []);

  // Save data to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('budgetPlannerIncome', JSON.stringify(incomeItems));
  }, [incomeItems]);

  useEffect(() => {
    localStorage.setItem('budgetPlannerExpenses', JSON.stringify(expenseItems));
  }, [expenseItems]);


  const addIncomeItem = (e) => {
    e.preventDefault(); // Prevent form submission if it's in a form
    if (newIncomeSource && newIncomeAmount && parseFloat(newIncomeAmount) > 0) {
      setIncomeItems([...incomeItems, { id: Date.now(), source: newIncomeSource, amount: parseFloat(newIncomeAmount) }]);
      setNewIncomeSource('');
      setNewIncomeAmount('');
    }
  };

  const addExpenseItem = (e) => {
    e.preventDefault(); // Prevent form submission
    if (newExpenseName && newExpenseAmount && parseFloat(newExpenseAmount) > 0 && selectedExpenseCategory) {
      setExpenseItems([...expenseItems, { id: Date.now(), category: selectedExpenseCategory, name: newExpenseName, amount: parseFloat(newExpenseAmount) }]);
      setNewExpenseName('');
      setNewExpenseAmount('');
      // Optionally reset category or keep for next entry: setSelectedExpenseCategory('Housing');
    }
  };

  const deleteIncomeItem = (id) => setIncomeItems(incomeItems.filter(item => item.id !== id));
  const deleteExpenseItem = (id) => setExpenseItems(expenseItems.filter(item => item.id !== id));

  const totalIncome = incomeItems.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenseItems.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  const expensesByCategory = expenseCategories.reduce((acc, category) => {
    const categoryTotal = expenseItems
      .filter(item => item.category === category)
      .reduce((sum, item) => sum + item.amount, 0);
    if (categoryTotal > 0) { // Only include categories with expenses
        acc[category] = categoryTotal;
    }
    return acc;
  }, {});

  const chartLabels = Object.keys(expensesByCategory);
  const chartDataValues = Object.values(expensesByCategory);

  const doughnutChartData = {
    labels: chartLabels.length > 0 ? chartLabels : ['No Expenses Yet'],
    datasets: [{
      data: chartDataValues.length > 0 ? chartDataValues : [1], // Placeholder data if empty
      backgroundColor: chartLabels.length > 0 ? [
        'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)',
        'rgba(255, 70, 200, 0.8)', 'rgba(70, 255, 100, 0.8)', 'rgba(100, 70, 255, 0.8)',
        'rgba(200, 200, 70, 0.8)','rgba(70, 200, 200, 0.8)','rgba(200, 70, 70, 0.8)'
      ].slice(0, chartLabels.length) : ['rgba(211, 211, 211, 0.7)'],
      borderColor: chartLabels.length > 0 ? [
        'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
        'rgba(255,70,200,1)','rgba(70,255,100,1)','rgba(100,70,255,1)',
        'rgba(200,200,70,1)','rgba(70,200,200,1)','rgba(200,70,70,1)'
      ].slice(0, chartLabels.length) : ['rgba(211, 211, 211, 1)'],
      borderWidth: 1,
    }],
  };

   const doughnutChartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { color: '#D1D5DB', boxWidth: 15, padding:15 } }, // theme-text-secondary or primary
      title: { display: true, text: 'Expense Distribution', color: '#F3F4F6', font: { size: 16 } }, // theme-text-primary
      tooltip: { callbacks: { label: function(c) { let l = c.label || ''; if(l){l+=': ';} if(c.parsed !== null){l+=formatCurrency(c.parsed,selectedCurrency?.symbol || '');} return l;}}}
    },
  };

  const itemStyle = "flex justify-between items-center p-2.5 bg-theme-input-bg/50 rounded mb-2 hover:bg-theme-border/30 transition-colors";
  const inputStyle = "bg-theme-input-bg text-theme-text-primary p-2 rounded-md border border-theme-border focus:ring-brand-primary focus:border-brand-primary flex-grow";
  const buttonStyle = "p-2 bg-brand-primary hover:opacity-80 text-white rounded-md ml-2 transition-colors flex items-center justify-center";
  const deleteButtonStyle = "text-red-400 hover:text-red-300 transition-colors";

  return (
    // This root div no longer has the main panel styling (bg-theme-panel-dark, p-6, etc.)
    // App.jsx provides that wrapper.
    <div className="text-theme-text-primary space-y-8">
      {/* Income Section */}
      <section className="p-4 bg-theme-input-bg/30 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-green-400 mb-4">Income Sources</h3>
        <form onSubmit={addIncomeItem} className="flex gap-2 items-end mb-4">
          <div className="flex-grow">
            <label htmlFor="newIncomeSource" className="sr-only">Income Source</label>
            <input id="newIncomeSource" type="text" value={newIncomeSource} onChange={e => setNewIncomeSource(e.target.value)} placeholder="Source (e.g., Salary)" className={`${inputStyle} w-full`} />
          </div>
          <div className="flex-grow">
            <label htmlFor="newIncomeAmount" className="sr-only">Amount</label>
            <input id="newIncomeAmount" type="number" value={newIncomeAmount} onChange={e => setNewIncomeAmount(e.target.value)} placeholder="Amount" className={`${inputStyle} w-full`} />
          </div>
          <button type="submit" className={buttonStyle} aria-label="Add Income"><FiPlusCircle size={20}/></button>
        </form>
        <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
          {incomeItems.length === 0 && <p className="text-sm text-theme-text-secondary text-center py-2">No income sources added yet.</p>}
          {incomeItems.map(item => (
            <div key={item.id} className={itemStyle}>
              <span>{item.source}</span>
              <div className="flex items-center">
                <span className="mr-3 font-medium">{formatCurrency(item.amount, selectedCurrency?.symbol)}</span>
                <button onClick={() => deleteIncomeItem(item.id)} className={deleteButtonStyle} aria-label="Delete Income Item"><FiTrash2 size={18}/></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expenses Section */}
      <section className="p-4 bg-theme-input-bg/30 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-red-400 mb-4">Expenses</h3>
        <form onSubmit={addExpenseItem} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 items-end mb-4">
          <div className="md:col-span-1">
            <label htmlFor="selectedExpenseCategory" className="sr-only">Category</label>
            <select id="selectedExpenseCategory" value={selectedExpenseCategory} onChange={e => setSelectedExpenseCategory(e.target.value)} className={`${inputStyle} w-full`}>
              {expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="md:col-span-1">
            <label htmlFor="newExpenseName" className="sr-only">Expense Name</label>
            <input id="newExpenseName" type="text" value={newExpenseName} onChange={e => setNewExpenseName(e.target.value)} placeholder="Expense (e.g., Rent)" className={`${inputStyle} w-full`} />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="newExpenseAmount" className="sr-only">Amount</label>
            <input id="newExpenseAmount" type="number" value={newExpenseAmount} onChange={e => setNewExpenseAmount(e.target.value)} placeholder="Amount" className={`${inputStyle} w-full`} />
          </div>
          <button type="submit" className={`${buttonStyle} md:col-span-1`} aria-label="Add Expense"><FiPlusCircle size={20}/></button>
        </form>
        <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
          {expenseItems.length === 0 && <p className="text-sm text-theme-text-secondary text-center py-2">No expenses added yet.</p>}
          {expenseItems.map(item => (
            <div key={item.id} className={itemStyle}>
              <span>{item.name} <span className="text-xs text-gray-400">({item.category})</span></span>
              <div className="flex items-center">
                <span className="mr-3 font-medium">{formatCurrency(item.amount, selectedCurrency?.symbol)}</span>
                <button onClick={() => deleteExpenseItem(item.id)} className={deleteButtonStyle} aria-label="Delete Expense Item"><FiTrash2 size={18}/></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summary Section */}
      <section className="p-4 bg-theme-input-bg/30 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-brand-secondary mb-6 text-center">Budget Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
            <div className="p-3 bg-theme-panel-dark/50 rounded-md">
                <p className="text-md text-theme-text-secondary">Total Income</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(totalIncome, selectedCurrency?.symbol)}</p>
            </div>
            <div className="p-3 bg-theme-panel-dark/50 rounded-md">
                <p className="text-md text-theme-text-secondary">Total Expenses</p>
                <p className="text-2xl font-bold text-red-400">{formatCurrency(totalExpenses, selectedCurrency?.symbol)}</p>
            </div>
            <div className={`p-3 bg-theme-panel-dark/50 rounded-md ${balance >= 0 ? 'border-green-500' : 'border-red-500'} border-2`}>
                <p className="text-md text-theme-text-secondary">Balance</p>
                <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>{formatCurrency(balance, selectedCurrency?.symbol)}</p>
            </div>
        </div>
        {(incomeItems.length > 0 || expenseItems.length > 0) && chartLabels.length > 0 && ( // Only show chart if there are expenses to show
            <div className="mt-8 h-72 md:h-80 flex justify-center">
                 <div style={{ position: 'relative', height: '100%', width: '100%', maxWidth: '350px' }}> {/* Ensure chart respects container */}
                    <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                </div>
            </div>
        )}
      </section>
    </div>
  );
};

export default BudgetPlanner;