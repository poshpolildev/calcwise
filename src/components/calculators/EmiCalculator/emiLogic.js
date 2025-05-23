export const calculateEMI = (principal, annualRate, tenureYears) => {
  if (principal <= 0 || annualRate <= 0 || tenureYears <= 0) {
    return { emi: 0, totalInterest: 0, totalPayable: 0, error: "All values must be positive numbers." };
  }

  const monthlyRate = annualRate / 12 / 100;
  const tenureMonths = tenureYears * 12;

  if (monthlyRate === 0) { // Handle case where interest rate is 0, though UI should prevent this
      const emi = principal / tenureMonths;
      return {
          emi: emi,
          totalInterest: 0,
          totalPayable: principal,
      };
  }

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const totalPayable = emi * tenureMonths;
  const totalInterest = totalPayable - principal;

  return {
    emi: parseFloat(emi.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    totalPayable: parseFloat(totalPayable.toFixed(2)),
  };
};
