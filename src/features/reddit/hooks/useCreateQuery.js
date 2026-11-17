import { useMutation } from "@tanstack/react-query";
import { createQuery } from "../api/reddit.api";

export const useCreateQuery = () => {
    return useMutation({
        mutationFn: createQuery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['validate-queries'] });
        },
    });
};