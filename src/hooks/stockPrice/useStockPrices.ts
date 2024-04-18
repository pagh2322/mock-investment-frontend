import { useQuery } from "react-query";
import QUERY_KEYS from "../../constants/queries"
import { GetStockPricesResponse, requestGetStockPrices } from "../../api/stockPrice"
import { AxiosError } from "axios";

const useStockPrices = ({
  stockCodes,
  date
}: {
  stockCodes: string,
  date: string,
}) =>
  useQuery<GetStockPricesResponse, AxiosError>(
    [QUERY_KEYS.STOCK_PRICES, stockCodes, date],
    () => requestGetStockPrices(stockCodes, date)
  );

export default useStockPrices;