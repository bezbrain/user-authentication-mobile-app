import axios from "axios";
import baseUrl from "../utils/config";

// REGISTER A USER
export const registerUser = async (user: Object) => {
  const { data } = await axios.post(`${baseUrl.baseUrl}/register`, user);
  return data;
};

// LOGIN A USER
export const loginUser = async (user: Object) => {
  const { data } = await axios.post(`${baseUrl.baseUrl}/login`, user);
  return data;
};
