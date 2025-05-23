// src/components/calculators/AmortizationCalculator/AmortizationOutput.jsx
import React from 'react';

const formatCurrency = (amount, currencySymbol) => {
  if (amount === undefined || amount === null || isNaN(amount)) return `${currencySymbol || ''}0.00`;
  return `<span class="math-inline">\{currencySymbol \|\| ''\}</span>{amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const AmortizationOutput = ({ results, currencySymbol }) => {
  if (!results) {
    return (
      <div className="text-center text-theme-text-secondary py-10">
        Enter loan details to generate the schedule.
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

  const { schedule, monthlyPayment, totalInterest, totalPayment } = results;

  return (
    // Panel styling and main title removed. App.jsx handles them.
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-center">
          <div className="p-2 bg-theme-input-bg rounded">
              <p className="text-xs text-theme-text-secondary">Monthly EMI</p>
              <p className="text-md font-semibold text-brand-primary">{formatCurrency(monthlyPayment, currencySymbol)}</p>
          </div>
          <div className="p-2 bg-theme-input-bg rounded">
              <p className="text-xs text-theme-text-secondary">Total Interest</p>
              <p className="text-md font-semibold text-red-400">{formatCurrency(totalInterest, currencySymbol)}</p>
          </div>
          <div className="p-2 bg-theme-input-bg rounded">
              <p className="text-xs text-theme-text-secondary">Total Payment</p>
              <p className="text-md font-semibold text-orange-400">{formatCurrency(totalPayment, currencySymbol)}</p>
          </div>
      </div>

      <div className="overflow-x-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700 border border-theme-border rounded-md">
        <table className="min-w-full divide-y divide-theme-border">
          <thead className="bg-theme-input-bg sticky top-0"> {/* Use input-bg for header for contrast */}
            <tr>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-theme-text-secondary uppercase tracking-wider">Month</th>
              <th className="px-3 py-2.5 text-right text-xs font-medium text-theme-text-secondary uppercase tracking-wider">Beginning Balance</th>
              <th className="px-3 py-2.5 text-right text-xs font-medium text-theme-text-secondary uppercase tracking-wider">EMI</th>
              <th className="px-3 py-2.5 text-right text-xs font-medium text-theme-text-secondary uppercase tracking-wider">Principal</th>
              <th className="px-3 py-2.5 text-right text-xs font-medium text-theme-text-secondary uppercase tracking-wider">Interest</th>
              <th className="px-3 py-2.5 text-right text-xs font-medium text-theme-text-secondary uppercase tracking-wider">Ending Balance</th>
            </tr>
          </thead>
          <tbody className="bg-theme-panel-dark divide-y divide-theme-border"> {/* Panel dark for rows or input-bg/lighter? */}
            {schedule.map((row) => (
              <tr key={row.month} className="hover:bg-theme-border/30 transition-colors duration-150">
                <td className="px-3 py-2.5 whitespace-nowrap text-xs text-theme-text-secondary">{row.month}</td>
                <td className="px-3 py-2.5 whitespace-nowrap text-xs text-theme-text-secondary text-right">{formatCurrency(row.beginningBalance, currencySymbol)}</td>
                <td className="px-3 py-2.5 whitespace-nowrap text-xs text-brand-primary text-right">{formatCurrency(row.payment, currencySymbol)}</td>
                <td className="px-3 py-2.5 whitespace-nowrap text-xs text-green-400 text-right">{formatCurrency(row.principalPaid, currencySymbol)}</td>
                <td className="px-3 py-2.5 whitespace-nowrap text-xs text-red-400 text-right">{formatCurrency(row.interestPaid, currencySymbol)}</td>
                <td className="px-3 py-2.5 whitespace-nowrap text-xs text-theme-text-secondary text-right">{formatCurrency(row.endingBalance, currencySymbol)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AmortizationOutput;