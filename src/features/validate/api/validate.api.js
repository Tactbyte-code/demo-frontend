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

export const generateSummary = async (queryId) => {
    const response = await api.post(`/validate/query/${queryId}/generate-summary`);
    return response?.data;
};

export const getStatus = async (queryId) => {
    const response = await api.get(`/validate/query/${queryId}/status`);
    return response?.data;
};

export const getSummary = async (queryId) => {
    const response = await api.get(`/validate/query/${queryId}/summary`);
    return response?.data;
};

export const getQueries = async (page = 1, pageSize = 10) => {
    const response = await api.get(`/validate/query?page=${page}&page_size=${pageSize}`);
    if (response.statusText !== 'OK') throw new Error('Failed to fetch queries');
    return response?.data;
};