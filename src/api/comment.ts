import fetcher from "./util/fetcher";
import extractDataFromAxios from "./util/extractor";

export interface GetCommentsResponse {
  comments: GetCommentResponse[];
};

export interface GetCommentResponse {
  id: number;
  nickname: string;
  content: string;
  likeCount: number;
  liked: boolean;
  updated: boolean;
  blocked: boolean;
  replies: GetReplyResponse[];
  createdAt: string;
};

export interface GetReplyResponse {
  id: number;
  nickname: string;
  content: string;
  likeCount: number;
  liked: boolean;
  updated: boolean;
  blocked: boolean;
  createdAt: string;
}

export const requestGetComments = (code: string) =>
  extractDataFromAxios<GetCommentsResponse>(fetcher.get(`/stocks/${code}/comments`));

export interface CreateCommentRequest {
  content: string;
}

export const createComment = (code: string, body: CreateCommentRequest) =>
  extractDataFromAxios<void>(fetcher.post(`/stocks/${code}/comments`, body));

export const createReply = (commentId: number, body: CreateCommentRequest) =>
extractDataFromAxios<void>(fetcher.post(`/comments/${commentId}/reply`, body));

export interface CreateCommentReportRequest {
  message: string;
}

export const createCommentReport = (id: number, body: CreateCommentReportRequest) =>
  extractDataFromAxios<void>(fetcher.post(`/comments/${id}/report`, body));

export interface CommentLikeResponse {
  likeCount: number;
  liked: boolean;
}

export const toggleCommentLike = (commentId: number) =>
  extractDataFromAxios<CommentLikeResponse>(fetcher.put(`/comments/${commentId}/like`));