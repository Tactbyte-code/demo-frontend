import { useQuery } from "@tanstack/react-query";
import { getQueries } from "../api/getQueries";

export const useGetQueries = (userId) => {
    return useQuery({
        queryKey: ["reddit-queries", userId],
        queryFn: getQueries,
        staleTime: 60 * 1000, //1min
    });
};