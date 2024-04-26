import AuthContent from "../components/Auth/AuthContent";
import { useAuthContext } from "../context/auth.context";

function SignupScreen() {
  const { isLogin, setIsLogin } = useAuthContext();

  return <AuthContent isLogin={isLogin} setIsLogin={setIsLogin} />;
}

export default SignupScreen;
