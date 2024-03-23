import fetcher from "./fetcher";
import extractDataFromAxios from "./util/extractor";

export interface PortfolioResponse {
  items: PortfolioItemResponse[];
};

export interface PortfolioItemResponse {
  id: number;
  averageCost: number;
  volume: number;
  code: string;
  symbol: string;
  name: string
};

export const requestMyPortfolio = () =>
  extractDataFromAxios<PortfolioResponse>(fetcher.get("/portfolio/me"));