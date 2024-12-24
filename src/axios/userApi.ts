import axios from "axios";
import { store } from "../redux/stores/store";
import { logoutUser } from "../redux/slice/user.slice";
import { message } from "antd";
const userApi = axios.create({
  baseURL: "https://api-ecom.duthanhduoc.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
export const userApiPrivate = axios.create({
  baseURL: "https://api-ecom.duthanhduoc.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
userApiPrivate.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = localStorage.getItem("token");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

userApiPrivate.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.status === 401) {
      store.dispatch(logoutUser({ email: "", id: "", token: "" }));
      window.location.href = "/";
      message.error("Try login again");
    }
    return Promise.reject(error);
  }
);
export default userApi;
