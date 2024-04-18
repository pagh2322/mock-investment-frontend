import fetcher from "./util/fetcher";
import extractDataFromAxios from "./util/extractor";

export interface GetStockPriceResponse {
  code: string;
  name: string;
  base: number;
  curr: number;
};
  
export interface GetStockPricesResponse {
  prices: GetStockPriceResponse[];
};

export const requestGetStockPrices = (codes: string, date: string) => 
  extractDataFromAxios<GetStockPricesResponse>(fetcher.get(`/stock-prices?code=${codes}&date=${date}`));

export const requestGetLikedStockPrices = (date: string) =>
extractDataFromAxios<GetStockPricesResponse>(fetcher.get(`/stock-prices/like?date=${date}`));