// export const baseUrl = `http://172.16.16.39:8081/`;
// export const baseUrl = `http://172.16.16.206:8081/`;
// export const baseUrl = `https://api-referral.tarality.io/`;
export const baseUrl = `https://api.referral.nowory.com/`;

import axios from "axios";
const api = axios.create({
  baseURL: baseUrl,
});

export default api;
