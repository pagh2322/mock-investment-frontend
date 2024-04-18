import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./index.styles";

interface BackButtonProps {
  onClick: () => void;
};

const BackButton = (props: BackButtonProps) => {
  return (
    <Styled.BackIcon icon={faChevronLeft} onClick={props.onClick} />
  );
};

export default BackButton;