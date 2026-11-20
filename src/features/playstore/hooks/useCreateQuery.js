import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuery } from "../api/playstore.api";

export const useCreateQuery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createQuery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['play-queries'] });
        },
    });
};