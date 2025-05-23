// src/components/calculators/InterestRateCalculator/InterestRateInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const CALC_TYPES = {
  SIMPLE_INTEREST: 'simpleInterest',
  TOTAL_AMOUNT: 'totalAmount',
};

const InterestRateInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [principal, setPrincipal] = useState('');
  const [interestOrAmount, setInterestOrAmount] = useState('');
  const [tenureYears, setTenureYears] = useState('');
  const [calculationType, setCalculationType] = useState(CALC_TYPES.SIMPLE_INTEREST);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!principal || parseFloat(principal) <= 0) newErrors.principal = 'Principal must be positive.';
    if (interestOrAmount === '' || parseFloat(interestOrAmount) < 0) newErrors.interestOrAmount = 'This value must be non-negative.';
    if (calculationType === CALC_TYPES.TOTAL_AMOUNT && parseFloat(interestOrAmount) < parseFloat(principal)) {
        newErrors.interestOrAmount = 'Total amount cannot be less than principal.';
    }
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
        interestOrAmount: parseFloat(interestOrAmount),
        tenureYears: parseFloat(tenureYears),
        calculationType,
      });
    }
  };

  const amountLabel = calculationType === CALC_TYPES.SIMPLE_INTEREST ? "Simple Interest Earned" : "Total Amount Received (Principal + Interest)";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-theme-text-secondary mb-2">Calculate Rate Based On:</label>
        <div className="flex space-x-2 rounded-md bg-theme-input-bg p-1">
          <button
            type="button"
            onClick={() => { setCalculationType(CALC_TYPES.SIMPLE_INTEREST); setInterestOrAmount(''); setErrors({}); }}
            className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${calculationType === CALC_TYPES.SIMPLE_INTEREST ? 'bg-brand-primary text-white shadow-md' : 'text-theme-text-secondary hover:bg-theme-border'}`}
          >
            Simple Interest Earned
          </button>
          <button
            type="button"
            onClick={() => { setCalculationType(CALC_TYPES.TOTAL_AMOUNT); setInterestOrAmount(''); setErrors({}); }}
            className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${calculationType === CALC_TYPES.TOTAL_AMOUNT ? 'bg-brand-primary text-white shadow-md' : 'text-theme-text-secondary hover:bg-theme-border'}`}
          >
            Total Amount Received
          </button>
        </div>
      </div>

      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <InputField
        label="Principal Amount"
        id="irPrincipal"
        type="number"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
        placeholder="e.g., 10000"
        error={errors.principal}
        unit={selectedCurrency?.symbol || ''}
        tooltip="The initial amount invested or loaned."
      />
      <InputField
        label={amountLabel}
        id="irInterestOrAmount"
        type="number"
        value={interestOrAmount}
        onChange={(e) => setInterestOrAmount(e.target.value)}
        placeholder={calculationType === CALC_TYPES.SIMPLE_INTEREST ? "e.g., 1000" : "e.g., 11000"}
        error={errors.interestOrAmount}
        unit={selectedCurrency?.symbol || ''}
        tooltip={calculationType === CALC_TYPES.SIMPLE_INTEREST ? "Total simple interest earned." : "Total amount including principal and interest."}
      />
      <InputField
        label="Time Period"
        id="irTenureYears"
        type="number"
        value={tenureYears}
        onChange={(e) => setTenureYears(e.target.value)}
        placeholder="e.g., 2"
        error={errors.tenureYears}
        unit="years"
        tooltip="Duration for which the money was invested/loaned."
      />
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Calculate Interest Rate
      </Button>
    </form>
  );
};

export default InterestRateInput;