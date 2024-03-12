import axios from "axios";

const getApiAddress = () => localStorage.getItem("apiAddress");

export const createApiConfig = () => {
  const apiConfig = axios.create({
    baseURL: `${getApiAddress()}/MAYAGPT/`,
    responseType: "json",
    paramsSerializer: {
      indexes: null,
      encode: (param) => encodeURIComponent(param).replaceAll("%24", "$"),
    },
  });

  apiConfig.interceptors.request.use((config) => {
    config.headers.Accept = `application/json`;
    return config;
  });

  return apiConfig;
};

const apiConfig = createApiConfig();

export default apiConfig;
