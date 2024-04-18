import fetcher from "./util/fetcher";
import extractDataFromAxios from "./util/extractor";

export interface GetStockOrderHistoriesResponse {
  histories: GetStockOrderHistoryResponse[];
};

export interface GetStockOrderHistoryResponse {
  id: number;
  orderDate: string;
  orderType: string
  bidPrice: number;
  quantity: number;
  name: string;
  code: string;
  executed: boolean;
  executedDate: string;
}

export const requestGetMyAllStockOrderHistories = () =>
  extractDataFromAxios<GetStockOrderHistoriesResponse>(fetcher.get("/stocks/orders/me"));

export const requestGetMyStockOrderHistoriesByCode = (code: string) =>
  extractDataFromAxios<GetStockOrderHistoriesResponse>(fetcher.get(`/stocks/orders/me?code=${code}`));

export interface CreateStockOrderRequest {
  bidPrice: number;
  quantity: number;
  orderType: string;
  orderDate: string;
};

export const createStockOrder = (code: string, body: CreateStockOrderRequest) =>
  extractDataFromAxios<void>(fetcher.post(`/stocks/${code}/order`, body));

export const cancelStockOrder = (stockOrderId: number) =>
  extractDataFromAxios<void>(fetcher.post(`/stock-orders/${stockOrderId}`));