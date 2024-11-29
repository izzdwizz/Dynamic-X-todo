import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1",

  timeout: 300000,
});

export default API;
