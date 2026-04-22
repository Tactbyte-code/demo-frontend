import api from "@/lib/axios";

export const getReviews = async (queryId) => {
    const response = await api.get(`/playstore/query/${queryId}/reviews`);
    console.log('play reviews: ', response);

    return response?.data?.reviews;
};