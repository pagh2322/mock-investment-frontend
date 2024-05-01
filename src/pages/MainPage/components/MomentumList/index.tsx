import { useContext, useState } from "react";
import { StockMomentumsResponse } from "../../../../api/quant";
import { Spinner, Stack } from "react-bootstrap";
import * as Styled from "./index.styles";
import TitleText from "../../../../components/TitleText";
import { useNavigate } from "react-router-dom";
import SimulationContext from "../../../../context/simulation";
import useStockMomentumRanking from "../../../../hooks/stockMomentum/useStockMomentumRanking";
import PATH from "../../../../constants/path";
import StockListItem from "../../../../components/StockListItem";

const Loading = () => {
  return (
    <Styled.Container>
      <TitleText text="Momentum Strategy" />
      <div style={{ textAlign: "center" }}><Spinner animation="border" /></div>
    </Styled.Container>
  );
}

const MomentumList = () => {
  const navigate = useNavigate();
  const simulation = useContext(SimulationContext);
  const { isLoading, data } = useStockMomentumRanking(simulation.date);
  const stockMomentums = data?.momentums ?? [];

  if (isLoading) {
    return <Loading />
  }

  const navigateToStockPage = (code: string) => {
    navigate(`${PATH.STOCK}/${code}?date=${simulation.date}`);
  };
  
  return (
    <Styled.Container>
      <TitleText text="Momentum Strategy" />
      <div style={{ marginTop: "12px" }}>
        {stockMomentums.map((momentum => (
          <StockListItem
            key={momentum.id}
            code={momentum.code}
            name={momentum.name}
            onClick={() => navigateToStockPage(momentum.code)} />
        )))}
      </div>
    </Styled.Container>
  )
};

export default MomentumList;