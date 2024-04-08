import {
  IndividualStockHoldingTypes,
  UserStockHoldingsApiResponseTypes,
} from './types';

const GET_STOCK_HOLDINGS_URL =
  'https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8';

const getUsersStockHoldings = async (): Promise<
  IndividualStockHoldingTypes[]
> => {
  try {
    const response = await fetch(GET_STOCK_HOLDINGS_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: UserStockHoldingsApiResponseTypes = await response.json();
    const userHoldings = data.userHolding;
    return userHoldings;
  } catch (error) {
    return [];
  }
};

export default getUsersStockHoldings;
