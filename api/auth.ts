import axios from "axios";
import { Alert } from "react-native";

// REGISTER A USER
export const registerUser = async (user: Object) => {
  const { data } = await axios.post(
    `https://minimag.onrender.com/api/v1/register`,
    user
  );
  return data;
};

// LOGIN A USER
export const loginUser = async (user: Object) => {
  const { data } = await axios.post(
    `https://minimag.onrender.com/api/v1/login`,
    user
  );
  return data;
};
