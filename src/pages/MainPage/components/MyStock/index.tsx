import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { PortfolioItemResponse } from "../../../../api/portfolio";
import { StockPriceResponse } from "../../../../api/stock";
import MyStockListItem from "./MyStockListItem";
import { useState } from "react";

export interface MyStockProps {
  items: PortfolioItemResponse[];
  current: StockPriceResponse[];
};

const MyStock = (props: MyStockProps) => {
  const [isAverageCost, setIsAverageCost] = useState(true);

  const getCurr = (code: string) => {
    for (var i = 0; i < props.current.length; i++) {
      if (props.current[i].code === code) {
        return props.current[i].curr;
      }
    }
    return 0;
  }

  const getPortfolioTotal = () => {
    var sum = 0;
    for (var i = 0; i < props.items.length; i++) {
      sum += (props.items[i].averageCost * props.items[i].volume);
    }
    return sum.toFixed(2);
  }

  const getTotalDistance = () => {

  }

  return (
    <>
      <div>
        Owned stock
      </div>
      <div>
        ${getPortfolioTotal()}
      </div>
      <div style={{ textAlign: "end"}}>
        <ToggleButtonGroup type="radio" name="options" defaultValue={2}>
          <ToggleButton id="tbg-radio-1" type="checkbox" value={1} variant={!isAverageCost ? "primary" : "outline-primary"}
            onChange={() => setIsAverageCost(false)}>
            Currnet Price
          </ToggleButton>
          <ToggleButton id="tbg-radio-2" type="checkbox" value={2} variant={isAverageCost ? "primary" : "outline-primary"}
            onChange={() => setIsAverageCost(true)}>
            Average cost
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {props.items.map((item) => (
        <MyStockListItem
          key={item.code}
          name={item.name}
          code={item.code}
          base={item.averageCost}
          curr={getCurr(item.code)}
          volume={item.volume}
        />
      ))}

      <hr />
      <div>
        Order histories
      </div>
    </>
  );
}

export default MyStock;