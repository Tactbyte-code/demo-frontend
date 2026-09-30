import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createQuery } from '@/features/validate/api/validate.api';

export const useCreateQuery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload) => createQuery(payload),
        onSuccess: () => {
            // Invalidate the cache to trigger a refetch of the list on the same page
            // Note: Make sure this key matches exactly what you use in your useGetQueries hook!
            queryClient.invalidateQueries({ queryKey: ['validate-queries'] });
        },
    });
};