// src/components/calculators/SavingsGoalCalculator/SavingsGoalInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const SavingsGoalInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [savingsGoal, setSavingsGoal] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [tenureYears, setTenureYears] = useState('');
  const [initialSavings, setInitialSavings] = useState(''); // Optional
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!savingsGoal || parseFloat(savingsGoal) <= 0) newErrors.savingsGoal = 'Goal must be positive.';
    if (annualRate === '' || parseFloat(annualRate) < 0) newErrors.annualRate = 'Rate must be non-negative.';
    if (parseFloat(annualRate) > 50) newErrors.annualRate = 'Rate seems unusually high (max 50%).';
    if (!tenureYears || parseFloat(tenureYears) <= 0) newErrors.tenureYears = 'Years must be positive.';
    if (parseFloat(tenureYears) > 70) newErrors.tenureYears = 'Years seem unusually long (max 70 years).';
    if (initialSavings && parseFloat(initialSavings) < 0) newErrors.initialSavings = 'Must be non-negative.';
    // Allow initial savings to be greater than goal, logic will handle it
    // if (parseFloat(initialSavings) > parseFloat(savingsGoal)) newErrors.initialSavings = 'Initial savings cannot exceed goal.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        savingsGoal: parseFloat(savingsGoal),
        annualRate: parseFloat(annualRate),
        tenureYears: parseFloat(tenureYears),
        initialSavings: initialSavings ? parseFloat(initialSavings) : 0,
      });
    }
  };

  return (
    // Panel styling and main title removed. App.jsx handles them.
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <InputField
        label="My Savings Goal Amount Is"
        id="sgGoalAmount"
        type="number"
        value={savingsGoal}
        onChange={(e) => setSavingsGoal(e.target.value)}
        placeholder="e.g., 100000"
        error={errors.savingsGoal}
        unit={selectedCurrency?.symbol || ''}
        tooltip="The total amount you want to save."
      />
      <InputField
        label="I Already Have (Optional)"
        id="sgInitialSavings"
        type="number"
        value={initialSavings}
        onChange={(e) => setInitialSavings(e.target.value)}
        placeholder="e.g., 5000 (or leave blank)"
        error={errors.initialSavings}
        unit={selectedCurrency?.symbol || ''}
        tooltip="Any amount you've already saved towards this goal."
      />
      <InputField
        label="Expected Annual Interest Rate"
        id="sgAnnualRate"
        type="number"
        value={annualRate}
        onChange={(e) => setAnnualRate(e.target.value)}
        placeholder="e.g., 6"
        error={errors.annualRate}
        unit="%"
        tooltip="Annual return rate on your savings/investments."
      />
      <InputField
        label="Number of Years to Save"
        id="sgTenureYears"
        type="number"
        value={tenureYears}
        onChange={(e) => setTenureYears(e.target.value)}
        placeholder="e.g., 5"
        error={errors.tenureYears}
        unit="years"
        tooltip="How long you plan to save for this goal."
      />
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Calculate Monthly Savings
      </Button>
    </form>
  );
};

export default SavingsGoalInput;