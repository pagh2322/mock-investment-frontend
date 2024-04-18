import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { COLORS } from "../../../../../../constants/colors";
import { Stack } from "react-bootstrap";

export const Nickname = styled.span`
  font-size: medium;
  font-weight: bold;
  color: ${COLORS.PRIMARY};
`;

export const CreateDateTime = styled.span`
  color: ${COLORS.SECONDAY};
  font-size: small;
`;

export const CommentContent = styled.div`
  color: ${COLORS.PRIMARY};
  font-size: medium;
`;

export const ReplyIcon = styled(FontAwesomeIcon)`
  color: ${COLORS.SECONDAY};
  font-size: medium;
  margin-right: 8px;
`;

export const Reply = styled.div`
  color: ${COLORS.SECONDAY};
  font-size: small;
  cursor: pointer;
`;

export const LikeIcon = styled(FontAwesomeIcon)`
  color: ${COLORS.SECONDAY};
  font-size: medium;
  margin-right: 8px;
`;

export const CommentLike = styled.div`
  color: ${COLORS.SECONDAY};
  font-size: small;
  cursor: pointer;
`;

export const ReportIcon = styled(FontAwesomeIcon)`
  color: ${COLORS.SECONDAY};
  font-size: medium;
  margin-right: 8px;
`;

export const CommentReport = styled.div`
  color: ${COLORS.SECONDAY};
  font-size: small;
  cursor: pointer;
`;

export const ReplyContainer = styled(Stack)`
  padding-left: 20px;
  padding-top: 8px;
`;