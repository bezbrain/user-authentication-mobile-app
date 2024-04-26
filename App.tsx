import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import { AuthProvider, useAuthContext } from "./context/auth.context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();

// AUTHENTICATION SCREENS
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

// AUTHENTICATED SCREENS
function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

// CONDITIONAL RENDERING OF SCREENS
function Navigation() {
  const { authToken } = useAuthContext();

  return (
    <NavigationContainer>
      {!authToken ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

// SET TOKEN IN THIS COMPONENT
function Root() {
  const { setAuthToken } = useAuthContext();

  const [isTryingLogin, setIsTryingLogin] = useState(true);

  // Authomatically login a user if auth token is in AsyncStorage
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token"); // This will return promise

      if (storedToken) {
        setAuthToken(storedToken);
      }

      setIsTryingLogin(false); // If user has or has not been automatically logged in, set to false
    }
    fetchToken();
  }, []);

  // This is to make sure that if a user was initially logged in and the app is reaccessed, the delay caused by useEffect does not make the login in page show before the expected page if a user is logged in
  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <AuthProvider>
        <Root />
      </AuthProvider>
    </>
  );
}
