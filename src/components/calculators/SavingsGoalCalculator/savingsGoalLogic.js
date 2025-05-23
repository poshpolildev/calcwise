// src/components/calculators/SavingsGoalCalculator/savingsGoalLogic.js
export const calculateMonthlySavings = (savingsGoal, annualRate, tenureYears, initialSavings = 0) => {
  if (savingsGoal <= 0 || annualRate < 0 || tenureYears <= 0 || initialSavings < 0) {
    return {
      monthlySavings: 0,
      error: "Savings Goal & Tenure must be positive. Rate & Initial Savings must be non-negative.",
    };
  }
  if (savingsGoal <= initialSavings && annualRate === 0) { // Goal already met or exceeded with no growth needed
     return { monthlySavings: 0, totalWillSave: 0, totalInterest: 0, finalAmount: initialSavings };
  }


  const monthlyRate = annualRate / 12 / 100;
  const numberOfMonths = tenureYears * 12;

  let monthlySavings;

  if (monthlyRate === 0) {
    // If no interest, future value of initial savings is just initial savings
    const amountNeededFromMonthlySavings = savingsGoal - initialSavings;
    if (amountNeededFromMonthlySavings <= 0) { // Goal already met by initial savings
      monthlySavings = 0;
    } else {
      monthlySavings = amountNeededFromMonthlySavings / numberOfMonths;
    }
  } else {
    // Future value of initial savings
    const fvInitialSavings = initialSavings * Math.pow(1 + monthlyRate, numberOfMonths);

    // Remaining amount needed from monthly contributions
    const fvNeededFromContributions = savingsGoal - fvInitialSavings;

    if (fvNeededFromContributions <= 0) { // Goal met or exceeded by initial savings growth
        monthlySavings = 0;
    } else {
        // Denominator for payment formula (assuming payment at beginning of period)
        let denominator = ( (Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate ) * (1 + monthlyRate);
        if (denominator === 0) { // Avoid division by zero if numberOfMonths is very small or rate makes it zero
            // This case is unlikely with tenureYears > 0 but good to have a fallback
            // Effectively means a very large monthly saving is needed if denominator is near zero.
            // Or, if goal is much larger than what initial savings can grow to.
            // For simplicity, if fvNeededFromContributions > 0 and denominator is 0, it implies goal might be unachievable in practice with this model
            // Let's recalculate without the (1+monthlyRate) factor if that leads to 0, which is unusual
            denominator = (Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate;
            if(denominator === 0) {
                 return { monthlySavings: 0, error: "Cannot reach goal with these parameters (division by zero)." };
            }
        }
        monthlySavings = fvNeededFromContributions / denominator;
    }
  }
  
  if (monthlySavings < 0) monthlySavings = 0; // Cannot save negative amount

  // For output display, let's calculate projected final amount
  let projectedFinal = initialSavings;
  if (monthlyRate === 0) {
    projectedFinal += monthlySavings * numberOfMonths;
  } else {
    projectedFinal = initialSavings * Math.pow(1 + monthlyRate, numberOfMonths) +
                     monthlySavings * (((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate) * (1 + monthlyRate));
  }


  return {
    monthlySavings: parseFloat(monthlySavings.toFixed(2)),
    totalPrincipalSaved: parseFloat((initialSavings + (monthlySavings * numberOfMonths)).toFixed(2)),
    totalInterestEarned: parseFloat((projectedFinal - (initialSavings + (monthlySavings * numberOfMonths))).toFixed(2)),
    projectedFinalAmount: parseFloat(projectedFinal.toFixed(2))
  };
};