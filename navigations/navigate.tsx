import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { useAuthContext } from "../context/auth.context";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./authStack";
import AuthenticatedStack from "./authenticatedStacks";

interface NavigationProps {
  isTryingLogin: boolean;
  setIsTryingLogin: Dispatch<SetStateAction<boolean>>;
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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
        // setIsTryingLogin(false);
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

export default Navigation;
