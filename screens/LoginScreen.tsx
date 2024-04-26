import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { useAuthContext } from "../context/auth.context";
import { loginUser } from "../api/auth";

function LoginScreen() {
  const { isLogin, setIsLogin } = useAuthContext();

  async function handleLogin(email: string, password: any) {
    const user = {
      email,
      password,
    };
    console.log("Loading...");
    await loginUser(user);
    // console.log(`return ${data}`);

    console.log("Completed");
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
