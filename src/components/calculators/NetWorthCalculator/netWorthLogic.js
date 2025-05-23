// src/components/calculators/NetWorthCalculator/netWorthLogic.js
export const calculateNetWorth = (assets, liabilities) => {
  // assets and liabilities are expected to be objects with various fields
  // e.g., assets = { cash: 1000, investments: 5000, ... }
  // liabilities = { creditCard: 500, mortgage: 20000, ... }

  let totalAssets = 0;
  for (const key in assets) {
    if (assets.hasOwnProperty(key) && typeof assets[key] === 'number' && assets[key] >= 0) {
      totalAssets += assets[key];
    } else if (assets.hasOwnProperty(key) && (assets[key] === '' || assets[key] === null || assets[key] === undefined)) {
        // Treat empty or null as 0 for calculation, but input validation should handle requirements
    } else if (assets.hasOwnProperty(key) && assets[key] < 0) {
        return { error: `Asset value for ${key.replace(/([A-Z])/g, ' $1')} cannot be negative.` };
    }
  }

  let totalLiabilities = 0;
  for (const key in liabilities) {
    if (liabilities.hasOwnProperty(key) && typeof liabilities[key] === 'number' && liabilities[key] >= 0) {
      totalLiabilities += liabilities[key];
    } else if (liabilities.hasOwnProperty(key) && (liabilities[key] === '' || liabilities[key] === null || liabilities[key] === undefined)) {
        // Treat empty or null as 0
    } else if (liabilities.hasOwnProperty(key) && liabilities[key] < 0) {
        return { error: `Liability value for ${key.replace(/([A-Z])/g, ' $1')} cannot be negative.` };
    }
  }

  const netWorth = totalAssets - totalLiabilities;

  return {
    totalAssets: parseFloat(totalAssets.toFixed(2)),
    totalLiabilities: parseFloat(totalLiabilities.toFixed(2)),
    netWorth: parseFloat(netWorth.toFixed(2)),
  };
};