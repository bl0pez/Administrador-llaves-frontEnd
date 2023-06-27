import axios from "axios";

export const keyApi = axios.create({
    baseURL: import.meta.env.VITE_URL_BACKEND as string,
    headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}` || "",
    }
});

keyApi.interceptors.request.use(
    (config) => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}` || "";
        return config;
    }
);

