import { Link, useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import { STOCK_TICKERS } from "../../constants/stockTickers";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        Main Page
      </div>
      <span>
        <Link to={PATH.LOGIN}>Login</Link>
      </span>
      {STOCK_TICKERS.map((ticker) => (
        <div key={ticker.id}>
          <button onClick={() => navigate(`${PATH.STOCK}/${ticker.value}`)}>
            {ticker.value}
          </button>
        </div>
      ))}
    </>
  );
};

export default MainPage;