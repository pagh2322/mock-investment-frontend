import { Button, Form, Stack } from "react-bootstrap";
import useRSIStrategyResult from "../../../../hooks/backTest/useRSIStrategyResult";
import useCrossStrategyResult from "../../../../hooks/backTest/useCrossStrategyResult";
import { BackTestTradeHistoryResponse } from "../../../../api/backTest";
import * as Styled from "./index.styles";
import MoneyText from "../../../../components/MoneyText";
import { useContext, useState } from "react";
import SimulationContext from "../../../../context/simulation";
import TitleText from "../../../../components/TitleText";
import { useQueryClient } from "react-query";
import QUERY_KEYS from "../../../../constants/queries";

interface BackTestProps {
  code: string;
}

const BackTest = (props: BackTestProps) => {
  const simulation = useContext(SimulationContext);
  const [startDate, setStartDate] = useState("2019-05-22");
  const [buyRSI, setBuyRSI] = useState(30);
  const [sellRSI, setSellRSI] = useState(70);
  const [amount, setAmount] = useState(10000);
  const [runRSI, setRunRSI] = useState(false);
  const [runCross, setRunCross] = useState(false);
  const queryClient = useQueryClient();

  return (
    <Styled.Container>
      <TitleText text="Back Testing" />
      <Stack gap={3}>
        <Stack direction="horizontal">
          <div style={{ width: "24%" }}>start date</div>
          <Form.Control
            type="text"
            value={startDate}
            onChange={(e) => {
              if (e.target.value.length <= 255) {
                setStartDate(e.target.value);
              }
            }}
            placeholder={`Set start date`}
            required
          />
        </Stack>

        <Stack direction="horizontal">
          <div style={{ width: "24%" }}>Buy RSI</div>
          <Form.Control
            type="text"
            value={buyRSI}
            onChange={(e) => {
              if (e.target.value.length <= 255) {
                setBuyRSI(parseFloat(e.target.value));
              }
            }}
            placeholder={`Set buy rsi`}
            required
          />
        </Stack>

        <Stack direction="horizontal">
          <div style={{ width: "24%" }}>Sell RSI</div>
          <Form.Control
            type="text"
            value={sellRSI}
            onChange={(e) => {
              if (e.target.value.length <= 255) {
                setSellRSI(parseFloat(e.target.value));
              }
            }}
            placeholder={`Set buy rsi`}
            required
          />
        </Stack>

        <Stack direction="horizontal">
          <div style={{ width: "24%" }}>Amount</div>
          <Form.Control
            type="text"
            value={amount}
            onChange={(e) => {
              if (e.target.value.length <= 255) {
                setAmount(parseFloat(e.target.value));
              }
            }}
            placeholder={`Set buy rsi`}
            required
          />
        </Stack>
      </Stack>

      <Stack gap={3} direction="horizontal" style={{ width: "100%", margin: "12px 0px 12px 0px" }}>
        <Button onClick={() => {
          setRunCross(false);
          setRunRSI(true);
          queryClient.invalidateQueries(QUERY_KEYS.BACK_TEST_RSI_RESULTS);
        }} style={{ width: "100%" }}>
          RSI Backtest
        </Button>
        <Button onClick={() => {
          setRunRSI(false);
          setRunCross(true);
          queryClient.invalidateQueries(QUERY_KEYS.BACK_TEST_CROSS_RESULTS);
        }} style={{ width: "100%" }}>
          Golden/Dead Cross Backtest
        </Button>
      </Stack>
      <TitleText text="Test Result" />
      {
        runRSI && !runCross ?
          <RSIBackTestHistroyList code={props.code} start={startDate} end={simulation.date} buyRSI={buyRSI} sellRSI={sellRSI} amount={amount}/> :
          (
            runCross && !runRSI ?
              <CrossBackTestHistroyList code={props.code} start={startDate} end={simulation.date} amount={amount}/> :
              <></>
          )
      }
    </Styled.Container>
  )
};

interface BackTestHistroyListProps {
  code: string;
  start: string;
  end: string;
  buyRSI?: number;
  sellRSI?: number;
  amount: number;
}

const RSIBackTestHistroyList = (props: BackTestHistroyListProps) => {
  const { isLoading, data } = useRSIStrategyResult({
    stockCode: props.code,
    startDate: props.start,
    endDate: props.end,
    buyRSI: props.buyRSI!,
    sellRSI: props.sellRSI!,
    amount: props.amount
  });

  const histories = (data?.histories ?? []).sort((h1, h2) => h2.tradeDate > h1.tradeDate ? 1 : -1);

  if (histories.length === 0)
    return (<></>);

  if (isLoading)
    return (<div>Running backtest</div>);

  return (
    <>
      <Stack gap={3} direction="horizontal" style={{ fontSize: "large" }}>
        <span>
          {`Start amount is: `}<MoneyText money={histories[histories.length - 1].amount} />
        </span>
        <span>
          {`End amount is: `}<MoneyText money={histories[0].amount.toFixed(2)} />
        </span>
      </Stack>
      
      {histories.map(history => (
        <BackTestHistoryListItem key={history.tradeDate} item={history} />
      ))}
    </>
  )
}

const CrossBackTestHistroyList = (props: BackTestHistroyListProps) => {
  const { isLoading, data } = useCrossStrategyResult({
    stockCode: props.code,
    startDate: props.start,
    endDate: props.end,
    amount: props.amount
  });
  const histories = (data?.histories ?? []).sort((h1, h2) => h2.tradeDate > h1.tradeDate ? 1 : -1);

  if (histories.length === 0)
    return (<></>);

  if (isLoading)
    return (<div>Running backtest</div>);

  return (
    <>
      <Stack gap={3} direction="horizontal" style={{ fontSize: "large" }}>
        <span>
          {`Start amount is: `}<MoneyText money={histories[histories.length - 1].amount} />
        </span>
        <span>
          {`End amount is: `}<MoneyText money={histories[0].amount.toFixed(2)} />
        </span>
      </Stack>

      {histories.map(history => (
        <BackTestHistoryListItem key={history.tradeDate} item={history} />
      ))}
    </>
  )
}

interface BackTestHistoryListItemProps {
  item: BackTestTradeHistoryResponse;
};

const BackTestHistoryListItem = (props: BackTestHistoryListItemProps) => {
  const item = props.item;
  return (
    <Stack gap={3} direction="horizontal" style={{ marginTop: "12px", fontSize: "large" }}>
      <Styled.Date>{item.tradeDate}</Styled.Date>
      <Styled.Box gap={1}>
        <Stack gap={3} direction="horizontal">
          <Styled.OrderType buy={item.buy}>{item.buy ? "BUY" : "SELL"} <MoneyText money={item.amount.toFixed(2)} /></Styled.OrderType>
        </Stack>
      </Styled.Box>
      
      <Styled.ExcutedDate>{item.message}</Styled.ExcutedDate>
    </Stack>
  )
};

export default BackTest;