// src/components/calculators/RoiCalculator/roiLogic.js
export const calculateRoi = (initialInvestment, finalValue, tenureYears = null) => {
  if (initialInvestment <= 0 || finalValue < 0) {
    return {
      netProfit: 0,
      roiPercentage: 0,
      annualizedRoiPercentage: null, // Will be null if tenure is not provided or invalid
      error: "Initial Investment must be positive. Final Value must be non-negative.",
    };
  }

  const netProfit = finalValue - initialInvestment;
  const roiPercentage = (netProfit / initialInvestment) * 100;

  let annualizedRoiPercentage = null;
  if (tenureYears !== null && tenureYears > 0) {
    const roiDecimal = roiPercentage / 100;
    // ((Final Value / Initial Investment)^(1/Years)) - 1
    // This formula directly calculates annualized return without needing the intermediate ROI decimal for compounding.
    // It's equivalent to ((1 + ROI_total_decimal)^(1/years)) - 1
    if (initialInvestment > 0) { // Ensure initial investment is positive to avoid issues with Math.pow if finalValue is 0
        annualizedRoiPercentage = (Math.pow(finalValue / initialInvestment, 1 / tenureYears) - 1) * 100;
    } else {
        annualizedRoiPercentage = 0; // Or handle as an error/undefined case
    }

  }

  return {
    netProfit: parseFloat(netProfit.toFixed(2)),
    roiPercentage: parseFloat(roiPercentage.toFixed(2)),
    annualizedRoiPercentage: annualizedRoiPercentage !== null ? parseFloat(annualizedRoiPercentage.toFixed(2)) : null,
  };
};