import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Colors } from "../constants/styles";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

const { primary500, primary100 } = Colors;

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

export default AuthenticatedStack;
