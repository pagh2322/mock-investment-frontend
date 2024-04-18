import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useCreateComment from "../../../../../../hooks/comment/useCreateComment";
import useCreateReply from "../../../../../../hooks/comment/useCreateReply";

interface CommentInputProps {
  commentId?: number;
  code: string;
  visible: boolean;
  isReply: boolean;
}

const CommentInput = (props: CommentInputProps) => {
  const [content, setContent] = useState("");
  const { mutate: submit } = useCreateComment();
  const { mutate: createReply } = useCreateReply();
  
  return (
    <div style={{ paddingTop: "12px", paddingBottom: "12px", display: props.visible ? "block" : "none", textAlign: "end" }}>
      <Form.Control
        as="textarea"
        type="text"
        value={content}
        onChange={(e) => {
          if (e.target.value.length <= 255) {
            setContent(e.target.value);
          }
        }}
        placeholder={`Write your thoughts about ${props.code}`}
        required
      />
      <Button variant="primary" onClick={() => {
        if (props.isReply) {
          createReply({ commentId: props.commentId!, content })
        } else {
          submit({ code: props.code, content });
        }
      }} style={{
        marginTop: "8px"
      }}>
        Submit
      </Button>
    </div>
  );
};

export default CommentInput;