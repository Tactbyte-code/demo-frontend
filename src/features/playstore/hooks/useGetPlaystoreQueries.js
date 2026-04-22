import { useQuery } from "@tanstack/react-query";
import { getPlaystoreQueries } from "../api/getPlaystoreQueries";

export const useGetPlaystoreQueries = (user_id) => {
    return useQuery({
        queryKey: ["play-queries", user_id],
        queryFn: getPlaystoreQueries,
        staleTime: 60 * 1000, //1min
    });
};