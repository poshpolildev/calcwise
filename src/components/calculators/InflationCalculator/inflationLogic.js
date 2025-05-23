// src/components/calculators/InflationCalculator/inflationLogic.js
export const calculateFutureCost = (currentCost, annualInflationRate, numberOfYears) => {
  if (currentCost < 0 || annualInflationRate < -100 || numberOfYears < 0) { // Allow 0 for cost/years, any rate for inflation
    return {
      futureCost: 0,
      error: "Current Cost and Number of Years must be non-negative. Inflation rate is a percentage.",
    };
  }
  const inflationRateDecimal = annualInflationRate / 100;
  const futureCost = currentCost * Math.pow(1 + inflationRateDecimal, numberOfYears);

  return {
    futureCost: parseFloat(futureCost.toFixed(2)),
  };
};

export const calculatePresentValue = (futureAmount, annualInflationRate, numberOfYears) => {
  if (futureAmount < 0 || annualInflationRate < -100 || numberOfYears < 0) {
    return {
      presentValue: 0,
      error: "Future Amount and Number of Years must be non-negative. Inflation rate is a percentage.",
    };
  }
  const inflationRateDecimal = annualInflationRate / 100;
  const presentValue = futureAmount / Math.pow(1 + inflationRateDecimal, numberOfYears);

  return {
    presentValue: parseFloat(presentValue.toFixed(2)),
  };
};