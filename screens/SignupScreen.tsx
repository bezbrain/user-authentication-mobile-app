import { useState } from "react";
import { registerUser } from "../api/auth";
import AuthContent from "../components/Auth/AuthContent";
import { useAuthContext } from "../context/auth.context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

function SignupScreen() {
  const { isLogin, setIsLogin } = useAuthContext();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const navigation: any = useNavigation();

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
    try {
      const data = await registerUser(user);
      // console.log(data);
      Alert.alert("Successful", `${data.message}`);
    } catch (error: any) {
      // console.log(error);
      Alert.alert("Authentication failed", `${error.response.data.message}`);
    }
    setIsAuthenticating(false);
    navigation.replace("Login");
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
