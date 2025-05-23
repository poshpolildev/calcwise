// src/components/calculators/CompoundInterestCalculator/compoundInterestLogic.js
export const calculateCompoundInterest = (principal, annualRate, tenureYears, compoundingFrequency) => {
  if (principal <= 0 || annualRate < 0 || tenureYears <= 0 || compoundingFrequency <= 0) {
    return {
      totalAmount: principal > 0 ? principal : 0,
      compoundInterest: 0,
      error: "Principal, Tenure, and Compounding Frequency must be positive. Rate can be zero or positive.",
    };
  }

  const ratePerPeriod = annualRate / 100 / compoundingFrequency;
  const numberOfPeriods = compoundingFrequency * tenureYears;

  const totalAmount = principal * Math.pow(1 + ratePerPeriod, numberOfPeriods);
  const compoundInterest = totalAmount - principal;

  return {
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    compoundInterest: parseFloat(compoundInterest.toFixed(2)),
  };
};