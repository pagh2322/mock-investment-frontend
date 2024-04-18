import { Stack } from "react-bootstrap";
import useComments from "../../../../hooks/comment/useComments";
import CommentInput from "./components/CommentInput";
import CommentListItem from "./components/CommentListItem";
import { FirstComment, ForumContainer } from "./index.styles";

export interface ForumProps {
  code: string;
};

const Forum = (props: ForumProps) => {
  const comments = (useComments({ code: props.code }).data?.comments ?? []).sort((o1, o2) => o2.id - o1.id);

  return (
    <ForumContainer>
      <CommentInput code={props.code} visible={true} isReply={false} />
      {comments.length === 0 ?
        <FirstComment>Write first comment about {props.code}</FirstComment> :
        comments.map((comment) => (
          <div key={comment.id}>
            <CommentListItem
              code={props.code}
              comment={comment}
            />
            <hr />
          </div>
        ))
      }
    </ForumContainer>
  );
}

export default Forum;