import { useQuery } from "@tanstack/react-query";
import { getPlaystoreQuery } from "../api/getPlaystoreQuery";

export const useGetPlaystoreQuery = (queryId) => {
    return useQuery({
        queryKey: ["play-query", queryId],
        queryFn: () => getPlaystoreQuery(queryId),
        staleTime: 5 * 60 * 1000,
    });
};