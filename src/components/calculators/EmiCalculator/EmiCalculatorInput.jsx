// src/components/calculators/EmiCalculator/EmiCalculatorInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const EmiCalculatorInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!loanAmount || parseFloat(loanAmount) <= 0) newErrors.loanAmount = 'Loan amount must be positive.';
    if (!interestRate || parseFloat(interestRate) < 0) newErrors.interestRate = 'Interest rate must be non-negative.';
    if (parseFloat(interestRate) > 100) newErrors.interestRate = 'Interest rate seems too high (max 100%).';
    if (!loanTenure || parseFloat(loanTenure) <= 0) newErrors.loanTenure = 'Loan tenure must be positive.';
    if (parseFloat(loanTenure) > 50) newErrors.loanTenure = 'Loan tenure seems too long (max 50 years).';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        principal: parseFloat(loanAmount),
        annualRate: parseFloat(interestRate),
        tenureYears: parseFloat(loanTenure),
      });
    }
  };

  return (
    // Panel styling and main title are removed. App.jsx handles them.
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <InputField
        label="My Loan Amount is"
        id="loanAmount"
        type="number"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
        placeholder="e.g., 100000"
        error={errors.loanAmount}
        unit={selectedCurrency?.symbol || ''}
        tooltip="The total amount of money you are borrowing."
      />
      <InputField
        label="My Interest Rate is"
        id="interestRate"
        type="number"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        placeholder="e.g., 8.5"
        error={errors.interestRate}
        unit="%"
        tooltip="Annual interest rate (percentage)."
      />
      <InputField
        label="Loan Tenure is"
        id="loanTenure"
        type="number"
        value={loanTenure}
        onChange={(e) => setLoanTenure(e.target.value)}
        placeholder="e.g., 5"
        error={errors.loanTenure}
        unit="years"
        tooltip="The duration of the loan in years."
      />
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Calculate My EMI
      </Button>
    </form>
  );
};

export default EmiCalculatorInput;