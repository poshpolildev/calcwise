// src/components/calculators/SipCalculator/SipInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const SipInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [tenureYears, setTenureYears] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!monthlyInvestment || parseFloat(monthlyInvestment) <= 0) newErrors.monthlyInvestment = 'Investment must be positive.';
    if (annualRate === '' || parseFloat(annualRate) < 0) newErrors.annualRate = 'Rate must be zero or positive.';
    if (parseFloat(annualRate) > 100) newErrors.annualRate = 'Rate seems unusually high (max 100%).';
    if (!tenureYears || parseFloat(tenureYears) <= 0) newErrors.tenureYears = 'Tenure must be positive.';
    if (parseFloat(tenureYears) > 70) newErrors.tenureYears = 'Tenure seems unusually long (max 70 years).';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        monthlyInvestment: parseFloat(monthlyInvestment),
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
        label="Monthly Investment Amount"
        id="sipMonthlyInvestment"
        type="number"
        value={monthlyInvestment}
        onChange={(e) => setMonthlyInvestment(e.target.value)}
        placeholder="e.g., 5000"
        error={errors.monthlyInvestment}
        unit={selectedCurrency?.symbol || ''}
        tooltip="Amount you plan to invest each month."
      />
      <InputField
        label="Expected Annual Rate of Return"
        id="sipAnnualRate"
        type="number"
        value={annualRate}
        onChange={(e) => setAnnualRate(e.target.value)}
        placeholder="e.g., 12"
        error={errors.annualRate}
        unit="%"
        tooltip="The annual growth rate you expect from your investments."
      />
      <InputField
        label="Investment Duration"
        id="sipTenureYears"
        type="number"
        value={tenureYears}
        onChange={(e) => setTenureYears(e.target.value)}
        placeholder="e.g., 10"
        error={errors.tenureYears}
        unit="years"
        tooltip="Total number of years you plan to stay invested."
      />
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Calculate SIP Returns
      </Button>
    </form>
  );
};

export default SipInput;