import axios from "axios";
import fetcher from "./util/fetcher";
import extractDataFromAxios from "./util/extractor";
// import { StockPriceResponse } from "./stock";

export interface StockValuesResponse {
    values: StockValueResponse[];
  };
  
export interface StockValueResponse {
    id: number;
    code: string;
    title: string
    dy: number;
    pbr: number;
    pcr: number;
    per: number;
    psr: number;
}

export const requestStockValues = () =>
extractDataFromAxios<StockValuesResponse>(axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
}).get("/values"));

export interface StockMomentumsResponse {
    momentum: StockMomentumResponse[];
}

export interface StockMomentumResponse {
    id: number;
    code: string;
    title: string;
    return: number;
    k_ratio: number;
};

export const requestStockMomentum = () =>
extractDataFromAxios<StockMomentumsResponse>(axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
}).get("/momentum"));

export interface QuantStockPricesResponse {
    prices: QuantStockPriceCandleResponse[];
};

export interface QuantStockPriceCandleResponse {
    dt: string;
    o: number;
    c: number;
    l: number;
    h: number;
    v: number;
};

export const requestQuantStockPrice = (code: string, date: string) =>
extractDataFromAxios<StockMomentumsResponse>(axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
}).get(`/prices?code=${code}&date=${date}`));

// export const requestQuantStockInfo = (code: string, date: string) =>
// extractDataFromAxios<StockPriceResponse>(axios.create({
//     baseURL: 'http://localhost:8000',
//     withCredentials: true
// }).get(`/stock-prices?code=${code}&date=${date}`));