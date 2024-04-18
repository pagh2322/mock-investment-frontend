import { useQuery } from "react-query";
import QUERY_KEYS from "../../constants/queries"
import { AxiosError } from "axios";
import { GetStockValuesResponse, requestGetStockValues } from "../../api/stockValue";

const useStockValues = (code: string, date: string) => 
  useQuery<GetStockValuesResponse, AxiosError>(
    [QUERY_KEYS.STOCK_VALUES],
    () => requestGetStockValues(code, date)
  );

export default useStockValues;