import AuthContent from "../components/Auth/AuthContent";
import { useAuthContext } from "../context/auth.context";
import { loginUser } from "../api/auth";
import { useState } from "react";

function LoginScreen() {
  const { isLogin, setIsLogin } = useAuthContext();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // LOGIN A USER
  async function handleLogin(email: string, password: any) {
    const user = {
      email,
      password,
    };
    setIsAuthenticated(true);
    await loginUser(user);
    setIsAuthenticated(false);
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
