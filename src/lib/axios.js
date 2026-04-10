import { getToken } from "@/utils/getToken";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    async (config) => {
        try {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.log("Failed to get token:", error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.detail || error.message;

        console.log('axios lib: ', error);

        if (status === 401) console.error("Unauthorized:", message);
        if (status === 404) console.error("Not found:", message);
        if (status === 500) console.error("Server error:", message);

        return Promise.reject(error);
    }
);

export default api;