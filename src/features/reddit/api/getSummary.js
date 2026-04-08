import api from "@/lib/axios";

export const getSummary = async (queryId) => {
    const response = await api.get(`/reddit/query/${queryId}/result`);
    return response.data;
};