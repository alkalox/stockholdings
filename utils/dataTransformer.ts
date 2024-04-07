import {IndividualStockHoldingTypes} from '../apis/types';
import {
  getSumOfAllCurrentValues,
  getSumOfAllInvestmentValues,
  calculateTodaysPnl,
} from './basicUtils';

const bottomSummaryDataTransformer = (
  userHoldingsData: IndividualStockHoldingTypes[],
) => {
  const sumOfAllCurrentValues = getSumOfAllCurrentValues(userHoldingsData);
  const sumOfAllInvestmentValues =
    getSumOfAllInvestmentValues(userHoldingsData);
  const totalPnL = sumOfAllCurrentValues - sumOfAllInvestmentValues;
  const todaysPnL = calculateTodaysPnl(userHoldingsData);

  return {
    currentValue: sumOfAllCurrentValues.toFixed(2),
    totalInvestment: sumOfAllInvestmentValues.toFixed(2),
    totalPNL: totalPnL.toFixed(2),
    todaysPNL: todaysPnL.toFixed(2),
  };
};

export {bottomSummaryDataTransformer};
