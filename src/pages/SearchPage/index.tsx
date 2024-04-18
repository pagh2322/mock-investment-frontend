import { useContext, useEffect, useState } from "react";
import { Form, Stack } from "react-bootstrap";
import { GetStockTickersResponse, requestGetStockTickers } from "../../api/stockTicker";
import StockListItem from "../../components/StockListItem";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import SimulationContext from "../../context/simulation";

import * as Styled from "./index.styles";
import { COLORS } from "../../constants/colors";
import useDebounce from "../../hooks/useDebounce";
import Seperator from "../../components/Separator";

const SearchPage = () => {
  const navigate = useNavigate();
  const simulation = useContext(SimulationContext);
  const [content, setContent] = useState("");
  const [stockTickers, setStockTickers] = useState<GetStockTickersResponse>({ stockTickers: [] });
  
  const debounce = useDebounce(content);

  useEffect(() => {
    if (debounce != "") {
      requestGetStockTickers(content)
        .then((value) => setStockTickers({ stockTickers: value.stockTickers }));
    }
    else {
      setStockTickers({ stockTickers: [] });
    }
  }, [debounce]);

  const navigateToStockPage = (code: string) => {
    navigate(`${PATH.STOCK}/${code}?date=${simulation.date}`);
  };

  return (
    <Styled.Container>
      <Form.Control
        placeholder="Search by keyword"
        value={content}
        style={{ borderColor: "transparent" }}
        onChange={(e) => {
          if (e.target.value.length <= 255) {
            setContent(e.target.value);
          }
        }}
      />
      <Seperator />
      <div style={{ marginTop: "12px" }}>
        {(stockTickers.stockTickers.length == 0 && content !== "") ?
          <div style={{ textAlign: "center", color: COLORS.SECONDAY }}>Can not find stocks about {content}</div> :
          stockTickers.stockTickers.map((stockTicker) => (
            <StockListItem
              key={stockTicker.name}
              code={stockTicker.code}
              name={stockTicker.name}
              isAverageCost={false}
              onClick={navigateToStockPage}
            />
        ))}
      </div>
    </Styled.Container>
  );
};

export default SearchPage;