import api from "@/lib/axios";

export const createQuery = async (payload) => {
    const response = await api.post("/validate/query", payload);
    return response?.data;
};

export const generateContext = async (queryId) => {
    const response = await api.post(`/validate/query/${queryId}/generate-context`);
    return response?.data;
};

export const triggerSearch = async (queryId) => {
    const response = await api.post(`/validate/query/${queryId}/search`);
    return response?.data;
};