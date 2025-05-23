// src/components/calculators/BreakEvenCalculator/BreakEvenOutput.jsx
import React from 'react';

const formatCurrency = (amount, currencySymbol) => {
  if (amount === undefined || amount === null || isNaN(amount) || !isFinite(amount)) return `N/A`;
  return `<span class="math-inline">\{currencySymbol \|\| ''\}</span>{amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatUnits = (units) => {
  if (units === undefined || units === null || isNaN(units) || !isFinite(units)) return 'N/A';
  return units % 1 === 0 ? units.toLocaleString('en-IN') : units.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const ResultRowDisplay = ({ label, value, isTotal, textColorClass, isEmphasized, unitSuffix = '' }) => (
    <div className={`flex justify-between items-center py-2 ${isEmphasized ? 'border-t border-b border-theme-border mt-1 mb-1' : 'border-b border-gray-700/50'}`}>
    <span className={`text-sm ${textColorClass || 'text-theme-text-secondary'}`}>
      {label}
    </span>
    <span className={`font-semibold ${isTotal ? 'text-xl text-brand-primary' : isEmphasized ? 'text-lg text-theme-text-primary' : textColorClass || 'text-theme-text-primary'}`}>
      {value}{unitSuffix}
    </span>
  </div>
);

const BreakEvenOutput = ({ results, currencySymbol }) => {
  if (!results) {
    return (
      <div className="text-center text-theme-text-secondary py-10">
        Enter cost and price details to calculate.
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

  const { breakEvenUnits, breakEvenRevenue, contributionMarginPerUnit } = results;

  return (
    // Panel styling and main title removed. App.jsx handles them.
    <div className="space-y-5">
      <ResultRowDisplay label="Contribution Margin Per Unit:" value={formatCurrency(contributionMarginPerUnit, currencySymbol)} textColorClass="text-gray-300" />
      <ResultRowDisplay label="Break-Even Point in Units:" value={formatUnits(breakEvenUnits)} unitSuffix=" units" isTotal />
      <ResultRowDisplay label="Break-Even Point in Revenue:" value={formatCurrency(breakEvenRevenue, currencySymbol)} isTotal />

      <div className="mt-4 p-3 bg-theme-input-bg rounded-md text-sm text-theme-text-secondary">
        <p>
          To cover all costs, you need to sell approximately {formatUnits(breakEvenUnits)} units,
          generating revenue of {formatCurrency(breakEvenRevenue, currencySymbol)}.
          Each unit sold beyond this point contributes {formatCurrency(contributionMarginPerUnit, currencySymbol)} to profit.
        </p>
      </div>
    </div>
  );
};

export default BreakEvenOutput;