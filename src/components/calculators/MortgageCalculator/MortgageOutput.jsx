// src/components/calculators/MortgageCalculator/MortgageOutput.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
// ADD THESE IMPORTS AND REGISTRATION:
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// END OF ADDED IMPORTS AND REGISTRATION

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

const MortgageOutput = ({ results, currencySymbol }) => {
  if (!results) {
    return (
      <div className="text-center text-theme-text-secondary py-10">
        Enter mortgage details to calculate EMI.
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

  const { loanAmount, monthlyPayment, totalInterest, totalPayment } = results;

  const chartData = {
    labels: ['Loan Breakdown'],
    datasets: [
      {
        label: 'Loan Amount',
        data: [loanAmount],
        backgroundColor: 'rgba(59, 130, 246, 0.7)', 
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Interest Paid',
        data: [totalInterest],
        backgroundColor: 'rgba(239, 68, 68, 0.6)', 
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

 const chartOptions = {
    responsive: true, maintainAspectRatio: false, indexAxis: 'y',
    scales: {
      x: { stacked: true, ticks: { color: '#9CA3AF' }, grid: { color: '#374151' }, title: { display: true, text: `Amount (${currencySymbol})`, color: '#F3F4F6' } },
      y: { stacked: true, ticks: { color: '#9CA3AF' }, grid: { display: false } }
    },
    plugins: {
      legend: { position: 'top', labels: { color: '#F3F4F6'} },
      title: { display: true, text: 'Loan Amount vs. Total Interest', color: '#F3F4F6', font: { size: 16 } },
      tooltip: { callbacks: { label: function(c) { let l = c.dataset.label || ''; if(l){l+=': ';} if(c.parsed.x !== null){l+=formatCurrency(c.parsed.x,currencySymbol);} return l; } } }
    },
  };

  return (
    <div className="space-y-5">
      <ResultRowDisplay label="Loan Amount:" value={formatCurrency(loanAmount, currencySymbol)} textColorClass="text-blue-400"/>
      <ResultRowDisplay label="Monthly EMI:" value={formatCurrency(monthlyPayment, currencySymbol)} isTotal />
      <ResultRowDisplay label="Total Interest Payable:" value={formatCurrency(totalInterest, currencySymbol)} textColorClass="text-red-400" />
      <ResultRowDisplay label="Total Amount Payable (Loan + Interest):" value={formatCurrency(totalPayment, currencySymbol)} isEmphasized textColorClass="text-orange-400" />
      
      {loanAmount > 0 && totalInterest >= 0 && (
        <div className="mt-6 h-48 md:h-56">
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
      <div className="mt-4 p-3 bg-theme-input-bg rounded-md text-sm text-theme-text-secondary">
        <p>This EMI is for the loan principal and interest only. Actual monthly housing costs may also include property taxes, home insurance (PITI), and HOA fees if applicable.</p>
      </div>
    </div>
  );
};

export default MortgageOutput;