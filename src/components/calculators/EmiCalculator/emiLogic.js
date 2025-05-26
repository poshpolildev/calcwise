// src/components/calculators/EmiCalculator/emiLogic.js
export const calculateEMI = (principal, annualRate, tenureMonths, disbursementDate = null) => {
  // disbursementDate is collected but not used in this basic EMI formula.
  // It would be used for calculations like pre-EMI interest or exact first payment date adjustments.

  if (principal <= 0 || annualRate < 0 || tenureMonths <= 0) {
    return {
      error: "Loan Amount and Tenure (months) must be positive. Rate must be non-negative.",
      emi: 0,
      totalInterest: 0,
      totalPayable: 0,
    };
  }

  const monthlyRate = annualRate / 12 / 100;
  // tenureMonths is now directly provided as input

  let emi;
  if (monthlyRate === 0) { // If interest rate is 0%
    emi = principal / tenureMonths;
  } else {
    const tempFactor = Math.pow(1 + monthlyRate, tenureMonths);
    emi = (principal * monthlyRate * tempFactor) / (tempFactor - 1);
  }

  if (!isFinite(emi) || emi < 0) { // Check for invalid EMI result
      // This can happen if principal is very small and rate/tenure leads to near-zero or negative EMI due to precision
      if (principal > 0 && monthlyRate > 0) {
        return { error: "Cannot calculate a valid EMI with the provided inputs. Please check values.", emi: 0, totalInterest: 0, totalPayable: 0 };
      }
      emi = 0; // Default to 0 if calculation is not meaningful
  }


  const totalPayable = emi * tenureMonths;
  const totalInterest = totalPayable - principal;

  return {
    emi: parseFloat(emi.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    totalPayable: parseFloat(totalPayable.toFixed(2)),
    // You could also return disbursementDate if needed by the output component for display
  };
};
