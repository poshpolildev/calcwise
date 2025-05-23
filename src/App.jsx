// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // Import Helmet and HelmetProvider
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import HomeMessage from './components/HomeMessage';
import CalculatorInfoBox from './components/common/CalculatorInfoBox'; // Import the new component
import { motion, AnimatePresence } from 'framer-motion';

import { allTools } from './data/allTools';
import { currencies, defaultCurrency } from './data/currencies';

// --- Import ALL your calculator components ---
import EmiCalculatorInput from './components/calculators/EmiCalculator/EmiCalculatorInput';
import EmiCalculatorOutput from './components/calculators/EmiCalculator/EmiCalculatorOutput';
import SimpleInterestInput from './components/calculators/SimpleInterestCalculator/SimpleInterestInput';
import SimpleInterestOutput from './components/calculators/SimpleInterestCalculator/SimpleInterestOutput';
import CompoundInterestInput from './components/calculators/CompoundInterestCalculator/CompoundInterestInput';
import CompoundInterestOutput from './components/calculators/CompoundInterestCalculator/CompoundInterestOutput';
import SipInput from './components/calculators/SipCalculator/SipInput';
import SipOutput from './components/calculators/SipCalculator/SipOutput';
import FdInput from './components/calculators/FdCalculator/FdInput';
import FdOutput from './components/calculators/FdCalculator/FdOutput';
import RdInput from './components/calculators/RdCalculator/RdInput';
import RdOutput from './components/calculators/RdCalculator/RdOutput';
import InflationInput from './components/calculators/InflationCalculator/InflationInput';
import InflationOutput from './components/calculators/InflationCalculator/InflationOutput';
import RoiInput from './components/calculators/RoiCalculator/RoiInput';
import RoiOutput from './components/calculators/RoiCalculator/RoiOutput';
import BreakEvenInput from './components/calculators/BreakEvenCalculator/BreakEvenInput';
import BreakEvenOutput from './components/calculators/BreakEvenCalculator/BreakEvenOutput';
import SavingsGoalInput from './components/calculators/SavingsGoalCalculator/SavingsGoalInput';
import SavingsGoalOutput from './components/calculators/SavingsGoalCalculator/SavingsGoalOutput';
import LoanAffordabilityInput from './components/calculators/LoanAffordabilityCalculator/LoanAffordabilityInput';
import LoanAffordabilityOutput from './components/calculators/LoanAffordabilityCalculator/LoanAffordabilityOutput';
import NetWorthInput from './components/calculators/NetWorthCalculator/NetWorthInput';
import NetWorthOutput from './components/calculators/NetWorthCalculator/NetWorthOutput';
import InterestRateInput from './components/calculators/InterestRateCalculator/InterestRateInput';
import InterestRateOutput from './components/calculators/InterestRateCalculator/InterestRateOutput';
import RetirementInput from './components/calculators/RetirementCalculator/RetirementInput';
import RetirementOutput from './components/calculators/RetirementCalculator/RetirementOutput';
import CreditCardPayoffInput from './components/calculators/CreditCardPayoffCalculator/CreditCardPayoffInput';
import CreditCardPayoffOutput from './components/calculators/CreditCardPayoffCalculator/CreditCardPayoffOutput';
import AmortizationInput from './components/calculators/AmortizationCalculator/AmortizationInput';
import AmortizationOutput from './components/calculators/AmortizationCalculator/AmortizationOutput';
import MortgageInput from './components/calculators/MortgageCalculator/MortgageInput';
import MortgageOutput from './components/calculators/MortgageCalculator/MortgageOutput';
import BudgetPlanner from './components/calculators/BudgetPlanner/BudgetPlanner';

// --- Import ALL your calculator logic functions ---
import { calculateEMI } from './components/calculators/EmiCalculator/emiLogic';
import { calculateSimpleInterest } from './components/calculators/SimpleInterestCalculator/simpleInterestLogic';
import { calculateCompoundInterest } from './components/calculators/CompoundInterestCalculator/compoundInterestLogic';
import { calculateSip } from './components/calculators/SipCalculator/sipLogic';
import { calculateFdMaturity } from './components/calculators/FdCalculator/fdLogic';
import { calculateRdMaturity } from './components/calculators/RdCalculator/rdLogic';
import { calculateFutureCost, calculatePresentValue } from './components/calculators/InflationCalculator/inflationLogic';
import { calculateRoi } from './components/calculators/RoiCalculator/roiLogic';
import { calculateBreakEvenPoint } from './components/calculators/BreakEvenCalculator/breakEvenLogic';
import { calculateMonthlySavings } from './components/calculators/SavingsGoalCalculator/savingsGoalLogic';
import { calculateAffordableLoan } from './components/calculators/LoanAffordabilityCalculator/loanAffordabilityLogic';
import { calculateNetWorth } from './components/calculators/NetWorthCalculator/netWorthLogic';
import { calculateSimpleInterestRate } from './components/calculators/InterestRateCalculator/interestRateLogic';
import { calculateRetirementSavings } from './components/calculators/RetirementCalculator/retirementLogic';
import { calculateTimeToPayOff, calculateMonthlyPaymentForPayoff } from './components/calculators/CreditCardPayoffCalculator/creditCardPayoffLogic';
import { generateAmortizationSchedule } from './components/calculators/AmortizationCalculator/amortizationLogic';
import { calculateMortgageEmi } from './components/calculators/MortgageCalculator/mortgageLogic';


function App() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  // --- States for each calculator ---
  const [emiResults, setEmiResults] = useState(null);
  const [emiInputs, setEmiInputs] = useState(null);
  const [simpleInterestResults, setSimpleInterestResults] = useState(null);
  const [simpleInterestInputs, setSimpleInterestInputs] = useState(null);
  const [compoundInterestResults, setCompoundInterestResults] = useState(null);
  const [compoundInterestInputs, setCompoundInterestInputs] = useState(null);
  const [sipResults, setSipResults] = useState(null);
  // const [sipInputs, setSipInputs] = useState(null); // If needed
  const [fdResults, setFdResults] = useState(null);
  const [fdInputs, setFdInputs] = useState(null);
  const [rdResults, setRdResults] = useState(null);
  // const [rdInputs, setRdInputs] = useState(null); // If needed
  const [inflationResults, setInflationResults] = useState(null);
  const [inflationInputs, setInflationInputs] = useState(null);
  const [roiResults, setRoiResults] = useState(null);
  // const [roiInputs, setRoiInputs] = useState(null); // If needed
  const [breakEvenResults, setBreakEvenResults] = useState(null);
  // const [breakEvenInputs, setBreakEvenInputs] = useState(null); // If needed
  const [savingsGoalResults, setSavingsGoalResults] = useState(null);
  const [savingsGoalInputs, setSavingsGoalInputs] = useState(null);
  const [loanAffordabilityResults, setLoanAffordabilityResults] = useState(null);
  const [loanAffordabilityInputs, setLoanAffordabilityInputs] = useState(null);
  const [netWorthResults, setNetWorthResults] = useState(null);
  // const [netWorthInputs, setNetWorthInputs] = useState(null); // NetWorthInput manages its own complex state
  const [interestRateResults, setInterestRateResults] = useState(null);
  const [interestRateInputs, setInterestRateInputs] = useState(null);
  const [retirementResults, setRetirementResults] = useState(null);
  // const [retirementInputs, setRetirementInputs] = useState(null); // If needed
  const [creditCardPayoffResults, setCreditCardPayoffResults] = useState(null);
  const [creditCardPayoffInputs, setCreditCardPayoffInputs] = useState(null);
  const [amortizationResults, setAmortizationResults] = useState(null);
  // const [amortizationInputs, setAmortizationInputs] = useState(null); // If needed
  const [mortgageResults, setMortgageResults] = useState(null);
  // const [mortgageInputs, setMortgageInputs] = useState(null); // If needed

  const storedCurrencyValue = localStorage.getItem('calcwise-currency');
  const initialCurrency = currencies.find(c => c.value === storedCurrencyValue) || defaultCurrency;
  const [selectedCurrency, setSelectedCurrency] = useState(initialCurrency);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentToolDetails = allTools.find(tool => tool.id === selectedTool);
  const siteName = "Calc Wise";

  // SEO: Dynamic Title and Description
  let pageTitle = `${siteName} - Free Financial Calculators & Planning Tools`;
  let pageDescription = "Calc Wise offers a comprehensive suite of free online financial calculators for EMI, mortgage, investment returns (ROI), SIP, retirement planning, net worth, and more. Make smart financial decisions with easy-to-use tools.";
  // let canonicalUrl = "https://www.yourcalcwisedomain.com"; // Replace with your actual domain

  if (currentToolDetails) {
    pageTitle = `${currentToolDetails.name} - ${siteName}`;
    pageDescription = currentToolDetails.explanation || `Use the ${currentToolDetails.name} on ${siteName} for your financial planning.`;
    // canonicalUrl = `https://www.yourcalcwisedomain.com/tools/${currentToolDetails.id}`; // If using routing
  }

  const resetAllCalculatorStates = () => {
    setEmiResults(null); setEmiInputs(null);
    setSimpleInterestResults(null); setSimpleInterestInputs(null);
    setCompoundInterestResults(null); setCompoundInterestInputs(null);
    setSipResults(null); /* setSipInputs(null); */
    setFdResults(null); setFdInputs(null);
    setRdResults(null); /* setRdInputs(null); */
    setInflationResults(null); setInflationInputs(null);
    setRoiResults(null); /* setRoiInputs(null); */
    setBreakEvenResults(null); /* setBreakEvenInputs(null); */
    setSavingsGoalResults(null); setSavingsGoalInputs(null);
    setLoanAffordabilityResults(null); setLoanAffordabilityInputs(null);
    setNetWorthResults(null); /* setNetWorthInputs(null); */
    setInterestRateResults(null); setInterestRateInputs(null);
    setRetirementResults(null); /* setRetirementInputs(null); */
    setCreditCardPayoffResults(null); setCreditCardPayoffInputs(null);
    setAmortizationResults(null); /* setAmortizationInputs(null); */
    setMortgageResults(null); /* setMortgageInputs(null); */
  };

  const handleSelectTool = (toolId) => {
    setSelectedTool(toolId);
    resetAllCalculatorStates();
    if (window.innerWidth < 768 && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const handleHomeClick = () => {
    setSelectedTool(null);
    resetAllCalculatorStates();
  };

  // --- ALL Calculation Handler Functions ---
  const handleEmiCalculate = (inputs) => { setEmiResults(calculateEMI(inputs.principal, inputs.annualRate, inputs.tenureYears)); setEmiInputs(inputs); };
  const handleSimpleInterestCalculate = (inputs) => { setSimpleInterestResults(calculateSimpleInterest(inputs.principal, inputs.annualRate, inputs.tenureYears)); setSimpleInterestInputs(inputs); };
  const handleCompoundInterestCalculate = (inputs) => { setCompoundInterestResults(calculateCompoundInterest(inputs.principal, inputs.annualRate, inputs.tenureYears, inputs.compoundingFrequency)); setCompoundInterestInputs(inputs); };
  const handleSipCalculate = (inputs) => setSipResults(calculateSip(inputs.monthlyInvestment, inputs.annualRate, inputs.tenureYears));
  const handleFdCalculate = (inputs) => { setFdResults(calculateFdMaturity(inputs.principal, inputs.annualRate, inputs.tenureYears, inputs.compoundingFrequency)); setFdInputs(inputs); };
  const handleRdCalculate = (inputs) => setRdResults(calculateRdMaturity(inputs.monthlyDeposit, inputs.annualRate, inputs.tenureYears));
  const handleInflationCalculate = (inputs) => {
    let results;
    if (inputs.calculationType === 'futureCost') results = calculateFutureCost(inputs.amount, inputs.annualInflationRate, inputs.numberOfYears);
    else results = calculatePresentValue(inputs.amount, inputs.annualInflationRate, inputs.numberOfYears);
    setInflationResults(results); setInflationInputs(inputs);
  };
  const handleRoiCalculate = (inputs) => setRoiResults(calculateRoi(inputs.initialInvestment, inputs.finalValue, inputs.tenureYears));
  const handleBreakEvenCalculate = (inputs) => setBreakEvenResults(calculateBreakEvenPoint(inputs.fixedCosts, inputs.variableCostPerUnit, inputs.sellingPricePerUnit));
  const handleSavingsGoalCalculate = (inputs) => { setSavingsGoalResults(calculateMonthlySavings(inputs.savingsGoal, inputs.annualRate, inputs.tenureYears, inputs.initialSavings)); setSavingsGoalInputs(inputs); };
  const handleLoanAffordabilityCalculate = (inputs) => { setLoanAffordabilityResults(calculateAffordableLoan(inputs.grossMonthlyIncome, inputs.totalMonthlyDebt, inputs.loanTenureYears, inputs.annualInterestRate, inputs.desiredDtiRatio)); setLoanAffordabilityInputs(inputs); };
  const handleNetWorthCalculate = (assets, liabilities) => setNetWorthResults(calculateNetWorth(assets, liabilities));
  const handleInterestRateCalculate = (inputs) => { setInterestRateResults(calculateSimpleInterestRate(inputs.principal, inputs.interestOrAmount, inputs.tenureYears, inputs.calculationType)); setInterestRateInputs(inputs); };
  const handleRetirementCalculate = (inputs) => setRetirementResults(calculateRetirementSavings(inputs));
  const handleCreditCardPayoffCalculate = (inputs) => {
    let results;
    if (inputs.calcMode === 'timeToPayoff') results = calculateTimeToPayOff(inputs.balance, inputs.apr, inputs.monthlyPayment);
    else results = calculateMonthlyPaymentForPayoff(inputs.balance, inputs.apr, inputs.payoffYears);
    setCreditCardPayoffResults(results); setCreditCardPayoffInputs(inputs);
  };
  const handleAmortizationCalculate = (inputs) => setAmortizationResults(generateAmortizationSchedule(inputs.principal, inputs.annualRate, inputs.tenureYears));
  const handleMortgageCalculate = (inputs) => setMortgageResults(calculateMortgageEmi(inputs.homePrice, inputs.downPayment, inputs.annualRate, inputs.tenureYears));


  const renderCalculator = () => {
    if (!selectedTool || !currentToolDetails) {
      return <HomeMessage key="home_fallback_render" />;
    }

    let calculatorInputComponent;
    let calculatorOutputComponent;

    switch (selectedTool) {
      case 'emi':
        calculatorInputComponent = <EmiCalculatorInput onCalculate={handleEmiCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <EmiCalculatorOutput results={emiResults} currencySymbol={selectedCurrency?.symbol} principal={emiInputs?.principal} />;
        break;
      case 'simpleInterest':
        calculatorInputComponent = <SimpleInterestInput onCalculate={handleSimpleInterestCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <SimpleInterestOutput results={simpleInterestResults} currencySymbol={selectedCurrency?.symbol} principalAmount={simpleInterestInputs?.principal} />;
        break;
      case 'compoundInterest':
        calculatorInputComponent = <CompoundInterestInput onCalculate={handleCompoundInterestCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <CompoundInterestOutput results={compoundInterestResults} currencySymbol={selectedCurrency?.symbol} principalAmount={compoundInterestInputs?.principal} />;
        break;
      case 'sip':
        calculatorInputComponent = <SipInput onCalculate={handleSipCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <SipOutput results={sipResults} currencySymbol={selectedCurrency?.symbol} />;
        break;
      case 'fd':
        calculatorInputComponent = <FdInput onCalculate={handleFdCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <FdOutput results={fdResults} currencySymbol={selectedCurrency?.symbol} depositAmount={fdInputs?.principal} />;
        break;
      case 'rd':
        calculatorInputComponent = <RdInput onCalculate={handleRdCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <RdOutput results={rdResults} currencySymbol={selectedCurrency?.symbol} />;
        break;
      case 'inflation':
        calculatorInputComponent = <InflationInput onCalculate={handleInflationCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <InflationOutput results={inflationResults} currencySymbol={selectedCurrency?.symbol} calculationType={inflationInputs?.calculationType} originalAmount={inflationInputs?.amount} years={inflationInputs?.numberOfYears} rate={inflationInputs?.annualInflationRate} />;
        break;
      case 'investmentReturn':
        calculatorInputComponent = <RoiInput onCalculate={handleRoiCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <RoiOutput results={roiResults} currencySymbol={selectedCurrency?.symbol} />;
        break;
      case 'breakEven':
        calculatorInputComponent = <BreakEvenInput onCalculate={handleBreakEvenCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <BreakEvenOutput results={breakEvenResults} currencySymbol={selectedCurrency?.symbol} />;
        break;
      case 'savingsGoal':
        calculatorInputComponent = <SavingsGoalInput onCalculate={handleSavingsGoalCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <SavingsGoalOutput results={savingsGoalResults} currencySymbol={selectedCurrency?.symbol} savingsTarget={savingsGoalInputs?.savingsGoal} />;
        break;
      case 'loanAffordability':
        calculatorInputComponent = <LoanAffordabilityInput onCalculate={handleLoanAffordabilityCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <LoanAffordabilityOutput results={loanAffordabilityResults} currencySymbol={selectedCurrency?.symbol} inputs={loanAffordabilityInputs} />;
        break;
      case 'netWorth':
        calculatorInputComponent = <NetWorthInput onCalculate={handleNetWorthCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <NetWorthOutput results={netWorthResults} currencySymbol={selectedCurrency?.symbol} />;
        break;
      case 'interestRate':
        calculatorInputComponent = <InterestRateInput onCalculate={handleInterestRateCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <InterestRateOutput results={interestRateResults} currencySymbol={selectedCurrency?.symbol} inputs={interestRateInputs} />;
        break;
      case 'retirementSavings':
        calculatorInputComponent = <RetirementInput onCalculate={handleRetirementCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <RetirementOutput results={retirementResults} currencySymbol={selectedCurrency?.symbol} />;
        break;
      case 'creditCard':
        calculatorInputComponent = <CreditCardPayoffInput onCalculate={handleCreditCardPayoffCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <CreditCardPayoffOutput results={creditCardPayoffResults} currencySymbol={selectedCurrency?.symbol} calcMode={creditCardPayoffInputs?.calcMode} />;
        break;
      case 'loanRepayment':
        calculatorInputComponent = <AmortizationInput onCalculate={handleAmortizationCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <AmortizationOutput results={amortizationResults} currencySymbol={selectedCurrency?.symbol} />;
        break;
      case 'mortgage':
        calculatorInputComponent = <MortgageInput onCalculate={handleMortgageCalculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <MortgageOutput results={mortgageResults} currencySymbol={selectedCurrency?.symbol} />;
        break;
      case 'budgetPlanner':
        return ( // BudgetPlanner has a different structure, handled directly
          <motion.div key="budgetPlannerTool" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full">
            <CalculatorInfoBox toolName={currentToolDetails.name} explanation={currentToolDetails.explanation} />
            <BudgetPlanner selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
          </motion.div>
        );
      default:
        return (
          <motion.div key="unknown-tool" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-theme-text-secondary p-8">
            The calculator "{currentToolDetails.name || selectedTool}" is under construction or not found.
          </motion.div>
        );
    }

    // Common layout for standard input/output calculators
    return (
      <div className="w-full">
        <CalculatorInfoBox toolName={currentToolDetails.name} explanation={currentToolDetails.explanation} />
        <motion.div
          key={selectedTool}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, delay: 0.1 }} // Slight delay for panels after info box
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start"
        >
          <div className="bg-theme-panel-dark p-6 rounded-xl shadow-xl">
            {calculatorInputComponent}
          </div>
          <div className="bg-theme-panel-dark p-6 rounded-xl shadow-xl">
            {calculatorOutputComponent}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    // Wrap the entire App with HelmetProvider
    <HelmetProvider>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {/* <link rel="canonical" href={canonicalUrl} /> */}
      </Helmet>
      <div className="flex flex-col min-h-screen bg-theme-bg-dark">
        <Header onHomeClick={handleHomeClick} />
        <div className={`flex flex-1 pt-16 md:pt-20 pb-16 md:pb-12 ${isSidebarOpen ? 'md:pl-64 lg:pl-72' : 'md:pl-0'} transition-all duration-300 ease-in-out`}>
          <Sidebar onSelectTool={handleSelectTool} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <main className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto">
            <AnimatePresence mode="wait">
              {selectedTool ? renderCalculator() : <HomeMessage key="home" />}
            </AnimatePresence>
          </main>
        </div>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;