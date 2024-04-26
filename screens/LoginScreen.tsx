import AuthContent from "../components/Auth/AuthContent";
import { useAuthContext } from "../context/auth.context";
import { loginUser } from "../api/auth";
import { useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";

function LoginScreen() {
  const { isLogin, setIsLogin, authenticate, authToken } = useAuthContext();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // LOGIN A USER
  async function handleLogin(email: string, password: any) {
    const user = {
      email,
      password,
    };
    setIsAuthenticated(true); // Initiate loading state
    try {
      const data = await loginUser(user);
      // console.log(data.token);
      Alert.alert("Successful", `${data.message}`);
      authenticate(data.token); // Save token in a state
    } catch (error: any) {
      // console.log(error);
      Alert.alert("Authentication failed", `${error.response.data.message}`);
    }

    setIsAuthenticated(false); // Stop loading state
  }

  // LOADING COMPONENT
  if (isAuthenticated) {
    return <LoadingOverlay message="Logging in user..." />;
  }

  return (
    <AuthContent
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      handleAuth={handleLogin}
    />
  );
}

export default LoginScreen;
