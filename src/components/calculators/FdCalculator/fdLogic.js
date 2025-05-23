// src/components/calculators/FdCalculator/fdLogic.js
export const calculateFdMaturity = (principal, annualRate, tenureYears, compoundingFrequency) => {
  if (principal <= 0 || annualRate < 0 || tenureYears <= 0 || compoundingFrequency <= 0) {
    return {
      maturityValue: principal > 0 ? principal : 0,
      totalInterestEarned: 0,
      error: "Deposit Amount, Tenure, and Compounding Frequency must be positive. Rate can be zero or positive.",
    };
  }

  const ratePerPeriod = annualRate / 100 / compoundingFrequency;
  const numberOfPeriods = compoundingFrequency * tenureYears;

  const maturityValue = principal * Math.pow(1 + ratePerPeriod, numberOfPeriods);
  const totalInterestEarned = maturityValue - principal;

  return {
    maturityValue: parseFloat(maturityValue.toFixed(2)),
    totalInterestEarned: parseFloat(totalInterestEarned.toFixed(2)),
  };
};