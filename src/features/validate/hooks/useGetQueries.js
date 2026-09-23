import { useQuery } from "@tanstack/react-query";
import { getQueries } from "../api/validate.api";

export const useGetQueries = (userId) => {
    return useQuery({
        queryKey: ["validate-queries", userId],
        queryFn: getQueries,
        staleTime: 60 * 1000,
    });
}