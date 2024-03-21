import { StockPriceCandleResponse } from "../api/stock";
import { COLORS } from "../constants/colors";

function splitData(candles: StockPriceCandleResponse[]) {
  var categoryData = [];
  var values = [];
  var volumes = [];
  for (let i = 0; i < candles.length; i++) {
    categoryData.push(candles[i].dt);
    var value = [candles[i].o, candles[i].c, candles[i].l, candles[i].h, candles[i].v];
    values.push(value);
    volumes.push([i, candles[i].v, candles[i].o > candles[i].c ? 1 : -1]);
  }
  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes
  };
}

function calculateMA(dayCount: number, data: { values: number[][]}) {
  var result = [];
  for (var i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data.values[i - j][1];
    }
    // console.log(data.values[i - j][1]);
    result.push(+(sum / dayCount).toFixed(3));
  }
  return result;
}

const candleChartOption = (code: string, candles: StockPriceCandleResponse[]) => {
  var data = splitData(candles);
  return {
    animation: false,
    legend: {
      bottom: 10,
      left: 'center',
      data: [code, 'MA5', 'MA10', 'MA20', 'MA30']
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
      // extraCssText: 'width: 170px'
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
    // toolbox: {
    //   feature: {
    //     dataZoom: {
    //       yAxisIndex: false
    //     },
    //     brush: {
    //       type: ['lineX', 'clear']
    //     }
    //   }
    // },
    // brush: {
    //   xAxisIndex: 'all',
    //   brushLink: 'all',
    //   outOfBrush: {
    //     colorAlpha: 0.1
    //   }
    // },
    visualMap: {
      show: false,
      seriesIndex: 5,
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
    grid: [
      {
        left: '10%',
        right: '8%',
        height: '50%'
      },
      {
        left: '10%',
        right: '8%',
        top: '63%',
        height: '16%'
      }
    ],
    xAxis: [
      {
        type: 'category',
        show: false,
        data: data.categoryData,
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
        data: data.categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      }
    ],
    yAxis: [
      {
        scale: true,
        position: 'right',
        splitArea: {
          show: true
        }
      },
      {
        scale: true,
        position: 'right',
        gridIndex: 1,
        splitNumber: 1,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      }
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 86,
        end: 100
      },
      // {
      //   show: false,
      //   xAxisIndex: [0, 1],
      //   type: 'slider',
      //   top: '85%',
      //   start: 0,
      //   end: 100
      // }
    ],
    series: [
      {
        name: code,
        type: 'candlestick',
        data: data.values,
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
        data: calculateMA(5, data),
        smooth: true,
        symbol: 'none'
      },
      {
        name: 'MA10',
        type: 'line',
        data: calculateMA(10, data),
        smooth: true,
        symbol: 'none'
      },
      {
        name: 'MA20',
        type: 'line',
        data: calculateMA(20, data),
        smooth: true,
        symbol: 'none'
      },
      {
        name: 'MA30',
        type: 'line',
        data: calculateMA(30, data),
        smooth: true,
        symbol: 'none'
      },
      {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.volumes
      }
    ]
  };
}

export default candleChartOption;