import { useQuery } from "react-query";
import QUERY_KEYS from "../../constants/queries"
import { GetStockPricesResponse, requestGetLikedStockPrices } from "../../api/stockPrice"
import { AxiosError } from "axios";

const useLikedStockPrices = (date: string) =>
  useQuery<GetStockPricesResponse, AxiosError>(
    [QUERY_KEYS.LIKED_STOCK_PRICES, date],
    () => requestGetLikedStockPrices(date)
  );

export default useLikedStockPrices;