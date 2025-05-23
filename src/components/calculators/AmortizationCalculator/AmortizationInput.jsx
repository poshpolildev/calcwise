// src/components/calculators/AmortizationCalculator/AmortizationInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const AmortizationInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [loanAmount, setLoanAmount] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [loanTenureYears, setLoanTenureYears] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!loanAmount || parseFloat(loanAmount) <= 0) newErrors.loanAmount = 'Amount must be positive.';
    if (annualRate === '' || parseFloat(annualRate) < 0) newErrors.annualRate = 'Rate must be non-negative.';
    if (parseFloat(annualRate) > 100) newErrors.annualRate = 'Rate max 100%.';
    if (!loanTenureYears || parseFloat(loanTenureYears) <= 0) newErrors.loanTenureYears = 'Tenure must be positive.';
    if (parseFloat(loanTenureYears) > 50) newErrors.loanTenureYears = 'Max tenure 50 years.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        principal: parseFloat(loanAmount),
        annualRate: parseFloat(annualRate),
        tenureYears: parseFloat(loanTenureYears),
      });
    }
  };

  return (
    // Panel styling and main title removed. App.jsx handles them.
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <InputField
        label="Loan Amount"
        id="amortLoanAmount"
        type="number"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
        placeholder="e.g., 100000"
        error={errors.loanAmount}
        unit={selectedCurrency?.symbol || ''}
      />
      <InputField
        label="Annual Interest Rate"
        id="amortAnnualRate"
        type="number"
        value={annualRate}
        onChange={(e) => setAnnualRate(e.target.value)}
        placeholder="e.g., 8.5"
        error={errors.annualRate}
        unit="%"
      />
      <InputField
        label="Loan Tenure"
        id="amortLoanTenureYears"
        type="number"
        value={loanTenureYears}
        onChange={(e) => setLoanTenureYears(e.target.value)}
        placeholder="e.g., 5"
        error={errors.loanTenureYears}
        unit="years"
      />
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Generate Amortization Schedule
      </Button>
    </form>
  );
};

export default AmortizationInput;