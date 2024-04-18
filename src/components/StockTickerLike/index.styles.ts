import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const HeartIcon = styled(FontAwesomeIcon)<{ color: string }>`
  font-size: x-large;
  color: ${(props) => props.color};
  cursor: pointer;
`;