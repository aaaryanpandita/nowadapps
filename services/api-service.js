import axios from "axios";

// export const baseUrl = `http://172.16.16.206:8083`; //Akash
export const baseUrl = `https://nowa-ref-api.tarality.io`;

const api = axios.create({
  baseURL: `${baseUrl}/api/v1`,
});

export default api;

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
