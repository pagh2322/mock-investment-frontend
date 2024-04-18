import { useQuery } from "react-query";
import QUERY_KEYS from "../../constants/queries"
import { AxiosError } from "axios";
import { GetOwnStocksResponse, requestGetOwnStocks } from "../../api/ownStock";

const useOwnStocks = ({
  code
}: {
  code: string
} = { code: "" }) =>
  useQuery<GetOwnStocksResponse, AxiosError>(
    [QUERY_KEYS.OWN_STOCKS],
    () => requestGetOwnStocks(code)
  );

export default useOwnStocks;