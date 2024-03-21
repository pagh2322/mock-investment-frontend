import { Link, useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/Auth";
import StockListItem from "./components/StockListItem";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";
import { StockPricesResponse, requestGetStockPricesResponse } from "../../api/stock";
import { STOCK_CODES } from "../../constants/stockCodes";
import { Nav, Stack } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import StockList from "./components/StockList";
import Tabbar from "./components/Tabbar";

const MainPage = () => {
  const authContextValue = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
  const [currentTab, setCurrentTab] = useState("today");
  const [stockPricesResponse, setStockPricesResponse] = useState<StockPricesResponse>({
    prices: []
  });
  const codes = STOCK_CODES.reduce((a, c) => a = a.concat(`,${c}`));
  var index = 1;

  const handleStockCurrentPrice = (event: MessageEvent<any>) => {
    const {code, curr} = JSON.parse(event.data)
    if (curr === 0.0) {
      return;
    }
    setStockPricesResponse(prevState => {
      const updatedPrices = prevState.prices.map(stockPrice => {
        if (stockPrice.code === code) {
          return { ...stockPrice, curr: curr };
        }
        return stockPrice;
      });
      if (updatedPrices.length > 0) {
        return { prices: updatedPrices };
      }
      return prevState;
    });
  }

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:8080/stock-prices/subscribe?code=${codes}`, 
      { withCredentials: true }
    );
    // authContextValue.setIsLogin(cookies.Authorization !== undefined);
    requestGetStockPricesResponse(codes).then(response => {
      setStockPricesResponse(response);
    });
    eventSource.addEventListener('stock-price', handleStockCurrentPrice);
    return () => {
      eventSource.close();
    };
  }, []);

  const handleTab = (eventKey: string | null, event: SyntheticEvent<unknown, Event>) => {
    if (eventKey !== null) {
      setCurrentTab(eventKey);
    }
  }

  return (
    <>
      <Stack direction="horizontal">
        <div className="p-2">Main Page</div>
        <div className="p-2 ms-auto">Search</div>
        {cookies.Authorization !== undefined ? 
          <Link className="p-2" to={PATH.ABOUTME}>ABOUT</Link> :
          <Link to={PATH.LOGIN} className="p-2">Register/Login</Link>
        }
      </Stack>
      <Tabbar selected={currentTab} handleTab={handleTab}/>
      {(() => {
        switch (currentTab) {
          case "my-stock":
            return <div>My Stock</div>;
          case "today":
            return <StockList items={stockPricesResponse.prices} />;
          case "news":
            return <div>News</div>;
          default:
            return null;
        }
      })()}
    </>
  );
};

export default MainPage;