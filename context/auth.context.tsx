import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AppContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(true);

  const [authToken, setAuthToken] = useState("");

  // SAVE TOKEN IN A STATE AND ON THE DEVICE
  function authenticate(token: string) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
    // console.log(token);
  }

  function logout() {
    setAuthToken("");
    AsyncStorage.removeItem("token");
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
