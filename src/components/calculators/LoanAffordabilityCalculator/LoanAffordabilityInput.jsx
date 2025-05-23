// src/components/calculators/LoanAffordabilityCalculator/LoanAffordabilityInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const LoanAffordabilityInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState('');
  const [totalMonthlyDebt, setTotalMonthlyDebt] = useState('');
  const [loanTenureYears, setLoanTenureYears] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [desiredDtiRatio, setDesiredDtiRatio] = useState('40'); // Default DTI to 40%
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!grossMonthlyIncome || parseFloat(grossMonthlyIncome) <= 0) newErrors.grossMonthlyIncome = 'Income must be positive.';
    if (totalMonthlyDebt === '' || parseFloat(totalMonthlyDebt) < 0) newErrors.totalMonthlyDebt = 'Debt must be non-negative.';
    if (!loanTenureYears || parseFloat(loanTenureYears) <= 0) newErrors.loanTenureYears = 'Tenure must be positive.';
    if (parseFloat(loanTenureYears) > 40) newErrors.loanTenureYears = 'Max tenure 40 years.';
    if (annualInterestRate === '' || parseFloat(annualInterestRate) < 0) newErrors.annualInterestRate = 'Rate must be non-negative.';
    if (parseFloat(annualInterestRate) > 50) newErrors.annualInterestRate = 'Rate max 50%.';
    if (!desiredDtiRatio || parseFloat(desiredDtiRatio) <= 0 || parseFloat(desiredDtiRatio) > 100) newErrors.desiredDtiRatio = 'DTI ratio must be between 1-100.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        grossMonthlyIncome: parseFloat(grossMonthlyIncome),
        totalMonthlyDebt: parseFloat(totalMonthlyDebt),
        loanTenureYears: parseFloat(loanTenureYears),
        annualInterestRate: parseFloat(annualInterestRate),
        desiredDtiRatio: parseFloat(desiredDtiRatio),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <InputField
        label="Your Gross Monthly Income"
        id="laGrossMonthlyIncome"
        type="number"
        value={grossMonthlyIncome}
        onChange={(e) => setGrossMonthlyIncome(e.target.value)}
        placeholder="e.g., 50000"
        error={errors.grossMonthlyIncome}
        unit={selectedCurrency?.symbol || ''}
        tooltip="Your total income per month before taxes."
      />
      <InputField
        label="Total Existing Monthly Debt Payments"
        id="laTotalMonthlyDebt"
        type="number"
        value={totalMonthlyDebt}
        onChange={(e) => setTotalMonthlyDebt(e.target.value)}
        placeholder="e.g., 10000 (EMIs, credit card dues)"
        error={errors.totalMonthlyDebt}
        unit={selectedCurrency?.symbol || ''}
        tooltip="Sum of all current monthly loan EMIs and credit card minimums."
      />
      <InputField
        label="Desired Loan Tenure for New Loan"
        id="laLoanTenureYears"
        type="number"
        value={loanTenureYears}
        onChange={(e) => setLoanTenureYears(e.target.value)}
        placeholder="e.g., 5"
        error={errors.loanTenureYears}
        unit="years"
        tooltip="How long you want the new loan to be."
      />
      <InputField
        label="Expected Annual Interest Rate on New Loan"
        id="laAnnualInterestRate"
        type="number"
        value={annualInterestRate}
        onChange={(e) => setAnnualInterestRate(e.target.value)}
        placeholder="e.g., 9.5"
        error={errors.annualInterestRate}
        unit="%"
        tooltip="Anticipated interest rate for the new loan."
      />
      <InputField
        label="Desired Debt-to-Income (DTI) Ratio"
        id="laDesiredDtiRatio"
        type="number"
        value={desiredDtiRatio}
        onChange={(e) => setDesiredDtiRatio(e.target.value)}
        placeholder="e.g., 40 (typically 36-43%)"
        error={errors.desiredDtiRatio}
        unit="%"
        tooltip="Percentage of your gross income that goes towards debt payments."
      />
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Calculate Loan Affordability
      </Button>
    </form>
  );
};

export default LoanAffordabilityInput;