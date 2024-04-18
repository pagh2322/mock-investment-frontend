import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as Styled from "./index.styles";

interface LogoutProps {
  onClick: () => void;
}

const Logout = (props: LogoutProps) => {
  return (
    <Styled.Logout direction="horizontal">
      <span style={{ width: "100%" }}>Logout</span>
      <FontAwesomeIcon
        icon="chevron-right"
      />
    </Styled.Logout>
  );
};

export default Logout;