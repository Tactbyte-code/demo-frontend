import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getQueries } from "../api/validate.api";

export const useGetQueries = (userId, page = 1, pageSize = 10) => {
    return useQuery({
        queryKey: ["validate-queries", userId, page, pageSize],
        queryFn: ()=>getQueries(page, pageSize),
        enabled: !!userId,
        placeholderData: keepPreviousData, // Keeps previous page data on screen while fetching the next so that skeleton loaders don't show
        staleTime: 60 * 1000,
    });
}