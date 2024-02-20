import fetcher from "./fetcher"
import extractDataFromAxios from "./util/extractor"

export interface GetStockPriceResponse {
  id: string;
  title: string;
  price: number;
  dayVolume: string;
  changePercent: number;
  lastSize: string;
};

export const requestGetStockPrice = (ticker: String) => 
  extractDataFromAxios<GetStockPriceResponse>(fetcher.get(`/stock-prices?ticker=${ticker}`));

export const requestGetAllStockPrice = () =>
  extractDataFromAxios<GetStockPriceResponse[]>(fetcher.get('/stock-prices/all'));