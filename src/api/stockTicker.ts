import fetcher from "./util/fetcher"
import extractDataFromAxios from "./util/extractor"

export interface GetStockTickerResponse {
  name: string;
  code: string;
  isLiked: boolean;
}

export const requestGetStockTicker = (code: string) =>
  extractDataFromAxios<GetStockTickerResponse>(fetcher.get(`/stock-ticker/${code}`));

export interface StockTickerLikeResponse {
  isLiked: boolean;
}

export const toggleStockTickerLike = (code: string) =>
  extractDataFromAxios<StockTickerLikeResponse>(fetcher.put(`/stock-ticker/${code}/like`));

export interface GetStockTickersResponse {
  stockTickers: GetStockTickerResponse[];
};

export const requestGetStockTickers = (keyword: string) =>
  extractDataFromAxios<GetStockTickersResponse>(fetcher.get(`/stock-ticker/search?keyword=${keyword}`));