// src/components/calculators/RetirementCalculator/RetirementInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const RetirementInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [inputs, setInputs] = useState({
    currentAge: '30', retirementAge: '60', desiredMonthlyIncomeToday: '50000',
    lifeExpectancy: '85', currentSavings: '1000000', preRetirementRoi: '10',
    postRetirementRoi: '6', inflationRate: '4',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs(prev => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (parseInt(inputs.currentAge) < 18) newErrors.currentAge = "Min 18.";
    else if (parseInt(inputs.retirementAge) <= parseInt(inputs.currentAge)) newErrors.retirementAge = "Must be > current age.";
    else if (parseInt(inputs.lifeExpectancy) <= parseInt(inputs.retirementAge)) newErrors.lifeExpectancy = "Must be > retirement age.";

    if (parseFloat(inputs.desiredMonthlyIncomeToday) <= 0) newErrors.desiredMonthlyIncomeToday = "Must be positive.";
    if (parseFloat(inputs.currentSavings) < 0) newErrors.currentSavings = "Cannot be negative.";
    if (parseFloat(inputs.preRetirementRoi) < -100) newErrors.preRetirementRoi = "Invalid rate."; // Allow negative returns
    if (parseFloat(inputs.postRetirementRoi) < -100) newErrors.postRetirementRoi = "Invalid rate.";
    if (parseFloat(inputs.inflationRate) < -10 || parseFloat(inputs.inflationRate) > 50) newErrors.inflationRate = "Rate usually -10% to 50%.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const numericInputs = Object.fromEntries(
        Object.entries(inputs).map(([key, value]) => [key, parseFloat(value)])
      );
      onCalculate(numericInputs);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <InputField label="Your Current Age" id="currentAge" type="number" value={inputs.currentAge} onChange={handleChange} error={errors.currentAge} unit="years" />
        <InputField label="Planned Retirement Age" id="retirementAge" type="number" value={inputs.retirementAge} onChange={handleChange} error={errors.retirementAge} unit="years" />
        <InputField label="Desired Monthly Income (Today's Value)" id="desiredMonthlyIncomeToday" type="number" value={inputs.desiredMonthlyIncomeToday} onChange={handleChange} error={errors.desiredMonthlyIncomeToday} unit={selectedCurrency?.symbol} />
        <InputField label="Expected Life Expectancy" id="lifeExpectancy" type="number" value={inputs.lifeExpectancy} onChange={handleChange} error={errors.lifeExpectancy} unit="years" />
        <InputField label="Current Retirement Savings" id="currentSavings" type="number" value={inputs.currentSavings} onChange={handleChange} error={errors.currentSavings} unit={selectedCurrency?.symbol} />
        <InputField label="Return (Pre-Retirement)" id="preRetirementRoi" type="number" value={inputs.preRetirementRoi} onChange={handleChange} error={errors.preRetirementRoi} unit="%" tooltip="Avg. annual investment return until retirement."/>
        <InputField label="Return (Post-Retirement)" id="postRetirementRoi" type="number" value={inputs.postRetirementRoi} onChange={handleChange} error={errors.postRetirementRoi} unit="%" tooltip="Conservative annual return on corpus after retirement."/>
        <InputField label="Annual Inflation Rate" id="inflationRate" type="number" value={inputs.inflationRate} onChange={handleChange} error={errors.inflationRate} unit="%" tooltip="Avg. rate living costs might increase."/>
      </div>
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg mt-6">
        Calculate Retirement Needs
      </Button>
    </form>
  );
};

export default RetirementInput;