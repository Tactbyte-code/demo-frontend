import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../api/getSummary";

export const useGetSummary = (queryId) => {
    return useQuery({
        queryKey: ["summary", queryId],
        // enabled,
        queryFn: () => getSummary(queryId),
    });
};