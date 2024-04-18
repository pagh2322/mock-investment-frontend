import { useQuery } from "react-query";
import QUERY_KEYS from "../../constants/queries"
import { GetStockPricesResponse, requestGetStockPrices } from "../../api/stockPrice"
import { AxiosError } from "axios";
import { GetStockPriceCandlesResponse, requestGetStockPriceCandles } from "../../api/stockPriceCandle";

const useStockPriceCandles = ({
  code,
  end,
  period,
}: {
  code: string,
  end: string,
  period: string,
}) =>
  useQuery<GetStockPriceCandlesResponse, AxiosError>(
    [QUERY_KEYS.STOCK_PRICE_CANDLES],
    () => requestGetStockPriceCandles(code, end, period)
  );

export default useStockPriceCandles;