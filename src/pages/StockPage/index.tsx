import { SyntheticEvent, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Tabbar from "./components/Tabbar";
import StockTickerHeader from "./components/StockTickerHeader";
import useStockPrices from "../../hooks/stockPrice/useStockPrices";
import ContentContainer from "./components/ContentContainer";
import StockOrderButtons from "./components/StockOrderButtons";

import * as Styled from "./index.styles";

const StockPage = () => {
  const navigate = useNavigate();
  const code = useParams().code ?? "";
  const [currentTab, setCurrentTab] = useState("chart");
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get("date") ?? "";
  
  const { data } = useStockPrices({ stockCodes: code, date: date });

  const handleTab = (eventKey: string | null, event: SyntheticEvent<unknown, Event>) => {
    if (eventKey !== null) {
      setCurrentTab(eventKey);
    }
  }
  
  return (
    <>
      <Styled.Container>
        {data && <StockTickerHeader price={data.prices[0]} onBackButtonClick={() => navigate(-1)}/>}
        <Tabbar selected={currentTab} handleTab={handleTab}/>
        {data &&
          <ContentContainer
            currentTab={currentTab}
            code={code}
            end={date}
            curr={data.prices[0].curr}
          />
        }
      </Styled.Container>
      {data && <StockOrderButtons code={code} price={data.prices[0].curr}/>}
    </>
  );
};

export default StockPage;