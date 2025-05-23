// src/components/calculators/SimpleInterestCalculator/simpleInterestLogic.js
export const calculateSimpleInterest = (principal, annualRate, tenureYears) => {
  if (principal <= 0 || annualRate < 0 || tenureYears <= 0) { // Allow 0 rate
    return {
      simpleInterest: 0,
      totalAmount: principal > 0 ? principal : 0, // If principal is 0 or less, total is 0
      error: "Principal and Tenure must be positive. Rate can be zero or positive.",
    };
  }
  if (annualRate === 0) {
      return {
          simpleInterest: 0,
          totalAmount: principal,
      };
  }

  const simpleInterest = (principal * annualRate * tenureYears) / 100;
  const totalAmount = principal + simpleInterest;

  return {
    simpleInterest: parseFloat(simpleInterest.toFixed(2)),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
  };
};