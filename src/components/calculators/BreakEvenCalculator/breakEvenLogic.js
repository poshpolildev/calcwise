export const calculateBreakEvenPoint = (fixedCosts, variableCostPerUnit, sellingPricePerUnit) => {
  if (fixedCosts < 0 || variableCostPerUnit < 0 || sellingPricePerUnit <= 0) {
    return {
      breakEvenUnits: 0,
      breakEvenRevenue: 0,
      contributionMarginPerUnit: 0,
      error: "Costs must be non-negative. Selling price must be positive.",
    };
  }

  const contributionMarginPerUnit = sellingPricePerUnit - variableCostPerUnit;

  if (contributionMarginPerUnit <= 0) {
    return {
      breakEvenUnits: Infinity,
      breakEvenRevenue: Infinity,
      contributionMarginPerUnit: parseFloat(contributionMarginPerUnit.toFixed(2)),
      error: "Selling price per unit must be greater than variable cost per unit for a valid break-even point.",
    };
  }

  const breakEvenUnits = fixedCosts / contributionMarginPerUnit;
  const breakEvenRevenue = breakEvenUnits * sellingPricePerUnit;

  return {
    breakEvenUnits: parseFloat(breakEvenUnits.toFixed(2)),
    breakEvenRevenue: parseFloat(breakEvenRevenue.toFixed(2)),
    contributionMarginPerUnit: parseFloat(contributionMarginPerUnit.toFixed(2)),
  };
};