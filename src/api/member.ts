import fetcher from "./util/fetcher";
import extractDataFromAxios from "./util/extractor";

export interface UpdateNicknameRequest {
  nickname: string;
};

export const updateNickname = (body: UpdateNicknameRequest) =>
  extractDataFromAxios<UpdateNicknameRequest>(fetcher.post(`/member/me/nickname`, body));
  