import { Button, Stack } from "react-bootstrap";
import * as Styled from "./index.styles";
import StockNameAndCode from "../StockNameAndCode";
import MoneyText from "../MoneyText";
import useCancelStockOrder from "../../hooks/stockOrder/useCancelStockOrder";

interface StockOrderListItemProps {
  id: number;
  date: string;
  name: string;
  code: string;
  quantity: number;
  bidPrice: number;
  orderType: string;
  executed: boolean;
  excutedDate: string;
};

const StockOrderListItem = (props: StockOrderListItemProps) => {
  const { mutate: cancelStockOrder } = useCancelStockOrder();
  const isBuy = props.orderType === "BUY";

  return (
    <Styled.Container>
      <Stack gap={3} direction="horizontal">
        <Styled.Date>{props.date}</Styled.Date>
        <Styled.Box gap={1}>
          <StockNameAndCode name={props.name} code={props.code} codeSize="small"/>
          <Stack gap={3} direction="horizontal">
            <Styled.OrderType buy={isBuy}>{props.orderType} {props.quantity} shares (<MoneyText money={props.bidPrice.toFixed(2)} /> per share)</Styled.OrderType>
          </Stack>
        </Styled.Box>
        {props.executed ?
          <Styled.ExcutedDate>executed at: {props.excutedDate}</Styled.ExcutedDate> :
          <Button size="sm" onClick={() => cancelStockOrder(props.id) }>cancel</Button>
        }
      </Stack>
    </Styled.Container>
  );
};

export default StockOrderListItem;