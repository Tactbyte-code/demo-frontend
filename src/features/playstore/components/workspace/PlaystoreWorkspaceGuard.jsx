"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function PlaystoreWorkspaceGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);

    // Only the report page requires authentication.
    const isProtectedRoute = /^\/playstore\/analysis\/[^/]+\/report$/.test(pathname);

    useEffect(() => {
        if (loading) return;

        if (!user && isProtectedRoute) {
            router.replace("/playstore/analysis");
        }
    }, [user, loading, isProtectedRoute, router]);

    // Show only a loading spinner while authentication is resolving.
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E5F5E9] border-t-[#188038]" />
            </div>
        );
    }

    // Prevent protected content from briefly appearing before redirect.
    if (!user && isProtectedRoute) return null;

    return children;
}
