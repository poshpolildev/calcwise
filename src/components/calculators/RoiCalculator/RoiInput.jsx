// src/components/calculators/RoiCalculator/RoiInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const RoiInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [tenureYears, setTenureYears] = useState(''); // Optional
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!initialInvestment || parseFloat(initialInvestment) <= 0) newErrors.initialInvestment = 'Must be positive.';
    if (finalValue === '' || parseFloat(finalValue) < 0) newErrors.finalValue = 'Must be non-negative.';
    if (tenureYears && parseFloat(tenureYears) <= 0) newErrors.tenureYears = 'If provided, must be positive.';
    if (tenureYears && parseFloat(tenureYears) > 100) newErrors.tenureYears = 'Duration too long (max 100 years).';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        initialInvestment: parseFloat(initialInvestment),
        finalValue: parseFloat(finalValue),
        tenureYears: tenureYears ? parseFloat(tenureYears) : null,
      });
    }
  };

  return (
    // Panel styling and main title removed. App.jsx handles them.
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <InputField
        label="Initial Investment Amount"
        id="roiInitialInvestment"
        type="number"
        value={initialInvestment}
        onChange={(e) => setInitialInvestment(e.target.value)}
        placeholder="e.g., 10000"
        error={errors.initialInvestment}
        unit={selectedCurrency?.symbol || ''}
        tooltip="The total cost of the investment."
      />
      <InputField
        label="Final Value of Investment"
        id="roiFinalValue"
        type="number"
        value={finalValue}
        onChange={(e) => setFinalValue(e.target.value)}
        placeholder="e.g., 15000"
        error={errors.finalValue}
        unit={selectedCurrency?.symbol || ''}
        tooltip="The current or sale value of the investment."
      />
      <InputField
        label="Investment Duration (Optional)"
        id="roiTenureYears"
        type="number"
        value={tenureYears}
        onChange={(e) => setTenureYears(e.target.value)}
        placeholder="e.g., 3 (for Annualized ROI)"
        error={errors.tenureYears}
        unit="years"
        tooltip="Total time the investment was held (for annualized return)."
      />
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Calculate ROI
      </Button>
    </form>
  );
};

export default RoiInput;