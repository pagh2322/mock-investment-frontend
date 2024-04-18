import fetcher from "./util/fetcher";
import extractDataFromAxios from "./util/extractor";

export interface GetStockPriceCandleResponse {
  dt: string;
  o: number;
  c: number;
  l: number;
  h: number;
  v: number;
};

export interface GetStockPriceCandlesResponse {
  code: string;
  candles: GetStockPriceCandleResponse[];
};

export const requestGetStockPriceCandles = (code: string, end: string, period: string) =>
  extractDataFromAxios<GetStockPriceCandlesResponse>(fetcher.get(`/stock-prices/${code}?end=${end}&period=${period}`));