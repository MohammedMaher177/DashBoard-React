import axios from "axios";
import Cookies from "js-cookie";

const axiosFetching = axios.create({
  baseURL: "https://be-dashboard.onrender.com/api/v1",
});

axiosFetching.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    // console.log(token);
    if (token) {
      config.headers["authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosFetching;
