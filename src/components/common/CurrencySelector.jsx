// src/components/common/CurrencySelector.jsx
import React, { useEffect } from 'react';
import Select from 'react-select';
import { currencies, defaultCurrency } from '../../data/currencies';

const CurrencySelector = ({ selectedCurrency, setSelectedCurrency }) => {
  const storedCurrencyValue = localStorage.getItem('calcwise-currency');
  const initialCurrency = currencies.find(c => c.value === storedCurrencyValue) || defaultCurrency;

  useEffect(() => {
    if (!selectedCurrency && initialCurrency) {
      setSelectedCurrency(initialCurrency);
    }
  }, [selectedCurrency, setSelectedCurrency, initialCurrency]);
  
  useEffect(() => {
    if (selectedCurrency) {
      localStorage.setItem('calcwise-currency', selectedCurrency.value);
    }
  }, [selectedCurrency]);

  // Define theme colors (these should match your tailwind.config.js)
  const themeInputBg = '#374151';    // theme-input-bg
  const themeBorder = '#374151';     // theme-border
  const themeTextPrimary = '#F3F4F6'; // theme-text-primary
  const themeTextSecondary = '#9CA3AF';// theme-text-secondary
  const themeAccent = '#3B82F6';     // theme-accent (brand-primary)
  const themePanelDark = '#1F2937';  // theme-panel-dark

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: themeInputBg,
      borderColor: themeBorder,
      color: themeTextPrimary,
      borderRadius: '0.375rem', // rounded-md
      boxShadow: 'none',
      '&:hover': {
        borderColor: themeAccent,
      },
      minHeight: '42px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: themePanelDark, // Use panel background for menu
      zIndex: 50,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? themeAccent : state.isFocused ? themeBorder : themePanelDark,
      color: themeTextPrimary,
      '&:active': {
        backgroundColor: themeAccent,
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: themeTextPrimary,
    }),
    input: (provided) => ({
      ...provided,
      color: themeTextPrimary,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: themeTextSecondary,
    }),
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-theme-text-secondary mb-1">Currency</label>
      <Select
        options={currencies}
        value={selectedCurrency}
        onChange={setSelectedCurrency}
        styles={customStyles}
        classNamePrefix="react-select"
        placeholder="Search currency (e.g., USD, INR)"
      />
    </div>
  );
};

export default CurrencySelector;