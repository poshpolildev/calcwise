// src/components/calculators/CreditCardPayoffCalculator/CreditCardPayoffInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const CALC_MODES = {
  TIME_TO_PAYOFF: 'timeToPayoff',
  MONTHLY_PAYMENT_NEEDED: 'monthlyPaymentNeeded',
};

const CreditCardPayoffInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [calcMode, setCalcMode] = useState(CALC_MODES.TIME_TO_PAYOFF);
  const [balance, setBalance] = useState('');
  const [apr, setApr] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [payoffYears, setPayoffYears] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!balance || parseFloat(balance) <= 0) newErrors.balance = "Balance must be positive.";
    if (apr === '' || parseFloat(apr) < 0) newErrors.apr = "APR must be non-negative.";
    if (parseFloat(apr) > 100) newErrors.apr = "APR seems too high (max 100%).";

    if (calcMode === CALC_MODES.TIME_TO_PAYOFF) {
      if (!monthlyPayment || parseFloat(monthlyPayment) <= 0) newErrors.monthlyPayment = "Payment must be positive.";
    } else { 
      if (!payoffYears || parseFloat(payoffYears) <= 0) newErrors.payoffYears = "Years must be positive.";
      if (parseFloat(payoffYears) > 30) newErrors.payoffYears = "Max 30 years for payoff.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        calcMode,
        balance: parseFloat(balance),
        apr: parseFloat(apr),
        monthlyPayment: calcMode === CALC_MODES.TIME_TO_PAYOFF ? parseFloat(monthlyPayment) : null,
        payoffYears: calcMode === CALC_MODES.MONTHLY_PAYMENT_NEEDED ? parseFloat(payoffYears) : null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-theme-text-secondary mb-2">I want to calculate:</label>
        <div className="flex space-x-2 rounded-md bg-theme-input-bg p-1">
          <button type="button" onClick={() => { setCalcMode(CALC_MODES.TIME_TO_PAYOFF); setErrors({});}}
            className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${calcMode === CALC_MODES.TIME_TO_PAYOFF ? 'bg-brand-primary text-white shadow-md' : 'text-theme-text-secondary hover:bg-theme-border'}`}>
            Time to Pay Off Debt
          </button>
          <button type="button" onClick={() => { setCalcMode(CALC_MODES.MONTHLY_PAYMENT_NEEDED); setErrors({});}}
            className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${calcMode === CALC_MODES.MONTHLY_PAYMENT_NEEDED ? 'bg-brand-primary text-white shadow-md' : 'text-theme-text-secondary hover:bg-theme-border'}`}>
            Monthly Payment Needed
          </button>
        </div>
      </div>

      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <InputField label="Current Credit Card Balance" id="ccBalance" type="number" value={balance} onChange={(e) => setBalance(e.target.value)} placeholder="e.g., 15000" error={errors.balance} unit={selectedCurrency?.symbol} />
      <InputField label="Annual Percentage Rate (APR)" id="ccApr" type="number" value={apr} onChange={(e) => setApr(e.target.value)} placeholder="e.g., 18.9" error={errors.apr} unit="%" />

      {calcMode === CALC_MODES.TIME_TO_PAYOFF && (
        <InputField label="Fixed Monthly Payment" id="ccMonthlyPayment" type="number" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} placeholder="e.g., 500" error={errors.monthlyPayment} unit={selectedCurrency?.symbol} />
      )}
      {calcMode === CALC_MODES.MONTHLY_PAYMENT_NEEDED && (
        <InputField label="Desired Payoff Timeframe" id="ccPayoffYears" type="number" value={payoffYears} onChange={(e) => setPayoffYears(e.target.value)} placeholder="e.g., 3" error={errors.payoffYears} unit="years" />
      )}

      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Calculate
      </Button>
    </form>
  );
};

export default CreditCardPayoffInput;