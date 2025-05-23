// src/components/calculators/MortgageCalculator/MortgageInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const MortgageInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [homePrice, setHomePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [loanTenureYears, setLoanTenureYears] = useState('30');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!homePrice || parseFloat(homePrice) <= 0) newErrors.homePrice = 'Price must be positive.';
    if (downPayment === '' || parseFloat(downPayment) < 0) newErrors.downPayment = 'Must be non-negative.';
    if (parseFloat(downPayment) >= parseFloat(homePrice)) newErrors.downPayment = 'Down payment should be less than home price.';
    if (annualRate === '' || parseFloat(annualRate) < 0) newErrors.annualRate = 'Rate must be non-negative.';
    if (parseFloat(annualRate) > 30) newErrors.annualRate = 'Rate max 30%.';
    if (!loanTenureYears || parseFloat(loanTenureYears) <= 0) newErrors.loanTenureYears = 'Tenure must be positive.';
    if (parseFloat(loanTenureYears) > 50) newErrors.loanTenureYears = 'Max tenure 50 years.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        homePrice: parseFloat(homePrice),
        downPayment: parseFloat(downPayment),
        annualRate: parseFloat(annualRate),
        tenureYears: parseFloat(loanTenureYears),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <InputField
        label="Home Price"
        id="mortHomePrice"
        type="number"
        value={homePrice}
        onChange={(e) => setHomePrice(e.target.value)}
        placeholder="e.g., 3000000"
        error={errors.homePrice}
        unit={selectedCurrency?.symbol || ''}
      />
      <InputField
        label="Down Payment"
        id="mortDownPayment"
        type="number"
        value={downPayment}
        onChange={(e) => setDownPayment(e.target.value)}
        placeholder="e.g., 600000"
        error={errors.downPayment}
        unit={selectedCurrency?.symbol || ''}
      />
      <InputField
        label="Annual Interest Rate"
        id="mortAnnualRate"
        type="number"
        value={annualRate}
        onChange={(e) => setAnnualRate(e.target.value)}
        placeholder="e.g., 7.5"
        error={errors.annualRate}
        unit="%"
      />
      <InputField
        label="Loan Tenure"
        id="mortLoanTenureYears"
        type="number"
        value={loanTenureYears}
        onChange={(e) => setLoanTenureYears(e.target.value)}
        placeholder="e.g., 30"
        error={errors.loanTenureYears}
        unit="years"
      />
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Calculate Mortgage EMI
      </Button>
    </form>
  );
};

export default MortgageInput;