import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateContext } from '@/features/validate/api/validate.api'; // Adjust path if needed

export const useGenerateContext = () => {
    const queryClient = useQueryClient();

    return useMutation({
        // The mutation function receives the queryId passed when you call the hook
        mutationFn: (queryId) => generateContext(queryId),

        // data = the API response, variables = the queryId passed in
        onSuccess: (data, queryId) => {
            // Invalidate the specific query's details so the UI fetches the fresh context
            // Make sure this key matches whatever you use in your GET hook for a single query!
            queryClient.invalidateQueries({ queryKey: ['validate-query', queryId] });

            // If this action changes the status shown in the list page, invalidate the list too:
            // queryClient.invalidateQueries({ queryKey: ['queries'] });
        },
    });
};