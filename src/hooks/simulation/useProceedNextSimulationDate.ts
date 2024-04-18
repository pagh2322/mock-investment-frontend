import { useMutation, useQueryClient } from "react-query"
import QUERY_KEYS, { MUTATION_KEYS } from "../../constants/queries";
import { proceedSimulationDate } from "../../api/simulation";

const useProceedSimulationDate = () => {
  const queryClient = useQueryClient();

  return useMutation((length: number) =>
    proceedSimulationDate(length), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.SIMULATION_DATE);
      queryClient.invalidateQueries(QUERY_KEYS.OWN_STOCKS);
    },
    mutationKey: MUTATION_KEYS.PROCEED_SIMULATION_DATE,
  });
};

export default useProceedSimulationDate;
