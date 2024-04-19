import { GetStockPriceCandleResponse } from "../api/stockPriceCandle";
import splitCandleData from "./splitCandleData";

const calculateLatestMA = (data: number[], dayCount = 20) => {
  var sum = 0;
  for (var j = data.length - 1; j >= data.length - dayCount; j--) {
    sum += data[j];
  }
  return sum / dayCount;
};

const calculateLatestRSI = (data: number[]) => {
  const rsi = [];
  var gains = 0;
  var losses = 0;

  const len = data.length;
  rsi.push(0);
  for (var i = 1; i < len; i++) {
    const diff = data[i] - data[i - 1];
    if (diff >= 0) {
      gains += diff;
    } else {
      losses -= diff;
    }

    if (i > 14) {
      const avgGain = gains / 14;
      const avgLoss = losses / 14;
      const RS = avgGain / avgLoss;
      const currentRSI = 100 - (100 / (1 + RS));
      rsi.push(currentRSI);

      const prevDiff = data[i - 14] - data[i - 14 - 1];
      if (prevDiff >= 0) {
        gains -= prevDiff;
      } else {
        losses += prevDiff;
      }
    } else {
      rsi.push(0);
    }
  }
  return rsi[rsi.length - 1];
}

const calculateLatestMACD = (data: number[]) => {
  const macdValues = calculateMACD(data);
  return {
    latestMACD: macdValues.macdLine[macdValues.macdLine.length - 1][1],
    latestSignal: macdValues.signalLine[macdValues.signalLine.length - 1]
  };
};

const calculateLatestEMA = (data: number[]) => {
  const short = calculateEMA(data, 12);
  const long = calculateEMA(data, 20);

  return { shortEMA: short, longEMA: long };
}

export const calculateMA = (dayCount: number, data: number[]) => {
  const result = [];
  for (var i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data[i - j];
    }
    result.push(+(sum / dayCount).toFixed(3));
  }
  return result;
};

export const calculateRSI = (data: number[], period = 14) => {
  var rsi = [];
  var gains = 0;
  var losses = 0;

  const len = data.length;
  rsi.push('-');
  for (var i = 1; i < len; i++) {

    const diff = data[i] - data[i - 1];
    if (diff >= 0) {
      gains += diff;
    } else {
      losses -= diff;
    }

    if (i > period) {
      const avgGain = gains / period;
      const avgLoss = losses / period;
      const RS = avgGain / avgLoss;
      const currentRSI = 100 - (100 / (1 + RS));
      rsi.push(+(currentRSI).toFixed(3));

      const prevDiff = data[i - period] - data[i - period - 1];
      if (prevDiff >= 0) {
        gains -= prevDiff;
      } else {
        losses += prevDiff;
      }
    } else {
      rsi.push('-');
    }
  }
  return rsi;
}

export const calculateMACD = (data: number[], shortPeriod = 12, longPeriod = 26, signalPeriod = 9) => {
  const shortEMA = calculateEMA(data, shortPeriod);
  const longEMA = calculateEMA(data, longPeriod);

  const macdLine = [];
  for (var i = 0; i < longEMA.length; i++) {
    if (i < 25)
      macdLine.push([i, 0, 1]);
    else 
      macdLine.push([i, shortEMA[i] - longEMA[i], shortEMA[i] > longEMA[i] ? 1 : -1]);
  }

  const signalLine = calculateEMA(macdLine.map(item => item[1]), signalPeriod);

  return { macdLine, signalLine };
}

export const calculateEMA = (data: number[], period: number) => {
  const ema = [];
  const multiplier = 2 / (period + 1);
  let prevEMA = data.slice(0, period).reduce((acc, val) => acc + val, 0) / period;
  for (var i = 0; i < period - 1; i++)
    ema.push(0);
  ema.push(prevEMA);

  for (let i = period; i < data.length; i++) {
    const currentEMA = (data[i] - prevEMA) * multiplier + prevEMA;
    ema.push(currentEMA);
    prevEMA = currentEMA;
  }

  return ema;
};

export const technicalIndicators = (candles: GetStockPriceCandleResponse[]) => {
  const splited = splitCandleData(candles);
  const data = splited.prices.map(p => p[1]);

  const latestPrice = data[data.length - 1];
  const latestMA = calculateLatestMA(data);
  const latestRSI = calculateLatestRSI(data);
  const { latestMACD, latestSignal }  = calculateLatestMACD(data);
  const { shortEMA, longEMA } = calculateLatestEMA(data);

  const isGoldenCross = shortEMA[shortEMA.length - 1] > longEMA[longEMA.length - 1] && shortEMA[shortEMA.length - 2] < longEMA[longEMA.length - 2];
  const isDeadCross = shortEMA[shortEMA.length - 1] < longEMA[longEMA.length - 1] && shortEMA[shortEMA.length - 2] > longEMA[longEMA.length - 2];

  var recommend = "";

  if (isGoldenCross && latestPrice > latestMA && latestRSI < 30 && latestMACD > latestSignal) {
    recommend = "Strong Buy"; // 강력한 매수 신호
  } else if (!isGoldenCross && latestPrice > latestMA && latestRSI < 40 && latestMACD > latestSignal) {
    recommend = "Buy"; // 매수 신호
  }

  if (isDeadCross && latestPrice < latestMA && latestRSI > 70 && latestMACD < latestSignal) {
    recommend = "Strong Sell"; // 강력한 매도 신호
  } else if (!isDeadCross && latestPrice < latestMA && latestRSI > 60 && latestMACD < latestSignal) {
    recommend = "Sell"; // 매도 신호
  }

  const cross = isGoldenCross ? "Golden cross" : (isDeadCross ? "Dead cross" : "Normal");

  // 보유 조건: 그 외의 경우는 보유를 유지
  return { latestMA, latestRSI, latestMACD, cross, recommend: recommend === "" ? "Hold" : recommend };
}