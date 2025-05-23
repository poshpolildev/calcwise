// src/components/calculators/CompoundInterestCalculator/CompoundInterestInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';
import Select from 'react-select'; // For compounding frequency dropdown

const compoundingOptions = [
  { value: 1, label: 'Annually (1/year)' },
  { value: 2, label: 'Semi-Annually (2/year)' },
  { value: 4, label: 'Quarterly (4/year)' },
  { value: 12, label: 'Monthly (12/year)' },
  { value: 52, label: 'Weekly (52/year)' },
  { value: 365, label: 'Daily (365/year)' },
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


const CompoundInterestInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [principal, setPrincipal] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [tenureYears, setTenureYears] = useState('');
  const [compoundingFrequency, setCompoundingFrequency] = useState(compoundingOptions[0]); // Default to Annually
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!principal || parseFloat(principal) <= 0) newErrors.principal = 'Principal must be positive.';
    if (annualRate === '' || parseFloat(annualRate) < 0) newErrors.annualRate = 'Rate must be zero or positive.';
    if (!tenureYears || parseFloat(tenureYears) <= 0) newErrors.tenureYears = 'Tenure must be positive.';
    if (!compoundingFrequency || compoundingFrequency.value <=0) newErrors.compoundingFrequency = 'Select a valid compounding frequency.';
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
        compoundingFrequency: compoundingFrequency.value,
      });
    }
  };

  return (
    // Panel styling and main title removed. App.jsx handles them.
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <InputField
        label="Principal Amount"
        id="ciPrincipal"
        type="number"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
        placeholder="e.g., 10000"
        error={errors.principal}
        unit={selectedCurrency?.symbol || ''}
        tooltip="Initial amount of money."
      />
      <InputField
        label="Annual Interest Rate"
        id="ciAnnualRate"
        type="number"
        value={annualRate}
        onChange={(e) => setAnnualRate(e.target.value)}
        placeholder="e.g., 5"
        error={errors.annualRate}
        unit="%"
        tooltip="Annual rate of interest."
      />
      <InputField
        label="Time Period"
        id="ciTenureYears"
        type="number"
        value={tenureYears}
        onChange={(e) => setTenureYears(e.target.value)}
        placeholder="e.g., 2"
        error={errors.tenureYears}
        unit="years"
        tooltip="Investment or loan duration."
      />
      <div className="mb-4">
        <label htmlFor="compoundingFrequency" className="block text-sm font-medium text-theme-text-secondary mb-1">Compounding Frequency</label>
        <Select
          id="compoundingFrequency"
          options={compoundingOptions}
          value={compoundingFrequency}
          onChange={setCompoundingFrequency}
          styles={customSelectStyles}
          classNamePrefix="react-select"
        />
        {errors.compoundingFrequency && <p className="mt-1 text-xs text-red-400">{errors.compoundingFrequency}</p>}
      </div>
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Calculate Compound Interest
      </Button>
    </form>
  );
};

export default CompoundInterestInput;