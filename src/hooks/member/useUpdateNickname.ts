import { useMutation } from "react-query"
import { MUTATION_KEYS } from "../../constants/queries";
import { UpdateNicknameRequest, updateNickname } from "../../api/member";

const useUpdateNickname = () => {
  return useMutation(({ nickname }: UpdateNicknameRequest) =>
    updateNickname({ nickname }), {
    onSuccess: () => {},
    mutationKey: MUTATION_KEYS.UPDATE_NICKNAME,
  });
};

export default useUpdateNickname;
