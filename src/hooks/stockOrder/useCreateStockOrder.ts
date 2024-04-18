import { useMutation, useQueryClient } from "react-query"
import { CreateStockOrderRequest, createStockOrder } from "../../api/stockOrder";
import QUERY_KEYS, { MUTATION_KEYS } from "../../constants/queries";

interface UseCreateStockOrderProps extends CreateStockOrderRequest {
  code: string;
}

const useCreateStockOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(({ code, bidPrice, quantity, orderType, orderDate }: UseCreateStockOrderProps) =>
    createStockOrder(code, {
      bidPrice,
      quantity,
      orderType,
      orderDate
    }), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.OWN_STOCKS);
      queryClient.invalidateQueries(QUERY_KEYS.STOCK_ORDER_HISTORIES);
      queryClient.invalidateQueries(QUERY_KEYS.CURRENT_BALANCE);
    },
    mutationKey: MUTATION_KEYS.CREATE_STOCK_ORDER,
  });
};

export default useCreateStockOrder;