import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuery } from "../api/reddit.api";

export const useCreateQuery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createQuery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reddit-queries'] });
        },
    });
};