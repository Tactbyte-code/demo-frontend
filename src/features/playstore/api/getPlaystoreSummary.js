import api from "@/lib/axios";

export const getPlaystoreSummary = async (queryId) => {
    const response = await api.get(`/playstore/query/${queryId}/result`);
    return response?.data;
};