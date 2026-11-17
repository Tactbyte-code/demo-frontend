import api from "@/lib/axios";

export const createQuery = async (query) => {
    const response = await api.post("/reddit/query", {
        query,
    });

    return response.data;
};