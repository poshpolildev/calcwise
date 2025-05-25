// src/components/calculators/SimpleInterestCalculator/SimpleInterestOutput.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
// Ensure ChartJS and necessary elements are registered if not done globally
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const formatCurrency = (amount, currencySymbol) => {
  if (amount === undefined || amount === null || isNaN(amount)) return `${currencySymbol || ''}0.00`;
  return `${currencySymbol || ''}${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const ResultRowDisplay = ({ label, value, isTotal, textColorClass, isEmphasized }) => (
  <div className={`flex justify-between items-center py-2 ${isEmphasized ? 'border-t border-b border-theme-border mt-1 mb-1' : 'border-b border-gray-700/50'}`}>
    <span className={`text-sm ${textColorClass || 'text-theme-text-secondary'}`}>
      {label}
    </span>
    <span className={`font-semibold ${isTotal ? 'text-xl text-brand-primary' : isEmphasized ? 'text-lg text-theme-text-primary' : textColorClass || 'text-theme-text-primary'}`}>
      {value}
    </span>
  </div>
);

const SimpleInterestOutput = ({ results, currencySymbol, principalAmount }) => {
  if (!results) {
    return (
      <div className="text-center text-theme-text-secondary py-10">
        Enter values and click calculate to see results.
      </div>
    );
  }
  if (results.error) {
    return (
      <div className="text-center text-red-400 py-10">
        Error: {results.error}
      </div>
    );
  }

  const { simpleInterest, totalAmount } = results;

  const chartData = {
    labels: ['Breakdown'],
    datasets: [
      {
        label: 'Principal Amount',
        data: [principalAmount],
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // theme-accent
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Simple Interest',
        data: [simpleInterest],
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // brand-secondary (green)
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true, maintainAspectRatio: false, indexAxis: 'y',
    scales: {
      x: { stacked: true, ticks: { color: '#9CA3AF' }, grid: { color: '#374151' }, title: { display: true, text: `Amount (${currencySymbol})`, color: '#F3F4F6' } },
      y: { stacked: true, ticks: { color: '#9CA3AF' }, grid: { display: false } },
    },
    plugins: {
      legend: { position: 'top', labels: { color: '#F3F4F6' } },
      title: { display: true, text: 'Principal vs. Simple Interest', color: '#F3F4F6', font: { size: 16 } },
      tooltip: { callbacks: { label: function (context) { let label = context.dataset.label || ''; if (label) { label += ': '; } if (context.parsed.x !== null) { label += formatCurrency(context.parsed.x, currencySymbol); } return label; } } }
    },
  };

  return (
    // Panel styling and main title removed. App.jsx handles them.
    <div className="space-y-5">
      <ResultRowDisplay label="Principal Amount:" value={formatCurrency(principalAmount, currencySymbol)} textColorClass="text-blue-400"/>
      <ResultRowDisplay label="Simple Interest Earned:" value={formatCurrency(simpleInterest, currencySymbol)} textColorClass="text-green-400" />
      <ResultRowDisplay label="Total Amount (Principal + Interest):" value={formatCurrency(totalAmount, currencySymbol)} isTotal />
      
      {principalAmount > 0 && simpleInterest >= 0 && (
        <div className="mt-6 h-48 md:h-56">
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default SimpleInterestOutput;