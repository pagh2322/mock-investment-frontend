import fetcher from "./util/fetcher"
import extractDataFromAxios from "./util/extractor"

export interface GetStockValuesResponse {
  values: GetStockValueResponse[];
};

export interface GetStockValueResponse {
  code: string;
  date: string;
  pbr: number;
  pcr: number;
  per: number;
  psr: number;
};

export const requestGetStockValues = (code: string, date: string) =>
  extractDataFromAxios<GetStockValuesResponse>(fetcher.get(`/stock-values?code=${code}&date=${date}`));