// src/components/calculators/LoanAffordabilityCalculator/loanAffordabilityLogic.js
export const calculateAffordableLoan = (
  grossMonthlyIncome,
  totalMonthlyDebt,
  loanTenureYears,
  annualInterestRate,
  desiredDtiRatio
) => {
  if (
    grossMonthlyIncome <= 0 ||
    totalMonthlyDebt < 0 || // Can be 0
    loanTenureYears <= 0 ||
    annualInterestRate < 0 || // Can be 0, though unlikely for new loan
    desiredDtiRatio <= 0 || desiredDtiRatio > 100
  ) {
    return {
      affordableEmi: 0,
      affordableLoanAmount: 0,
      error: "Income, Tenure, DTI must be positive. Rate/Existing Debt non-negative. DTI between 1-100.",
    };
  }

  const allowableTotalMonthlyDebt = grossMonthlyIncome * (desiredDtiRatio / 100);
  const availableForNewEmi = allowableTotalMonthlyDebt - totalMonthlyDebt;

  if (availableForNewEmi <= 0) {
    return {
      affordableEmi: 0,
      affordableLoanAmount: 0,
      maxDtiReached: true, // Indicate that DTI limit is already met or exceeded by existing debts
      message: "Existing debts already meet or exceed the desired DTI ratio. No room for new loan EMI.",
    };
  }

  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const numberOfMonths = loanTenureYears * 12;
  let affordableLoanAmount = 0;

  if (monthlyInterestRate === 0) { // If interest rate is 0%
    affordableLoanAmount = availableForNewEmi * numberOfMonths;
  } else {
    // PV formula: EMI * [ (1 - (1 + r)^-n) / r ]
    // Or EMI * [ ((1 + r)^n - 1) / (r * (1 + r)^n) ]
    const tempFactor = Math.pow(1 + monthlyInterestRate, numberOfMonths);
    affordableLoanAmount = availableForNewEmi * ( (tempFactor - 1) / (monthlyInterestRate * tempFactor) );
  }
  
  if (affordableLoanAmount < 0) affordableLoanAmount = 0;


  return {
    affordableEmi: parseFloat(availableForNewEmi.toFixed(2)),
    affordableLoanAmount: parseFloat(affordableLoanAmount.toFixed(2)),
    allowableTotalMonthlyDebt: parseFloat(allowableTotalMonthlyDebt.toFixed(2)),
  };
};