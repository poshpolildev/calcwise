// src/components/calculators/InterestRateCalculator/interestRateLogic.js
export const calculateSimpleInterestRate = (principal, interestOrAmount, tenureYears, calculationType) => {
  // calculationType can be 'simpleInterest' or 'totalAmount'

  if (principal <= 0 || interestOrAmount < 0 || tenureYears <= 0) {
    return {
      annualRate: 0,
      error: "Principal, Tenure must be positive. Interest/Amount must be non-negative.",
    };
  }

  let simpleInterestEarned;
  if (calculationType === 'totalAmount') {
    simpleInterestEarned = interestOrAmount - principal;
    if (simpleInterestEarned < 0) {
      return {
        annualRate: 0,
        error: "Total Amount cannot be less than Principal Amount.",
      };
    }
  } else { // 'simpleInterest'
    simpleInterestEarned = interestOrAmount;
  }

  if (principal * tenureYears === 0) { // Avoid division by zero if P or T is effectively zero after validation
      if(simpleInterestEarned > 0) return { annualRate: Infinity, error: "Cannot calculate rate with zero principal or tenure if interest is earned."};
      return { annualRate: 0 }; // No interest earned, rate is effectively 0 or indeterminable
  }


  const annualRate = (simpleInterestEarned * 100) / (principal * tenureYears);

  return {
    annualRate: parseFloat(annualRate.toFixed(2)), // Can be up to 2 decimal places
    calculatedSi: parseFloat(simpleInterestEarned.toFixed(2)), // For display
  };
};