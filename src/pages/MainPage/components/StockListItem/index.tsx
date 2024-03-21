import { useNavigate } from "react-router-dom";
import PATH from "../../../../constants/path";
import getPriceChangePercent from "../../../../utils/getPriceChangePercent";
import Stack from 'react-bootstrap/Stack';

interface StockListItemProps {
  code: string;
  name: string;
  base: number;
  curr: number;
  index: number;
}

const StockListItem = (props: StockListItemProps) => {
  const navigate = useNavigate();

  const navigateToStockPage = () => {
    navigate(`${PATH.STOCK}/${props.code}`);
  };

  const requestAddFavorite = () => {
    console.log("Add favorite if login");
  }

  const percentage = getPriceChangePercent(props.base, props.curr);
  const isMinus = percentage.startsWith("-");

  const curr = props.curr.toFixed(2);
  return (
    <Stack direction="horizontal" style={{ cursor: "pointer" }} onClick={navigateToStockPage}>
      <div style={{ paddingLeft: "12px" }}>{props.index}</div>
      <Stack className="p-2">
        <div style={{ fontWeight: "bold" }}>{props.name}</div>
        <div>${curr}  <span style={{ color: isMinus ? "blue" : "red" }}>{percentage}%</span></div>
      </Stack>
      <div className="p-2 ms-auto" onClick={requestAddFavorite}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path style={{ fill: "gray" }} d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
        </svg>
      </div>
    </Stack>
  );
};

export default StockListItem;