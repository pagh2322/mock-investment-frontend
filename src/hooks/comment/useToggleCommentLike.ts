import { useMutation, useQueryClient } from "react-query"
import QUERY_KEYS, { MUTATION_KEYS } from "../../constants/queries";
import { CreateCommentRequest, createComment, createReply, toggleCommentLike } from "../../api/comment";

const useToggleCommentLike = () => {
  const queryClient = useQueryClient();

  return useMutation(({ commentId }: { commentId: number }) =>
    toggleCommentLike(commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.COMMENTS);
    },
    mutationKey: MUTATION_KEYS.TOGGLE_COMMENT_LIKE,
  });
};

export default useToggleCommentLike;