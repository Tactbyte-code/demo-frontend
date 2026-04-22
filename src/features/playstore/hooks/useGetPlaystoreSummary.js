import { useQuery } from "@tanstack/react-query";
import { getPlaystoreSummary } from "../api/getPlaystoreSummary";

export const useGetPlaystoreSummary = (queryId) => {
    return useQuery({
        queryKey: ["play-summary", queryId],
        queryFn: () => getPlaystoreSummary(queryId),
        staleTime: 5 * 60 * 1000,
    });
};