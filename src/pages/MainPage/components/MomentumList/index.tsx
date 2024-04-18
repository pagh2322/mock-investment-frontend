import { useState } from "react";
import { StockMomentumsResponse } from "../../../../api/quant";
import { Stack } from "react-bootstrap";

import * as Styled from "./index.styles";

const MomentumList = () => {
  const [stockMomentums, setStockMomentums] = useState<StockMomentumsResponse>({
    momentum: []
  });
  
  return (
    <Styled.Container>
      <Styled.TitleText>Momentum Strategy</Styled.TitleText>
      
      {stockMomentums.momentum.map((momentum => (
        <Stack direction="horizontal" key={momentum.code}>
          <Stack>
            <span>{momentum.title}</span>
            <div>{momentum.code}</div>
          </Stack>
          <span>return: {momentum.return}</span>
        </Stack>
      )))}
    </Styled.Container>
  )
};

export default MomentumList;