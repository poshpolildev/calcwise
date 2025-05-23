// src/components/calculators/NetWorthCalculator/NetWorthInput.jsx
import React, { useState } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import CurrencySelector from '../../common/CurrencySelector';

const AssetLiabilityField = ({ label, id, value, onChange, unit, tooltip }) => ( // Removed error prop for this specific use case if not needed
  <InputField
    label={label}
    id={id}
    type="number"
    value={value}
    onChange={onChange}
    placeholder="0.00"
    // error={error} // Assuming direct state update or less granular error display here
    unit={unit}
    tooltip={tooltip}
  />
);

const NetWorthInput = ({ onCalculate, selectedCurrency, setSelectedCurrency }) => {
  const [assets, setAssets] = useState({
    cashAndBank: '', investments: '', realEstate: '', otherAssets: '',
  });
  const [liabilities, setLiabilities] = useState({
    creditCardDebt: '', mortgages: '', studentLoans: '', otherLoans: '',
  });
  // const [errors, setErrors] = useState({}); // Simplified: error handling in logic or globally

  const handleAssetChange = (e) => {
    const { id, value } = e.target;
    setAssets(prev => ({ ...prev, [id]: value === '' ? '' : (parseFloat(value) >= 0 ? value : prev[id]) }));
  };

  const handleLiabilityChange = (e) => {
    const { id, value } = e.target;
    setLiabilities(prev => ({ ...prev, [id]: value === '' ? '' : (parseFloat(value) >= 0 ? value : prev[id]) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericAssets = Object.fromEntries(
        Object.entries(assets).map(([key, value]) => [key, value === '' ? 0 : Number(value)])
    );
    const numericLiabilities = Object.fromEntries(
        Object.entries(liabilities).map(([key, value]) => [key, value === '' ? 0 : Number(value)])
    );
    onCalculate(numericAssets, numericLiabilities);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />

      <div>
        <h3 className="text-xl font-semibold text-theme-text-primary mb-4 border-b border-theme-border pb-2">Assets (What you own)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <AssetLiabilityField label="Cash & Bank Balances" id="cashAndBank" value={assets.cashAndBank} onChange={handleAssetChange} unit={selectedCurrency?.symbol} tooltip="Checking, savings, cash on hand."/>
          <AssetLiabilityField label="Investments" id="investments" value={assets.investments} onChange={handleAssetChange} unit={selectedCurrency?.symbol} tooltip="Stocks, bonds, mutual funds, retirement accounts." />
          <AssetLiabilityField label="Real Estate (Market Value)" id="realEstate" value={assets.realEstate} onChange={handleAssetChange} unit={selectedCurrency?.symbol} tooltip="Current market value of your properties." />
          <AssetLiabilityField label="Other Valuables" id="otherAssets" value={assets.otherAssets} onChange={handleAssetChange} unit={selectedCurrency?.symbol} tooltip="Cars, jewelry, collectibles, etc." />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-theme-text-primary mb-4 border-b border-theme-border pb-2">Liabilities (What you owe)</h3> {/* Changed color */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <AssetLiabilityField label="Credit Card Debt" id="creditCardDebt" value={liabilities.creditCardDebt} onChange={handleLiabilityChange} unit={selectedCurrency?.symbol} tooltip="Total outstanding balance on credit cards." />
          <AssetLiabilityField label="Mortgages" id="mortgages" value={liabilities.mortgages} onChange={handleLiabilityChange} unit={selectedCurrency?.symbol} tooltip="Remaining balance on home loans." />
          <AssetLiabilityField label="Student Loans" id="studentLoans" value={liabilities.studentLoans} onChange={handleLiabilityChange} unit={selectedCurrency?.symbol} tooltip="Total outstanding student loan debt." />
          <AssetLiabilityField label="Other Loans / Debts" id="otherLoans" value={liabilities.otherLoans} onChange={handleLiabilityChange} unit={selectedCurrency?.symbol} tooltip="Car loans, personal loans, etc." />
        </div>
      </div>
      <Button type="submit" variant="primary" className="w-full py-3.5 text-lg mt-6">
        Calculate My Net Worth
      </Button>
    </form>
  );
};

export default NetWorthInput;