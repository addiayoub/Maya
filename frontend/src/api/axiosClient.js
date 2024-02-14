import axios from "axios";
import { hostName } from "./config";

const axiosClient = axios.create({
  baseURL: hostName,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Accept = `application/json`;
  config.headers["Content-Type"] = "application/json";
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Access-Control-Allow-Headers"] =
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key";
  config.headers["Access-Control-Allow-Methods"] =
    "GET, HEAD, POST, PUT, DELETE, OPTIONS";
  return config;
});

export default axiosClient;
