import axios from "axios";

export const registerUser = async (user: Object) => {
  try {
    const { data } = await axios.post(
      `https://minimag.onrender.com/register`,
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
      `https://minimag.onrender.com/register`,
      user
    );
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
