import { StockPriceResponse } from "../../../../api/stock";
import StockListItem from "../StockListItem";

interface StockListProps {
  items: StockPriceResponse[];
};

const StockList = (props: StockListProps) => {
  var index = 1;
  return (
    <>
      {props.items.map((stock) => (
        <StockListItem
          key={stock.code}
          name={stock.name}
          code={stock.code}
          index={index++}
          base={stock.base}
          curr={stock.curr}
        />
      ))}
    </>
  );
};

export default StockList;