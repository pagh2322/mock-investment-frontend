import { Stack, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../constants/path";
import useOwnStocks from "../../../../hooks/ownStock/useOwnStocks";
import StockListItem from "../../../../components/StockListItem";
import SimulationContext from "../../../../context/simulation";
import * as Styled from "./index.styles";
import useOwnStockTotalValue from "../../../../hooks/ownStock/useOwnStockTotalValue";
import ChangePercentage from "../../../../components/ChangePercentage";
import TitleText from "../../../../components/TitleText";
import MoneyText from "../../../../components/MoneyText";

const ModeButtons = ({
  isAverageCost,
  setIsAverageCost
}: {
  isAverageCost: boolean;
  setIsAverageCost: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div style={{ textAlign: "end", marginBottom: "16px" }}>
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
  );
}

const OwnStockList = () => {
  const simulation = useContext(SimulationContext);
  const ownStocks = useOwnStocks().data?.ownStocks ?? [];
  const ownStockTotalValue = useOwnStockTotalValue(simulation.date).data;
  const [isAverageCost, setIsAverageCost] = useState(true);
  const navigate = useNavigate();

  const navigateToStockPage = (code: string) => {
    navigate(`${PATH.STOCK}/${code}?date=${simulation.date}`);
  };

  return (
    <Styled.Container>
      <TitleText text="Own stocks" />
      {ownStockTotalValue &&
        <Stack>
          <Styled.TotalOwnStockValue><MoneyText money={ownStockTotalValue.curr.toFixed(2)} /></Styled.TotalOwnStockValue>
          <ChangePercentage
            base={ownStockTotalValue.base}
            curr={ownStockTotalValue.curr}
            fontSize="medium"
          />
        </Stack>
      }
      
      {ModeButtons({ isAverageCost, setIsAverageCost })}
      
      {ownStocks.map((ownStock) => (
        <StockListItem
          key={ownStock.id}
          code={ownStock.code}
          name={ownStock.name}
          averageCost={ownStock.averageCost}
          quantity={ownStock.quantity}  
          isAverageCost={isAverageCost}
          onClick={navigateToStockPage}
        />
      ))}
    </Styled.Container>
  );
}

export default OwnStockList;