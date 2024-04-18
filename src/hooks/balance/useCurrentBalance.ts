import { useQuery } from "react-query";
import QUERY_KEYS from "../../constants/queries"
import { AxiosError } from "axios";
import { GetCurrentBalanceResponse, requestGetCurrentBalance } from "../../api/balance";

const useCurrentBalance = (
) =>
  useQuery<GetCurrentBalanceResponse, AxiosError>(
    [QUERY_KEYS.CURRENT_BALANCE],
    () => requestGetCurrentBalance()
  );

export default useCurrentBalance;