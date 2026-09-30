import { useQuery } from '@tanstack/react-query';
import { getSummary } from '@/features/validate/api/validate.api'; // Adjust the import path as needed

export const useGetSummary = (queryId) => {
    return useQuery({
        // The queryKey uniquely identifies this specific fetch in the cache
        queryKey: ['validate-query', queryId],
        queryFn: ()=>getSummary(queryId),
        
        // `enabled: !!queryId` ensures the request doesn't fire if the queryId is undefined 
        // (which often happens on the very first render in Next.js before the router is ready)
        enabled: !!queryId,
        
        // Optional: Keep the data fresh for a certain time before refetching in the background
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};