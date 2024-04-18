
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import useToggleStockTickerLike from "../../hooks/stockTicker/useToggleStockTickerLike";
import * as Styled from "./index.styles";
import { COLORS } from "../../constants/colors";

interface StockTickerLikeProps {
  code: string;
  isLiked: boolean;
};

const StockTickerLike = (props: StockTickerLikeProps) => {
  const { mutate: toggleLike } = useToggleStockTickerLike();

  return (
    <Styled.HeartIcon
      icon={faHeart}
      className="ms-auto"
      color={props.isLiked ? "red" : COLORS.DISABLE}
      onClick={() => toggleLike(props.code)}
    />
  );
};

export default StockTickerLike;