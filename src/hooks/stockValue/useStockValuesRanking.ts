import { useQuery } from "react-query";
import QUERY_KEYS from "../../constants/queries"
import { AxiosError } from "axios";
import { GetStockValuesRankingResponse, requestGetStockValueRanking } from "../../api/stockValue";

const useStockValuesRanking = (date: string) => 
  useQuery<GetStockValuesRankingResponse, AxiosError>(
    [QUERY_KEYS.STOCK_VALUES_RANKING, date],
    () => requestGetStockValueRanking(date)
  );

export default useStockValuesRanking;