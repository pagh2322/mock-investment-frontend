import fetcher from "./fetcher";
import extractDataFromAxios from "./util/extractor";

export interface CurrentBalanceResponse {
  balance: number;
};

export const requestMyCurrentBalance = () =>
  extractDataFromAxios<CurrentBalanceResponse>(fetcher.get("/balance/me"));