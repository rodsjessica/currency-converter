export interface ExchangeRates {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

export interface CurrencyRow {
  currency: string;
  value: string;
  time: string;
}