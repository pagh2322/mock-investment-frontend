import fetcher from "./fetcher";
import extractDataFromAxios from "./util/extractor";

export interface StockPurchaseRequest {
  bidPrice: number;
  volume: number;
};

export const requestPostStockPurchase = (code: string, body: StockPurchaseRequest) =>
  extractDataFromAxios<void>(fetcher.post(`/stocks/${code}/purchase`, body));