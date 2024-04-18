import { Spinner } from "react-bootstrap";
import useStockValuesRanking from "../../../../hooks/stockValue/useStockValuesRanking";
import { useContext } from "react";
import SimulationContext from "../../../../context/simulation";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../constants/path";

import * as Styled from "./index.styles";
import StockListItem from "../../../../components/StockListItem";
import TitleText from "../../../../components/TitleText";

const Loading = () => {
  return (
    <Styled.Container>
      <TitleText text="Value Strategy" />
      <div style={{ textAlign: "center" }}><Spinner animation="border" /></div>
    </Styled.Container>
  );
}

const ValueList = () => {
  const navigate = useNavigate();
  const simulation = useContext(SimulationContext);
  const { isLoading, data } = useStockValuesRanking(simulation.date);

  if (isLoading) {
    return <Loading />
  }

  const navigateToStockPage = (code: string) => {
    navigate(`${PATH.STOCK}/${code}?date=${simulation.date}`);
  };

  return (
    <Styled.Container>
      <TitleText text="Value Strategy" />

      <Styled.List>
        {data && data.rankings.map((stock => (
          <StockListItem
            key={stock.name}
            code={stock.code}
            name={stock.name}
            onClick={navigateToStockPage}
          />
          // <Stack direction="horizontal" key={stock.code} onClick={() => navigateToStockPage(stock.code)}>
          //   <Stack>
          //     <span>{stock.name}</span>
          //     <div>{stock.code}</div>
          //   </Stack>
          //   <span>per: {stock.per}</span>
          // </Stack>
        )))}
      </Styled.List>
    </Styled.Container>
  )
};

export default ValueList;