
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    ArrowRight,
    ArrowLeft,
    X,
    Loader2,
    MailCheck,
    RefreshCw,
    CheckCircle2,
    User,
    Mail,
    Lock,
    KeyRound,
    Sparkles,
    ShieldCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import BrandPanel from "./BrandPanel";
import { ErrorAlert, TextField, PasswordToggle, StrengthMeter, PrimaryButton, GoogleIcon } from "./AuthUI";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    sendEmailVerification,
    deleteUser,
    signOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
// import AuthUI from "./components/AuthUI";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const FRONTEND_URL =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

const POLL_INTERVAL_MS = 3000;
const RESEND_COOLDOWN_S = 30;
const MIN_PASSWORD_LENGTH = 6;

const FORGOT_STEPS = {
    EMAIL: "email",
    OTP: "otp",
    PASSWORD: "password",
    DONE: "done",
};

const AUTH_ERRORS = {
    "auth/email-already-in-use":
        "This email is already registered. Please log in instead.",
    "auth/weak-password":
        `Password is too weak. Use at least ${MIN_PASSWORD_LENGTH} characters.`,
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/network-request-failed":
        "Network error. Please check your connection and try again.",
    "auth/too-many-requests":
        "Too many attempts. Please wait a moment and try again.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/wrong-password": "Incorrect email or password.",
    "auth/user-not-found": "Incorrect email or password.",
};

const SILENT_GOOGLE_ERRORS = [
    "auth/popup-closed-by-user",
    "auth/cancelled-popup-request",
];

const STRENGTH_LABELS = ["Too weak", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = [
    "#F0506E",
    "#F0506E",
    "#F9A62B",
    "#9A3DE6",
    "#7B2CBF",
];

async function postJson(url, token, body) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const detail = data?.detail;
        throw new Error(
            typeof detail === "string"
                ? detail
                : "Request failed. Please try again."
        );
    }

    return data;
}

function getPasswordStrength(password) {
    if (!password) return 0;

    let score = 0;

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
}

function getFriendlyError(error) {
    if (!error) return "";

    if (AUTH_ERRORS[error.code]) {
        return AUTH_ERRORS[error.code];
    }

    const message = error.message || "";

    if (
        message.includes("auth/invalid-credential") ||
        message.includes("auth/wrong-password") ||
        message.includes("auth/user-not-found")
    ) {
        return "Incorrect email or password.";
    }

    if (message.includes("auth/popup-closed-by-user")) {
        return "Sign-in was cancelled.";
    }

    return message || "Something went wrong. Please try again.";
}

export default function LoginModal({
    onClose,
    onLoginSuccess,
}) {
    const [mode, setMode] = useState("login");
    const [isOpen, setIsOpen] = useState(true);
    // Login
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    // Signup
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showSignupPassword, setShowSignupPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Shared state
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    // Signup verification
    const [waitingForVerification, setWaitingForVerification] = useState(false);
    const [verificationChecking, setVerificationChecking] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    const pendingUserRef = useRef(null);
    const busyRef = useRef(false);

    // Forgot password
    const [showForgot, setShowForgot] = useState(false);
    const [forgotStep, setForgotStep] = useState(FORGOT_STEPS.EMAIL);
    const [forgotEmail, setForgotEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);

    const { name, email, password, confirmPassword } = form;

    const busy = loading || googleLoading;
    const passwordsMatch =
        confirmPassword.length > 0 && confirmPassword === password;
    const passwordsMismatch =
        confirmPassword.length > 0 && confirmPassword !== password;

    const setField = (key) => (event) => {
        setForm((previous) => ({
            ...previous,
            [key]: event.target.value,
        }));
    };

    const finishAuth = useCallback(
        async (data) => {
            // The parent owns guest-report claiming, modal closing,
            // and post-login navigation.
            await onLoginSuccess?.(data);
        },
        [onLoginSuccess]
    );

    const switchMode = (nextMode) => {
        setError("");
        setMode(nextMode);
        setShowForgot(false);
        setWaitingForVerification(false);
    };

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape" && !busy && !waitingForVerification) {
                onClose?.();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, busy, waitingForVerification]);

    // ─────────────────────────────────────────────
    // Login
    // ─────────────────────────────────────────────

    const handleEmailLogin = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            let user;

            try {
                const credential = await signInWithEmailAndPassword(
                    auth,
                    loginEmail.trim(),
                    loginPassword
                );

                user = credential.user;
            } catch (err) {
                if (
                    err?.code === "auth/invalid-credential" ||
                    err?.code === "auth/wrong-password"
                ) {
                    try {
                        const response = await fetch(
                            `${API_URL}/auth/check-provider`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    email: loginEmail.trim(),
                                }),
                            }
                        );

                        if (response.ok) {
                            const result = await response.json();

                            if (result.provider === "google") {
                                throw new Error(
                                    "An account with this email already exists using Google Sign-In. Please use Continue with Google."
                                );
                            }
                        }
                    } catch (providerError) {
                        if (
                            providerError.message.includes(
                                "already exists using Google"
                            )
                        ) {
                            throw providerError;
                        }
                    }
                }

                throw err;
            }

            const token = await user.getIdToken();

            const data = await postJson(
                `${API_URL}/auth/email-login`,
                token,
                {
                    firebase_uid: user.uid,
                    full_name: user.displayName,
                    email: loginEmail.trim(),
                    password: loginPassword,
                }
            );

            await finishAuth(data);
        } catch (err) {
            setError(getFriendlyError(err));
        } finally {
            setLoading(false);
        }
    };

    // ─────────────────────────────────────────────
    // Google login / signup
    // ─────────────────────────────────────────────
    const handleGoogleAuth = async () => {
        setError("");
        setGoogleLoading(true);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const token = await user.getIdToken();

            const data = await postJson(
                `${API_URL}/auth/google`,
                token,
                {
                    firebase_uid: user.uid,
                    full_name: user.displayName,
                    email: user.email,
                    photo_url: user.photoURL,
                }
            );

            await finishAuth(data);
        } catch (err) {
            if (!SILENT_GOOGLE_ERRORS.includes(err?.code)) {
                setError(getFriendlyError(err));
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    // ─────────────────────────────────────────────
    // Signup
    // ─────────────────────────────────────────────

    const handleSignup = async (event) => {
        event.preventDefault();
        setError("");

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();

        if (!trimmedName) {
            setError("Please enter your full name.");
            return;
        }

        if (password.length < MIN_PASSWORD_LENGTH) {
            setError(
                `Password must contain at least ${MIN_PASSWORD_LENGTH} characters.`
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                trimmedEmail,
                password
            );

            await updateProfile(user, {
                displayName: trimmedName,
            });

            await sendEmailVerification(user, {
                url: `${FRONTEND_URL}/onboarding`,
            });

            pendingUserRef.current = {
                firebase_uid: user.uid,
                full_name: trimmedName,
                email: trimmedEmail,
                password,
            };

            busyRef.current = false;
            setWaitingForVerification(true);
        } catch (err) {
            setError(getFriendlyError(err));
        } finally {
            setLoading(false);
        }
    };

    // ─────────────────────────────────────────────
    // Email verification polling
    // ─────────────────────────────────────────────

    const checkVerification = useCallback(async () => {
        if (busyRef.current) return;

        const user = auth.currentUser;

        if (!user || !pendingUserRef.current) return;

        busyRef.current = true;

        try {
            await user.reload();

            if (!auth.currentUser?.emailVerified) {
                busyRef.current = false;
                return;
            }

            setVerificationChecking(true);

            const freshToken = await auth.currentUser.getIdToken(true);

            const data = await postJson(
                `${API_URL}/auth/email-signup`,
                freshToken,
                pendingUserRef.current
            );

            pendingUserRef.current = null;

            await finishAuth(data);
        } catch (err) {
            busyRef.current = false;
            setError(
                err.message ||
                "Something went wrong after email verification."
            );
            setWaitingForVerification(false);
            setVerificationChecking(false);
        }
    }, [finishAuth]);

    useEffect(() => {
        if (!waitingForVerification) return;

        const intervalId = setInterval(
            checkVerification,
            POLL_INTERVAL_MS
        );

        const handleVisibility = () => {
            if (document.visibilityState === "visible") {
                checkVerification();
            }
        };

        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener(
                "visibilitychange",
                handleVisibility
            );
        };
    }, [waitingForVerification, checkVerification]);

    useEffect(() => {
        if (resendCooldown <= 0) return;

        const timeoutId = setTimeout(() => {
            setResendCooldown((current) => current - 1);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [resendCooldown]);

    const handleResendVerification = async () => {
        if (!auth.currentUser || resendCooldown > 0) return;

        setError("");
        setResendLoading(true);

        try {
            await sendEmailVerification(auth.currentUser, {
                url: `${FRONTEND_URL}/onboarding`,
            });

            setResendCooldown(RESEND_COOLDOWN_S);
        } catch (err) {
            setError(getFriendlyError(err));
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

        if (!user) {
            setMode("signup");
            return;
        }

        try {
            await deleteUser(user);
        } catch {
            await signOut(auth).catch(() => { });
        }

        setForm({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        setMode("signup");
    };

    // ─────────────────────────────────────────────
    // Forgot password
    // ─────────────────────────────────────────────

    const resetForgotFlow = () => {
        setShowForgot(false);
        setForgotStep(FORGOT_STEPS.EMAIL);
        setForgotEmail("");
        setOtp("");
        setResetToken("");
        setNewPassword("");
        setConfirmNewPassword("");
        setShowNewPassword(false);
        setError("");
    };

    const handleSendOTP = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            await postJson(
                `${API_URL}/auth/forgot-password`,
                null,
                { email: forgotEmail.trim() }
            );

            setForgotStep(FORGOT_STEPS.OTP);
        } catch (err) {
            setError(getFriendlyError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await postJson(
                `${API_URL}/auth/verify-otp`,
                null,
                {
                    email: forgotEmail.trim(),
                    otp,
                }
            );

            setResetToken(data.reset_token);
            setForgotStep(FORGOT_STEPS.PASSWORD);
        } catch (err) {
            setError(getFriendlyError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();
        setError("");

        if (newPassword !== confirmNewPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await postJson(
                `${API_URL}/auth/reset-password`,
                null,
                {
                    reset_token: resetToken,
                    new_password: newPassword,
                }
            );

            setForgotStep(FORGOT_STEPS.DONE);
        } catch (err) {
            setError(getFriendlyError(err));
        } finally {
            setLoading(false);
        }
    };

    const passwordsResetMismatch =
        confirmNewPassword.length > 0 &&
        newPassword !== confirmNewPassword;

    const modalTitle = waitingForVerification
        ? "Verify your email"
        : showForgot
            ? "Reset your password"
            : mode === "signup"
                ? "Create your account"
                : "Welcome back";

    const handleClose = useCallback(() => {
        setIsOpen(false);
        onClose?.();
    }, [onClose]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleClose, isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/70 p-3 backdrop-blur-md sm:p-5"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    handleClose();
                }
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                role="dialog"
                aria-modal="true"
                aria-label="Account authentication"
                className="relative grid h-[min(760px,90vh)] max-h-[90vh] min-h-0 w-full max-w-[1080px] grid-cols-1 overflow-hidden rounded-2xl border border-white/20 bg-white shadow-[0_30px_100px_-25px_rgba(0,0,0,0.45)] lg:grid-cols-2"
                onMouseDown={(event) => event.stopPropagation()}
            >
                {/* Close */}
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close authentication modal"
                    className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-500 shadow-sm transition hover:bg-slate-100 hover:text-slate-900"
                >
                    <X size={18} />
                </button>

                {/* Left visual panel */}
                <BrandPanel
                    mode={
                        waitingForVerification
                            ? "signup"
                            : showForgot
                                ? "login"
                                : mode
                    }
                />

                {/* Right form panel */}
                <main className="relative flex min-h-0 h-full flex-col justify-center overflow-y-auto bg-white px-5 py-4 text-slate-900 sm:px-7 sm:py-5 lg:overflow-hidden lg:px-8 lg:py-4">
                    <div className="relative z-10 mx-auto w-full max-w-[420px] py-0.5">
                        {/* Mobile brand */}
                        <div className="mb-5 flex items-center gap-2 lg:hidden">
                            <div className="relative h-10 w-10">
                                <Image
                                    src="/images/logo-new-no-bg.png"
                                    alt="ProblemPulse"
                                    fill
                                    sizes="40px"
                                    className="object-contain"
                                />
                            </div>

                            <span className="bg-linear-to-r from-[#A78BFA] via-[#E879D4] to-[#FF7FA5] bg-clip-text text-lg font-bold text-transparent">
                                ProblemPulse
                            </span>
                        </div>

                        <AnimatePresence mode="wait" initial={false}>
                            {/* ── Email verification ── */}
                            {waitingForVerification ? (
                                <motion.section
                                    key="verification"
                                    initial={{ opacity: 0, x: 18 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -18 }}
                                    transition={{ duration: 0.22 }}
                                >
                                    <div className="mb-5">
                                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
                                            {verificationChecking ? (
                                                <Loader2 className="h-7 w-7 animate-spin text-violet-300" />
                                            ) : (
                                                <MailCheck className="h-7 w-7 text-violet-300" />
                                            )}
                                        </div>

                                        <h2 className="text-3xl font-extrabold tracking-tight">
                                            {verificationChecking
                                                ? "Completing signup…"
                                                : "Check your email"}
                                        </h2>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            {verificationChecking
                                                ? "Email verified. Setting up your account…"
                                                : "We sent a verification link to"}
                                        </p>

                                        {!verificationChecking && (
                                            <p className="mt-1 break-all text-sm font-bold text-violet-300">
                                                {email}
                                            </p>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        <ErrorAlert message={error} />
                                    </AnimatePresence>

                                    {!verificationChecking && (
                                        <>
                                            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                                                <p className="text-sm leading-6 text-slate-600">
                                                    Click the verification link in
                                                    your email, then return to
                                                    this tab. We&apos;ll continue
                                                    automatically once your
                                                    email is verified.
                                                </p>
                                            </div>

                                            <div
                                                className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-500"
                                                role="status"
                                            >
                                                <Loader2 className="h-3.5 w-3.5 animate-spin text-violet-300" />
                                                Waiting for verification…
                                            </div>

                                            <div className="mt-6 flex flex-col items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={handleResendVerification}
                                                    disabled={
                                                        resendLoading ||
                                                        resendCooldown > 0
                                                    }
                                                    className="inline-flex items-center gap-2 text-xs font-bold text-violet-700 transition hover:text-pink-600 disabled:opacity-50"
                                                >
                                                    {resendLoading ? (
                                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                    ) : resendCooldown > 0 ? (
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
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
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
                                                >
                                                    <ArrowLeft size={13} />
                                                    Wrong email? Start over
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </motion.section>
                            ) : showForgot ? (
                                /* ── Forgot password ── */
                                <motion.section
                                    key={`forgot-${forgotStep}`}
                                    initial={{ opacity: 0, x: 18 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -18 }}
                                    transition={{ duration: 0.22 }}
                                >
                                    {forgotStep === FORGOT_STEPS.DONE ? (
                                        <div className="py-6 text-center">
                                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10">
                                                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                                            </div>

                                            <h2 className="text-2xl font-bold">
                                                Password reset
                                            </h2>

                                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                                Your password has been updated.
                                                You can now sign in.
                                            </p>

                                            <PrimaryButton
                                                type="button"
                                                onClick={resetForgotFlow}
                                                className="mt-7"
                                            >
                                                Back to sign in
                                                <ArrowRight size={17} />
                                            </PrimaryButton>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                onClick={resetForgotFlow}
                                                className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
                                            >
                                                <ArrowLeft size={14} />
                                                Back to sign in
                                            </button>

                                            <div className="mb-5">
                                                <h2 className="text-3xl font-extrabold tracking-tight">
                                                    {forgotStep === FORGOT_STEPS.EMAIL
                                                        ? "Reset password"
                                                        : forgotStep === FORGOT_STEPS.OTP
                                                            ? "Enter your code"
                                                            : "New password"}
                                                </h2>

                                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                                    {forgotStep === FORGOT_STEPS.EMAIL
                                                        ? "Enter your email and we'll send you a 6-digit code."
                                                        : forgotStep === FORGOT_STEPS.OTP
                                                            ? `We sent a 6-digit code to ${forgotEmail}.`
                                                            : "Choose a new password for your account."}
                                                </p>
                                            </div>

                                            <ErrorAlert message={error} />

                                            {forgotStep === FORGOT_STEPS.EMAIL && (
                                                <form
                                                    onSubmit={handleSendOTP}
                                                    className="mt-4 space-y-4"
                                                >
                                                    <TextField
                                                        id="forgot-email"
                                                        label="Email"
                                                        icon={Mail}
                                                        type="email"
                                                        autoComplete="email"
                                                        placeholder="name@company.com"
                                                        value={forgotEmail}
                                                        onChange={(event) =>
                                                            setForgotEmail(
                                                                event.target.value
                                                            )
                                                        }
                                                    />

                                                    <PrimaryButton
                                                        type="submit"
                                                        loading={loading}
                                                    >
                                                        Send code
                                                        <ArrowRight size={17} />
                                                    </PrimaryButton>
                                                </form>
                                            )}

                                            {forgotStep === FORGOT_STEPS.OTP && (
                                                <form
                                                    onSubmit={handleVerifyOTP}
                                                    className="mt-4 space-y-4"
                                                >
                                                    <TextField
                                                        id="forgot-otp"
                                                        label="6-digit code"
                                                        icon={KeyRound}
                                                        type="text"
                                                        inputMode="numeric"
                                                        autoComplete="one-time-code"
                                                        maxLength={6}
                                                        placeholder="______"
                                                        value={otp}
                                                        onChange={(event) =>
                                                            setOtp(
                                                                event.target.value.replace(
                                                                    /\D/g,
                                                                    ""
                                                                )
                                                            )
                                                        }
                                                    />

                                                    <PrimaryButton
                                                        type="submit"
                                                        loading={loading}
                                                        disabled={otp.length !== 6}
                                                    >
                                                        Verify code
                                                        <ArrowRight size={17} />
                                                    </PrimaryButton>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setForgotStep(
                                                                FORGOT_STEPS.EMAIL
                                                            );
                                                            setOtp("");
                                                            setError("");
                                                        }}
                                                        className="w-full text-xs font-semibold text-slate-500 transition hover:text-slate-900"
                                                    >
                                                        Resend code
                                                    </button>
                                                </form>
                                            )}

                                            {forgotStep === FORGOT_STEPS.PASSWORD && (
                                                <form
                                                    onSubmit={handleResetPassword}
                                                    className="mt-4 space-y-4"
                                                >
                                                    <TextField
                                                        id="new-password"
                                                        label="New password"
                                                        icon={Lock}
                                                        type={
                                                            showNewPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        autoComplete="new-password"
                                                        placeholder="Create a new password"
                                                        value={newPassword}
                                                        onChange={(event) =>
                                                            setNewPassword(
                                                                event.target.value
                                                            )
                                                        }
                                                        trailing={
                                                            <PasswordToggle
                                                                visible={showNewPassword}
                                                                onToggle={() =>
                                                                    setShowNewPassword(
                                                                        (value) => !value
                                                                    )
                                                                }
                                                                label="password"
                                                            />
                                                        }
                                                    />

                                                    <TextField
                                                        id="confirm-new-password"
                                                        label="Confirm password"
                                                        icon={Lock}
                                                        type="password"
                                                        autoComplete="new-password"
                                                        placeholder="Repeat your password"
                                                        value={confirmNewPassword}
                                                        onChange={(event) =>
                                                            setConfirmNewPassword(
                                                                event.target.value
                                                            )
                                                        }
                                                    />

                                                    {passwordsResetMismatch && (
                                                        <p className="text-xs font-semibold text-rose-600">
                                                            Passwords don&apos;t match.
                                                        </p>
                                                    )}

                                                    <PrimaryButton
                                                        type="submit"
                                                        loading={loading}
                                                        disabled={
                                                            !newPassword ||
                                                            !confirmNewPassword ||
                                                            passwordsResetMismatch
                                                        }
                                                    >
                                                        Reset password
                                                        <ArrowRight size={17} />
                                                    </PrimaryButton>
                                                </form>
                                            )}
                                        </>
                                    )}
                                </motion.section>
                            ) : (
                                /* ── Login / Signup ── */
                                <motion.section
                                    key={mode}
                                    initial={{ opacity: 0, x: 18 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -18 }}
                                    transition={{ duration: 0.22 }}
                                >
                                    <div className="mb-3">
                                        <h2 className="text-2xl font-bold tracking-tight sm:text-[28px]">
                                            {mode === "login" ? "Welcome back" : "Create your account"}
                                        </h2>

                                        <p className="mt-1.5 text-[13px] leading-5 text-slate-500">
                                            {mode === "login"
                                                ? "Sign in to continue your research and access your reports."
                                                : "Start validating your ideas and discover your next opportunity."}
                                        </p>
                                    </div>

                                    <ErrorAlert message={error} />

                                    <button
                                        type="button"
                                        onClick={handleGoogleAuth}
                                        disabled={busy}
                                        className="mt-3 flex h-10 w-full items-center justify-center gap-3 rounded-md border border-[#747775] bg-white px-4 text-sm font-medium tracking-[0.1px] text-[#1f1f1f] shadow-sm transition hover:bg-[#f8faff] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 disabled:cursor-not-allowed disabled:opacity-50"                                    >
                                        {googleLoading ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <GoogleIcon />
                                        )}
                                        Continue with Google
                                    </button>

                                    <div className="my-4 flex items-center gap-4">
                                        <div className="h-px flex-1 bg-slate-200" />
                                        <span className="text-[11px] font-semibold tracking-wide text-slate-400">
                                            OR CONTINUE WITH EMAIL
                                        </span>
                                        <div className="h-px flex-1 bg-slate-200" />
                                    </div>

                                    {mode === "login" ? (
                                        <form
                                            onSubmit={handleEmailLogin}
                                            className="space-y-3"
                                        >
                                            <TextField
                                                id="login-email"
                                                label="Email address"
                                                icon={Mail}
                                                type="email"
                                                autoComplete="email"
                                                placeholder="name@company.com"
                                                value={loginEmail}
                                                onChange={(event) =>
                                                    setLoginEmail(
                                                        event.target.value
                                                    )
                                                }
                                                disabled={busy}
                                            />

                                            <div>
                                                <div className="mb-2 flex items-center justify-between">
                                                    <label
                                                        htmlFor="login-password"
                                                        className="text-[13px] font-semibold text-slate-700"
                                                    >
                                                        Password
                                                    </label>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setForgotEmail(loginEmail);
                                                            setShowForgot(true);
                                                            setError("");
                                                        }}
                                                        className="text-xs font-semibold text-violet-700 transition hover:text-pink-600"
                                                    >
                                                        Forgot password?
                                                    </button>
                                                </div>

                                                <div className="relative">
                                                    <Lock
                                                        size={17}
                                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                                    />

                                                    <input
                                                        id="login-password"
                                                        type={
                                                            showLoginPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        required
                                                        autoComplete="current-password"
                                                        placeholder="Enter your password"
                                                        value={loginPassword}
                                                        onChange={(event) =>
                                                            setLoginPassword(
                                                                event.target.value
                                                            )
                                                        }
                                                        disabled={busy}
                                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15 disabled:opacity-50"
                                                    />

                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                        <PasswordToggle
                                                            visible={showLoginPassword}
                                                            onToggle={() =>
                                                                setShowLoginPassword(
                                                                    (value) => !value
                                                                )
                                                            }
                                                            label="password"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <PrimaryButton
                                                type="submit"
                                                loading={loading}
                                                disabled={busy}
                                            >
                                                Sign in
                                                <ArrowRight size={17} />
                                            </PrimaryButton>
                                        </form>
                                    ) : (
                                        <>
                                            <form
                                                onSubmit={handleSignup}
                                                className="space-y-2"
                                            >
                                                <TextField
                                                    id="signup-name"
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
                                                    id="signup-email"
                                                    label="Email address"
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
                                                        id="signup-password"
                                                        label="Password"
                                                        icon={Lock}
                                                        type={
                                                            showSignupPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        autoComplete="new-password"
                                                        placeholder="Create a strong password"
                                                        minLength={MIN_PASSWORD_LENGTH}
                                                        value={password}
                                                        onChange={setField("password")}
                                                        disabled={busy}
                                                        trailing={
                                                            <PasswordToggle
                                                                visible={showSignupPassword}
                                                                onToggle={() =>
                                                                    setShowSignupPassword(
                                                                        (value) => !value
                                                                    )
                                                                }
                                                                label="password"
                                                            />
                                                        }
                                                    />

                                                    <StrengthMeter password={password} />
                                                </div>

                                                <div>
                                                    <TextField
                                                        id="signup-confirm-password"
                                                        label="Confirm password"
                                                        icon={Lock}
                                                        type={
                                                            showConfirmPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        autoComplete="new-password"
                                                        placeholder="Repeat your password"
                                                        value={confirmPassword}
                                                        onChange={setField("confirmPassword")}
                                                        disabled={busy}
                                                        trailing={
                                                            <>
                                                                {passwordsMatch && (
                                                                    <CheckCircle2
                                                                        size={16}
                                                                        className="text-emerald-400"
                                                                    />
                                                                )}

                                                                <PasswordToggle
                                                                    visible={showConfirmPassword}
                                                                    onToggle={() =>
                                                                        setShowConfirmPassword(
                                                                            (value) => !value
                                                                        )
                                                                    }
                                                                    label="confirm password"
                                                                />
                                                            </>
                                                        }
                                                    />

                                                    {passwordsMismatch && (
                                                        <p className="mt-1.5 text-xs font-semibold text-rose-600">
                                                            Passwords don&apos;t match.
                                                        </p>
                                                    )}
                                                </div>

                                                <PrimaryButton
                                                    type="submit"
                                                    loading={loading}
                                                    disabled={
                                                        busy ||
                                                        !name.trim() ||
                                                        !email.trim() ||
                                                        !password ||
                                                        !passwordsMatch
                                                    }
                                                >
                                                    Create account
                                                    <ArrowRight size={17} />
                                                </PrimaryButton>
                                            </form>

                                            <p className="mt-2 text-center text-[10px] leading-4 text-slate-500">
                                                By creating an account, you agree to our{" "}
                                                <a
                                                    href="/terms-and-conditions"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="font-semibold text-violet-700 underline-offset-2 hover:underline"
                                                >
                                                    Terms &amp; Conditions
                                                </a>{" "}
                                                and{" "}
                                                <a
                                                    href="/privacy-policy"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="font-semibold text-violet-700 underline-offset-2 hover:underline"
                                                >
                                                    Privacy Policy
                                                </a>.
                                            </p>
                                        </>
                                    )}

                                    <p className="mt-3 text-center text-[13px] text-slate-500">                                        {mode === "login"
                                        ? "Don't have an account?"
                                        : "Already have an account?"}{" "}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                switchMode(
                                                    mode === "login"
                                                        ? "signup"
                                                        : "login"
                                                )
                                            }
                                            className="font-bold text-violet-700 transition hover:text-pink-600"
                                        >
                                            {mode === "login"
                                                ? "Create an account"
                                                : "Sign in"}
                                        </button>
                                    </p>
                                </motion.section>
                            )}
                        </AnimatePresence>

                        <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-medium text-slate-400">
                            <ShieldCheck size={14} className="text-violet-300" />
                            Your data is encrypted in transit
                        </div>
                    </div>
                </main>
            </motion.div>
        </div>
    );
}
