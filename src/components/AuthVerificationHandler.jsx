"use client";

import { useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AuthVerificationHandler() {
    const router = useRouter();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) return;

            if (user?.emailVerified) {
                const storedUser = localStorage.getItem("user");
                if (storedUser) return;

                // Only handle email signups — Google users won't have pending_signup
                const pendingSignup = localStorage.getItem("pending_signup");
                console.log('pending sign up: ', pendingSignup);

                if (!pendingSignup) return;

                try {
                    console.log('Entered the functon');

                    const userData = JSON.parse(pendingSignup);
                    const token = await user.getIdToken(true);

                    console.log("Sending to backend:", userData);

                    const response = await fetch(`${apiUrl}/auth/email-signup`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(userData)
                    });

                    if (response?.ok) {
                        const data = await response.json();
                        console.log("User saved to DB:", data);

                        // localStorage.setItem("token", token);
                        localStorage.setItem("user", JSON.stringify({
                            id: data.id,
                            email: data.email,
                            firebase_uid: data.firebase_uid,
                            full_name: data.full_name,
                            photo_url: data.photo_url
                        }));

                        // Clean up pending data
                        localStorage.removeItem("pending_signup");
                        localStorage.removeItem("pending_password");

                        // Notify Navbar to update
                        window.dispatchEvent(new Event("userUpdated"));

                        router.refresh();
                    }
                } catch (err) {
                    console.error("Error saving user after verification:", err);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    return null;
}