import axios from "../utils/customAxios";

const postLogin = (email, password) => {
  return axios.post("api/authentication", {
    email ,
    password,
  });
};

export { postLogin };
