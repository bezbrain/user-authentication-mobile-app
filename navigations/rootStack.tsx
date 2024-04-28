import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/auth.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigation from "./navigate";

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

export default Root;
