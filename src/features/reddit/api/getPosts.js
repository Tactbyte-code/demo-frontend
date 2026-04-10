import api from "@/lib/axios";

export const getPosts = async (queryId) => {
    const response = await api.get(`/reddit/query/${queryId}/posts`);
    return response.data.posts;
};