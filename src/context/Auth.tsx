import React, { useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";

interface AuthContextValue {
  isLogin: boolean;
}

const AuthContext = React.createContext<AuthContextValue>({} as AuthContextValue);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
  const isLogin = () => {
    return cookies.Authorization !== undefined;
  }

  return <CookiesProvider>
      <AuthContext.Provider value={{ isLogin: isLogin() }}>{children}</AuthContext.Provider>
      </CookiesProvider>
};

export default AuthContext;
