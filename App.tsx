import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import { AuthProvider, useAuthContext } from "./context/auth.context";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStack from "./navigations/authStack";
import AuthenticatedStack from "./navigations/authenticatedStacks";
// import AppLoading from "expo-app-loading";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

interface NavigationProps {
  isTryingLogin: boolean;
  setIsTryingLogin: Dispatch<SetStateAction<boolean>>;
}

// CONDITIONAL RENDERING OF SCREENS
function Navigation({ isTryingLogin, setIsTryingLogin }: NavigationProps) {
  const { authToken } = useAuthContext();

  // HANDLE INTIAL SCREEN DISPLAY WHEN ALL FONTS HAVE NOT BEEN LOADED
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.warn(error);
      } finally {
        setIsTryingLogin(false);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!isTryingLogin) {
      // This tells the splash screen to hide immediately!
      await SplashScreen.hideAsync();
    }
  }, [isTryingLogin]);

  // This is to make sure that if a user was initially logged in and the app is reaccessed, the delay caused by useEffect does not make the login in page show before the expected page if a user is logged in
  if (isTryingLogin) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
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

  return (
    <Navigation
      isTryingLogin={isTryingLogin}
      setIsTryingLogin={setIsTryingLogin}
    />
  );
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
