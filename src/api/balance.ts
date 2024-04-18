import fetcher from "./util/fetcher";
import extractDataFromAxios from "./util/extractor";

export interface GetCurrentBalanceResponse {
  balance: number;
};

export const requestGetCurrentBalance = () =>
  extractDataFromAxios<GetCurrentBalanceResponse>(fetcher.get("/balance/me"));