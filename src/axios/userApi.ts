import axios from "axios";
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
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
export default userApi;
