import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth";
import * as Styled from "./index.styles";

const LoginPage = () => {
  const navigate = useNavigate();
  const authContextValue = useContext(AuthContext);
  
  return (
    <Styled.Container>
      <a href="http://localhost:8080/oauth2/authorization/google">Google Login</a>
    </Styled.Container>
  );
};

export default LoginPage;