// src/components/calculators/InterestRateCalculator/InterestRateOutput.jsx
import React from 'react';

const formatPercentage = (percentage) => {
  if (percentage === undefined || percentage === null || isNaN(percentage) || !isFinite(percentage)) return 'N/A';
  return `${percentage.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
};
const formatCurrency = (amount, currencySymbol) => {
  if (amount === undefined || amount === null || isNaN(amount)) return `${currencySymbol || ''}0.00`;
  return `<span class="math-inline">\{currencySymbol \|\| ''\}</span>{amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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

const InterestRateOutput = ({ results, currencySymbol, inputs }) => {
  if (!results) {
    return (
      <div className="text-center text-theme-text-secondary py-10">
        Enter details to calculate the interest rate.
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

  const { annualRate, calculatedSi } = results;

  return (
    <div className="space-y-5">
      {inputs && (
          <>
              <ResultRowDisplay label="Principal Amount:" value={formatCurrency(inputs.principal, currencySymbol)} textColorClass="text-gray-300"/>
              <ResultRowDisplay label="Simple Interest Earned:" value={formatCurrency(calculatedSi, currencySymbol)} textColorClass="text-gray-300"/>
              <ResultRowDisplay label="Time Period:" value={`${inputs.tenureYears} Years`} textColorClass="text-gray-300"/>
          </>
      )}
      <ResultRowDisplay label="Calculated Annual Simple Interest Rate:" value={formatPercentage(annualRate)} isTotal />
      <div className="mt-4 p-3 bg-theme-input-bg rounded-md text-sm text-theme-text-secondary">
        <p>This is the annual simple interest rate required to achieve the specified interest or total amount given the principal and time period.</p>
      </div>
    </div>
  );
};

export default InterestRateOutput;