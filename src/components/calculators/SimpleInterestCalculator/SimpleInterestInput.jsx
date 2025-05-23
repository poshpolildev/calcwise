// src/components/calculators/SimpleInterestCalculator/SimpleInterestInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const SimpleInterestInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [principal, setPrincipal] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [tenureYears, setTenureYears] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!principal || parseFloat(principal) <= 0) newErrors.principal = 'Principal must be positive.';
    if (annualRate === '' || parseFloat(annualRate) < 0) newErrors.annualRate = 'Rate must be zero or positive.';
    if (parseFloat(annualRate) > 1000) newErrors.annualRate = 'Rate seems unusually high.';
    if (!tenureYears || parseFloat(tenureYears) <= 0) newErrors.tenureYears = 'Tenure must be positive.';
    if (parseFloat(tenureYears) > 100) newErrors.tenureYears = 'Tenure seems unusually long.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        principal: parseFloat(principal),
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
        label="Principal Amount"
        id="principal"
        type="number"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
        placeholder="e.g., 10000"
        error={errors.principal}
        unit={selectedCurrency?.symbol || ''}
        tooltip="The initial amount of money."
      />
      <InputField
        label="Annual Interest Rate"
        id="annualRate"
        type="number"
        value={annualRate}
        onChange={(e) => setAnnualRate(e.target.value)}
        placeholder="e.g., 5"
        error={errors.annualRate}
        unit="%"
        tooltip="The rate of interest per year."
      />
      <InputField
        label="Time Period"
        id="tenureYears"
        type="number"
        value={tenureYears}
        onChange={(e) => setTenureYears(e.target.value)}
        placeholder="e.g., 2"
        error={errors.tenureYears}
        unit="years"
        tooltip="Duration for which the money is borrowed/invested."
      />
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Calculate Simple Interest
      </Button>
    </form>
  );
};

export default SimpleInterestInput;