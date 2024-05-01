import fetcher from "./util/fetcher"
import extractDataFromAxios from "./util/extractor"

export interface GetStockMomentumsResponse {
  momentums: GetStockMomentumResponse[];
}

export interface GetStockMomentumResponse {
  id: number;
  code: string;
  name: string
  rateOfReturn: number;
  kRatio: number;
}

export const requestGetStockMomentumsRanking = (date: string) =>
  extractDataFromAxios<GetStockMomentumsResponse>(fetcher.get(`/stock-momentums/all?date=${date}`));
