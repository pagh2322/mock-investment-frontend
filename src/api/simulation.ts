import fetcher from "./util/fetcher";
import extractDataFromAxios from "./util/extractor";

export interface GetSimulationDateResponse {
  date: string;
};

export const requestGetCurrentSimulationDate = () =>
  extractDataFromAxios<GetSimulationDateResponse>(fetcher.get("/simulation/now"));

export const proceedSimulationDate = (length: number = 1) => {
  const body = { length };
  return extractDataFromAxios<GetSimulationDateResponse>(fetcher.post(`/simulation/next`, body));
};

export const restartSimulation = () =>
  extractDataFromAxios<void>(fetcher.post("/simulation/restart"));