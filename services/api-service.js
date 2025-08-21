import axios from "axios";

export const baseUrl = `https://nowa-ref-api.tarality.io`; //Akash
// export const baseUrl = `https://api-referral.tarality.io/`;
// export const baseUrl = `https://api.referral.nowory.com/`;

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
