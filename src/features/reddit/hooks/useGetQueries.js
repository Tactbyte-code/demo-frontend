import { useQuery } from "@tanstack/react-query";
import { getQueries } from "../api/getQueries";

export const useGetQueries = (userId) => {
    return useQuery({
        queryKey: ["queries", userId],
        // enabled: !!userId, // 🔥 important (wait until user exists)
        queryFn: getQueries,
    });
};