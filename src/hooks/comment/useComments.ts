import { useQuery } from "react-query";
import QUERY_KEYS from "../../constants/queries"
import { AxiosError } from "axios";
import { GetOwnStocksResponse, requestGetOwnStocks } from "../../api/ownStock";
import { GetCommentsResponse, requestGetComments } from "../../api/comment";

const useComments = ({
  code
}: {
  code: string
}) =>
  useQuery<GetCommentsResponse, AxiosError>(
    [QUERY_KEYS.COMMENTS],
    () => requestGetComments(code)
  );

export default useComments;