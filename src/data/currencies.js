// src/data/currencies.js
export const currencies = [
  { value: 'AED', label: 'د.إ AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { value: 'AUD', label: 'A$ AUD', symbol: 'A$', name: 'Australian Dollar' },
  { value: 'BDT', label: '৳ BDT', symbol: '৳', name: 'Bangladeshi Taka' }, // Added BDT
  { value: 'BRL', label: 'R$ BRL', symbol: 'R$', name: 'Brazilian Real' },
  { value: 'CAD', label: 'C$ CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { value: 'CHF', label: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { value: 'CNY', label: '¥ CNY', symbol: '¥', name: 'Chinese Yuan Renminbi' },
  { value: 'DKK', label: 'kr DKK', symbol: 'kr', name: 'Danish Krone' },
  { value: 'EUR', label: '€ EUR', symbol: '€', name: 'Euro' },
  { value: 'GBP', label: '£ GBP', symbol: '£', name: 'British Pound Sterling' },
  { value: 'HKD', label: 'HK$ HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  { value: 'INR', label: '₹ INR', symbol: '₹', name: 'Indian Rupee' },
  { value: 'JPY', label: '¥ JPY', symbol: '¥', name: 'Japanese Yen' },
  { value: 'KRW', label: '₩ KRW', symbol: '₩', name: 'South Korean Won' },
  { value: 'MXN', label: 'Mex$ MXN', symbol: 'Mex$', name: 'Mexican Peso' },
  { value: 'NOK', label: 'kr NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { value: 'NZD', label: 'NZ$ NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  { value: 'RUB', label: '₽ RUB', symbol: '₽', name: 'Russian Ruble' },
  { value: 'SAR', label: '﷼ SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { value: 'SEK', label: 'kr SEK', symbol: 'kr', name: 'Swedish Krona' },
  { value: 'SGD', label: 'S$ SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { value: 'TRY', label: '₺ TRY', symbol: '₺', name: 'Turkish Lira' },
  { value: 'USD', label: '$ USD', symbol: '$', name: 'US Dollar' },
  { value: 'ZAR', label: 'R ZAR', symbol: 'R', name: 'South African Rand' },
  // Add more currencies here if you need them
];

// Ensure defaultCurrency is still valid. For example, to keep USD as default:
export const defaultCurrency = currencies.find(c => c.value === 'USD') || currencies[0];