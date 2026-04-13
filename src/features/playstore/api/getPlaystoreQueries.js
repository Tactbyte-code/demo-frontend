import api from "@/lib/axios";

export const getPlaystoreQueries = async () => {
    const response = await api.get("/playstore/queries");
    console.log('play queries: ', response?.data);
    return response?.data;
};