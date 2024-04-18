import fetcher from "./util/fetcher";
import extractDataFromAxios from "./util/extractor";

export interface GetOwnStocksResponse {
  ownStocks: GetOwnStockResponse[];
};

export interface GetOwnStockResponse {
  id: number;
  averageCost: number;
  quantity: number;
  code: string;
  name: string;
};

export const requestGetOwnStocks = (code: string) =>
  extractDataFromAxios<GetOwnStocksResponse>(fetcher.get(`/member/me/own-stock?code=${code}`));

export interface GetOwnStockTotalValueResponse {
  curr: number;
  base: number;
}

export const requestGetOwnStockTotalValue = (date: string) =>
  extractDataFromAxios<GetOwnStockTotalValueResponse>(fetcher.get(`/member/me/own-stock/total-value?date=${date}`));
