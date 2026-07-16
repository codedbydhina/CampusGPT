import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

apiClient.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        console.log("Interceptor Token:", token);
        console.log("Request URL:", config.url);

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        console.log("Headers:", config.headers);

        return config;

    },

    (error) => Promise.reject(error)

);

export default apiClient;