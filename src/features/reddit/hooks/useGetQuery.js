import { useQuery } from "@tanstack/react-query";
import { getQuery } from "../api/getQuery";

export const useGetQuery = (queryId) => {
    return useQuery({
        queryKey: ["query", queryId],
        queryFn: () => getQuery(queryId),
        staleTime: 5 * 60 * 1000,
    });
};