import { useQuery } from "react-query";
import QUERY_KEYS from "../../constants/queries"
import { AxiosError } from "axios";
import { GetStockTickerResponse, requestGetStockTicker } from "../../api/stockTicker";

const useStockTicker = ({
  code,
}: {
  code: string,
}) =>
  useQuery<GetStockTickerResponse, AxiosError>(
    [QUERY_KEYS.STOCK_TICKER],
    () => requestGetStockTicker(code)
  );

export default useStockTicker;