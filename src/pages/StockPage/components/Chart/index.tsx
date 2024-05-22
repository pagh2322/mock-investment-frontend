import EChartsReact from "echarts-for-react";
import candleChartOption from "../../../../utils/candleChartOption";
import useStockPriceCandles from "../../../../hooks/stockPriceCandle/useStockPriceCandles";
import { Button, Overlay, Stack, Table, Tooltip } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { technicalIndicators } from "../../../../utils/ technicalIndicators";
import * as Styled from "./index.styles";
import TitleText from "../../../../components/TitleText";
import BackTest from "../BackTest";
import axios from "axios";

interface ChartProps {
  code: string;
  end: string;
};

const Chart = (props: ChartProps) => {
  const data = useStockPriceCandles({ code: props.code, end: props.end, period: "1y"}).data?.candles ?? [];
  const option = candleChartOption(props.code, data);
  const technical = technicalIndicators(data);

  return (
    <>
      <EChartsReact style={{ marginTop: "12px", width: "100%" , height: "620px" }} option={option} />
      <hr style={{ margin: "12px" }}/>
      <Styled.Recommend>
        <TitleText text="Latest technical indicator" />
        <Table style={{ marginTop: "12px" }}>
          <thead>
            <tr>
              <th>MA-20</th>
              <th>RSI</th>
              <th>MACD (Cross)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{technical.latestMA.toFixed(2)}</td>
              <td>{technical.latestRSI.toFixed(2)}</td>
              <td>{technical.latestMACD.toFixed(2)} ({technical.cross})</td>
            </tr>
          </tbody>
        </Table>
      </Styled.Recommend>
      <hr style={{ margin: "12px" }}/>
      <BackTest code={props.code} />
    </>
  );
};

export default Chart;