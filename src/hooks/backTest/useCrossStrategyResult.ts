import { useQuery } from "react-query"
import QUERY_KEYS from "../../constants/queries";
import { BackTestResultResponse, CrossStrategyRequest, requestTestCrossStrategy, requestTestRSIStrategy } from "../../api/backTest";
import { AxiosError } from "axios";

const useCrossStrategyResult = (request: CrossStrategyRequest) => {
  return useQuery<BackTestResultResponse, AxiosError>(
    [QUERY_KEYS.BACK_TEST_CROSS_RESULTS],
    () => requestTestCrossStrategy(request)
  );
};

export default useCrossStrategyResult;