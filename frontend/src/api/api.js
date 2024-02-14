import axios from "axios";
const apiUrl = "http://192.168.11.2:30000/MAYAGPT/";

const apiNewMarko = axios.create({
  baseURL: apiUrl,
  // withCredentials: true,
  responseType: "json",
  paramsSerializer: {
    indexes: null,
    encode: (param) => encodeURIComponent(param).replaceAll("%24", "$"),
  },
});

apiNewMarko.interceptors.request.use((config) => {
  config.headers.Accept = `application/json`;

  return config;
});

export default apiNewMarko;
