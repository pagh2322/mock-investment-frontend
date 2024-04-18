import { useMutation, useQueryClient } from "react-query"
import { cancelStockOrder } from "../../api/stockOrder";
import QUERY_KEYS, { MUTATION_KEYS } from "../../constants/queries";

const useCancelStockOrder = () => {
  const queryClient = useQueryClient();

  return useMutation((stockOrderId: number) =>
    cancelStockOrder(stockOrderId), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.STOCK_ORDER_HISTORIES);
    },
    mutationKey: MUTATION_KEYS.CANCEL_STOCK_ORDER,
  });
};

export default useCancelStockOrder;