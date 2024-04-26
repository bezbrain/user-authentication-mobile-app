import axios from "axios";
import { Alert } from "react-native";

export const registerUser = async (user: Object) => {
  try {
    const { data } = await axios.post(
      `https://minimag.onrender.com/api/v1/register`,
      user
    );
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (user: Object) => {
  try {
    const { data } = await axios.post(
      `https://minimag.onrender.com/api/v1/login`,
      user
    );
    console.log(data);
    Alert.alert("Successful", `${data.message}`);
    return data;
  } catch (error: any) {
    console.log(error);
    console.log(error.response.data.message);
    Alert.alert("Invalid Input", `${error.response.data.message}`);
  }
};
