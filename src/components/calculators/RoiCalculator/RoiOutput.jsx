// src/components/calculators/RoiCalculator/RoiOutput.jsx
import React from 'react';

const formatCurrency = (amount, currencySymbol) => {
  if (amount === undefined || amount === null || isNaN(amount)) return `${currencySymbol || ''}0.00`;
  return `${currencySymbol || ''}${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatPercentage = (percentage) => {
  if (percentage === undefined || percentage === null || isNaN(percentage)) return '0.00%';
  return `${percentage.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
};

const ResultRowDisplay = ({ label, value, isTotal, textColorClass, isEmphasized, unit = '' }) => (
    <div className={`flex justify-between items-center py-2 ${isEmphasized ? 'border-t border-b border-theme-border mt-1 mb-1' : 'border-b border-gray-700/50'}`}>
    <span className={`text-sm ${textColorClass || 'text-theme-text-secondary'}`}>
      {label}
    </span>
    <span className={`font-semibold ${isTotal ? 'text-xl text-brand-primary' : isEmphasized ? 'text-lg text-theme-text-primary' : textColorClass || 'text-theme-text-primary'}`}>
      {value}{unit}
    </span>
  </div>
);

const RoiOutput = ({ results, currencySymbol }) => {
  if (!results) {
    return (
      <div className="text-center text-theme-text-secondary py-10">
        Enter investment details to calculate ROI.
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

  const { netProfit, roiPercentage, annualizedRoiPercentage } = results;
  const profitColorClass = netProfit >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    // Panel styling and main title removed. App.jsx handles them.
    <div className="space-y-5">
      <ResultRowDisplay label="Net Profit / (Loss):" value={formatCurrency(netProfit, currencySymbol)} textColorClass={profitColorClass} />
      <ResultRowDisplay label="Return on Investment (ROI):" value={formatPercentage(roiPercentage)} textColorClass={roiPercentage >= 0 ? 'text-green-400' : 'text-red-400'} />
      {annualizedRoiPercentage !== null && (
        <ResultRowDisplay
          label="Annualized ROI:"
          value={formatPercentage(annualizedRoiPercentage)}
          textColorClass={annualizedRoiPercentage >= 0 ? 'text-green-400' : 'text-red-400'}
          isEmphasized 
        />
      )}
      <div className="mt-4 p-3 bg-theme-input-bg rounded-md text-sm text-theme-text-secondary">
        <p>
          {netProfit >=0 ? 'This investment resulted in a profit. ' : 'This investment resulted in a loss. '}
          The ROI indicates the efficiency of the investment.
          {annualizedRoiPercentage !== null ? ' Annualized ROI shows the geometric average rate of return per year.' : ''}
        </p>
      </div>
    </div>
  );
};

export default RoiOutput;