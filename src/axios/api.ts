import axios from "axios";
const instance = axios.create({
  baseURL: "https://yymyxn-8080.csb.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
