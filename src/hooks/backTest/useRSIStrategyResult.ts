import { useQuery } from "react-query"
import QUERY_KEYS from "../../constants/queries";
import { BackTestResultResponse, RSIStrategyRequest, requestTestRSIStrategy } from "../../api/backTest";
import { AxiosError } from "axios";

const useRSIStrategyResult = (request: RSIStrategyRequest) => {

  return useQuery<BackTestResultResponse, AxiosError>(
    [QUERY_KEYS.BACK_TEST_RSI_RESULTS],
    () => requestTestRSIStrategy(request)
  );
};

export default useRSIStrategyResult;