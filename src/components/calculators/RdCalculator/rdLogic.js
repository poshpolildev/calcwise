// src/components/calculators/RdCalculator/rdLogic.js
// This logic is similar to SIP, assuming interest is compounded monthly on monthly deposits.
// For RD with specific bank compounding (e.g., quarterly), the formula is more complex.
export const calculateRdMaturity = (monthlyDeposit, annualRate, tenureYears) => {
  if (monthlyDeposit <= 0 || annualRate < 0 || tenureYears <= 0) {
    return {
      totalDeposited: 0,
      totalInterest: 0,
      maturityValue: 0,
      error: "Monthly Deposit and Tenure must be positive. Rate can be zero or positive.",
    };
  }

  const numberOfMonths = tenureYears * 12;
  const monthlyRate = annualRate / 12 / 100;

  let maturityValue;
  if (monthlyRate === 0) {
    maturityValue = monthlyDeposit * numberOfMonths;
  } else {
    // Formula for future value of a series (annuity), assuming deposit at the beginning of month
    maturityValue = monthlyDeposit * (
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate
    ) * (1 + monthlyRate);
  }

  const totalDeposited = monthlyDeposit * numberOfMonths;
  const totalInterest = maturityValue - totalDeposited;

  return {
    totalDeposited: parseFloat(totalDeposited.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    maturityValue: parseFloat(maturityValue.toFixed(2)),
  };
};