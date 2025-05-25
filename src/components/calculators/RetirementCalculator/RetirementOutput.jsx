// src/components/calculators/RetirementCalculator/RetirementOutput.jsx
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

const ResultRowDisplay = ({ label, value, isTotal, textColorClass, isEmphasized, unit = '' }) => (
  <div className={`flex justify-between items-center py-2 ${isEmphasized ? 'border-t border-b border-theme-border mt-1 mb-1' : 'border-b border-gray-700/50'}`}>
    <span className={`text-sm ${textColorClass || 'text-theme-text-secondary'}`}>
      {label}
    </span>
    <span className={`font-semibold ${(isTotal || isEmphasized) ? 'text-xl text-brand-primary' : textColorClass || 'text-theme-text-primary'}`}>
      {value}{unit}
    </span>
  </div>
);

const RetirementOutput = ({ results, currencySymbol }) => {
  if (!results) {
    return (
      <div className="text-center text-theme-text-secondary py-10">
        Enter your details to project retirement savings.
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

  const {
    inflatedMonthlyIncomeAtRetirement, corpusNeeded, fvOfCurrentSavings,
    shortfall, requiredMonthlySavings, projectedCorpusWithAdditionalSavings,
    yearsToRetirement, yearsInRetirement
  } = results;

  const isShortfall = shortfall > 0;
  const shortfallColor = isShortfall ? 'text-red-400' : 'text-green-400';

  // Chart data logic as previously provided
  const chartData = {
    labels: ['Retirement Corpus'],
    datasets: [
      {
        label: 'FV of Current Savings',
        data: [fvOfCurrentSavings],
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // Blue
        stack: 'Projected',
      },
      ...(isShortfall && requiredMonthlySavings > 0 ? [{
        label: 'FV from Add. Monthly Savings',
        data: [Math.max(0, projectedCorpusWithAdditionalSavings - fvOfCurrentSavings)],
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // Green
        stack: 'Projected',
      }] : []),
       {
        label: 'Shortfall (if any)',
        data: [isShortfall ? Math.max(0, shortfall) : 0],
        backgroundColor: 'rgba(239, 68, 68, 0.5)', 
        stack: 'Needed',
      },
       { 
        label: !isShortfall ? 'Corpus Met/Exceeded' : ' ', 
        data: [!isShortfall ? corpusNeeded : (corpusNeeded - Math.max(0,shortfall)) ],
        backgroundColor: !isShortfall ? 'rgba(16, 185, 129, 0.3)' : 'rgba(0,0,0,0)', 
        stack: 'Needed',
      },
    ],
  };
  const chartOptions = {
    responsive: true, maintainAspectRatio: false, indexAxis: 'x',
    scales: {
        y: { stacked: true, ticks: { color: '#9CA3AF', callback: value => formatCurrency(value, '') }, grid: { color: '#374151' }, title: { display: true, text: `Amount (${currencySymbol})`, color: '#F3F4F6' } },
        x: { stacked: true, ticks: { color: '#9CA3AF' }, grid: { display: false } }
    },
    plugins: {
      legend: { position: 'top', labels: { color: '#F3F4F6'} },
      title: { display: true, text: 'Retirement Corpus Projection vs. Need', color: '#F3F4F6', font: { size: 16 } },
      tooltip: { callbacks: { label: function(c) { let l = c.dataset.label || ''; if(l.trim()){l+=': ';} if (c.parsed.y !== null) { l += formatCurrency(c.parsed.y, currencySymbol); } return l.trim() ? l : null; } } }
    },
  };

  return (
    <div className="space-y-4">
      <ResultRowDisplay label="Years to Retirement:" value={yearsToRetirement} unit=" years" textColorClass="text-gray-300" />
      <ResultRowDisplay label="Years in Retirement:" value={yearsInRetirement} unit=" years" textColorClass="text-gray-300" />
      <ResultRowDisplay label="Inflated Monthly Income at Retirement:" value={formatCurrency(inflatedMonthlyIncomeAtRetirement, currencySymbol)} textColorClass="text-gray-300" />
      <ResultRowDisplay label="Estimated Retirement Corpus Needed:" value={formatCurrency(corpusNeeded, currencySymbol)} isEmphasized textColorClass="text-orange-400"/>
      <ResultRowDisplay label="Future Value of Current Savings:" value={formatCurrency(fvOfCurrentSavings, currencySymbol)} textColorClass="text-blue-400"/>
      <ResultRowDisplay label={`Projected ${isShortfall ? 'Shortfall' : 'Surplus'}:`} value={formatCurrency(Math.abs(shortfall), currencySymbol)} textColorClass={shortfallColor}/>
      {isShortfall && requiredMonthlySavings > 0 && (
          <ResultRowDisplay label="Required Additional Monthly Savings:" value={formatCurrency(requiredMonthlySavings, currencySymbol)} isTotal/>
      )}
      {projectedCorpusWithAdditionalSavings > 0 && ( // Show if there are any projected savings
           <ResultRowDisplay label="Projected Corpus (with all savings):" value={formatCurrency(projectedCorpusWithAdditionalSavings, currencySymbol)} textColorClass="text-green-400"/>
      )}
      <div className="mt-6 h-72 md:h-80">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="mt-4 p-3 bg-theme-input-bg rounded-md text-sm text-theme-text-secondary">
        <p>This projection helps you understand your retirement readiness. Consider these numbers as estimates and consult a financial advisor for personalized planning.</p>
      </div>
    </div>
  );
};

export default RetirementOutput;