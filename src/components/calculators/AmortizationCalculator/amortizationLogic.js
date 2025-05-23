export const generateAmortizationSchedule = (principal, annualRate, tenureYears) => {
  if (principal <= 0 || annualRate < 0 || tenureYears <= 0) {
    return {
      error: "Loan Amount and Tenure must be positive. Rate must be non-negative.",
      schedule: [],
      monthlyPayment: 0,
      totalInterest: 0,
      totalPayment: 0,
    };
  }

  const monthlyRate = annualRate / 12 / 100;
  const numberOfMonths = tenureYears * 12;

  let monthlyPayment;
  if (monthlyRate === 0) {
    monthlyPayment = principal / numberOfMonths;
  } else {
    const tempFactor = Math.pow(1 + monthlyRate, numberOfMonths);
    monthlyPayment = (principal * monthlyRate * tempFactor) / (tempFactor - 1);
  }

  if (!isFinite(monthlyPayment) || monthlyPayment <=0) {
      if (principal > 0 && monthlyRate > 0) {
           return { error: "Cannot calculate a valid monthly payment with these inputs. Tenure might be too short or rate too high causing issues.", schedule: [], monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
      }
      monthlyPayment = 0;
  }

  const schedule = [];
  let beginningBalance = principal;
  let totalInterestPaid = 0;

  for (let i = 1; i <= numberOfMonths; i++) {
    const interestPaid = beginningBalance * monthlyRate;
    let principalPaid = monthlyPayment - interestPaid;

    if (i === numberOfMonths) {
        if (beginningBalance - principalPaid < 0.01 && beginningBalance - principalPaid > -0.01 && beginningBalance - principalPaid !==0) {
            principalPaid = beginningBalance;
        }
    }

    const endingBalance = beginningBalance - principalPaid;
    totalInterestPaid += interestPaid;

    schedule.push({
      month: i,
      beginningBalance: parseFloat(beginningBalance.toFixed(2)),
      payment: parseFloat(monthlyPayment.toFixed(2)),
      principalPaid: parseFloat(principalPaid.toFixed(2)),
      interestPaid: parseFloat(interestPaid.toFixed(2)),
      endingBalance: parseFloat(Math.abs(endingBalance) < 0.005 ? 0 : endingBalance.toFixed(2)),
    });

    beginningBalance = endingBalance;
    if (beginningBalance <= 0.01 && i < numberOfMonths) {
        const lastPaymentIndex = schedule.length -1;
        if (schedule[lastPaymentIndex]) {
            schedule[lastPaymentIndex].payment = (schedule[lastPaymentIndex].beginningBalance || 0) + (schedule[lastPaymentIndex].interestPaid || 0);
            schedule[lastPaymentIndex].principalPaid = schedule[lastPaymentIndex].beginningBalance || 0;
            schedule[lastPaymentIndex].endingBalance = 0;
        }
        break;
    }
  }

  totalInterestPaid = schedule.reduce((acc, row) => acc + (row.interestPaid || 0), 0);
  const totalPayment = principal + totalInterestPaid;

  return {
    schedule,
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    totalInterest: parseFloat(totalInterestPaid.toFixed(2)),
    totalPayment: parseFloat(totalPayment.toFixed(2)),
  };
};