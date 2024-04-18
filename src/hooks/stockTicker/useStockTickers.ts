import { useQuery } from "react-query";
import QUERY_KEYS from "../../constants/queries"
import { AxiosError } from "axios";
import { GetStockTickerResponse, GetStockTickersResponse, requestGetStockTicker, requestGetStockTickers } from "../../api/stockTicker";

const useStockTickers = ({
  keyword,
}: {
  keyword: string,
}) =>
  useQuery<GetStockTickersResponse, AxiosError>(
    [QUERY_KEYS.SEARCHED_STOCK_TICKERS],
    () => requestGetStockTickers(keyword)
  );

export default useStockTickers;