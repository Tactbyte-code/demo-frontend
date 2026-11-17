"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer({ children }) {
    const setAuthState = useAuthStore((state) => state.setAuthState);
    const setAuthError = useAuthStore((state) => state.setAuthError);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (firebaseUser) => {
                setAuthState(firebaseUser);
            },
            (error) => {
                console.error("Firebase auth state error: ", error);
                setAuthError(error);
            }
        );

        return () => unsubscribe();
    }, [setAuthState, setAuthError]);

    return children;
}