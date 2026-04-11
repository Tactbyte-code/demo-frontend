import api from "@/lib/axios";

export const getQuery = async (queryId) => {
    const response = await api.get(`/reddit/query/${queryId}`);
    // console.log('tanstack query: ', response);

    return response?.data;
};