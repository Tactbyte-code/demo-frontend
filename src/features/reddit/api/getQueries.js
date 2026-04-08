import api from "@/lib/axios";

export const getQueries = async () => {
    const response = await api.get("/reddit/queries");
    console.log('queries: ', response?.data);
    return response?.data;
};