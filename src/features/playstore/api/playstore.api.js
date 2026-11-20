export const createQuery = async (body) => {
    const response = await api.post("/playstore/query", body);
    return response.data;
};