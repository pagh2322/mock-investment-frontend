import { Stack } from "react-bootstrap";
import useStockPrices from "../../hooks/stockPrice/useStockPrices";
import { useContext } from "react";
import SimulationContext from "../../context/simulation";
import StockNameAndCode from "../StockNameAndCode";
import { Price } from "./index.styles";
import ChangePercentage from "../ChangePercentage";
import MoneyText from "../MoneyText";

export interface StockListItemProps {
  averageCost?: number;
  quantity?: number;
  code: string;
  name: string;
  onClick: (str: string) => void;
  isAverageCost: boolean;
};

const StockListItem = (props: StockListItemProps) => {
  const simulation = useContext(SimulationContext);
  const { isLoading, data, isError, error } = useStockPrices({ stockCodes: props.code, date: simulation.date });

  if (data === undefined) {
    return <></>;
  }

  var base = props.averageCost ?? data.prices[0].base;
  var curr = data.prices[0].curr;

  if (props.quantity === undefined || props.averageCost === undefined) {
    return (
      <Stack direction="horizontal" style={{ cursor: "pointer", marginBottom: "8px" }} onClick={() => props.onClick(props.code)}>
        <StockNameAndCode name={props.name} code={props.code}/>
        <Stack style={{ textAlign: "end" }}>
          <Price><MoneyText money={curr.toFixed(2)}/></Price>
          <ChangePercentage base={base} curr={curr} />
        </Stack>
      </Stack>
    );
  }

  if (props.isAverageCost && props.quantity !== undefined) {
    base *= props.quantity;
    curr *= props.quantity;
  }
  
  return (
    <Stack direction="horizontal" style={{ cursor: "pointer", marginBottom: "8px" }} onClick={() => props.onClick(props.code)}>
      <StockNameAndCode
        name={props.name}
        code={props.code}
        subTitle={props.isAverageCost ? `Quantity: ${props.quantity}` : `Average cost: $${props.averageCost.toFixed(2)}`}
      />
      <Stack style={{ textAlign: "end" }}>
        <Price><MoneyText money={curr.toFixed(2)} /></Price>
        <ChangePercentage base={base} curr={curr} />
      </Stack>
    </Stack>
  );
};

StockListItem.defaultProps = {
  isAverageCost: false
};

export default StockListItem;