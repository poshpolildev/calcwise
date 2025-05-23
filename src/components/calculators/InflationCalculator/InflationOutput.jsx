// src/components/calculators/InflationCalculator/InflationOutput.jsx
import React from 'react';

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

const InflationOutput = ({ results, currencySymbol, calculationType, originalAmount, years, rate }) => {
  if (!results) {
    return (
      <div className="text-center text-theme-text-secondary py-10">
        Enter details to calculate inflation impact.
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

  let resultLabel = "";
  let resultValue = 0;
  let explanation = "";

  if (calculationType === 'futureCost' && results.futureCost !== undefined) {
    resultLabel = `Adjusted Cost in ${years} Years:`;
    resultValue = results.futureCost;
    explanation = `An item costing ${formatCurrency(originalAmount, currencySymbol)} today, with an annual inflation rate of ${rate}%, will likely cost ${formatCurrency(resultValue, currencySymbol)} in ${years} years.`;
  } else if (calculationType === 'presentValue' && results.presentValue !== undefined) {
    resultLabel = `Value in Today's Terms:`;
    resultValue = results.presentValue;
    explanation = `${formatCurrency(originalAmount, currencySymbol)} in ${years} years, considering an annual inflation rate of ${rate}%, is equivalent to ${formatCurrency(resultValue, currencySymbol)} today.`;
  } else {
    return (
      <div className="text-center text-theme-text-secondary py-10">
        Calculation error or unexpected result format.
      </div>
    );
  }

  return (
    // Panel styling and main title removed. App.jsx handles them.
    <div className="space-y-5">
      <ResultRowDisplay label={resultLabel} value={formatCurrency(resultValue, currencySymbol)} isTotal />

      <div className="mt-4 p-3 bg-theme-input-bg rounded-md text-sm text-theme-text-secondary"> {/* Changed background for contrast */}
        <p className="font-semibold mb-1 text-theme-text-primary">Summary:</p>
        <p>{explanation}</p>
      </div>
    </div>
  );
};

export default InflationOutput;