// src/components/calculators/FdCalculator/FdInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';
import Select from 'react-select';

const fdCompoundingOptions = [
  { value: 12, label: 'Monthly' },
  { value: 4, label: 'Quarterly' },
  { value: 2, label: 'Half-Yearly' },
  { value: 1, label: 'Annually' },
];

// Use the theme-based customSelectStyles defined in your CurrencySelector or a common file
// For simplicity, I'm redefining a basic dark theme version here.
// Ideally, you'd import this from a shared location or pass it down.
const customSelectStyles = {
  control: (provided) => ({ ...provided, backgroundColor: '#374151', borderColor: '#374151', color: '#F3F4F6', borderRadius: '0.375rem', minHeight: '42px', '&:hover': { borderColor: '#3B82F6' } }), // theme-input-bg, theme-border, theme-text-primary, theme-accent
  menu: (provided) => ({ ...provided, backgroundColor: '#1F2937', zIndex: 20 }), // theme-panel-dark
  option: (provided, state) => ({ ...provided, backgroundColor: state.isSelected ? '#3B82F6' : state.isFocused ? '#374151' : '#1F2937', color: '#F3F4F6', '&:active': { backgroundColor: '#3B82F6' } }), // theme-accent, theme-border, theme-panel-dark, theme-text-primary
  singleValue: (provided) => ({ ...provided, color: '#F3F4F6' }), // theme-text-primary
  input: (provided) => ({ ...provided, color: '#F3F4F6' }), // theme-text-primary
  placeholder: (provided) => ({ ...provided, color: '#9CA3AF' }), // theme-text-secondary
};

const FdInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [tenureYears, setTenureYears] = useState('');
  const [compoundingFrequency, setCompoundingFrequency] = useState(fdCompoundingOptions[1]); // Default to Quarterly
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!depositAmount || parseFloat(depositAmount) <= 0) newErrors.depositAmount = 'Amount must be positive.';
    if (annualRate === '' || parseFloat(annualRate) < 0) newErrors.annualRate = 'Rate must be zero or positive.';
    if (parseFloat(annualRate) > 25) newErrors.annualRate = 'Rate seems unusually high for an FD (max 25%).';
    if (!tenureYears || parseFloat(tenureYears) <= 0) newErrors.tenureYears = 'Tenure must be positive.';
    if (parseFloat(tenureYears) > 20) newErrors.tenureYears = 'Tenure seems unusually long for an FD (max 20 years).';
    if (!compoundingFrequency || compoundingFrequency.value <=0) newErrors.compoundingFrequency = 'Select a valid frequency.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        principal: parseFloat(depositAmount),
        annualRate: parseFloat(annualRate),
        tenureYears: parseFloat(tenureYears),
        compoundingFrequency: compoundingFrequency.value,
      });
    }
  };

  return (
    // Panel styling and main title removed. App.jsx handles them.
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <InputField
        label="Fixed Deposit Amount"
        id="fdDepositAmount"
        type="number"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        placeholder="e.g., 50000"
        error={errors.depositAmount}
        unit={selectedCurrency?.symbol || ''}
        tooltip="The amount you are depositing."
      />
      <InputField
        label="Annual Interest Rate"
        id="fdAnnualRate"
        type="number"
        value={annualRate}
        onChange={(e) => setAnnualRate(e.target.value)}
        placeholder="e.g., 6.5"
        error={errors.annualRate}
        unit="%"
        tooltip="Interest rate per annum offered by the bank."
      />
      <InputField
        label="Tenure"
        id="fdTenureYears"
        type="number"
        value={tenureYears}
        onChange={(e) => setTenureYears(e.target.value)}
        placeholder="e.g., 3"
        error={errors.tenureYears}
        unit="years"
        tooltip="Duration of the fixed deposit."
      />
      <div className="mb-4">
        <label htmlFor="fdCompoundingFrequency" className="block text-sm font-medium text-theme-text-secondary mb-1">Compounding Frequency</label>
        <Select
          id="fdCompoundingFrequency"
          options={fdCompoundingOptions}
          value={compoundingFrequency}
          onChange={setCompoundingFrequency}
          styles={customSelectStyles}
          classNamePrefix="react-select"
        />
        {errors.compoundingFrequency && <p className="mt-1 text-xs text-red-400">{errors.compoundingFrequency}</p>}
      </div>
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Calculate FD Maturity
      </Button>
    </form>
  );
};

export default FdInput;