import { useQuery } from "@tanstack/react-query";
import { getReviews } from '../api/getReviews';

export const useGetReviews = (queryId) => {
    return useQuery({
        queryKey: ["play-reviews", queryId],
        queryFn: () => getReviews(queryId),
        staleTime: 5 * 60 * 1000,

    });
};
