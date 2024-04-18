import { useMutation, useQueryClient } from "react-query"
import QUERY_KEYS, { MUTATION_KEYS } from "../../constants/queries";
import { CreateCommentRequest, createComment } from "../../api/comment";

interface UseCreateCommentProps extends CreateCommentRequest {
  code: string;
}

const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation(({ code, content }: UseCreateCommentProps) =>
    createComment(code, {
      content
    }), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.COMMENTS);
    },
    mutationKey: MUTATION_KEYS.CREATE_COMMENT,
  });
};

export default useCreateComment;