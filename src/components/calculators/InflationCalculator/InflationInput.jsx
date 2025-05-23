// src/components/calculators/InflationCalculator/InflationInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const CALC_TYPES = {
  FUTURE_COST: 'futureCost',
  PRESENT_VALUE: 'presentValue',
};

const InflationInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [calculationType, setCalculationType] = useState(CALC_TYPES.FUTURE_COST);
  const [amount, setAmount] = useState('');
  const [inflationRate, setInflationRate] = useState('');
  const [numberOfYears, setNumberOfYears] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (amount === '' || parseFloat(amount) < 0) newErrors.amount = 'Amount must be non-negative.';
    if (inflationRate === '') newErrors.inflationRate = 'Inflation rate is required.';
    if (parseFloat(inflationRate) < -20 || parseFloat(inflationRate) > 100) newErrors.inflationRate = 'Rate usually between -20% to 100%.';
    if (!numberOfYears || parseFloat(numberOfYears) < 0) newErrors.numberOfYears = 'Years must be non-negative.';
    if (parseFloat(numberOfYears) > 100) newErrors.numberOfYears = 'Years seem unusually high (max 100).';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        calculationType,
        amount: parseFloat(amount),
        annualInflationRate: parseFloat(inflationRate),
        numberOfYears: parseFloat(numberOfYears),
      });
    }
  };

  const amountLabel = calculationType === CALC_TYPES.FUTURE_COST ? "Current Cost / Value" : "Future Amount / Value";
  const buttonLabel = calculationType === CALC_TYPES.FUTURE_COST ? "Calculate Future Cost" : "Calculate Present Value";

  return (
    // Panel styling and main title removed. App.jsx handles them.
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-theme-text-secondary mb-2">Calculation Type:</label>
        <div className="flex space-x-2 rounded-md bg-theme-input-bg p-1"> {/* Changed background to input-bg for contrast */}
          <button
            type="button"
            onClick={() => { setCalculationType(CALC_TYPES.FUTURE_COST); setAmount(''); setErrors({}); }}
            className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors duration-200
                        ${calculationType === CALC_TYPES.FUTURE_COST ? 'bg-brand-primary text-white shadow-md' : 'text-theme-text-secondary hover:bg-theme-border'}`}
          >
            Future Cost
          </button>
          <button
            type="button"
            onClick={() => { setCalculationType(CALC_TYPES.PRESENT_VALUE); setAmount(''); setErrors({}); }}
            className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors duration-200
                        ${calculationType === CALC_TYPES.PRESENT_VALUE ? 'bg-brand-primary text-white shadow-md' : 'text-theme-text-secondary hover:bg-theme-border'}`}
          >
            Present Value
          </button>
        </div>
      </div>

      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <InputField
        label={amountLabel}
        id="inflationAmount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g., 1000"
        error={errors.amount}
        unit={selectedCurrency?.symbol || ''}
        tooltip={calculationType === CALC_TYPES.FUTURE_COST ? "Today's cost of an item or service." : "An amount of money in the future."}
      />
      <InputField
        label="Expected Annual Inflation Rate"
        id="inflationRate"
        type="number"
        value={inflationRate}
        onChange={(e) => setInflationRate(e.target.value)}
        placeholder="e.g., 3.5"
        error={errors.inflationRate}
        unit="%"
        tooltip="Average annual rate at which prices are expected to increase."
      />
      <InputField
        label="Number of Years"
        id="inflationYears"
        type="number"
        value={numberOfYears}
        onChange={(e) => setNumberOfYears(e.target.value)}
        placeholder="e.g., 10"
        error={errors.numberOfYears}
        unit="years"
        tooltip="The period over which inflation is considered."
      />
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        {buttonLabel}
      </Button>
    </form>
  );
};

export default InflationInput;