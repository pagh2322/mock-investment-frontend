import { GetStockPriceCandleResponse } from "../api/stockPriceCandle";

const splitCandleData = (candles: GetStockPriceCandleResponse[]) => {
  const date = [];
  const prices = [];
  const volumes = [];
  for (var i = 0; i < candles.length; i++) {
    date.push(candles[i].dt);
    const price = [candles[i].o, candles[i].c, candles[i].l, candles[i].h, candles[i].v];
    prices.push(price);
    volumes.push([i, candles[i].v, candles[i].o > candles[i].c ? 1 : -1]);
  }
  return {
    date,
    prices,
    volumes
  };
};

export default splitCandleData;