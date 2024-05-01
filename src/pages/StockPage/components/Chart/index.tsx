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

const Description = (props: { indicator: string }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    axios.get(`http://localhost:8000/ai/description?keyword=${props.indicator}`)
    .then(response => {
      setDescription(response.data);
    })
  }, []);

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
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    axios.get(`http://localhost:8000/stocks/recommend?code=${props.code}&date=${props.end}`)
    .then(response => {
      setDescription(response.data);
    })
  }, []);

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
              <th>AI's recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{technical.latestMA.toFixed(2)}</td>
              <td>{technical.latestRSI.toFixed(2)}</td>
              <td>{technical.latestMACD.toFixed(2)} ({technical.cross})</td>
              <td>
              {description}
              </td>
            </tr>
          </tbody>
        </Table>
        <Stack gap={2} direction="horizontal" style={{ margin: "12px", width: "100%" }}>
          <Description indicator="MA" />
          <Description indicator="RSI" />
          <Description indicator="MACD" />
        </Stack>
      </Styled.Recommend>
      <hr style={{ margin: "12px" }}/>
      <BackTest code={props.code} />
    </>
  );
};

export default Chart;