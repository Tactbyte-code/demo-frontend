"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/lib/firebase";

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/onboarding", "/pricing", "/how-it-works", "/use-cases", "/resources", "/features"];

export default function AuthGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            const isPublic = PUBLIC_ROUTES.some(route =>
                route === "/"
                    ? pathname === "/"
                    : pathname === route || pathname.startsWith(route + "/")
            );

            if (!firebaseUser) {
                if (!isPublic) router.replace("/login");
                setChecking(false);
                return;
            }

            const storedUser = localStorage.getItem("user");
            if (!storedUser) {
                if (!isPublic) router.replace("/login");
                setChecking(false);
                return;
            }

            const user = JSON.parse(storedUser);

            if (!user.is_onboarded && pathname !== "/onboarding") {
                router.replace("/onboarding");
                setChecking(false);
                return;
            }

            if (user.is_onboarded && (pathname === "/login" || pathname === "/signup")) {
                router.replace("/dashboard");
                setChecking(false);
                return;
            }

            setChecking(false);
        });

        return () => unsubscribe();
    }, [pathname]);

    return (
        <AnimatePresence mode="wait">
            {checking ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="min-h-screen flex items-center justify-center bg-background"
                >
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </motion.div>
            ) : (
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};