import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ── Email Login ───────────────────────────────────────────
export async function emailLoginFn({ email, password }) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();

    const res = await fetch(`${API_URL}/auth/email-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ firebase_uid: user.uid, full_name: user.displayName, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Login failed");
    return data;
}

// ── Email Login — onError ─────────────────────────────────
// Needs the current email value so it's a factory function
export function makeLoginErrorHandler(email) {
    return async (err) => {
        const code = err?.code || "";
        if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
            const check = await fetch(`${API_URL}/auth/check-provider`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (check.ok) {
                const { provider } = await check.json();
                if (provider === "google") {
                    throw new Error("This account uses Google Sign-In. Please use 'Continue with Google'.");
                }
            }
            throw new Error("Incorrect password. Please try again.");
        }
        if (code === "auth/user-not-found") throw new Error("No account found with this email.");
        if (code === "auth/too-many-requests") throw new Error("Too many attempts. Please try again later.");
        throw err;
    };
}

// ── Google Login ──────────────────────────────────────────
export async function googleLoginFn() {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const token = await user.getIdToken();

    const res = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
            firebase_uid: user.uid,
            full_name: user.displayName,
            email: user.email,
            photo_url: user.photoURL,
        }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Google login failed");
    return data;
}

// ── Send OTP ──────────────────────────────────────────────
export async function sendOTPFn(email) {
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Failed to send OTP");
    return data;
}

// ── Verify OTP ────────────────────────────────────────────
export async function verifyOTPFn({ email, otp }) {
    const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Invalid OTP");
    return data;
}

// ── Reset Password ────────────────────────────────────────
export async function resetPasswordFn({ resetToken, newPassword }) {
    const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset_token: resetToken, new_password: newPassword }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Password reset failed");
    return data;
}