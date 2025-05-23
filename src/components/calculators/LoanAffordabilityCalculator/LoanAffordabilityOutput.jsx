// src/components/calculators/LoanAffordabilityCalculator/LoanAffordabilityOutput.jsx
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

const LoanAffordabilityOutput = ({ results, currencySymbol, inputs }) => {
  if (!results) {
    return (
      <div className="text-center text-theme-text-secondary py-10">
        Enter your financial details to estimate affordability.
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
  if (results.maxDtiReached) {
    return (
      <div className="p-4 text-center text-orange-400">
        <p className="font-semibold text-lg mb-2">Affordability Alert!</p>
        <p>{results.message || "Your existing debts already utilize your desired DTI ratio."}</p>
        <p className="mt-2 text-sm">You might need to reduce existing debts or adjust your DTI expectations to afford a new loan.</p>
      </div>
    );
  }

  const { affordableEmi, affordableLoanAmount, allowableTotalMonthlyDebt } = results;

  return (
    <div className="space-y-5">
      {inputs && (
          <ResultRowDisplay label="Based on DTI of:" value={`${inputs.desiredDtiRatio}%`} textColorClass="text-gray-300" />
      )}
      <ResultRowDisplay label="Allowable Total Monthly Debt:" value={formatCurrency(allowableTotalMonthlyDebt, currencySymbol)} textColorClass="text-gray-300" />
      <ResultRowDisplay label="Max. Affordable EMI for New Loan:" value={formatCurrency(affordableEmi, currencySymbol)} isEmphasized />
      <ResultRowDisplay label="Estimated Affordable Loan Amount:" value={formatCurrency(affordableLoanAmount, currencySymbol)} isTotal />

      <div className="mt-4 p-3 bg-theme-input-bg rounded-md text-sm text-theme-text-secondary">
        <p className="font-semibold text-theme-text-primary">Disclaimer:</p>
        <p>This is an estimate. Actual loan amount depends on lender policies, credit score, and other factors.
        The affordable EMI is the maximum you might be able to pay for the new loan while staying within your desired DTI ratio.
        </p>
      </div>
    </div>
  );
};

export default LoanAffordabilityOutput;