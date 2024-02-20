import fetcher from "./fetcher"
import extractDataFromAxios from "./util/extractor"

export interface GetStockPriceResponse {
  id: string;
  price: number;
  dayVolume: string;
  lastSize: string;
};

export const requestGetStockPrice = (ticker: String) => 
  extractDataFromAxios<GetStockPriceResponse>(fetcher.get(`/stock-prices?ticker=${ticker}`));