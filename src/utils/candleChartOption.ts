import { GetStockPriceCandleResponse } from "../api/stockPriceCandle";
import { COLORS } from "../constants/colors";
import { calculateMA, calculateRSI, calculateMACD } from "./ technicalIndicators";
import splitCandleData from "./splitCandleData";

const candleChartOption = (code: string, candles: GetStockPriceCandleResponse[]) => {
  const data = splitCandleData(candles);
  const closing = data.prices.map(p => p[1]);
  return {
    animation: true,
    legend: {
      left: 'center',
      data: [code, 'MA5', 'MA20', 'MA60', 'RSI', 'MACD']
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      textStyle: {
        color: '#000'
      },
      position: (pos: any, params: any, el: any, elRect: any, size: any) => {
        const obj: any = {
          top: 10
        };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        return obj;
      }
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: 'all'
        }
      ],
      label: {
        backgroundColor: '#777'
      }
    },
    visualMap: [
      {
        show: false,
        seriesIndex: 4,
        dimension: 2,
        pieces: [
          {
            value: 1,
            color: COLORS.DOWN
          },
          {
            value: -1,
            color: COLORS.UP
          }
        ]
      },
      {
        show: false,
        seriesIndex: 6,
        dimension: 2,
        pieces: [
          {
            value: 1,
            color: COLORS.UP
          },
          {
            value: -1,
            color: COLORS.DOWN
          }
        ]
      }
    ],
    grid: [
      {
        left: '0%',
        right: '12%',
        height: '42%',
        top: '4%',
      },
      {
        left: '0%',
        right: '12%',
        top: '48%',
        height: '12%'
      },
      {
        left: '0%',
        right: '12%',
        top: '64%',
        height: '11%'
      },
      {
        left: '0%',
        right: '12%',
        top: '80%',
        height: '11%'
      }
    ],
    xAxis: [
      {
        type: 'category',
        show: true,
        data: data.date,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          z: 100
        }
      },
      {
        type: 'category',
        gridIndex: 1,
        data: data.date,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      },
      {
        type: 'category',
        gridIndex: 2,
        data: data.date,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      },
      {
        type: 'category',
        gridIndex: 3,
        data: data.date,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      },
    ],
    yAxis: [
      {
        scale: true,
        position: 'right',
        splitArea: {
          show: false
        }
      },
      {
        scale: true,
        position: 'right',
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      },
      {
        scale: true,
        position: 'right',
        gridIndex: 2,
        splitNumber: 3,
      },
      {
        scale: true,
        position: 'right',
        gridIndex: 3,
        splitNumber: 2,
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 60,
        end: 100
      },
      {
        type: 'inside',
        xAxisIndex: [1, 2],
        start: 60,
        end: 100
      },
      {
        type: 'inside',
        xAxisIndex: [2, 3],
        start: 60,
        end: 100
      },
    ],
    series: [
      {
        name: code,
        type: 'candlestick',
        data: data.prices,
        itemStyle: {
          color: COLORS.UP,
          color0: COLORS.DOWN,
          borderColor: undefined,
          borderColor0: undefined
        }
      },
      {
        name: 'MA5',
        type: 'line',
        data: calculateMA(5, closing),
        smooth: true,
        symbol: 'none'
      },
      {
        name: 'MA20',
        type: 'line',
        data: calculateMA(20, closing),
        smooth: true,
        symbol: 'none'
      },
      {
        name: 'MA60',
        type: 'line',
        data: calculateMA(60, closing),
        smooth: true,
        symbol: 'none'
      },
      {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.volumes
      },
      {
        name: 'RSI',
        type: 'line',
        data: calculateRSI(closing),
        xAxisIndex: 2,
        yAxisIndex: 2,
        symbol: 'none'
      },
      {
        name: 'MACD',
        type: 'bar',
        xAxisIndex: 3,
        yAxisIndex: 3,
        data: calculateMACD(closing).macdLine
      }
    ]
  };
}

export default candleChartOption;