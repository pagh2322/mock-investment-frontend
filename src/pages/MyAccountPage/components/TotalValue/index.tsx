import { useContext } from "react";
import useCurrentBalance from "../../../../hooks/balance/useCurrentBalance";
import useOwnStockTotalValue from "../../../../hooks/ownStock/useOwnStockTotalValue";
import SimulationContext from "../../../../context/simulation";
import EChartsReact from "echarts-for-react";
import TitleText from "../../../../components/TitleText";
import * as Styled from "./index.styles";
import MoneyText from "../../../../components/MoneyText";
import { Stack } from "react-bootstrap";
import ChangePercentage from "../../../../components/ChangePercentage";
import useOwnStocks from "../../../../hooks/ownStock/useOwnStocks";

const TotalValue = () => {
  const simulation = useContext(SimulationContext);
  const cash = useCurrentBalance().data?.balance ?? 0;
  const ownStocks = (useOwnStocks().data?.ownStocks ?? []).map(ownStock => {return { value: (ownStock.averageCost * ownStock.quantity).toFixed(2), name: ownStock.name }});
  const stockValue = useOwnStockTotalValue(simulation.date).data ?? { curr: 0, base: 0 };

  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false,
      data: ["value"]
    },
    series: [
      {
        type: 'pie',
        name: "value",
        radius: ['40%', '70%'],
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: cash.toFixed(2), name: 'Cash' },
        ].concat(ownStocks)
      }
    ],
    height: "320px",
    grid: [
      {
        top: '4%',
      },
    ],
  };

  return (
    <Styled.Container>
      <TitleText text="Your total asset" size="x-large"/>
      <EChartsReact style={{ width: "100%", height: "200px" }} option={option} />
      <Stack direction="horizontal">
        <TitleText text="Total asset" />
        <MoneyText money={(cash + stockValue.curr).toFixed(2)} />
      </Stack>
      <hr />
      <Stack gap={2}>
        <Stack direction="horizontal">
          <TitleText text="Cash" />
          <MoneyText money={cash.toFixed(2)} />
        </Stack>
        <Stack direction="horizontal">
          <TitleText text="Stocks" />
          <Styled.StocksValue>
            <MoneyText money={stockValue.curr.toFixed(2)} />
            <ChangePercentage base={stockValue.base} curr={stockValue.curr} />
          </Styled.StocksValue>
        </Stack>
      </Stack>
    </Styled.Container>
  );
};

export default TotalValue;