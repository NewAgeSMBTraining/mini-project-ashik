import axios from "axios";

const HTTP = axios.create({
  headers: { Accept: "*/*", "Content-Type": "application/json" },
  baseURL: "http://localhost:7777/api",
});

export default HTTP;
