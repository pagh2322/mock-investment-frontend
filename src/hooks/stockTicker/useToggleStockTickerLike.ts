import { useMutation, useQueryClient } from "react-query";
import QUERY_KEYS, { MUTATION_KEYS } from "../../constants/queries"
import { toggleStockTickerLike } from "../../api/stockTicker";

const useToggleStockTickerLike = () => {
  const queryClient = useQueryClient();

  return useMutation((code: string) =>
    toggleStockTickerLike(code), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.STOCK_TICKER);
    },
    mutationKey: MUTATION_KEYS.TOGGLE_STOCK_TICKER_LIKE,
  });
};

export default useToggleStockTickerLike;