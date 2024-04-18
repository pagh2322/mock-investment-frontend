import { Stack } from "react-bootstrap";
import { faReply, faFlag, faThumbsUp as faSFaThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as farFaThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { GetCommentResponse } from "../../../../../../api/comment";
import { useState } from "react";
import CommentInput from "../CommentInput";
import DateLabel from "../../../../../../components/DateLabel";
import useToggleCommentLike from "../../../../../../hooks/comment/useToggleCommentLike";
import * as Styled from "./index.styles";

export interface CommentListItemPrpos {
  code: string;
  comment: GetCommentResponse;
}

const Header = (props: { nickname: string, date: string }) => {
  return (
    <Stack gap={2} direction="horizontal" style={{ alignItems: "end" }}>
      <Styled.Nickname>{props.nickname}</Styled.Nickname>
      <DateLabel date={props.date} />
    </Stack>
  );
};

const CommentLike = (props: { id: number, likeCount: number, liked: boolean }) => {
  const { mutate: toggleLike } = useToggleCommentLike();
  return (
    <Styled.CommentLike onClick={() => toggleLike({ commentId: props.id })}>
      <Styled.LikeIcon icon={props.liked ? faSFaThumbsUp : farFaThumbsUp} />
      <span>{props.likeCount}</span>
    </Styled.CommentLike>
  )
};

const CommentReport = (props: { commentId: number }) => {
  return (
    <Styled.CommentReport>
      <Styled.ReportIcon icon={faFlag} />
      <span>Report</span>
    </Styled.CommentReport>
  );
}

const CommentListItem = (props: CommentListItemPrpos) => {
  const comment = props.comment;
  const [showCommentInput, setShowCommentInput] = useState(false);

  return (
    <Stack gap={1}>
      <Header nickname={comment.nickname} date={comment.createdAt} />
      <Styled.CommentContent>{comment.content}</Styled.CommentContent>
      <Stack gap={3} direction="horizontal">
        <Styled.Reply onClick={() => setShowCommentInput(!showCommentInput)}>
          <Styled.ReplyIcon icon={faReply}/>
          <span>Reply</span>
        </Styled.Reply>
        
        <CommentLike id={comment.id} likeCount={comment.likeCount} liked={comment.liked} />
        <CommentReport commentId={comment.id} />
      </Stack>

      {comment.replies.map((reply) => (
        <Styled.ReplyContainer gap={1} key={reply.id}>
          <Header nickname={reply.nickname} date={reply.createdAt} />
          <Styled.CommentContent>{reply.content}</Styled.CommentContent>
          <Stack gap={3} direction="horizontal">
            <CommentLike id={reply.id} likeCount={reply.likeCount} liked={reply.liked} />
            <CommentReport commentId={reply.id} />
          </Stack>
        </Styled.ReplyContainer>
      ))}
      <CommentInput commentId={comment.id} code={props.code} visible={showCommentInput} isReply={true}/>
    </Stack>
  );
};

export default CommentListItem;