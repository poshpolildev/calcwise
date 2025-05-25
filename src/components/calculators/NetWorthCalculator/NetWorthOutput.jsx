// src/components/calculators/NetWorthCalculator/NetWorthOutput.jsx
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

const NetWorthOutput = ({ results, currencySymbol }) => {
  if (!results) {
    return (
      <div className="text-center text-theme-text-secondary py-10">
        Enter your assets and liabilities to calculate net worth.
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

  const { totalAssets, totalLiabilities, netWorth } = results;
  const netWorthColorClass = netWorth >= 0 ? 'text-green-400' : 'text-red-400';

  const chartData = {
    labels: ['Total Assets', 'Total Liabilities'],
    datasets: [
      {
        data: [Math.max(0, totalAssets), Math.max(0, totalLiabilities)],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)', // brand-secondary for Assets (positive)
          'rgba(239, 68, 68, 0.6)',   // red for Liabilities
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#F3F4F6' } },
      title: { display: true, text: 'Assets vs. Liabilities', color: '#F3F4F6', font: { size: 16 } },
      tooltip: { callbacks: { label: function (context) { let label = context.label || ''; if (label) { label += ': '; } if (context.parsed !== null) { label += formatCurrency(context.parsed, currencySymbol); } return label; } } }
    },
  };

  return (
    <div className="space-y-5">
      <ResultRowDisplay label="Total Assets:" value={formatCurrency(totalAssets, currencySymbol)} textColorClass="text-green-400" />
      <ResultRowDisplay label="Total Liabilities:" value={formatCurrency(totalLiabilities, currencySymbol)} textColorClass="text-red-400" />
      <ResultRowDisplay label="Your Estimated Net Worth:" value={formatCurrency(netWorth, currencySymbol)} isTotal textColorClass={netWorthColorClass} />
      
      {(totalAssets > 0 || totalLiabilities > 0) && (
         <div className="mt-6 h-64 md:h-72 flex justify-center">
          <div style={{ width: '100%', maxWidth: '280px' }}>
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
      <div className="mt-4 p-3 bg-theme-input-bg rounded-md text-sm text-theme-text-secondary">
        <p>Net worth is a snapshot of your financial position. A positive net worth is generally desirable. Tracking it over time can show financial progress.</p>
      </div>
    </div>
  );
};

export default NetWorthOutput;