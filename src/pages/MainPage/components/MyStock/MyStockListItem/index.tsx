import { useNavigate } from "react-router-dom";
import PATH from "../../../../../constants/path";
import getPriceChangePercent from "../../../../../utils/getPriceChangePercent";
import { Stack } from "react-bootstrap";

interface MyStockListItemProps {
  code: string;
  name: string;
  base: number;
  curr: number;
  volume: number;
}

const MyStockListItem = (props: MyStockListItemProps) => {
  const navigate = useNavigate();

  const navigateToStockPage = () => {
    navigate(`${PATH.STOCK}/${props.code}`);
  };

  const percentage = getPriceChangePercent(props.base, props.curr);
  const isMinus = percentage.startsWith("-");

  const curr = props.curr.toFixed(2);
  const distance = (props.curr-props.base).toFixed(2);
  return (
    <Stack direction="horizontal" style={{ cursor: "pointer" }} onClick={navigateToStockPage}>
      <Stack className="p-2">
        <div style={{ fontWeight: "bold" }}>{props.name}</div>
        <div style={{ fontSize: "small" }}>{props.volume} Volume</div>
      </Stack>
      <Stack className="p-2" style={{ textAlign: "end" }}>
        <div>${curr}</div>
        <span style={{ fontSize: "small", color: isMinus ? "blue" : "red" }}>{distance}({percentage}%)</span>
      </Stack>
    </Stack>
  );
};

export default MyStockListItem;