import React, { useState } from "react";

interface AuthContextValue {
  credential: string;
  setCredential: React.Dispatch<React.SetStateAction<string>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext<AuthContextValue>({} as AuthContextValue);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [credential, setCredential] = useState(localStorage.getItem("credential") ?? "");
  const [isLogin, setIsLogin] = useState(() => {
    if (credential) {
      return true;
    }
    return false;
  });

  return <AuthContext.Provider value={{ credential, setCredential, isLogin, setIsLogin }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
