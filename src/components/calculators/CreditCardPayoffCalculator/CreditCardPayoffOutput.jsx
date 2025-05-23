// src/components/calculators/CreditCardPayoffCalculator/CreditCardPayoffOutput.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
// ChartJS.register(ArcElement, Tooltip, Legend, Title);

const formatCurrency = (amount, currencySymbol) => {
  if (amount === undefined || amount === null || isNaN(amount)) return `${currencySymbol || ''}0.00`;
  return `<span class="math-inline">\{currencySymbol \|\| ''\}</span>{amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatMonthsToYearsMonths = (totalMonths) => {
  if (totalMonths === undefined || totalMonths === null || isNaN(totalMonths) || !isFinite(totalMonths) || totalMonths <= 0) return "N/A";
  const years = Math.floor(totalMonths / 12);
  const months = Math.round(totalMonths % 12);
  let result = "";
  if (years > 0) result += `<span class="math-inline">\{years\} year</span>{years > 1 ? 's' : ''} `;
  if (months > 0 || years === 0 && totalMonths === 0) result += `<span class="math-inline">\{months\} month</span>{months !== 1 ? 's' : ''}`;
  else if (months > 0 || years === 0) result += `<span class="math-inline">\{months\} month</span>{months !== 1 ? 's' : ''}`;
  return result.trim() || "0 months";
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

const CreditCardPayoffOutput = ({ results, currencySymbol, calcMode }) => {
  if (!results) {
    return (
      <div className="text-center text-theme-text-secondary py-10">
        Enter your credit card details to see payoff information.
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

  const { totalPrincipalPaid, totalInterestPaid, totalPaid } = results;
  let primaryResultLabel = "";
  let primaryResultValue = "";

  if (calcMode === 'timeToPayoff' && results.monthsToPayOff !== undefined) {
    primaryResultLabel = "Time to Pay Off Debt:";
    primaryResultValue = formatMonthsToYearsMonths(results.monthsToPayOff);
  } else if (calcMode === 'monthlyPaymentNeeded' && results.requiredMonthlyPayment !== undefined) {
    primaryResultLabel = "Required Monthly Payment:";
    primaryResultValue = formatCurrency(results.requiredMonthlyPayment, currencySymbol);
  }

  const chartData = {
    labels: ['Principal Paid', 'Interest Paid'],
    datasets: [
      {
        data: [Math.max(0,totalPrincipalPaid || 0), Math.max(0,totalInterestPaid || 0)],
        backgroundColor: ['rgba(59, 130, 246, 0.7)', 'rgba(239, 68, 68, 0.6)'], // theme-accent, red
        borderColor: ['rgba(59, 130, 246, 1)', 'rgba(239, 68, 68, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#F3F4F6' } }, // theme-text-primary
      title: { display: true, text: 'Payment Breakdown', color: '#F3F4F6', font: { size: 16 } },
      tooltip: { callbacks: { label: function(c) { let l = c.label || ''; if(l){l+=': ';} if(c.parsed !== null){l+=formatCurrency(c.parsed,currencySymbol);} return l;}}}
    },
  };

  return (
    <div className="space-y-5">
      {primaryResultLabel && <ResultRowDisplay label={primaryResultLabel} value={primaryResultValue} isTotal />}
      <ResultRowDisplay label="Total Principal Paid:" value={formatCurrency(totalPrincipalPaid, currencySymbol)} textColorClass="text-blue-400" />
      <ResultRowDisplay label="Total Interest Paid:" value={formatCurrency(totalInterestPaid, currencySymbol)} textColorClass="text-red-400" />
      <ResultRowDisplay label="Total Amount Paid:" value={formatCurrency(totalPaid, currencySymbol)} isEmphasized textColorClass="text-orange-400"/>

      {(totalPrincipalPaid > 0 || totalInterestPaid > 0) && (
        <div className="mt-6 h-64 md:h-72 flex justify-center">
          <div style={{ width: '100%', maxWidth: '280px' }}>
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
      <div className="mt-4 p-3 bg-theme-input-bg rounded-md text-sm text-theme-text-secondary">
        <p>Paying more than the minimum can significantly reduce the time and interest paid on credit card debt.</p>
      </div>
    </div>
  );
};

export default CreditCardPayoffOutput;