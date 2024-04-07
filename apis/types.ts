export type UserStockHoldingsApiResponseTypes = {
  userHolding: IndividualStockHoldingTypes[];
};

export type IndividualStockHoldingTypes = {
  symbol: string;
  quantity: number;
  ltp: number;
  avgPrice: number;
  close: number;
};
