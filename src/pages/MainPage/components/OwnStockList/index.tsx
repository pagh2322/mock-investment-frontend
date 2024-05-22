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
      <TitleText text="보유 주식" />
      {ownStockTotalValue &&
        <Stack>
          <Styled.TotalOwnStockValue>
            <MoneyText money={ownStockTotalValue.curr.toFixed(2)} />
          </Styled.TotalOwnStockValue>
          <ChangePercentage
            base={ownStockTotalValue.base}
            curr={ownStockTotalValue.curr}
            fontSize="medium"
          />
        </Stack>
      }
      
      <Styled.ModeButtons>
        <ToggleButtonGroup type="radio" name="options" defaultValue={2}>
          <ToggleButton
            id="tbg-radio-1"
            type="checkbox"
            value={1}
            variant={!isAverageCost ? "primary" : "outline-primary"}
            onChange={() => setIsAverageCost(false)}>
            현재가
          </ToggleButton>
          <ToggleButton
            id="tbg-radio-2"
            type="checkbox"
            value={2}
            variant={isAverageCost ? "primary" : "outline-primary"}
            onChange={() => setIsAverageCost(true)}>
            평가금
          </ToggleButton>
        </ToggleButtonGroup>
      </Styled.ModeButtons>
      
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