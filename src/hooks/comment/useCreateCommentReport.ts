import { useMutation, useQueryClient } from "react-query"
import QUERY_KEYS, { MUTATION_KEYS } from "../../constants/queries";
import { CreateCommentReportRequest, createCommentReport } from "../../api/comment";

interface UseCreateCommentReportProps extends CreateCommentReportRequest {
  id: number;
}

const useCreateCommentReport = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, message }: UseCreateCommentReportProps) =>
    createCommentReport(id, {
      message
    }), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.COMMENTS);
    },
    mutationKey: MUTATION_KEYS.CREATE_COMMENT_REPORT,
  });
};

export default useCreateCommentReport;