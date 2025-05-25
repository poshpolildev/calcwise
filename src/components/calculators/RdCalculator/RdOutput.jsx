// src/components/calculators/RdCalculator/RdOutput.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
// ADD THESE IMPORTS AND REGISTRATION:
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
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

const RdOutput = ({ results, currencySymbol }) => {
  if (!results) {
    return (
      <div className="text-center text-theme-text-secondary py-10">
        Enter RD details to see maturity value.
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

  const { totalDeposited, totalInterest, maturityValue } = results;

  const chartData = {
    labels: ['Total Deposited', 'Total Interest Earned'],
    datasets: [
      {
        data: [Math.max(0, totalDeposited || 0), Math.max(0, totalInterest || 0)],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)', // theme-accent
          'rgba(16, 185, 129, 0.7)', // brand-secondary
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#F3F4F6' } },
      title: { display: true, text: 'Deposit Breakdown', color: '#F3F4F6', font: { size: 16 } },
      tooltip: { callbacks: { label: function (context) { let label = context.label || ''; if (label) { label += ': '; } if (context.parsed !== null) { label += formatCurrency(context.parsed, currencySymbol); } return label; } } }
    },
  };

  return (
    <div className="space-y-5">
      <ResultRowDisplay label="Total Amount Deposited:" value={formatCurrency(totalDeposited, currencySymbol)} textColorClass="text-blue-400" />
      <ResultRowDisplay label="Total Interest Earned:" value={formatCurrency(totalInterest, currencySymbol)} textColorClass="text-green-400" />
      <ResultRowDisplay label="Maturity Value:" value={formatCurrency(maturityValue, currencySymbol)} isTotal />
      
      {(totalDeposited > 0 || totalInterest > 0) && (
        <div className="mt-6 h-64 md:h-72 flex justify-center">
          <div style={{ width: '100%', maxWidth: '280px' }}>
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RdOutput;