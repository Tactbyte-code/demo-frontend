"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle, Loader2, MailCheck,
    RefreshCw, CheckCircle2, Check, User, Mail, Lock, ArrowLeft, ArrowUp, Star
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';
import { auth, googleProvider } from "@/lib/firebase";
import {
    createUserWithEmailAndPassword, signInWithPopup, updateProfile,
    sendEmailVerification, deleteUser, signOut
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';

/* ───────────────────────── Fonts ───────────────────────── */

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = Figtree({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

/* ───────────────────────── Brand & copy (edit freely) ───────────────────────── */

const BRAND = "Problem Pulse";
const LOGO_SRC = "/images/logo-new-no-bg.png"; // copy the uploaded logo to public/images/

const COPY = {
    headline: "Turn real conversations into product insight.",
    sub: "Find the problems people are actually talking about, then build what they\u2019ll pay for.",
    proof: "Join 2,000+ founders using",
};

/* Palette sampled from the logo, scoped to this page so the global theme is untouched */
const theme = {
    "--ink": "#2A0E4B",
    "--violet": "#9A3DE6",
    "--violet-deep": "#7B2CBF",
    "--lavender": "#B58CFB",
    "--magenta": "#B02FA8",
    "--coral": "#FF8D8D",
    "--orange": "#F9A62B",
    "--paper": "#FBF8FF",
    "--line": "#E4D8F5",
    "--text": "#1E0B38",
    "--muted": "#5E4F78",
    "--subtle": "#7D6E99",
    "--danger": "#C0213F",
    "--danger-bg": "#FFF0F3",
    "--success": "#15803D",
};

/* ───────────────────────── Constants & helpers ───────────────────────── */

const POLL_INTERVAL_MS = 3000;
const RESEND_COOLDOWN_S = 30;
const MIN_PASSWORD_LENGTH = 6; // Firebase's minimum

const AUTH_ERRORS = {
    "auth/email-already-in-use": "This email is already registered. Please log in instead.",
    "auth/weak-password": `Password is too weak. Use at least ${MIN_PASSWORD_LENGTH} characters.`,
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/network-request-failed": "Network error. Please check your connection and try again.",
    "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
};

const SILENT_GOOGLE_ERRORS = ["auth/popup-closed-by-user", "auth/cancelled-popup-request"];
const STRENGTH_LABELS = ["Too weak", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["#F0506E", "#F0506E", "#F9A62B", "#9A3DE6", "#7B2CBF"];

function getPasswordStrength(pw) {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
}

async function postJson(url, token, body) {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
        const detail = data?.detail;
        throw new Error(typeof detail === "string" ? detail : "Request failed. Please try again.");
    }
    return data;
}

/* ───────────────────────── Style tokens ───────────────────────── */

const fieldBase =
    "w-full rounded-md border bg-white py-3 pl-11 text-[15px] font-medium text-[var(--text)] outline-none " +
    "transition placeholder:text-[var(--subtle)] " +
    "focus:ring-4 focus:ring-[color:color-mix(in_srgb,var(--violet)_18%,transparent)] " +
    "disabled:cursor-not-allowed disabled:opacity-60";

const fieldBorder = {
    default: "border-[var(--line)] hover:border-[var(--lavender)] focus:border-[var(--violet)]",
    error: "border-[var(--danger)]",
    success: "border-[var(--success)]",
};

const primaryButton =
    "flex w-full items-center justify-center gap-2 rounded-md py-3.5 text-[15px] font-bold text-white " +
    "bg-[linear-gradient(135deg,var(--violet),var(--magenta))] " +
    "shadow-[0_10px_24px_-8px_color-mix(in_srgb,var(--violet)_60%,transparent)] transition-all " +
    "hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-8px_color-mix(in_srgb,var(--magenta)_60%,transparent)] " +
    "active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--violet)]";

const googleButton =
    "flex w-full items-center justify-center gap-3 rounded-md border border-[var(--line)] bg-white py-3 " +
    "text-[15px] font-semibold text-[var(--text)] transition-all hover:border-[var(--lavender)] " +
    "hover:bg-[color:color-mix(in_srgb,var(--lavender)_8%,white)] disabled:pointer-events-none disabled:opacity-60 " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--violet)]";

const linkButton =
    "inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-bold text-[var(--violet-deep)] " +
    "transition-colors hover:text-[var(--magenta)] disabled:pointer-events-none disabled:opacity-60";

/* ───────────────────────── Presentational pieces ───────────────────────── */

function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    );
}

function LogoMark({ size = 48, className = "" }) {
    return (
        <span
            className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-white ${className}`}
            style={{ width: size, height: size }}
        >
            <Image src={LOGO_SRC} alt="" fill sizes={`${size}px`} className="object-contain" priority />
        </span>
    );
}

function ErrorAlert({ message }) {
    return (
        <motion.div
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
        >
            <div className="flex items-start gap-3 rounded-md border border-[color:color-mix(in_srgb,var(--danger)_25%,transparent)] bg-[var(--danger-bg)] p-3.5 text-[var(--danger)]">
                <AlertCircle size={18} className="mt-px shrink-0" />
                <p className="text-xs font-semibold leading-snug">{message}</p>
            </div>
        </motion.div>
    );
}

function TextField({ id, label, icon: Icon, state = "default", trailing, ...inputProps }) {
    return (
        <div>
            <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-[var(--text)]">
                {label}
            </label>
            <div className="relative">
                <Icon
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--subtle)]"
                    aria-hidden="true"
                />
                <input
                    id={id}
                    required
                    className={`${fieldBase} ${fieldBorder[state]} ${trailing ? "pr-20" : "pr-4"}`}
                    {...inputProps}
                />
                {trailing && (
                    <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">{trailing}</div>
                )}
            </div>
        </div>
    );
}

function PasswordToggle({ visible, onToggle, label }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={visible ? `Hide ${label}` : `Show ${label}`}
            aria-pressed={visible}
            className="rounded-md p-1 text-[var(--subtle)] transition-colors hover:text-[var(--violet)]"
        >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
    );
}

function StrengthMeter({ password }) {
    if (!password) return null;
    const score = getPasswordStrength(password);
    const color = STRENGTH_COLORS[score];

    return (
        <div className="mt-2.5" aria-live="polite">
            <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-1.5 flex-1 rounded-full transition-colors duration-300"
                        style={{ backgroundColor: i < score ? color : "var(--line)" }}
                    />
                ))}
            </div>
            <p className="mt-1.5 text-xs font-medium text-[var(--muted)]">
                <span className="font-bold text-[var(--text)]">{STRENGTH_LABELS[score]}</span>
                {score < 3 && " · use 8+ characters with mixed case, a number and a symbol"}
            </p>
        </div>
    );
}

function Steps({ current }) {
    const steps = ["Create account", "Verify email", "Set up profile"];
    return (
        <ol className="mb-8 flex w-full items-start" aria-label="Signup progress">
            {steps.map((label, i) => {
                const done = i < current;
                const active = i === current;
                return (
                    <li key={label} className="flex flex-1 items-start last:flex-none">
                        <div className="flex flex-col items-center gap-1.5">
                            <span
                                aria-current={active ? "step" : undefined}
                                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${done
                                    ? "border-[var(--violet)] bg-[var(--violet)] text-white"
                                    : active
                                        ? "border-[var(--violet)] bg-white text-[var(--violet)]"
                                        : "border-[var(--line)] bg-white text-[var(--subtle)]"
                                    }`}
                            >
                                {done ? <Check size={14} strokeWidth={3} /> : i + 1}
                            </span>
                            <span className={`text-[11px] font-semibold ${active || done ? "text-[var(--text)]" : "text-[var(--subtle)]"}`}>
                                {label}
                            </span>
                        </div>
                        {i < steps.length - 1 && (
                            <div
                                className="mx-2 mt-3.5 h-0.5 flex-1 rounded-full"
                                style={{ backgroundColor: done ? "var(--violet)" : "var(--line)" }}
                            />
                        )}
                    </li>
                );
            })}
        </ol>
    );
}

/* ───────────────────────── Brand panel (left) ───────────────────────── */

function FloatCard({ className = "", delay = 0, amplitude = 8, children }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, -amplitude, 0] }}
            transition={
                reduce
                    ? { duration: 0.4, delay }
                    : { opacity: { duration: 0.6, delay }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay } }
            }
        >
            {children}
        </motion.div>
    );
}

function BrandPanel() {
    return (
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-[var(--ink)] p-12 text-white lg:flex xl:p-16">
            {/* Atmosphere */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-[color:color-mix(in_srgb,var(--violet)_45%,transparent)] blur-[120px]" />
                <div className="absolute -bottom-40 -left-24 h-[460px] w-[460px] rounded-full bg-[color:color-mix(in_srgb,var(--magenta)_40%,transparent)] blur-[120px]" />
                {/* Oversized magnifier ring, echoing the logo */}
                <div className="absolute -bottom-52 -right-52 h-[560px] w-[560px] rounded-full border-[44px] border-[color:color-mix(in_srgb,var(--violet)_28%,transparent)]" />
            </div>

            {/* Brand */}
            <div className="relative flex items-center gap-3">
                <LogoMark size={38} className="ring-2 ring-white/20" />

                <span className="bg-linear-to-r from-[#7138D5] via-[#C12AAE] to-[#FF4D83] bg-clip-text text-transparent text-lg font-bold tracking-tight">
                    {BRAND}
                </span>
            </div>

            {/* Message + composition */}
            <div className="relative">
                <h1 className="max-w-lg text-4xl mt-10 font-extrabold leading-[1.05] tracking-tight xl:text-[56px]">
                    {COPY.headline}
                </h1>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">{COPY.sub}</p>

                <div className="relative mt-12 h-[300px] max-w-[460px]" aria-hidden="true">
                    {/* Lavender review bubble */}
                    <FloatCard
                        delay={0.1}
                        amplitude={6}
                        className="absolute right-0 top-0 w-[270px] rounded-2xl rounded-bl-md bg-[linear-gradient(160deg,var(--lavender),#A272F5)] p-4 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.5)]"
                    >
                        <div className="mb-2 flex gap-1">
                            {[0, 1, 2].map((i) => (
                                <Star key={i} size={16} className="fill-white text-white" />
                            ))}
                        </div>
                        <p className="text-sm font-semibold leading-snug text-[var(--ink)]">
                            &ldquo;I lose hours every week on invoicing.&rdquo;
                        </p>
                    </FloatCard>

                    {/* Coral typing bubble */}
                    <FloatCard
                        delay={0.4}
                        amplitude={9}
                        className="absolute left-0 top-[104px] w-[250px] rounded-2xl rounded-bl-md bg-[linear-gradient(160deg,var(--magenta),var(--coral))] px-5 py-5 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.5)]"
                    >
                        <div className="flex gap-2.5">
                            <span className="h-3.5 w-3.5 rounded-full bg-white" />
                            <span className="h-3.5 w-3.5 rounded-full bg-white" />
                            <span className="h-3.5 w-3.5 rounded-full bg-white/60" />
                        </div>
                        <span className="absolute -right-3 -top-3 flex items-center gap-1 rounded-full bg-[var(--orange)] px-2.5 py-1 text-xs font-extrabold text-[var(--ink)] shadow-lg">
                            <ArrowUp size={13} strokeWidth={3.5} /> 1.2k
                        </span>
                    </FloatCard>

                    {/* Insight card */}
                    <FloatCard
                        delay={0.7}
                        amplitude={7}
                        className="absolute bottom-0 right-4 flex w-[270px] items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md"
                    >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[5px] border-[var(--violet)] bg-[#1A0832]">
                            <ArrowUp size={16} strokeWidth={3.5} className="text-[var(--orange)]" />
                        </span>
                        <div>
                            <p className="text-sm font-bold">Pain point found</p>
                            <p className="text-xs text-white/65">Mentioned across 27 threads</p>
                        </div>
                    </FloatCard>
                </div>
            </div>

            {/* Social proof */}
            <p className="relative text-sm text-white/70">
                {COPY.proof} <span className="font-bold text-white">{BRAND}</span>
            </p>
        </aside>
    );
}

/* ───────────────────────── Page ───────────────────────── */

export default function SignupPage() {
    const router = useRouter();

    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    const [waitingForVerification, setWaitingForVerification] = useState(false);
    const [verificationChecking, setVerificationChecking] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    const pendingUserRef = useRef(null);
    const busyRef = useRef(false);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

    const { name, email, password, confirmPassword } = form;
    const busy = loading || googleLoading;
    const passwordsMatch = confirmPassword.length > 0 && confirmPassword === password;
    const passwordsMismatch = confirmPassword.length > 0 && confirmPassword !== password;

    const setField = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

    const finishAuth = useCallback((data) => {
        localStorage.setItem("user", JSON.stringify({
            id: data.id,
            email: data.email,
            firebase_uid: data.firebase_uid,
            full_name: data.full_name,
            photo_url: data.photo_url,
            is_onboarded: data.is_onboarded,
        }));
        window.dispatchEvent(new Event("userUpdated"));
        router.replace(data.is_onboarded ? "/dashboard" : "/onboarding");
    }, [router]);

    const checkVerification = useCallback(async () => {
        if (busyRef.current) return;
        const user = auth.currentUser;
        if (!user || !pendingUserRef.current) return;

        busyRef.current = true;
        try {
            await user.reload();
            if (!user.emailVerified) {
                busyRef.current = false;
                return;
            }
            setVerificationChecking(true);
            const freshToken = await user.getIdToken(true);
            const data = await postJson(`${apiUrl}/auth/email-signup`, freshToken, pendingUserRef.current);
            pendingUserRef.current = null;
            finishAuth(data);
        } catch (err) {
            busyRef.current = false;
            setError(err.message || "Something went wrong after verification.");
            setWaitingForVerification(false);
            setVerificationChecking(false);
        }
    }, [apiUrl, finishAuth]);

    useEffect(() => {
        if (!waitingForVerification) return;
        const id = setInterval(checkVerification, POLL_INTERVAL_MS);
        const onVisible = () => {
            if (document.visibilityState === "visible") checkVerification();
        };
        document.addEventListener("visibilitychange", onVisible);
        return () => {
            clearInterval(id);
            document.removeEventListener("visibilitychange", onVisible);
        };
    }, [waitingForVerification, checkVerification]);

    useEffect(() => {
        if (resendCooldown <= 0) return;
        const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
        return () => clearTimeout(t);
    }, [resendCooldown]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();

        if (password.length < MIN_PASSWORD_LENGTH) {
            setError(AUTH_ERRORS["auth/weak-password"]);
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const { user } = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
            await updateProfile(user, { displayName: trimmedName });
            await sendEmailVerification(user, { url: `${frontendUrl}/onboarding` });

            pendingUserRef.current = {
                firebase_uid: user.uid,
                full_name: trimmedName,
                email: trimmedEmail,
                password, // kept to preserve the existing API contract
            };
            busyRef.current = false;
            setWaitingForVerification(true);
        } catch (err) {
            setError(AUTH_ERRORS[err?.code] || err?.message || "Signup failed. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!auth.currentUser || resendCooldown > 0) return;
        setError("");
        setResendLoading(true);
        try {
            await sendEmailVerification(auth.currentUser, { url: `${frontendUrl}/onboarding` });
            setResendCooldown(RESEND_COOLDOWN_S);
        } catch (err) {
            setError(AUTH_ERRORS[err?.code] || "Failed to resend. Please wait a moment and try again.");
        } finally {
            setResendLoading(false);
        }
    };

    const handleStartOver = async () => {
        setError("");
        setWaitingForVerification(false);
        setVerificationChecking(false);
        pendingUserRef.current = null;

        const user = auth.currentUser;
        if (!user) return;
        try {
            await deleteUser(user);
        } catch {
            await signOut(auth).catch(() => { });
        }
    };

    const handleGoogleSignup = async () => {
        setError("");
        setGoogleLoading(true);
        try {
            const { user } = await signInWithPopup(auth, googleProvider);
            const token = await user.getIdToken();
            const data = await postJson(`${apiUrl}/auth/google`, token, {
                firebase_uid: user.uid,
                full_name: user.displayName,
                email: user.email,
                photo_url: user.photoURL,
            });
            finishAuth(data);
        } catch (err) {
            if (!SILENT_GOOGLE_ERRORS.includes(err?.code)) {
                console.error("Google signup error:", err);
                setError("Google authentication failed. Please try again.");
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div
            style={theme}
            className={`${display.variable} ${body.variable} grid min-h-screen bg-[var(--paper)] font-[family-name:var(--font-body)] text-[var(--text)] lg:grid-cols-[1.05fr_1fr]`}
        >
            <BrandPanel />

            <main className="relative flex min-h-screen flex-col">
                {/* Top bar */}
                <header className="flex items-center justify-between px-5 py-5 sm:px-8">
                    {/* <div className="flex items-center gap-2.5 lg:invisible">
                        <LogoMark size={36} className="ring-1 ring-[var(--line)]" />
                        <span className=" text-lg font-bold tracking-tight">{BRAND}</span>
                    </div> */}
                    <Link
                        href="/"
                        className="inline-flex rounded-full items-center gap-1.5 border border-neutral-400 px-2 py-2 text-sm font-semibold text-[var(--muted)] transition-colors hover:bg-white hover:text-[var(--violet-deep)]"
                    >
                        <ArrowLeft size={15} />
                        {/* Back to home */}
                    </Link>
                </header>

                <div className="flex flex-1 items-center justify-center px-5 pb-12 sm:px-8">
                    <div className="w-full max-w-[400px]">
                        <AnimatePresence mode="wait" initial={false}>
                            {waitingForVerification ? (
                                /* ── Verification ── */
                                <motion.section
                                    key="verification"
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -24 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <Steps current={1} />

                                    <div className="flex flex-col items-center text-center">
                                        <div className="relative mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[var(--line)] bg-white shadow-[0_12px_32px_-12px_color-mix(in_srgb,var(--violet)_50%,transparent)]">
                                            {verificationChecking ? (
                                                <Loader2 className="h-8 w-8 animate-spin text-[var(--violet)]" />
                                            ) : (
                                                <>
                                                    <MailCheck className="h-8 w-8 text-[var(--violet)]" />
                                                    <span className="absolute right-1 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-[var(--orange)]" />
                                                </>
                                            )}
                                        </div>

                                        <h2 className=" text-3xl font-extrabold tracking-tight">
                                            {verificationChecking ? "Completing signup…" : "Check your email"}
                                        </h2>

                                        {verificationChecking ? (
                                            <p className="mt-2 text-sm font-medium text-[var(--muted)]">
                                                Email verified. Setting up your account…
                                            </p>
                                        ) : (
                                            <>
                                                <p className="mt-2 text-sm font-medium text-[var(--muted)]">We sent a verification link to</p>
                                                <p className="mb-6 mt-1 break-all text-sm font-bold text-[var(--violet-deep)]">{email}</p>

                                                <div className="mb-5 w-full rounded-md border border-[var(--line)] bg-white p-4 text-left">
                                                    <p className="text-[13px] font-medium leading-relaxed text-[var(--muted)]">
                                                        Click the link in the email, then return to this tab. We&apos;ll continue
                                                        automatically once your email is verified.
                                                    </p>
                                                </div>

                                                <div className="mb-5 flex items-center gap-2 text-xs font-medium text-[var(--subtle)]" role="status">
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                    Waiting for verification…
                                                </div>

                                                <div className="flex flex-col items-center gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={handleResend}
                                                        disabled={resendLoading || resendCooldown > 0}
                                                        className={linkButton}
                                                    >
                                                        {resendLoading ? (
                                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                        ) : resendCooldown > 0 ? (
                                                            <CheckCircle2 className="h-3.5 w-3.5 text-[var(--success)]" />
                                                        ) : (
                                                            <RefreshCw className="h-3.5 w-3.5" />
                                                        )}
                                                        {resendCooldown > 0
                                                            ? `Email sent — resend in ${resendCooldown}s`
                                                            : "Resend verification email"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={handleStartOver}
                                                        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                                                    >
                                                        <ArrowLeft className="h-3.5 w-3.5" />
                                                        Wrong email? Start over
                                                    </button>
                                                </div>

                                                <AnimatePresence>
                                                    {error && (
                                                        <div className="mt-4 w-full">
                                                            <ErrorAlert message={error} />
                                                        </div>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        )}
                                    </div>
                                </motion.section>
                            ) : (
                                /* ── Signup form ── */
                                <motion.section
                                    key="signup"
                                    initial={{ opacity: 0, x: -24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 24 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="mb-7">
                                        <h2 className=" text-3xl font-extrabold tracking-tight sm:text-[34px]">
                                            Create your account
                                        </h2>
                                        <p className="mt-2 text-sm font-medium text-[var(--muted)]">
                                            Free to start. No credit card needed.
                                        </p>
                                    </div>

                                    <AnimatePresence>
                                        {error && (
                                            <div className="mb-5">
                                                <ErrorAlert message={error} />
                                            </div>
                                        )}
                                    </AnimatePresence>

                                    <button type="button" onClick={handleGoogleSignup} disabled={busy} className={googleButton}>
                                        {googleLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <GoogleIcon />}
                                        Continue with Google
                                    </button>

                                    <div className="my-6 flex items-center gap-4">
                                        <div className="h-px grow bg-[var(--line)]" />
                                        <span className="text-xs font-semibold text-[var(--muted)]">or sign up with email</span>
                                        <div className="h-px grow bg-[var(--line)]" />
                                    </div>

                                    <form onSubmit={handleSignup} className="space-y-4">
                                        <TextField
                                            id="name"
                                            label="Full name"
                                            icon={User}
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Your name"
                                            value={name}
                                            onChange={setField("name")}
                                            disabled={busy}
                                        />

                                        <TextField
                                            id="email"
                                            label="Work email"
                                            icon={Mail}
                                            type="email"
                                            autoComplete="email"
                                            placeholder="name@company.com"
                                            value={email}
                                            onChange={setField("email")}
                                            disabled={busy}
                                        />

                                        <div>
                                            <TextField
                                                id="password"
                                                label="Password"
                                                icon={Lock}
                                                type={showPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                placeholder="Create a strong password"
                                                minLength={MIN_PASSWORD_LENGTH}
                                                value={password}
                                                onChange={setField("password")}
                                                disabled={busy}
                                                trailing={
                                                    <PasswordToggle
                                                        visible={showPassword}
                                                        onToggle={() => setShowPassword((v) => !v)}
                                                        label="password"
                                                    />
                                                }
                                            />
                                            <StrengthMeter password={password} />
                                        </div>

                                        <div>
                                            <TextField
                                                id="confirmPassword"
                                                label="Confirm password"
                                                icon={Lock}
                                                type={showConfirmPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                placeholder="Repeat your password"
                                                value={confirmPassword}
                                                onChange={setField("confirmPassword")}
                                                disabled={busy}
                                                state={passwordsMismatch ? "error" : passwordsMatch ? "success" : "default"}
                                                aria-invalid={passwordsMismatch}
                                                trailing={
                                                    <>
                                                        {passwordsMatch && (
                                                            <CheckCircle2 className="h-4 w-4 text-[var(--success)]" aria-label="Passwords match" />
                                                        )}
                                                        <PasswordToggle
                                                            visible={showConfirmPassword}
                                                            onToggle={() => setShowConfirmPassword((v) => !v)}
                                                            label="confirm password"
                                                        />
                                                    </>
                                                }
                                            />
                                            {passwordsMismatch && (
                                                <p className="mt-1.5 text-xs font-semibold text-[var(--danger)]" role="alert">
                                                    Passwords don&apos;t match
                                                </p>
                                            )}
                                        </div>

                                        <button type="submit" disabled={busy} className={`${primaryButton} mt-2`}>
                                            {loading ? (
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <>
                                                    Create account <ArrowRight className="h-5 w-5" />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <p className="mt-7 text-center text-sm font-medium text-[var(--muted)]">
                                        Already have an account?{" "}
                                        <Link href="/login" className="font-bold text-[var(--violet-deep)] hover:text-[var(--magenta)] hover:underline">
                                            Log in
                                        </Link>
                                    </p>
                                </motion.section>
                            )}
                        </AnimatePresence>

                        <p className="mt-10 flex items-center justify-center gap-2 text-xs font-medium text-[var(--subtle)]">
                            <ShieldCheck className="h-4 w-4 text-[var(--violet)]" />
                            Enterprise-grade security
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}