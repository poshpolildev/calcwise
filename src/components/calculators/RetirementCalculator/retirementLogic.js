// src/components/calculators/RetirementCalculator/retirementLogic.js
export const calculateRetirementSavings = (inputs) => {
  const {
    currentAge,
    retirementAge,
    desiredMonthlyIncomeToday, // In today's value
    lifeExpectancy,
    currentSavings,
    preRetirementRoi, // Annual %
    postRetirementRoi, // Annual %
    inflationRate, // Annual %
  } = inputs;

  // Basic Validations
  if (currentAge < 18 || retirementAge <= currentAge || lifeExpectancy <= retirementAge ||
      desiredMonthlyIncomeToday < 0 || currentSavings < 0 ||
      preRetirementRoi < 0 || postRetirementRoi < 0 || inflationRate < -10) { // Allow some deflation
    return { error: "Please provide valid positive inputs for ages, income, savings, and rates." };
  }

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;

  if (yearsToRetirement <= 0) return { error: "Retirement age must be greater than current age." };
  if (yearsInRetirement <= 0) return { error: "Life expectancy must be greater than retirement age." };


  const monthlyInflationRate = inflationRate / 12 / 100; // Though typically annual inflation is used for FV of income
  const annualInflationRateDecimal = inflationRate / 100;

  // 1. Inflated Monthly Income at Retirement
  const inflatedMonthlyIncomeAtRetirement = desiredMonthlyIncomeToday * Math.pow(1 + annualInflationRateDecimal, yearsToRetirement);

  // 2. Corpus Needed at Retirement
  const monthlyPostRetirementRate = postRetirementRoi / 12 / 100;
  const numberOfRetirementMonths = yearsInRetirement * 12;
  let corpusNeeded;
  if (monthlyPostRetirementRate === 0) {
    corpusNeeded = inflatedMonthlyIncomeAtRetirement * numberOfRetirementMonths;
  } else {
    // PV of an annuity (assuming income needed at the start of each month during retirement for simplicity)
    // corpusNeeded = inflatedMonthlyIncomeAtRetirement * (1 - Math.pow(1 + monthlyPostRetirementRate, -numberOfRetirementMonths)) / monthlyPostRetirementRate * (1 + monthlyPostRetirementRate);
    // Simpler: PV of ordinary annuity (income at end of month)
     corpusNeeded = inflatedMonthlyIncomeAtRetirement * ( (1 - Math.pow(1 + monthlyPostRetirementRate, -numberOfRetirementMonths)) / monthlyPostRetirementRate );
     if (corpusNeeded < 0) corpusNeeded = inflatedMonthlyIncomeAtRetirement * numberOfRetirementMonths; // fallback if rate makes PV weird
  }


  // 3. Future Value of Current Savings
  const monthlyPreRetirementRate = preRetirementRoi / 12 / 100;
  const numberOfPreRetirementMonths = yearsToRetirement * 12;
  const fvOfCurrentSavings = currentSavings * Math.pow(1 + monthlyPreRetirementRate, numberOfPreRetirementMonths);

  // 4. Shortfall or Surplus
  const shortfall = corpusNeeded - fvOfCurrentSavings;

  // 5. Required Additional Monthly Savings to cover shortfall
  let requiredMonthlySavings = 0;
  if (shortfall > 0) {
    if (monthlyPreRetirementRate === 0) {
      requiredMonthlySavings = shortfall / numberOfPreRetirementMonths;
    } else {
      // PMT formula (assuming saving at beginning of month)
      const denominator = ( (Math.pow(1 + monthlyPreRetirementRate, numberOfPreRetirementMonths) - 1) / monthlyPreRetirementRate ) * (1 + monthlyPreRetirementRate);
      if (denominator > 0) {
        requiredMonthlySavings = shortfall / denominator;
      } else { // Unlikely to reach with valid positive rates and time, but as a fallback
        return { ... createInitialResults(), error: "Cannot calculate required savings. Parameters might lead to unachievable goal." }
      }
    }
  }
  
  if (requiredMonthlySavings < 0) requiredMonthlySavings = 0; // Cannot save negative

  // Projected corpus if requiredMonthlySavings are made
  let projectedCorpusWithAdditionalSavings = fvOfCurrentSavings;
  if (shortfall > 0 && requiredMonthlySavings > 0) {
      if(monthlyPreRetirementRate === 0) {
          projectedCorpusWithAdditionalSavings += requiredMonthlySavings * numberOfPreRetirementMonths;
      } else {
          projectedCorpusWithAdditionalSavings += requiredMonthlySavings * ( (Math.pow(1 + monthlyPreRetirementRate, numberOfPreRetirementMonths) - 1) / monthlyPreRetirementRate ) * (1 + monthlyPreRetirementRate);
      }
  }


  return {
    inflatedMonthlyIncomeAtRetirement: parseFloat(inflatedMonthlyIncomeAtRetirement.toFixed(2)),
    corpusNeeded: parseFloat(corpusNeeded.toFixed(2)),
    fvOfCurrentSavings: parseFloat(fvOfCurrentSavings.toFixed(2)),
    shortfall: parseFloat(shortfall.toFixed(2)),
    requiredMonthlySavings: parseFloat(requiredMonthlySavings.toFixed(2)),
    projectedCorpusWithAdditionalSavings: parseFloat(projectedCorpusWithAdditionalSavings.toFixed(2)),
    yearsToRetirement,
    yearsInRetirement
  };
};

const createInitialResults = () => ({
    inflatedMonthlyIncomeAtRetirement: 0,
    corpusNeeded: 0,
    fvOfCurrentSavings: 0,
    shortfall: 0,
    requiredMonthlySavings: 0,
    projectedCorpusWithAdditionalSavings: 0,
    yearsToRetirement:0,
    yearsInRetirement:0
});