// src/components/calculators/CreditCardPayoffCalculator/creditCardPayoffLogic.js
export const calculateTimeToPayOff = (balance, apr, monthlyPayment) => {
  if (balance <= 0 || apr < 0 || monthlyPayment <= 0) {
    return { error: "Balance and Monthly Payment must be positive. APR must be non-negative." };
  }

  const monthlyRate = apr / 12 / 100;

  if (monthlyRate === 0) { // No interest
    const monthsToPayOff = Math.ceil(balance / monthlyPayment);
    const totalPaid = monthsToPayOff * monthlyPayment; // Could be slightly more than balance due to ceiling
    return {
      monthsToPayOff,
      totalPrincipalPaid: balance,
      totalInterestPaid: 0,
      totalPaid: balance, // Assuming exact payment or last payment adjusted
    };
  }

  const minPayment = balance * monthlyRate * 1.01; // Min payment just above interest
  if (monthlyPayment <= balance * monthlyRate) {
    return { error: `Monthly payment must be greater than ${parseFloat(minPayment.toFixed(2))} (interest accrued per month). Debt will keep increasing.` };
  }

  // n = -log(1 - (PV * r) / PMT) / log(1 + r)
  const monthsToPayOff = -Math.log(1 - (balance * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate);
  
  if (!isFinite(monthsToPayOff) || monthsToPayOff <=0) {
      return { error: "Cannot calculate payoff time with these inputs. Payment might be too low or an issue with calculation."}
  }

  const totalPaid = monthlyPayment * monthsToPayOff;
  const totalInterestPaid = totalPaid - balance;

  return {
    monthsToPayOff: parseFloat(monthsToPayOff.toFixed(2)), // Can be fractional, often rounded up
    totalPrincipalPaid: balance,
    totalInterestPaid: parseFloat(totalInterestPaid.toFixed(2)),
    totalPaid: parseFloat(totalPaid.toFixed(2)),
  };
};

export const calculateMonthlyPaymentForPayoff = (balance, apr, payoffYears) => {
  if (balance <= 0 || apr < 0 || payoffYears <= 0) {
    return { error: "Balance and Payoff Time must be positive. APR must be non-negative." };
  }

  const monthlyRate = apr / 12 / 100;
  const numberOfMonths = payoffYears * 12;

  if (numberOfMonths <= 0) {
      return { error: "Payoff time in months must be positive."}
  }

  let requiredMonthlyPayment;
  if (monthlyRate === 0) { // No interest
    requiredMonthlyPayment = balance / numberOfMonths;
  } else {
    // PMT = PV * r * (1+r)^n / ((1+r)^n - 1)
    const tempFactor = Math.pow(1 + monthlyRate, numberOfMonths);
    requiredMonthlyPayment = (balance * monthlyRate * tempFactor) / (tempFactor - 1);
  }
  
  if (!isFinite(requiredMonthlyPayment) || requiredMonthlyPayment <=0) {
      return { error: "Cannot calculate monthly payment. Check inputs."}
  }

  const totalPaid = requiredMonthlyPayment * numberOfMonths;
  const totalInterestPaid = totalPaid - balance;

  return {
    requiredMonthlyPayment: parseFloat(requiredMonthlyPayment.toFixed(2)),
    totalPrincipalPaid: balance,
    totalInterestPaid: parseFloat(totalInterestPaid.toFixed(2)),
    totalPaid: parseFloat(totalPaid.toFixed(2)),
    payoffMonths: numberOfMonths,
  };
};