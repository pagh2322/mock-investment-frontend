import { useQuery, useQueryClient } from "react-query";
import QUERY_KEYS from "../../constants/queries"
import { AxiosError } from "axios";
import { GetSimulationDateResponse, requestGetCurrentSimulationDate } from "../../api/simulation";

const useCurrentSimulationDate = () => {
  const queryClient = useQueryClient();

  return useQuery<GetSimulationDateResponse, AxiosError>(
    [QUERY_KEYS.SIMULATION_DATE],
    () => requestGetCurrentSimulationDate(),
    {
      onSuccess: (data: GetSimulationDateResponse) => {
        queryClient.invalidateQueries(QUERY_KEYS.STOCK_VALUES_RANKING);
        localStorage.setItem("simulationDate", data.date);
      },
    }
  );
}

export default useCurrentSimulationDate;