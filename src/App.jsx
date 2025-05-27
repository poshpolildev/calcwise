// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import HomeMessage from './components/HomeMessage';
import CalculatorInfoBox from './components/common/CalculatorInfoBox';
import { motion, AnimatePresence } from 'framer-motion';

import { allTools } from './data/allTools';
import { currencies, defaultCurrency } from './data/currencies'; // defaultCurrency is now BDT

// --- Import ALL your calculator components ---
import EmiCalculatorInput from './components/calculators/EmiCalculator/EmiCalculatorInput';
import EmiCalculatorOutput from './components/calculators/EmiCalculator/EmiCalculatorOutput';
// ... (Import ALL other calculator Input and Output components you have created) ...
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


const getCurrentToolIdFromPath = (pathname) => {
  const match = pathname.match(/^\/calculator\/([^/]+)/);
  return match ? match[1] : null;
};

const CalculatorDisplay = ({ allCalculatorStates, allCalculatorHandlers, selectedCurrency, setSelectedCurrency }) => {
  const { toolId } = useParams();
  const currentToolDetails = allTools.find(tool => tool.id === toolId);

  if (!currentToolDetails) {
    return <div className="text-center text-theme-text-secondary p-8">Calculator "{toolId}" not found.</div>;
  }

  const toolStates = allCalculatorStates[toolId] || {};
  const toolHandlers = allCalculatorHandlers[toolId] || {};

  if (!toolHandlers || typeof toolHandlers.calculate !== 'function') {
    return <div className="text-center text-theme-text-secondary p-8">Calculator "{currentToolDetails.name}" logic is not configured.</div>;
  }

  let calculatorInputComponent;
  let calculatorOutputComponent;

  // --- ENSURE ALL YOUR CALCULATOR IDs ARE HANDLED IN THIS SWITCH ---
  switch (toolId) {
    case 'emi':
      calculatorInputComponent = <EmiCalculatorInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
      calculatorOutputComponent = <EmiCalculatorOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} principal={toolStates.inputs?.principal} />;
      break;
    case 'simpleInterest':
      calculatorInputComponent = <SimpleInterestInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
      calculatorOutputComponent = <SimpleInterestOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} principalAmount={toolStates.inputs?.principal} />;
      break;
    case 'compoundInterest':
        calculatorInputComponent = <CompoundInterestInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <CompoundInterestOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} principalAmount={toolStates.inputs?.principal} />;
        break;
    case 'sip':
        calculatorInputComponent = <SipInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <SipOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} />;
        break;
    case 'fd':
        calculatorInputComponent = <FdInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <FdOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} depositAmount={toolStates.inputs?.principal} />;
        break;
    case 'rd':
        calculatorInputComponent = <RdInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <RdOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} />;
        break;
    case 'inflation':
        calculatorInputComponent = <InflationInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <InflationOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} calculationType={toolStates.inputs?.calculationType} originalAmount={toolStates.inputs?.amount} years={toolStates.inputs?.numberOfYears} rate={toolStates.inputs?.annualInflationRate} />;
        break;
    case 'investmentReturn':
        calculatorInputComponent = <RoiInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <RoiOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} />;
        break;
    case 'breakEven':
        calculatorInputComponent = <BreakEvenInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <BreakEvenOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} />;
        break;
    case 'savingsGoal':
        calculatorInputComponent = <SavingsGoalInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <SavingsGoalOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} savingsTarget={toolStates.inputs?.savingsGoal} />;
        break;
    case 'loanAffordability':
        calculatorInputComponent = <LoanAffordabilityInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <LoanAffordabilityOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} inputs={toolStates.inputs} />;
        break;
    case 'netWorth':
        calculatorInputComponent = <NetWorthInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <NetWorthOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} />;
        break;
    case 'interestRate':
        calculatorInputComponent = <InterestRateInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <InterestRateOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} inputs={toolStates.inputs} />;
        break;
    case 'retirementSavings':
        calculatorInputComponent = <RetirementInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <RetirementOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} />;
        break;
    case 'creditCard':
        calculatorInputComponent = <CreditCardPayoffInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <CreditCardPayoffOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} calcMode={toolStates.inputs?.calcMode} />;
        break;
    case 'loanRepayment':
        calculatorInputComponent = <AmortizationInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <AmortizationOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} />;
        break;
    case 'mortgage':
        calculatorInputComponent = <MortgageInput onCalculate={toolHandlers.calculate} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />;
        calculatorOutputComponent = <MortgageOutput results={toolStates.results} currencySymbol={selectedCurrency?.symbol} />;
        break;
    // BudgetPlanner is handled by its own Route path="calculator/budgetPlanner"
    default:
        return (
            <motion.div key="unknown-calc-display" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-theme-text-secondary p-8">
                The calculator "{currentToolDetails?.name || toolId}" is not fully configured for display.
            </motion.div>
        );
    }

    return (
      <div className="w-full">
        <CalculatorInfoBox toolName={currentToolDetails.name} explanation={currentToolDetails.explanation} />
        <motion.div
          key={toolId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
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

const MainLayout = ({ onSelectTool, isSidebarOpen, setIsSidebarOpen, onHomeClick }) => (
    <div className="flex flex-col min-h-screen bg-theme-bg-dark">
        <Header onHomeClick={onHomeClick} />
        <div className={`flex flex-1 pt-16 md:pt-20 pb-16 md:pb-12 ${isSidebarOpen ? 'md:pl-64 lg:pl-72' : 'md:pl-0'} transition-all duration-300 ease-in-out`}>
            <Sidebar onSelectTool={onSelectTool} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <Outlet />
                </AnimatePresence>
            </main>
        </div>
        <Footer />
    </div>
);

const BudgetPlannerPage = ({selectedCurrency, setSelectedCurrency}) => {
    const budgetPlannerToolDetails = allTools.find(tool => tool.id === 'budgetPlanner');
    return (
        <motion.div key="budgetPlannerTool" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full">
            {budgetPlannerToolDetails && <CalculatorInfoBox toolName={budgetPlannerToolDetails.name} explanation={budgetPlannerToolDetails.explanation} />}
            <div className="bg-theme-panel-dark p-6 rounded-xl shadow-xl mt-0">
              <BudgetPlanner selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
            </div>
        </motion.div>
    );
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const siteName = "Calc Wise";
  const baseCanonicalUrl = "https://calcwise.me"; // CHANGE TO poshpo.me WHEN READY

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  // --- All calculator states ---
  const [emiResults, setEmiResults] = useState(null);
  const [emiInputs, setEmiInputs] = useState(null);
  const [simpleInterestResults, setSimpleInterestResults] = useState(null);
  const [simpleInterestInputs, setSimpleInterestInputs] = useState(null);
  const [compoundInterestResults, setCompoundInterestResults] = useState(null);
  const [compoundInterestInputs, setCompoundInterestInputs] = useState(null);
  const [sipResults, setSipResults] = useState(null);
  const [fdResults, setFdResults] = useState(null);
  const [fdInputs, setFdInputs] = useState(null);
  const [rdResults, setRdResults] = useState(null);
  const [inflationResults, setInflationResults] = useState(null);
  const [inflationInputs, setInflationInputs] = useState(null);
  const [roiResults, setRoiResults] = useState(null);
  const [breakEvenResults, setBreakEvenResults] = useState(null);
  const [savingsGoalResults, setSavingsGoalResults] = useState(null);
  const [savingsGoalInputs, setSavingsGoalInputs] = useState(null);
  const [loanAffordabilityResults, setLoanAffordabilityResults] = useState(null);
  const [loanAffordabilityInputs, setLoanAffordabilityInputs] = useState(null);
  const [netWorthResults, setNetWorthResults] = useState(null);
  const [interestRateResults, setInterestRateResults] = useState(null);
  const [interestRateInputs, setInterestRateInputs] = useState(null);
  const [retirementResults, setRetirementResults] = useState(null);
  const [creditCardPayoffResults, setCreditCardPayoffResults] = useState(null);
  const [creditCardPayoffInputs, setCreditCardPayoffInputs] = useState(null);
  const [amortizationResults, setAmortizationResults] = useState(null);
  const [mortgageResults, setMortgageResults] = useState(null);

  const storedCurrencyValue = localStorage.getItem('calcwise-currency');
  const initialCurrency = currencies.find(c => c.value === storedCurrencyValue) || defaultCurrency; // defaultCurrency is BDT
  const [selectedCurrency, setSelectedCurrency] = useState(initialCurrency);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const resetAllCalculatorStates = () => {
    setEmiResults(null); setEmiInputs(null);
    setSimpleInterestResults(null); setSimpleInterestInputs(null);
    setCompoundInterestResults(null); setCompoundInterestInputs(null);
    setSipResults(null);
    setFdResults(null); setFdInputs(null);
    setRdResults(null);
    setInflationResults(null); setInflationInputs(null);
    setRoiResults(null);
    setBreakEvenResults(null);
    setSavingsGoalResults(null); setSavingsGoalInputs(null);
    setLoanAffordabilityResults(null); setLoanAffordabilityInputs(null);
    setNetWorthResults(null);
    setInterestRateResults(null); setInterestRateInputs(null);
    setRetirementResults(null);
    setCreditCardPayoffResults(null); setCreditCardPayoffInputs(null);
    setAmortizationResults(null);
    setMortgageResults(null);
  };

  useEffect(() => {
    const toolIdFromPath = getCurrentToolIdFromPath(location.pathname);
    if (toolIdFromPath) {
        resetAllCalculatorStates();
    }
  }, [location.pathname]);

  const handleSelectTool = (toolId) => {
    navigate(`/calculator/${toolId}`);
    if (window.innerWidth < 768 && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const allCalculatorStates = useMemo(() => ({
    emi: { results: emiResults, inputs: emiInputs },
    simpleInterest: { results: simpleInterestResults, inputs: simpleInterestInputs },
    compoundInterest: {results: compoundInterestResults, inputs: compoundInterestInputs},
    sip: {results: sipResults},
    fd: {results: fdResults, inputs: fdInputs},
    rd: {results: rdResults},
    inflation: {results: inflationResults, inputs: inflationInputs},
    investmentReturn: {results: roiResults},
    breakEven: {results: breakEvenResults},
    savingsGoal: {results: savingsGoalResults, inputs: savingsGoalInputs},
    loanAffordability: {results: loanAffordabilityResults, inputs: loanAffordabilityInputs},
    netWorth: {results: netWorthResults},
    interestRate: {results: interestRateResults, inputs: interestRateInputs},
    retirementSavings: {results: retirementResults},
    creditCard: {results: creditCardPayoffResults, inputs: creditCardPayoffInputs},
    loanRepayment: {results: amortizationResults},
    mortgage: {results: mortgageResults},
  }), [ 
    emiResults, emiInputs, simpleInterestResults, simpleInterestInputs, compoundInterestResults, compoundInterestInputs,
    sipResults, fdResults, fdInputs, rdResults, inflationResults, inflationInputs, roiResults, breakEvenResults,
    savingsGoalResults, savingsGoalInputs, loanAffordabilityResults, loanAffordabilityInputs, netWorthResults,
    interestRateResults, interestRateInputs, retirementResults, creditCardPayoffResults, creditCardPayoffInputs,
    amortizationResults, mortgageResults
  ]);

  const allCalculatorHandlers = useMemo(() => ({
    emi: { calculate: (inputs) => { setEmiResults(calculateEMI(inputs.principal, inputs.annualRate, inputs.tenureMonths, inputs.disbursementDate)); setEmiInputs(inputs); } },
    simpleInterest: { calculate: (inputs) => { setSimpleInterestResults(calculateSimpleInterest(inputs.principal, inputs.annualRate, inputs.tenureYears)); setSimpleInterestInputs(inputs); } },
    compoundInterest: { calculate: (inputs) => { setCompoundInterestResults(calculateCompoundInterest(inputs.principal, inputs.annualRate, inputs.tenureYears, inputs.compoundingFrequency)); setCompoundInterestInputs(inputs); }},
    sip: { calculate: (inputs) => setSipResults(calculateSip(inputs.monthlyInvestment, inputs.annualRate, inputs.tenureYears))},
    fd: { calculate: (inputs) => { setFdResults(calculateFdMaturity(inputs.principal, inputs.annualRate, inputs.tenureYears, inputs.compoundingFrequency)); setFdInputs(inputs); }},
    rd: { calculate: (inputs) => setRdResults(calculateRdMaturity(inputs.monthlyDeposit, inputs.annualRate, inputs.tenureYears))},
    inflation: { calculate: (inputs) => {
        let results;
        if (inputs.calculationType === 'futureCost') results = calculateFutureCost(inputs.amount, inputs.annualInflationRate, inputs.numberOfYears);
        else results = calculatePresentValue(inputs.amount, inputs.annualInflationRate, inputs.numberOfYears);
        setInflationResults(results); setInflationInputs(inputs);
    }},
    investmentReturn: { calculate: (inputs) => setRoiResults(calculateRoi(inputs.initialInvestment, inputs.finalValue, inputs.tenureYears))},
    breakEven: { calculate: (inputs) => setBreakEvenResults(calculateBreakEvenPoint(inputs.fixedCosts, inputs.variableCostPerUnit, inputs.sellingPricePerUnit))},
    savingsGoal: { calculate: (inputs) => { setSavingsGoalResults(calculateMonthlySavings(inputs.savingsGoal, inputs.annualRate, inputs.tenureYears, inputs.initialSavings)); setSavingsGoalInputs(inputs); }},
    loanAffordability: { calculate: (inputs) => { setLoanAffordabilityResults(calculateAffordableLoan(inputs.grossMonthlyIncome, inputs.totalMonthlyDebt, inputs.loanTenureYears, inputs.annualInterestRate, inputs.desiredDtiRatio)); setLoanAffordabilityInputs(inputs); }},
    netWorth: { calculate: (assets, liabilities) => setNetWorthResults(calculateNetWorth(assets, liabilities))},
    interestRate: { calculate: (inputs) => { setInterestRateResults(calculateSimpleInterestRate(inputs.principal, inputs.interestOrAmount, inputs.tenureYears, inputs.calculationType)); setInterestRateInputs(inputs); }},
    retirementSavings: { calculate: (inputs) => setRetirementResults(calculateRetirementSavings(inputs))},
    creditCard: { calculate: (inputs) => {
        let results;
        if (inputs.calcMode === 'timeToPayoff') results = calculateTimeToPayOff(inputs.balance, inputs.apr, inputs.monthlyPayment);
        else results = calculateMonthlyPaymentForPayoff(inputs.balance, inputs.apr, inputs.payoffYears);
        setCreditCardPayoffResults(results); setCreditCardPayoffInputs(inputs);
    }},
    loanRepayment: { calculate: (inputs) => setAmortizationResults(generateAmortizationSchedule(inputs.principal, inputs.annualRate, inputs.tenureYears))},
    mortgage: { calculate: (inputs) => setMortgageResults(calculateMortgageEmi(inputs.homePrice, inputs.downPayment, inputs.annualRate, inputs.tenureYears))},
  }), [ /* Keep this dependency array minimal if handlers only call setters */ ]);

  const toolIdFromPath = getCurrentToolIdFromPath(location.pathname);
  const currentRouteToolDetails = allTools.find(tool => tool.id === toolIdFromPath);

  let pageTitle = `${siteName} - Free Financial Calculators Bangladesh`;
  let pageDescription = `Calc Wise offers free online financial calculators for loans, investments, retirement, and budgeting in Bangladesh. Calculate EMI, SIP, ROI, and more in BDT.`;
  let canonicalUrl = baseCanonicalUrl;

  if (currentRouteToolDetails) {
    pageTitle = `${currentRouteToolDetails.name} | ${siteName}`;
    let metaDesc = currentRouteToolDetails.explanation || `Use our free ${currentRouteToolDetails.name.toLowerCase()} for your financial calculations in Bangladesh.`;
    if (metaDesc.length > 160) {
      const firstSentence = metaDesc.split('.')[0] + '.';
      metaDesc = firstSentence.length <= 160 ? firstSentence : metaDesc.substring(0, 157) + "...";
    }
    pageDescription = metaDesc;
    canonicalUrl = `${baseCanonicalUrl}/calculator/${currentRouteToolDetails.id}`;
  } else if (location.pathname === '/') {
    pageTitle = `Calc Wise - Financial Planning Tools for Bangladesh`;
    pageDescription = `Your comprehensive suite of free financial calculators for Bangladesh. Plan your EMI, investments, savings, and budget with Calc Wise. Default currency BDT.`;
    canonicalUrl = baseCanonicalUrl;
  }

  return (
    <>
      <Helmet>
        <html lang="en-BD" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_BD" />
        {/* <meta property="og:image" content={`${baseCanonicalUrl}/your-site-preview-image.png`} /> */}
        <meta property="og:type" content={currentRouteToolDetails ? "article" : "website"} />
        {currentRouteToolDetails && <meta property="article:section" content="Financial Calculators" />}
      </Helmet>
      <Routes>
        <Route 
          path="/" 
          element={
            <MainLayout 
              onSelectTool={handleSelectTool} 
              isSidebarOpen={isSidebarOpen} 
              setIsSidebarOpen={setIsSidebarOpen}
              onHomeClick={handleHomeClick}
            />
          }
        >
          <Route index element={<HomeMessage key="home" />} />
          <Route 
            path="calculator/budgetPlanner"
            element={
              <BudgetPlannerPage
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
              />
            } 
          />
          <Route 
            path="calculator/:toolId" 
            element={
              <CalculatorDisplay 
                allCalculatorStates={allCalculatorStates}
                allCalculatorHandlers={allCalculatorHandlers}
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
              />
            } 
          />
          <Route path="*" element={<div className="text-center p-8 text-xl text-theme-text-secondary">404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;