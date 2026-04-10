import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/getPosts";

export const useGetPosts = (queryId) => {
    return useQuery({
        queryKey: ["posts", queryId],
        // enabled: !!userId, // 🔥 important (wait until user exists)
        queryFn: () => getPosts(queryId),
    });
};