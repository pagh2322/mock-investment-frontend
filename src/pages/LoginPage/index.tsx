import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/Auth";

const LoginPage = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
  const navigate = useNavigate();
  const authContextValue = useContext(AuthContext);
  return (
    <>
      <div>
        SNS 계정으로 로그인
      </div>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            if (res.credential !== undefined) {
              localStorage.setItem("credential", res.credential);
              authContextValue.setCredential(res.credential);
              authContextValue.setIsLogin(true);
              navigate('/');
            }
          }}
          onError={() => {
            console.log("login failed");
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default LoginPage;