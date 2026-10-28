"use client";

import React, { useState } from 'react';
import {
    ArrowRight, ShieldCheck,
    Eye, EyeOff, AlertCircle, Loader2,
    Mail, CheckCircle2, KeyRound, Lock,
    ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';

const STEPS = { EMAIL: "email", OTP: "otp", PASSWORD: "password", DONE: "done" };

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ── Shared style helpers ──────────────────────────────────
const inputClass =
    "w-full h-12 rounded-md border text-[15px] font-medium outline-none transition-all " +
    "bg-[var(--surface-card)] border-[var(--border-solid)] text-[var(--text-main)] " +
    "placeholder:text-[var(--text-subtle)] " +
    "hover:border-[color-mix(in_srgb,var(--primary)_40%,var(--border-solid))] " +
    "focus:border-[var(--primary)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--primary)_15%,transparent)]";

const primaryBtnClass =
    "w-full h-12 rounded-lg font-semibold text-[15px] flex items-center justify-center gap-2 " +
    "transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer";

const primaryBtnStyle = {
    background: 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 70%, var(--accent)))',
    color: '#ffffff',
    boxShadow: '0 8px 24px -8px color-mix(in srgb, var(--primary) 60%, transparent)',
};

const ghostBtnClass =
    "w-full h-11 rounded-xl font-semibold text-sm transition-colors cursor-pointer " +
    "text-[var(--text-subtle)] hover:text-[var(--text-main)]";

// Turns raw Firebase errors into human-readable messages
const friendlyError = (msg) => {
    if (!msg) return undefined;
    if (msg.includes("auth/invalid-credential") || msg.includes("auth/wrong-password") || msg.includes("auth/user-not-found"))
        return "Incorrect email or password.";
    if (msg.includes("auth/too-many-requests")) return "Too many attempts. Please try again later.";
    if (msg.includes("auth/popup-closed-by-user")) return "Sign-in was cancelled.";
    if (msg.includes("auth/network-request-failed")) return "Network error. Check your connection.";
    return msg;
};

// ── Error banner ──────────────────────────────────────────
function ErrorBanner({ message }) {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-5 overflow-hidden"
                >
                    <div className="rounded-xl p-3.5 flex items-start gap-3"
                        style={{ backgroundColor: 'var(--destructive-bg)', border: '1px solid color-mix(in srgb, var(--destructive) 25%, transparent)', color: 'var(--destructive)' }}>
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <p className="text-[13px] font-medium leading-snug">{friendlyError(message)}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function LoginPage() {
    const router = useRouter();

    // ── Login state ───────────────────────────────────────
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // ── Forgot password state ─────────────────────────────
    const [showForgot, setShowForgot] = useState(false);
    const [forgotStep, setForgotStep] = useState(STEPS.EMAIL);
    const [forgotEmail, setForgotEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);

    // ── Helpers ───────────────────────────────────────────
    const saveUserAndRedirect = (data) => {
        localStorage.setItem("user", JSON.stringify({
            id: data.id,
            email: data.email,
            firebase_uid: data.firebase_uid,
            full_name: data.full_name,
            photo_url: data.photo_url,
            is_onboarded: data.is_onboarded,
        }));

        window.dispatchEvent(new Event("userUpdated"));
        router.replace(data?.is_onboarded ? "/dashboard" : "/onboarding");
    };

    const resetForgotFlow = () => {
        setShowForgot(false);
        setForgotStep(STEPS.EMAIL);
        setForgotEmail('');
        setOtp('');
        setResetToken('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    // ── Mutation: Email login ─────────────────────────────
    const loginMutation = useMutation({
        mutationFn: async ({ email, password }) => {
            try {
                // 1. Attempt Firebase Sign In
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const token = await user.getIdToken();

                // 2. Call Backend Login API
                const res = await fetch(`${API_URL}/auth/email-login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        firebase_uid: user.uid,
                        full_name: user.displayName,
                        email,
                        password
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.detail || "Login failed");
                }

                return data;

            } catch (err) {
                const code = err?.code || "";

                // 3. Handle Firebase credential errors
                if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
                    try {
                        const check = await fetch(`${API_URL}/auth/check-provider`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email }),
                        });

                        if (check.ok) {
                            const { provider } = await check.json();
                            if (provider === "google") {
                                throw new Error("An account with this email already exists using Google Sign-In. Please sign in using the 'Continue with Google' option.");
                            }
                        }
                    } catch (checkErr) {
                        if (checkErr.message === "An account with this email already exists using Google Sign-In. Please sign in using the 'Continue with Google' option.") {
                            throw checkErr;
                        }
                    }
                }

                throw err;
            }
        },
        onSuccess: (data) => saveUserAndRedirect(data),
        onError: (err) => {
            console.log('onError side-effect: ', err.message);
        },
    });

    // ── Mutation: Google login ────────────────────────────
    const googleMutation = useMutation({
        mutationFn: async () => {
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
                    photo_url: user.photoURL
                }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.detail || "Google login failed");
            return data;
        },
        onSuccess: (data) => saveUserAndRedirect(data),
    });

    // ── Mutation: Send OTP ────────────────────────────────
    const sendOTPMutation = useMutation({
        mutationFn: async (email) => {
            const res = await fetch(`${API_URL}/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "Failed to send OTP");
            return data;
        },
        onSuccess: () => setForgotStep(STEPS.OTP),
    });

    // ── Mutation: Verify OTP ──────────────────────────────
    const verifyOTPMutation = useMutation({
        mutationFn: async ({ email, otp }) => {
            const res = await fetch(`${API_URL}/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "Invalid OTP");
            return data;
        },
        onSuccess: (data) => {
            setResetToken(data.reset_token);
            setForgotStep(STEPS.PASSWORD);
        },
    });

    // ── Mutation: Reset password ──────────────────────────
    const resetPasswordMutation = useMutation({
        mutationFn: async ({ resetToken, newPassword }) => {
            const res = await fetch(`${API_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reset_token: resetToken, new_password: newPassword }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "Password reset failed");
            return data;
        },
        onSuccess: () => setForgotStep(STEPS.DONE),
    });

    const isLoading = loginMutation.isPending || googleMutation.isPending;

    return (
        <div className="min-h-screen grid lg:grid-cols-2 font-sans" style={{ backgroundColor: 'var(--background)' }}>

            {/* ── Brand panel (desktop only) ── */}
            <aside className="hidden lg:flex relative flex-col justify-end p-14 overflow-hidden h-full min-h-[600px]"
                style={{ background: 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 55%, var(--accent)))' }}>
                <button onClick={() => router.back()} aria-label="Go back"
                    className="absolute top-8 left-8 z-20 bg-white/80 hover:bg-white text-black flex items-center justify-center h-10 w-10 rounded-full border transition-colors border-white cursor-pointer"
                >
                    <ArrowLeft size={16} />
                </button>

                <div className="absolute inset-0 opacity-[0.15]"
                    style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '28px 28px' }} />
                <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-white/20 blur-3xl" />
                <div className="absolute -bottom-40 -right-24 w-[420px] h-[420px] rounded-full bg-black/20 blur-3xl" />

                {/* Brand Image Illustration for the Analysis Platform */}
                <div className="absolute top-0 inset-x-0 bottom-1/3 flex justify-center items-center pointer-events-none opacity-80 z-0 overflow-hidden select-none">
                    <motion.img
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 0.9, y: [0, -10, 0] }}
                        transition={{
                            opacity: { duration: 1.2, ease: "easeOut" },
                            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
                        }}
                        src="/images/login-img.png"
                        alt="Analysis report generation platform"
                        className="w-full h-full object-cover object-center mix-blend-screen"
                        style={{
                            maskImage: 'linear-gradient(to bottom, black 50%, transparent 85%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 85%)'
                        }}
                    />
                </div>

                <div className="relative text-white max-w-md z-10">
                    <h2 className="text-4xl font-bold tracking-tight leading-tight mb-4">
                        Intelligence at your fingertips.
                    </h2>
                    <p className="text-white/75 text-base mb-10">
                        Sign in to pick up right where you left off.
                    </p>
                    <ul className="space-y-4">
                        {["Fast, personalised experience", "Your data stays private and secure", "Works seamlessly across devices"].map(t => (
                            <li key={t} className="flex items-center gap-3 text-sm font-medium text-white/90">
                                <CheckCircle2 size={18} className="shrink-0" /> {t}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* ── Form column ── */}
            <main className="relative flex items-center justify-center px-6 py-12 sm:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-105"
                >
                    <div className="relative h-10 w-44 mb-10">
                        <Image src="/images/logo_with_text_2.png" alt="Logo" fill sizes="176px" className="object-contain object-left" priority />
                    </div>

                    <AnimatePresence mode="wait">

                        {/* ── Forgot Password Flow ──────────── */}
                        {showForgot ? (
                            <motion.div key="forgot"
                                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                                <AnimatePresence mode="wait">

                                    {/* Done */}
                                    {forgotStep === STEPS.DONE && (
                                        <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
                                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                                                style={{ backgroundColor: 'var(--success-bg)', border: '1px solid color-mix(in srgb, var(--success) 20%, transparent)' }}>
                                                <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--success)' }} />
                                            </div>
                                            <h3 className="text-2xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-main)' }}>Password reset</h3>
                                            <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
                                                Your password has been updated. You can now sign in.
                                            </p>
                                            <button onClick={resetForgotFlow}
                                                className="w-full h-12 rounded-xl border font-semibold text-[15px] transition-all cursor-pointer hover:border-[var(--primary)]"
                                                style={{ backgroundColor: 'var(--surface-card)', borderColor: 'var(--border-solid)', color: 'var(--text-main)' }}>
                                                Back to sign in
                                            </button>
                                        </motion.div>
                                    )}

                                    {/* Step 1: Email */}
                                    {forgotStep === STEPS.EMAIL && (
                                        <motion.div key="step-email" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <div className="mb-8">
                                                <h2 className="text-3xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-main)' }}>Reset password</h2>
                                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                    Enter your email and we'll send you a 6-digit code.
                                                </p>
                                            </div>
                                            <ErrorBanner message={sendOTPMutation.error?.message} />
                                            <form onSubmit={e => { e.preventDefault(); sendOTPMutation.mutate(forgotEmail); }} className="space-y-5">
                                                <div>
                                                    <label htmlFor="forgot-email" className="block text-[13px] font-semibold mb-2" style={{ color: 'var(--text-main)' }}>Email</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--text-subtle)' }} />
                                                        <input id="forgot-email" type="email" required autoComplete="email" placeholder="name@company.com"
                                                            value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                                                            className={`${inputClass} pl-11 pr-4`} />
                                                    </div>
                                                </div>
                                                <button type="submit" disabled={sendOTPMutation.isPending}
                                                    className={primaryBtnClass} style={primaryBtnStyle}>
                                                    {sendOTPMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send code <ArrowRight className="w-4 h-4" /></>}
                                                </button>
                                                <button type="button" onClick={resetForgotFlow} className={ghostBtnClass}>
                                                    ← Back to sign in
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* Step 2: OTP */}
                                    {forgotStep === STEPS.OTP && (
                                        <motion.div key="step-otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <div className="mb-8">
                                                <h2 className="text-3xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-main)' }}>Enter code</h2>
                                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                    We sent a 6-digit code to{' '}
                                                    <span className="font-semibold" style={{ color: 'var(--primary)' }}>{forgotEmail}</span>
                                                </p>
                                            </div>
                                            <ErrorBanner message={verifyOTPMutation.error?.message} />
                                            <form onSubmit={e => { e.preventDefault(); verifyOTPMutation.mutate({ email: forgotEmail, otp }); }} className="space-y-5">
                                                <div>
                                                    <label htmlFor="otp" className="block text-[13px] font-semibold mb-2" style={{ color: 'var(--text-main)' }}>6-digit code</label>
                                                    <div className="relative">
                                                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--text-subtle)' }} />
                                                        <input id="otp" type="text" inputMode="numeric" autoComplete="one-time-code" required
                                                            placeholder="______" maxLength={6} value={otp}
                                                            onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                                                            className={`${inputClass} pl-11 pr-4 font-bold tracking-[0.5em]`} />
                                                    </div>
                                                </div>
                                                <button type="submit" disabled={verifyOTPMutation.isPending || otp.length !== 6}
                                                    className={primaryBtnClass} style={primaryBtnStyle}>
                                                    {verifyOTPMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Verify code <ArrowRight className="w-4 h-4" /></>}
                                                </button>
                                                <button type="button"
                                                    onClick={() => { setForgotStep(STEPS.EMAIL); verifyOTPMutation.reset(); setOtp(''); }}
                                                    className={ghostBtnClass}>
                                                    ← Resend code
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* Step 3: New password */}
                                    {forgotStep === STEPS.PASSWORD && (
                                        <motion.div key="step-password" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <div className="mb-8">
                                                <h2 className="text-3xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-main)' }}>New password</h2>
                                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                    Choose a strong password for your account.
                                                </p>
                                            </div>
                                            <ErrorBanner message={resetPasswordMutation.error?.message} />
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                if (newPassword !== confirmNewPassword) return;
                                                resetPasswordMutation.mutate({ resetToken, newPassword });
                                            }} className="space-y-5">
                                                <div>
                                                    <label htmlFor="new-password" className="block text-[13px] font-semibold mb-2" style={{ color: 'var(--text-main)' }}>New password</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--text-subtle)' }} />
                                                        <input id="new-password" type={showNewPassword ? "text" : "password"} required autoComplete="new-password"
                                                            placeholder="Create a strong password" value={newPassword}
                                                            onChange={e => setNewPassword(e.target.value)}
                                                            className={`${inputClass} pl-11 pr-12`} />
                                                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}
                                                            aria-label={showNewPassword ? "Hide password" : "Show password"}
                                                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition-colors hover:text-[var(--text-main)]"
                                                            style={{ color: 'var(--text-subtle)' }}>
                                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="confirm-password" className="block text-[13px] font-semibold mb-2" style={{ color: 'var(--text-main)' }}>Confirm password</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--text-subtle)' }} />
                                                        <input id="confirm-password" type="password" required autoComplete="new-password"
                                                            placeholder="Repeat your password"
                                                            value={confirmNewPassword}
                                                            onChange={e => setConfirmNewPassword(e.target.value)}
                                                            className={`${inputClass} pl-11 pr-4`}
                                                            style={{
                                                                borderColor: confirmNewPassword && confirmNewPassword !== newPassword
                                                                    ? 'var(--destructive)'
                                                                    : confirmNewPassword && confirmNewPassword === newPassword
                                                                        ? 'var(--success)'
                                                                        : undefined
                                                            }} />
                                                    </div>
                                                    {confirmNewPassword && confirmNewPassword !== newPassword && (
                                                        <p className="text-xs font-medium mt-1.5" style={{ color: 'var(--destructive)' }}>Passwords don't match</p>
                                                    )}
                                                </div>
                                                <button type="submit"
                                                    disabled={resetPasswordMutation.isPending || newPassword !== confirmNewPassword}
                                                    className={primaryBtnClass} style={primaryBtnStyle}>
                                                    {resetPasswordMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Reset password <ArrowRight className="w-4 h-4" /></>}
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            /* ── Login View ──────────────────── */
                            <motion.div key="login"
                                initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>

                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-main)' }}>Welcome back</h1>
                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Sign in to your account to continue.</p>
                                </div>

                                <ErrorBanner message={loginMutation.error?.message || googleMutation.error?.message} />

                                {/* Google Button */}
                                <button type="button" onClick={() => googleMutation.mutate()} disabled={isLoading}
                                    className="w-full h-12 flex items-center justify-center gap-3 rounded-md border text-[15px] font-semibold transition-all cursor-pointer hover:bg-[var(--surface-card)] hover:border-[var(--primary)] disabled:opacity-60 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-solid)', color: 'var(--text-main)' }}>
                                    {googleMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                        <>
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fill="#EA4335" d="M24 12.27c0-.85-.07-1.7-.22-2.53H12.27v4.8h6.58a5.62 5.62 0 0 1-2.44 3.7v3.08h3.94c2.31-2.13 3.65-5.26 3.65-8.85z" />
                                                <path fill="#FBBC05" d="M12.27 24c3.24 0 5.96-1.07 7.95-2.9l-3.94-3.08c-1.09.73-2.49 1.16-4.01 1.16-3.08 0-5.7-2.08-6.64-4.88H1.63v3.18A12 12 0 0 0 12.27 24z" />
                                                <path fill="#34A853" d="M5.63 14.3a7.22 7.22 0 0 1 0-4.6V6.52H1.63a12 12 0 0 0 0 10.96l4-3.18z" />
                                                <path fill="#4285F4" d="M12.27 4.78c1.76 0 3.34.6 4.58 1.8l3.44-3.44A12 12 0 0 0 1.63 6.52l4 3.18c.94-2.8 3.56-4.92 6.64-4.92z" />
                                            </svg>
                                            Continue with Google
                                        </>
                                    )}
                                </button>

                                <div className="flex items-center gap-4 my-7">
                                    <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-solid)' }} />
                                    <span className="text-xs font-medium" style={{ color: 'var(--text-subtle)' }}>or continue with email</span>
                                    <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-solid)' }} />
                                </div>

                                {/* Email/Password Form */}
                                <form onSubmit={e => { e.preventDefault(); loginMutation.mutate({ email, password }); }} className="space-y-5">
                                    <div>
                                        <label htmlFor="email" className="block text-[13px] font-semibold mb-2" style={{ color: 'var(--text-main)' }}>Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--text-subtle)' }} />
                                            <input id="email" type="email" required autoComplete="email" placeholder="name@company.com"
                                                value={email} onChange={e => setEmail(e.target.value)}
                                                className={`${inputClass} pl-11 pr-4`} />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label htmlFor="password" className="text-[13px] font-semibold" style={{ color: 'var(--text-main)' }}>Password</label>
                                            <button type="button" onClick={() => setShowForgot(true)}
                                                className="text-[13px] font-semibold cursor-pointer hover:underline" style={{ color: 'var(--primary)' }}>
                                                Forgot password?
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--text-subtle)' }} />
                                            <input id="password" type={showPassword ? "text" : "password"} required autoComplete="current-password"
                                                placeholder="Enter your password"
                                                value={password} onChange={e => setPassword(e.target.value)}
                                                className={`${inputClass} pl-11 pr-12`} />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition-colors hover:text-[var(--text-main)]"
                                                style={{ color: 'var(--text-subtle)' }}>
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <button type="submit" disabled={isLoading}
                                        className={primaryBtnClass} style={primaryBtnStyle}>
                                        {loginMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign in <ArrowRight className="w-4 h-4" /></>}
                                    </button>
                                </form>

                                <p className="text-center text-sm mt-8" style={{ color: 'var(--text-muted)' }}>
                                    Don't have an account?{' '}
                                    <Link href="/signup" className="font-semibold hover:underline" style={{ color: 'var(--primary)' }}>Sign up</Link>
                                </p>
                            </motion.div>
                        )}

                    </AnimatePresence>

                    {/* Security note */}
                    <div className="flex items-center justify-center gap-2 mt-10 text-xs font-medium" style={{ color: 'var(--text-subtle)' }}>
                        <ShieldCheck size={14} style={{ color: 'var(--success)' }} />
                        <span>Your data is encrypted in transit</span>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}