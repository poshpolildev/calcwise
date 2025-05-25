// src/components/calculators/EmiCalculator/EmiCalculatorOutput.jsx
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

const EmiCalculatorOutput = ({ results, currencySymbol, principal }) => {
  if (!results) {
    return (
      <div className="text-center text-theme-text-secondary py-10">
        <p>Enter your loan details to see the EMI calculation.</p>
      </div>
    );
  }

  if (results.error) {
    return (
      <div className="text-center text-red-400 py-10">
        <p>Error: {results.error}</p>
      </div>
    );
  }

  const { emi, totalInterest, totalPayable } = results;

  const chartData = {
    labels: ['Breakdown'],
    datasets: [
      {
        label: 'Principal Loan Amount',
        data: [principal],
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // theme-accent
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Interest Paid',
        data: [totalInterest],
        backgroundColor: 'rgba(239, 68, 68, 0.6)', // A red color
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

 const chartOptions = {
    responsive: true, maintainAspectRatio: false, indexAxis: 'y',
    scales: { // This 'scales' configuration requires CategoryScale and LinearScale to be registered
      x: { stacked: true, ticks: { color: '#9CA3AF' }, grid: { color: '#374151' }, title: { display: true, text: `Amount (${currencySymbol})`, color: '#F3F4F6' } },
      y: { stacked: true, ticks: { color: '#9CA3AF' }, grid: { display: false } }
    },
    plugins: {
      legend: { position: 'top', labels: { color: '#F3F4F6'} },
      title: { display: true, text: 'Loan Principal vs. Total Interest', color: '#F3F4F6', font: { size: 16 } },
      tooltip: { callbacks: { label: function(c) { let l = c.dataset.label || ''; if(l){l+=': ';} if(c.parsed.x !== null){l+=formatCurrency(c.parsed.x,currencySymbol);} return l; } } }
    },
  };

  return (
    <div className="space-y-5">
      <ResultRowDisplay label="Monthly EMI" value={formatCurrency(emi, currencySymbol)} isTotal />
      <ResultRowDisplay label="Total Interest Payable" value={formatCurrency(totalInterest, currencySymbol)} textColorClass="text-red-400" />
      <ResultRowDisplay label="Total Amount Payable" value={formatCurrency(totalPayable, currencySymbol)} isEmphasized />

      {principal > 0 && totalInterest >= 0 && (
        <div className="mt-6 h-48 md:h-56">
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default EmiCalculatorOutput;
