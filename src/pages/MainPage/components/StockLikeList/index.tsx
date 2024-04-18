import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../constants/path";
import SimulationContext from "../../../../context/simulation";

import * as Styled from "./index.styles";
import useLikedStockPrices from "../../../../hooks/stockPrice/useLikedStockPrices";
import StockListItem from "../../../../components/StockListItem";
import TitleText from "../../../../components/TitleText";

const StockLikeList = () => {
  const simulation = useContext(SimulationContext);
  const prices = useLikedStockPrices(simulation.date).data?.prices ?? [];
  const navigate = useNavigate();

  const navigateToStockPage = (code: string) => {
    navigate(`${PATH.STOCK}/${code}?date=${simulation.date}`);
  };

  return (
    <Styled.Container>
      <TitleText text="Favorite stocks" />
      
      <Styled.List>
        {prices.map((price) => (
          <StockListItem
            key={price.name}
            code={price.code}
            name={price.name}
            onClick={navigateToStockPage}
          />
        ))}
      </Styled.List>
    </Styled.Container>
  );
}

export default StockLikeList;