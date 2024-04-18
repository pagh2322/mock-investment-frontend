import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth";
import fetcher from "../../api/util/fetcher";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const authContextValue = useContext(AuthContext);
  
  return (
    <>
      <div>
        Login by
      </div>
      <a href="http://localhost:8080/oauth2/authorization/google">Google Login</a>
    </>
  );
};

export default LoginPage;