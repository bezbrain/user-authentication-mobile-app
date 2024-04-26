import { Alert, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../context/auth.context";

function WelcomeScreen() {
  const navigation = useNavigation();

  const { logout, setIsLogin } = useAuthContext();

  function handleLogout() {
    Alert.alert("Logout Alert!", "Are you sure you want to logout?", [
      { text: "Cancel" },
      { text: "Yes", onPress: logout },
    ]);
    setIsLogin(true);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AntDesign
          name="logout"
          size={24}
          color="#ccc"
          onPress={handleLogout}
        />
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
