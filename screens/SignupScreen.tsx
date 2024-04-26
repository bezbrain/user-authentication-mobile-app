import { useState } from "react";
import { registerUser } from "../api/auth";
import AuthContent from "../components/Auth/AuthContent";
import { useAuthContext } from "../context/auth.context";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function SignupScreen() {
  const { isLogin, setIsLogin } = useAuthContext();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // SIGN UP A USER
  async function handleSignUp(
    email: string,
    username: string,
    password: string,
    confirmPassword: string
  ) {
    const user = {
      email,
      username,
      password,
      retypePassword: confirmPassword,
    };
    setIsAuthenticating(true);
    await registerUser(user);
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <AuthContent
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      handleAuth={handleSignUp}
    />
  );
}

export default SignupScreen;
