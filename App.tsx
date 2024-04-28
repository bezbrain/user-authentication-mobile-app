import "react-native-gesture-handler";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuthContext } from "./context/auth.context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigation from "./navigations/navigate";
// import AppLoading from "expo-app-loading";

// const Stack = createNativeStackNavigator();

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
