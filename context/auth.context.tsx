import { ReactNode, createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(true);

  const [authToken, setAuthToken] = useState("");

  function authenticate(token: string) {
    setAuthToken(token);
  }

  function logout() {
    setAuthToken("");
  }

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        authToken,
        setAuthToken,
        authenticate,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AuthProvider need to be within the useAuthContext");
  }
  return context;
};
