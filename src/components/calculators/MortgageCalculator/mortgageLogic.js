// src/components/calculators/MortgageCalculator/mortgageLogic.js
export const calculateMortgageEmi = (homePrice, downPayment, annualRate, tenureYears) => {
  if (homePrice <= 0 || downPayment < 0 || annualRate < 0 || tenureYears <= 0) {
    return {
      error: "Home Price, Tenure must be positive. Down Payment, Rate must be non-negative.",
      loanAmount: 0, monthlyPayment: 0, totalInterest: 0, totalPayment: 0,
    };
  }

  const loanAmount = homePrice - downPayment;
  if (loanAmount <= 0) {
    return {
      error: "Down payment is greater than or equal to home price. No loan needed.",
      loanAmount: 0, monthlyPayment: 0, totalInterest: 0, totalPayment: 0,
    };
  }

  const monthlyRate = annualRate / 12 / 100;
  const numberOfMonths = tenureYears * 12;

  let monthlyPayment;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / numberOfMonths;
  } else {
    const tempFactor = Math.pow(1 + monthlyRate, numberOfMonths);
    monthlyPayment = (loanAmount * monthlyRate * tempFactor) / (tempFactor - 1);
  }

  if (!isFinite(monthlyPayment) || monthlyPayment <= 0) {
    if (loanAmount > 0 && monthlyRate > 0) {
      return { error: "Cannot calculate a valid monthly payment.", loanAmount: parseFloat(loanAmount.toFixed(2)), monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
    }
    monthlyPayment = 0;
  }

  const totalPayment = monthlyPayment * numberOfMonths;
  const totalInterest = totalPayment - loanAmount;

  return {
    loanAmount: parseFloat(loanAmount.toFixed(2)),
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    totalPayment: parseFloat(totalPayment.toFixed(2)),
  };
};