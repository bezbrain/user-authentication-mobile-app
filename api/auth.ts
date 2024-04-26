import axios from "axios";

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

    return data;
  } catch (error: any) {
    console.log(error);
    console.log(error.response.data.message);
  }
};
