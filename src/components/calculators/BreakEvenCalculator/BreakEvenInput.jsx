// src/components/calculators/BreakEvenCalculator/BreakEvenInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const BreakEvenInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [fixedCosts, setFixedCosts] = useState('');
  const [variableCostPerUnit, setVariableCostPerUnit] = useState('');
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (fixedCosts === '' || parseFloat(fixedCosts) < 0) newErrors.fixedCosts = 'Fixed costs must be non-negative.';
    if (variableCostPerUnit === '' || parseFloat(variableCostPerUnit) < 0) newErrors.variableCostPerUnit = 'Variable cost must be non-negative.';
    if (!sellingPricePerUnit || parseFloat(sellingPricePerUnit) <= 0) newErrors.sellingPricePerUnit = 'Selling price must be positive.';
    if (parseFloat(sellingPricePerUnit) <= parseFloat(variableCostPerUnit)) newErrors.sellingPricePerUnit = 'Selling price must exceed variable cost.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCalculate({
        fixedCosts: parseFloat(fixedCosts),
        variableCostPerUnit: parseFloat(variableCostPerUnit),
        sellingPricePerUnit: parseFloat(sellingPricePerUnit),
      });
    }
  };

  return (
    // Panel styling and main title removed. App.jsx handles them.
    <form onSubmit={handleSubmit} className="space-y-6">
      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <InputField
        label="Total Fixed Costs"
        id="beFixedCosts"
        type="number"
        value={fixedCosts}
        onChange={(e) => setFixedCosts(e.target.value)}
        placeholder="e.g., 10000"
        error={errors.fixedCosts}
        unit={selectedCurrency?.symbol || ''}
        tooltip="Costs that don't change with production volume (rent, salaries)."
      />
      <InputField
        label="Variable Cost Per Unit"
        id="beVariableCostPerUnit"
        type="number"
        value={variableCostPerUnit}
        onChange={(e) => setVariableCostPerUnit(e.target.value)}
        placeholder="e.g., 30"
        error={errors.variableCostPerUnit}
        unit={selectedCurrency?.symbol || ''}
        tooltip="Cost to produce one unit (materials, direct labor)."
      />
      <InputField
        label="Selling Price Per Unit"
        id="beSellingPricePerUnit"
        type="number"
        value={sellingPricePerUnit}
        onChange={(e) => setSellingPricePerUnit(e.target.value)}
        placeholder="e.g., 50"
        error={errors.sellingPricePerUnit}
        unit={selectedCurrency?.symbol || ''}
        tooltip="Price at which one unit is sold."
      />
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg">
        Calculate Break-Even Point
      </Button>
    </form>
  );
};

export default BreakEvenInput;