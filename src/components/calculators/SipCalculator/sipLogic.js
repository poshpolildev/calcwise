// src/components/calculators/SipCalculator/sipLogic.js
export const calculateSip = (monthlyInvestment, annualRate, tenureYears) => {
  if (monthlyInvestment <= 0 || annualRate < 0 || tenureYears <= 0) {
    return {
      totalInvested: 0,
      estimatedReturns: 0,
      totalValue: 0,
      error: "Monthly Investment and Tenure must be positive. Rate can be zero or positive.",
    };
  }

  const numberOfMonths = tenureYears * 12;
  const monthlyRate = annualRate / 12 / 100;

  let totalValue;
  if (monthlyRate === 0) { // If rate is 0, total value is just total invested
    totalValue = monthlyInvestment * numberOfMonths;
  } else {
    // Assuming investment at the beginning of each month
    totalValue = monthlyInvestment * (
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate
    ) * (1 + monthlyRate);
  }

  const totalInvested = monthlyInvestment * numberOfMonths;
  const estimatedReturns = totalValue - totalInvested;

  return {
    totalInvested: parseFloat(totalInvested.toFixed(2)),
    estimatedReturns: parseFloat(estimatedReturns.toFixed(2)),
    totalValue: parseFloat(totalValue.toFixed(2)),
  };
};