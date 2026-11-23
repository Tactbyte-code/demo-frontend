"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/axios";

export default function AuthInitializer({ children }) {
    const setAuthState = useAuthStore((state) => state.setAuthState);
    const setAuthError = useAuthStore((state) => state.setAuthError);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async (firebaseUser) => {
                if (!firebaseUser) {
                    setAuthState({
                        user: null,
                        firebaseUser: null,
                    });
                    return;
                }

                try {
                    const response = await api.get("/auth/me");

                    const backendUser = response.data?.user;

                    if (!backendUser?.id) {
                        throw new Error("Invalid backend user response");
                    }

                    setAuthState({
                        user: backendUser,
                        firebaseUser,
                    });

                    console.log("Auth initialized, user:", backendUser);
                    console.log("Auth initialized, firebaseUser:", firebaseUser);

                } catch (error) {
                    console.error(
                        "Authentication initialization failed:",
                        error
                    );

                    await auth.signOut();
                    setAuthError(error);
                }
            },
            async (error) => {
                console.error("Firebase auth state error:", error);
                setAuthError(error);
            }
        );

        return () => unsubscribe();
    }, [setAuthState, setAuthError]);

    return children;
}