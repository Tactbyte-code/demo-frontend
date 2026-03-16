"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
    return (
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
    );
}