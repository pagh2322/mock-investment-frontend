import EChartsReact from "echarts-for-react";
import candleChartOption from "../../../../utils/candleChartOption";
import useStockPriceCandles from "../../../../hooks/stockPriceCandle/useStockPriceCandles";
import { Button, Overlay, Stack, Table, Tooltip } from "react-bootstrap";
import { useRef, useState } from "react";
import { technicalIndicators } from "../../../../utils/ technicalIndicators";
import * as Styled from "./index.styles";
import TitleText from "../../../../components/TitleText";

interface ChartProps {
  code: string;
  end: string;
};

const Description = (props: { indicator: string }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const description = (() => {switch(props.indicator) {
    case "MA":
      return "About MA...";
    case "RSI":
      return "About RSI...";
    case "MACD":
      return "About MACD..."
  }})();

  return (
    <div style={{ width: "100%" }}>
      <Button ref={target} onClick={() => setShow(!show)}>
        What is {props.indicator}?
      </Button>
      <Overlay target={target.current} show={show} placement="bottom">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {description}
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}

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
              <th>MA</th>
              <th>RSI</th>
              <th>MACD (Cross)</th>
              <th>Recommend status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{technical.latestMA.toFixed(2)}</td>
              <td>{technical.latestRSI.toFixed(2)}</td>
              <td>{technical.latestMACD.toFixed(2)} ({technical.cross})</td>
              <td>{technical.recommend}</td>
            </tr>
          </tbody>
        </Table>
        <Stack gap={2} direction="horizontal" style={{ margin: "12px" }}>
          <Description indicator="MA" />
          <Description indicator="RSI" />
          <Description indicator="MACD" />
        </Stack>
      </Styled.Recommend>
    </>
  );
};

export default Chart;