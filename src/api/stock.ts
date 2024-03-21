import fetcher from "./fetcher"
import extractDataFromAxios from "./util/extractor"

export interface StockPriceResponse {
  code: string;
  name: string;
  base: number;
  curr: number;
};

export interface StockPricesResponse {
  prices: StockPriceResponse[];
};

export interface StockPriceCandleResponse {
  dt: string;
  o: number;
  c: number;
  l: number;
  h: number;
  v: number;
};

export interface StockPriceCandlesResponse {
  code: string;
  candles: StockPriceCandleResponse[];
};

export interface StockInfoResponse {
  name: string;
  symbol: string;
  base: number;
  price: number;
}

export const requestGetStockPricesResponse = (codes: string) => 
  extractDataFromAxios<StockPricesResponse>(fetcher.get(`/stock-prices?code=${codes}`));

export const requestGetStockInfo = (code: string) =>
extractDataFromAxios<StockInfoResponse>(fetcher.get(`/stock-info/${code}`));

export const requestGetStockPriceCandlesFor5Years = (code: string) =>
  extractDataFromAxios<StockPriceCandlesResponse>(fetcher.get(`/stock-prices/${code}/candles/5y`));