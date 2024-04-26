import { SetStateAction, useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../ui/Button";
import Input from "./Input";

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: any;
  credentialsInvalid: any;
}

function AuthForm(
  this: any,
  { isLogin, onSubmit, credentialsInvalid }: AuthFormProps
) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [username, setUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    username: lessThanThree,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  // DYNAMICALLLY COLLECT INPUT VALUES
  function updateInputValueHandler(
    inputType: any,
    enteredValue: SetStateAction<string>
  ) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "username":
        setUsername(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  // FUNCTION TO PASS THE INPUT VALUES TO OTHER COMPONENTS
  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      username: username,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Username"
            onUpdateValue={updateInputValueHandler.bind(this, "username")}
            value={username}
            // keyboardType=""
            isInvalid={lessThanThree}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  form: {
    //
  },
});
