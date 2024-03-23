import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/Auth";
import CandleChart from "./components/CandleChart";
import getPriceChangePercent from '../../utils/getPriceChangePercent';
import { StockInfoResponse, StockPriceCandleResponse, requestGetStockInfo, requestGetStockPriceCandlesFor5Years } from "../../api/stock";
import { Stack } from "react-bootstrap";
import Tabbar from "./components/Tabbar";
import PurchaseButtons from "./components/PurchaseButtons";
import "./styles.css";
import { CurrentBalanceResponse, requestMyCurrentBalance } from "../../api/balance";

const StockPage = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const [currentTab, setCurrentTab] = useState("chart");
  const [stockInfo, setStockInfo] = useState<StockInfoResponse>({
    name: '',
    symbol: '',
    base: 0,
    price: 0,
  });
  const [candles, setCandles] = useState<StockPriceCandleResponse[]>([]);
  const [currentBalance, setCurrentBalance] = useState<CurrentBalanceResponse>({
    balance: 0
  });

  const handleStockCurrentPrice = (event: MessageEvent<any>) => {
    const {code, curr} = JSON.parse(event.data)
    if (curr === 0.0) {
      return;
    }
    setStockInfo(prevState => {
      return {
        ...prevState,
        price: curr
      };
    });
  }

  useEffect(() => {
    if (code === undefined) {
      return;
    }
    requestGetStockPriceCandlesFor5Years(code)
      .then(response => {
        setCandles(response.candles);
      });

    requestGetStockInfo(code)
      .then(response => {
        setStockInfo(response);
      });
    
    requestMyCurrentBalance()
      .then(response => {
        setCurrentBalance(response);
      });
    
    const eventSource = new EventSource(
      `http://localhost:8080/stock-prices/subscribe?code=${code}`, 
      { withCredentials: true }
    );
    eventSource.addEventListener('stock-price', handleStockCurrentPrice);
    eventSource.onerror = () => {
      eventSource.close();
    }
    return () => {
      eventSource.close();
    };
  }, []);

  const handleTab = (eventKey: string | null, event: SyntheticEvent<unknown, Event>) => {
    if (eventKey !== null) {
      setCurrentTab(eventKey);
    }
  }

  if (code === undefined) {
    return (
      <span>Invalid URL</span>
    );
  }

  const percentage = getPriceChangePercent(stockInfo.base, stockInfo.price);
  const isMinus = percentage.startsWith("-");

  return (
    <>
      <div id="stock-page-content">
        <Stack direction="horizontal" style={{ padding: "12px" }}>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}>
            <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="ms-auto"
          style={{ cursor: "pointer" }}>
            <path style={{ fill: "gray" }} d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
          </svg>
        </Stack>

        <Stack className="p-2">
          <div style={{ fontWeight: "bold", fontSize: "large" }}>{stockInfo.name} {stockInfo.symbol}</div>
          <div style={{ fontWeight: "bold", fontSize: "x-large" }}>${stockInfo.price.toFixed(2)}</div>
          <div>Compared with last day <span style={{ color: isMinus ? "blue" : "red" }}>{percentage}%</span></div>
        </Stack>

        <Tabbar selected={currentTab} handleTab={handleTab}/>
        
        {(() => {
          switch (currentTab) {
            case "chart":
              return <CandleChart code={code} candles={candles} />;
            case "forum":
              return <div>
                {["article1", "article2", "article3", "article4", "article5",
                  "article6", "article7", "article8", "article9", "article10",
                  "article11", "article12"].map((article) => (
                  <div key={article} style={{ fontSize: "xx-large" }}>
                    {article}
                  </div>
                ))}
              </div>;
            default:
              return null;
          }
        })()}
      </div>

      <PurchaseButtons code={code} balance={currentBalance.balance} />
    </>
  );
};

export default StockPage;