import { useMutation, useQueryClient } from "react-query"
import QUERY_KEYS, { MUTATION_KEYS } from "../../constants/queries";
import { restartSimulation } from "../../api/simulation";

const useRestartSimulation = () => {
  const queryClient = useQueryClient();

  return useMutation(() =>
    restartSimulation(), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.SIMULATION_DATE);
    },
    mutationKey: MUTATION_KEYS.RESTART_SIMULATION,
  });
};

export default useRestartSimulation;
