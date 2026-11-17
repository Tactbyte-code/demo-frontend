"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function WorkspaceGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);

    // Guests can access the analysis list and individual analysis progress pages.
    const isGuestAllowedRoute =
        pathname === "/validate-idea/analysis" ||
        /^\/validate-idea\/analysis\/[^/]+$/.test(pathname);

    useEffect(() => {
        if (loading) return;

        if (!user && !isGuestAllowedRoute) {
            router.replace("/validate-idea/analysis");
        }
    }, [user, loading, isGuestAllowedRoute, router]);

    // Show only a loading spinner while authentication is resolving.
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" />
            </div>
        );
    }

    // Prevent protected content from briefly appearing before redirect.
    if (!user && !isGuestAllowedRoute) return null;

    return children;
}