import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./context/auth.context";
import Root from "./navigations/rootStack";

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
