import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/getPosts";

export const useGetPosts = (queryId) => {
    return useQuery({
        queryKey: ["reddit-posts", queryId],
        queryFn: () => getPosts(queryId),
        staleTime: 5 * 60 * 1000,
    });
};