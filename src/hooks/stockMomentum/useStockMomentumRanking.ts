import { useQuery } from "react-query";
import QUERY_KEYS from "../../constants/queries"
import { AxiosError } from "axios";
import { GetStockMomentumsResponse, requestGetStockMomentumsRanking } from "../../api/stockMomentum";

const useStockMomentumRanking = (date: string) => 
  useQuery<GetStockMomentumsResponse, AxiosError>(
    [QUERY_KEYS.STOCK_MOMENTUM_RANKING, date],
    () => requestGetStockMomentumsRanking(date)
  );

export default useStockMomentumRanking;