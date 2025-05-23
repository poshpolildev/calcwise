// src/components/calculators/RdCalculator/RdInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const RdInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [monthlyDeposit, setMonthlyDeposit] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [tenureYears, setTenureYears] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!monthlyDeposit || parseFloat(monthlyDeposit) <= 0) newErrors.monthlyDeposit = 'Deposit must be positive.';
    if (annualRate === '' || parseFloat(annualRate) < 0) newErrors.annualRate = 'Rate must be zero or positive.';
    if (parseFloat(annualRate) > 25) newErrors.annualRate = 'Rate seems unusually high for an RD (max 25%).';
    if (!tenureYears || parseFloat(tenureYears) <= 0) newErrors.tenureYears = 'Tenure must be positive.';
    if (parseFloat(tenureYears) > 20) newErrors.tenureYears = 'Tenure seems unusually long for an RD (max 20 years).';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        monthlyDeposit: parseFloat(monthlyDeposit),
        annualRate: parseFloat(annualRate),
        tenureYears: parseFloat(tenureYears),
      });
    }
  };

  return (
    // Panel styling and main title removed. App.jsx handles them.
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <InputField
        label="Monthly Deposit Amount"
        id="rdMonthlyDeposit"
        type="number"
        value={monthlyDeposit}
        onChange={(e) => setMonthlyDeposit(e.target.value)}
        placeholder="e.g., 1000"
        error={errors.monthlyDeposit}
        unit={selectedCurrency?.symbol || ''}
        tooltip="Amount deposited each month."
      />
      <InputField
        label="Annual Interest Rate"
        id="rdAnnualRate"
        type="number"
        value={annualRate}
        onChange={(e) => setAnnualRate(e.target.value)}
        placeholder="e.g., 7"
        error={errors.annualRate}
        unit="%"
        tooltip="Fixed annual interest rate."
      />
      <InputField
        label="Tenure"
        id="rdTenureYears"
        type="number"
        value={tenureYears}
        onChange={(e) => setTenureYears(e.target.value)}
        placeholder="e.g., 5"
        error={errors.tenureYears}
        unit="years"
        tooltip="Duration of the recurring deposit."
      />
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Calculate RD Maturity
      </Button>
    </form>
  );
};

export default RdInput;