import {IndividualStockHoldingTypes} from '../apis/types';

const calculateCurrentValueIndividual = (
  lastTradedPrice: number,
  quantity: number,
) => lastTradedPrice * quantity;

const calculateInvestmentValueIndividual = (
  avgPrice: number,
  quantity: number,
) => avgPrice * quantity;

const sumOfAllValuesInArray = (inputArray: number[]) => {
  if (inputArray === undefined || inputArray.length === 0) {
    return 0;
  }
  const total = inputArray.reduce((acc: number, currentValue: number) => {
    return acc + (currentValue || 0);
  }, 0);

  return total;
};

const getSumOfAllCurrentValues = (
  userHoldingsData: IndividualStockHoldingTypes[],
): number => {
  const allCurrentValues: number[] = [];
  userHoldingsData?.forEach(item => {
    const currentValueForItem = calculateCurrentValueIndividual(
      item.ltp,
      item.quantity,
    );
    allCurrentValues.push(currentValueForItem);
  });

  const sumOfAllCurrentValues = sumOfAllValuesInArray(allCurrentValues);
  return sumOfAllCurrentValues;
};

const getSumOfAllInvestmentValues = (
  userHoldingsData: IndividualStockHoldingTypes[],
): number => {
  const allInvestmentValues: number[] = [];
  userHoldingsData?.forEach(item => {
    const investmentValueForItem = calculateInvestmentValueIndividual(
      item.avgPrice,
      item.quantity,
    );
    allInvestmentValues.push(investmentValueForItem);
  });

  const sumOfAllInvestmentValues = sumOfAllValuesInArray(allInvestmentValues);
  return sumOfAllInvestmentValues;
};

const calculateTodaysPnl = (
  userHoldingsData: IndividualStockHoldingTypes[],
) => {
  const individualPnlValues: number[] = [];
  userHoldingsData?.forEach(item => {
    const individualPnlForItem = (item.close - item.ltp) * item.quantity;
    individualPnlValues.push(individualPnlForItem);
  });

  const todaysPNLOfAllItems = sumOfAllValuesInArray(individualPnlValues);
  return todaysPNLOfAllItems;
};

export {
  calculateCurrentValueIndividual,
  calculateInvestmentValueIndividual,
  sumOfAllValuesInArray,
  getSumOfAllCurrentValues,
  getSumOfAllInvestmentValues,
  calculateTodaysPnl,
};
