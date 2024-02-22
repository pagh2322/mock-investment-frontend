import React, { useState } from "react";
import { useCookies } from "react-cookie";

interface AuthContextValue {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext<AuthContextValue>({} as AuthContextValue);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
  const [isLogin, setIsLogin] = useState(cookies.Authorization === undefined);

  return <AuthContext.Provider value={{ isLogin, setIsLogin }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
