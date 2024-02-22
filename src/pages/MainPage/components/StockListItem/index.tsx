import { useNavigate } from "react-router-dom";
import PATH from "../../../../constants/path";

interface StockListItemProps {
  title: string;
  ticker: string;
  ranking: number;
  price: number;
  percent: number;
}

const StockListItem = (props: StockListItemProps) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`${PATH.STOCK}/${props.ticker}`)}>
      <div>{props.ranking} {props.title}</div>
      <div>{props.price} | {props.percent}</div>
    </div>
  );
};

export default StockListItem;