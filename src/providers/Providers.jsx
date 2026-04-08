"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

export function Providers({ children }) {

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 min → no refetch till this time -> // ms → sec → min → hr
                cacheTime: 10 * 60 * 1000, // 10 min -> data will be stored in the cache till this time
                retry: 2,
                refetchOnWindowFocus: false, // optional (good for dashboards)            
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem={false}
                disableTransitionOnChange={true}
                themes={['light', 'dark']}
                storageKey="theme"
            >
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
}