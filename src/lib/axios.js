import axios from "axios";
import { getToken } from "@/lib/getToken";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, // Important: sends guest_session cookie
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
            } else {
                delete config.headers.Authorization;
            }
        } catch (error) {
            // Do not silently continue if Firebase token retrieval fails.
            return Promise.reject(error);
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

        if (status === 401) {
            console.error("Unauthorized:", message);
        } else if (status === 403) {
            console.error("Forbidden:", message);
        } else if (status === 404) {
            console.error("Not found:", message);
        } else if (status >= 500) {
            console.error("Server error:", message);
        }

        return Promise.reject(error);
    }
);

export default api;