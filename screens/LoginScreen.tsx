import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { useAuthContext } from "../context/auth.context";

function LoginScreen() {
  const { isLogin, setIsLogin } = useAuthContext();

  return <AuthContent isLogin={isLogin} setIsLogin={setIsLogin} />;
}

export default LoginScreen;
