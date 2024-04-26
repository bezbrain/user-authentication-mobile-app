import { registerUser } from "../api/auth";
import AuthContent from "../components/Auth/AuthContent";
import { useAuthContext } from "../context/auth.context";

function SignupScreen() {
  const { isLogin, setIsLogin } = useAuthContext();

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
    console.log(user);

    console.log("Loading registration...");
    await registerUser(user);
    console.log("Registration Completed");
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
