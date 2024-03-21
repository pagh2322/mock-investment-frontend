import React, { useState } from "react";
import { useCookies } from "react-cookie";

interface AuthContextValue {
  isLogin: () => boolean;
  // setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext<AuthContextValue>({} as AuthContextValue);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
  const isLogin = () => {
    return cookies.Authorization !== undefined;
  }

  return <AuthContext.Provider value={{ isLogin }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
