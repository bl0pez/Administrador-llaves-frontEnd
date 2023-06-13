import axios from "axios";

export const keyApi = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}` || "",
    }
});