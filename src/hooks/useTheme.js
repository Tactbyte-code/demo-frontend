"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useTheme() {
    const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return {
        theme,
        setTheme,
        resolvedTheme,
        systemTheme,
        isDark: mounted ? resolvedTheme === "dark" : false,
        isLight: mounted ? resolvedTheme === "light" : false,
        mounted,
        toggleTheme: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
    };
}