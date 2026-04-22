import api from "@/lib/axios";

export const getPlaystoreQuery = async (queryId) => {
    const response = await api.get(`/playstore/query/${queryId}`);
    // console.log('tanstack query: ', response);

    return response?.data;
};