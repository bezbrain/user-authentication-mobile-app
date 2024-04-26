import { Dispatch, SetStateAction, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { loginUser, registerUser } from "../../api/auth";

interface AuthContentProps {
  isLogin?: boolean | undefined;
  onAuthenticate?: () => void;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

function AuthContent({
  isLogin,
  onAuthenticate,
  setIsLogin,
}: AuthContentProps) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    username: false,
    confirmPassword: false,
  });

  const navigation: any = useNavigation();

  // TOGGLE BETWEEN LOGIN AND REGISTER
  function switchAuthModeHandler() {
    if (isLogin) {
      // console.log(isLogin);
      setIsLogin(false);
      navigation.replace("Signup");
    } else {
      setIsLogin(true);
      // console.log(isLogin);
      navigation.replace("Login");
    }
  }

  // FUNCTION TO TRIGGER LOGIN OR SIGN UP
  async function submitHandler(credentials: any) {
    let { email, username, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const usernameMoreThanTwo = username > 2;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!usernameMoreThanTwo || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        username: !usernameMoreThanTwo,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    if (isLogin) {
      // Trigger login request
      const user = {
        email,
        password,
      };
      console.log("Loading...");
      await loginUser(user);
      // console.log(`return ${data}`);

      console.log("Completed");
    } else {
      // Trigger singup request
      const user = {
        email,
        username,
        password,
        retypePassword: confirmPassword,
      };
      console.log("Loading registration...");
      await registerUser(user);
      console.log("Registration Completed");
    }
    // onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
