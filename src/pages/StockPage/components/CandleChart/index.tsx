import EChartsReact from "echarts-for-react";
import { StockPriceCandleResponse } from "../../../../api/stock";
import candleChartOption from "../../../../utils/candleChartOption";

interface CandleChartProps {
  code: string;
  candles: StockPriceCandleResponse[]
}

const CandleChart = (props: CandleChartProps) => {
  var option = candleChartOption(props.code, props.candles);
  return (
    <EChartsReact option={option} />
  );
};

export default CandleChart;