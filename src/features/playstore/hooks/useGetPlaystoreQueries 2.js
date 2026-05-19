import { useQuery } from "@tanstack/react-query";
import { getPlaystoreQueries } from "../api/getPlaystoreQueries";

export const useGetPlaystoreQueries = (userId) => {
    return useQuery({
        queryKey: ["play-queries", userId],
        queryFn: getPlaystoreQueries,
    });
};