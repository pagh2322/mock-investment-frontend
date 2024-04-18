import { Stack } from "react-bootstrap";
import useOwnStocks from "../../../../hooks/ownStock/useOwnStocks";
import TitleText from "../../../../components/TitleText";

import * as Styled from "./index.styles";
import ChangePercentage from "../../../../components/ChangePercentage";
import MoneyText from "../../../../components/MoneyText";
import StockOrderHistories from "../StockOrderHistories";
import Seperator from "../../../../components/Separator";

export interface MyStockProps {
  code: string;
  curr: number;
};

const MyStock = (props: MyStockProps) => {
  const ownStocks = useOwnStocks({ code: props.code }).data?.ownStocks ?? [];
  if (ownStocks.length == 0)
    return (
      <Styled.Container>
        <TitleText text="My Stock" />
        <Styled.Empty>You can buy stocks!</Styled.Empty>
      </Styled.Container>
    );
  const ownStock = ownStocks[0];

  const totalValue = (ownStock.averageCost * ownStock.quantity).toFixed(2);

  const base = ownStock.averageCost * ownStock.quantity;
  const curr = props.curr * ownStock.quantity;

  return (
    <Styled.Container>
      <Styled.Content>
        <TitleText text="My Stock" />
        
        <Stack gap={4} style={{ paddingTop: "8px" }}>
          <Stack direction="horizontal">
            <Styled.LeftLabel>Average cost</Styled.LeftLabel>
            <Styled.RightLabel>${ownStock.averageCost.toFixed(2)}</Styled.RightLabel>
          </Stack>

          <Stack direction="horizontal">
            <Styled.LeftLabel>Own quantity</Styled.LeftLabel>
            <Styled.RightLabel>{ownStock.quantity} stocks</Styled.RightLabel>
          </Stack>
          
          <Stack direction="horizontal">
            <Styled.LeftLabel>Total value</Styled.LeftLabel>
            <Styled.RightLabel>
              <Styled.Price><MoneyText money={totalValue} /></Styled.Price>
              <ChangePercentage base={base} curr={curr} />
            </Styled.RightLabel>
          </Stack>
        </Stack>
      </Styled.Content>
      <Seperator />
      <Styled.Content>
        <StockOrderHistories code={props.code} />
      </Styled.Content>
    </Styled.Container>
  );
}

export default MyStock;