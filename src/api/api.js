import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = "https://backend.eduon.uz/";
// eslint-disable-next-line react-hooks/rules-of-hooks
export const API_VERSION = "backoffice";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  function (config) {
    config.headers = {
      ...config.headers,
      Authorization: "Bearer " + cookies.get("access_token"),
    };
    // you can also do other modification in config
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    if (
      (response && response.data && response.status === 200) ||
      response.status === 201 ||
      response.status === 202
    ) {
      return response.data;
    }
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config) {
      // eslint-disable-next-line no-unused-expressions
      try {
        let response = await axios.post(`${API_URL}token/refresh/`, {
          refresh: cookies.get("refreshToken"),
        });
        cookies.set("access_token", response.data.access, { path: "/" });
        return await api.request(originalRequest);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log("Не авторизован");
      }
    }
    throw error;
  }
);
