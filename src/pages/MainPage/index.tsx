import { Link, useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import { STOCK_TICKERS } from "../../constants/stockTickers";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/Auth";
import { GetStockPriceResponse, requestGetAllStockPrice } from "../../api/stock";
import StockListItem from "./components/StockListItem";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";

const MainPage = () => {
  const navigate = useNavigate();
  const authContextValue = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
  const [ stocks, setStocks ] = useState<GetStockPriceResponse[]>([]);
  var requestGetStockPriceInterval: NodeJS.Timer;

  const logout = () => {
    authContextValue.setIsLogin(false);
    removeCookie('Authorization');
  };

  useEffect(() => {
    requestGetStockPriceInterval = setInterval(() => {
      requestGetAllStockPrice()
        .then((response) => {
          setStocks(response);
        });
    }, 1500);
    authContextValue.setIsLogin(cookies.Authorization !== undefined);
    return () => clearInterval(requestGetStockPriceInterval);
  }, []);

  return (
    <>
      <div>
        Main Page
      </div>
      <span>
        {cookies.Authorization !== undefined ? 
          <>
            <Link to={PATH.ABOUTME}>ABOUT</Link>
            <button onClick={() => logout()}>Logout</button>
          </> :
          <Link to={PATH.LOGIN}>Login</Link>
        }
      </span>
      {stocks.map((response) => (
        <StockListItem
          key={response.id}
          title={response.title}
          ticker={response.id}
          ranking={5}
          price={response.price}
          percent={response.changePercent}
        />
      ))}
    </>
  );
};

export default MainPage;