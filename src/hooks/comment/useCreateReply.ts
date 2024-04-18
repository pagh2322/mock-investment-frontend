import { useMutation, useQueryClient } from "react-query"
import QUERY_KEYS, { MUTATION_KEYS } from "../../constants/queries";
import { CreateCommentRequest, createComment, createReply } from "../../api/comment";

interface UseCreateReplyProps extends CreateCommentRequest {
  commentId: number;
}

const useCreateReply = () => {
  const queryClient = useQueryClient();

  return useMutation(({ commentId, content }: UseCreateReplyProps) =>
    createReply(commentId, {
      content
    }), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.COMMENTS);
    },
    mutationKey: MUTATION_KEYS.CREATE_REPLY,
  });
};

export default useCreateReply;