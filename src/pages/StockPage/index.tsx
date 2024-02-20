import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetStockPriceResponse, requestGetStockPrice } from "../../api/stock";
import AuthContext from "../../context/Auth";

const StockPage = () => {
  const navigate = useNavigate();
  const { ticker } = useParams();
  const [stockPriceResponse, setStockPriceResponse] = useState<GetStockPriceResponse | null>(null);
  const [ isChartVisible, setIsChartVisible ] = useState(true);
  const authContextValue = useContext(AuthContext);
  var requestGetStockPriceInterval: NodeJS.Timer;

  useEffect(() => {
    requestGetStockPriceInterval = setInterval(() => {
      requestGetStockPrice(ticker ?? "")
        .then((response) => {
          setStockPriceResponse(response);
        });
    }, 1500);
    return () => clearInterval(requestGetStockPriceInterval);
  }, []);

  return (
    <>
      <button onClick={() => navigate(-1)}>back</button>
      <div>
        {stockPriceResponse?.title} {ticker}
      </div>
      <div>
        {stockPriceResponse?.price} | {stockPriceResponse?.changePercent}
      </div>
      <button onClick={() => setIsChartVisible(true)}>Chart</button>
      <button onClick={() => setIsChartVisible(false)}>Community</button>
      {isChartVisible ?
        <div style={{backgroundColor: 'blue', padding: '12px'}}>
          chart for price
        </div> :
        <div>
          {["article1", "article2"].map((article) => (
            <div key={article}>
              {article}
            </div>
          ))}
        </div>
      }
      {authContextValue.isLogin ? 
        <button>Buy</button> :
        <div>should login</div>
      }
    </>
  );
};

export default StockPage;