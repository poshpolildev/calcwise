// src/components/calculators/EmiCalculator/EmiCalculatorInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const EmiCalculatorInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [disbursementDate, setDisbursementDate] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenureMonths, setLoanTenureMonths] = useState(''); // Changed from years
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!disbursementDate) newErrors.disbursementDate = 'Disbursement date is required.';
    else {
        // Optional: Add more specific date validation (e.g., not too far in past/future)
        const today = new Date();
        today.setHours(0,0,0,0); // Normalize today to start of day
        const selectedDDate = new Date(disbursementDate);
        // Example: Check if date is not more than 1 year in the past or 5 years in the future
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        const fiveYearsFuture = new Date(today);
        fiveYearsFuture.setFullYear(today.getFullYear() + 5);

        if (selectedDDate < oneYearAgo) newErrors.disbursementDate = 'Date too far in past.';
        if (selectedDDate > fiveYearsFuture) newErrors.disbursementDate = 'Date too far in future.';
    }


    if (!loanAmount || parseFloat(loanAmount) <= 0) newErrors.loanAmount = 'Loan amount must be positive.';
    if (interestRate === '' || parseFloat(interestRate) < 0) newErrors.interestRate = 'Interest rate must be non-negative.';
    if (parseFloat(interestRate) > 100) newErrors.interestRate = 'Interest rate seems too high (max 100%).';
    if (!loanTenureMonths || parseInt(loanTenureMonths, 10) <= 0) newErrors.loanTenureMonths = 'Tenure (months) must be positive.';
    if (parseInt(loanTenureMonths, 10) > 600) newErrors.loanTenureMonths = 'Loan tenure too long (max 50 years / 600 months).';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        disbursementDate,
        principal: parseFloat(loanAmount),
        annualRate: parseFloat(interestRate),
        tenureMonths: parseInt(loanTenureMonths, 10),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <InputField
        label="Disbursement Date"
        id="disbursementDate"
        type="date"
        value={disbursementDate}
        onChange={(e) => setDisbursementDate(e.target.value)}
        error={errors.disbursementDate}
        tooltip="The date when the loan amount is expected to be disbursed."
      />
      <InputField
        label="Loan Amount"
        id="loanAmount"
        type="number"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
        placeholder="Enter Loan Amount (e.g., 500000)"
        error={errors.loanAmount}
        unit={selectedCurrency?.symbol || ''}
        tooltip="The total amount of money you are borrowing."
      />
      <InputField
        label="Interest Rate"
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
        label="Loan Tenure"
        id="loanTenureMonths"
        type="number"
        value={loanTenureMonths}
        onChange={(e) => setLoanTenureMonths(e.target.value)}
        placeholder="e.g., 12 months"
        error={errors.loanTenureMonths}
        unit="months"
        tooltip="The duration of the loan in total number of months."
      />
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Calculate Loan EMI
      </Button>
    </form>
  );
};

export default EmiCalculatorInput;
