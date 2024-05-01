import fetcher from "./util/fetcher";
import extractDataFromAxios from "./util/extractor";

export interface RSIStrategyRequest {
  stockCode: string;
  startDate: string;
  endDate: string;
  buyRSI: number;
  sellRSI: number;
  amount: number;
};

export interface CrossStrategyRequest {
  stockCode: string;
  startDate: string;
  endDate: string;
  amount: number;
};

export interface BackTestTradeHistoryResponse {
  buy: boolean;
  price: number;
  amount: number;
  rsi?: number;
  cross?: string;
  tradeDate: string;
};

export interface BackTestResultResponse {
  histories: BackTestTradeHistoryResponse[];
};


export const requestTestRSIStrategy = (body: RSIStrategyRequest) => {
  const url = `/back_test/rsi?code=${body.stockCode}&start=${body.startDate}&end=${body.endDate}&buyRSI=${body.buyRSI}&sellRSI=${body.sellRSI}&amount=${body.amount}`;
  return extractDataFromAxios<BackTestResultResponse>(fetcher.get(url));
}
  

export const requestTestCrossStrategy = (body: CrossStrategyRequest) => {
  const url = `/back_test/cross?code=${body.stockCode}&start=${body.startDate}&end=${body.endDate}&amount=${body.amount}`;
  return extractDataFromAxios<BackTestResultResponse>(fetcher.get(url));
};