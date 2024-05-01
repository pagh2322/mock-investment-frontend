import { Stack } from "react-bootstrap";
import BackButton from "../../../../components/BackButton";
import { GetStockPriceResponse } from "../../../../api/stockPrice";
import StockTickerLike from "../../../../components/StockTickerLike";
import useStockTicker from "../../../../hooks/stockTicker/useStockTicker";
import StockNameAndCode from "../../../../components/StockNameAndCode";
import { Container, HeaderContent, Price } from "./index.styles";
import MoneyText from "../../../../components/MoneyText";
import ChangePercentage from "../../../../components/ChangePercentage";
import { useEffect, useRef, useState } from "react";
import axios from "axios";


export interface StockTickerProps {
  price: GetStockPriceResponse;
  onBackButtonClick: () => void
}

const StockTickerHeader = (props: StockTickerProps) => {
  const price = props.price;
  const isLiked = useStockTicker({ code: price.code }).data?.isLiked ?? false;
  const curr = price.curr;
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    axios.get(`http://localhost:8000/stocks/description?name=${price.name}`)
    .then(response => {
      setDescription(response.data);
    })
  }, []);

  return (
    <Container>
      <Stack direction="horizontal">
        <BackButton onClick={props.onBackButtonClick} />
        <StockTickerLike isLiked={isLiked} code={price.code} />
      </Stack>

      <HeaderContent>
        <Stack gap={2} direction="horizontal">
          <Stack style={{ width: "100%" }}>
            <StockNameAndCode
              name={price.name}
              nameSize="large"
              code={price.code}
              codeSize="small"
            />
            <Price><MoneyText money={curr.toFixed(2)} /></Price>
            <ChangePercentage base={price.base} curr={curr} />
          </Stack>
          <span>{description}</span>
        </Stack>
      </HeaderContent>
    </Container>
  );
};

export default StockTickerHeader;