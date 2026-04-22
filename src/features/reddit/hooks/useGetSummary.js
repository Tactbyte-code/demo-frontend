import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../api/getSummary";

export const useGetSummary = (queryId) => {
    return useQuery({
        queryKey: ["summary", queryId],
        queryFn: () => getSummary(queryId),
        staleTime: 5 * 60 * 1000,
    });
};