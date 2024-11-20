import axios from "axios";
const instance = axios.create({
  baseURL: "https://zrnvxy-8080.csb.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
