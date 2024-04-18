import { useQuery } from "react-query";
import QUERY_KEYS from "../../constants/queries"
import { AxiosError } from "axios";
import { GetOwnStockTotalValueResponse, requestGetOwnStockTotalValue } from "../../api/ownStock";

const useOwnStockTotalValue = (date: string) =>
  useQuery<GetOwnStockTotalValueResponse, AxiosError>(
    [QUERY_KEYS.OWN_STOCK_TOTAL_VALUE],
    () => requestGetOwnStockTotalValue(date)
  );

export default useOwnStockTotalValue;