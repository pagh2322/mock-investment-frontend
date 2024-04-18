import { useQuery } from "react-query";
import QUERY_KEYS from "../../constants/queries"
import { AxiosError } from "axios";
import { GetStockOrderHistoriesResponse, requestGetMyStockOrderHistoriesByCode } from "../../api/stockOrder";

const useStockOrderHistories = ({
  code,
} = { code: "" }) =>
  useQuery<GetStockOrderHistoriesResponse, AxiosError>(
    [QUERY_KEYS.STOCK_ORDER_HISTORIES],
    () => requestGetMyStockOrderHistoriesByCode(code)
  );

export default useStockOrderHistories;