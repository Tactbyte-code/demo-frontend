"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    Zap, ArrowRight, ShieldCheck,
    Eye, EyeOff, AlertCircle, Loader2,
    MailCheck, RefreshCw, Home, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, googleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [waitingForVerification, setWaitingForVerification] = useState(false);
    const [verificationChecking, setVerificationChecking] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);

    const pollingRef = useRef(null);
    const router = useRouter();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const front_end_url = process.env.NEXT_PUBLIC_FRONTEND_URL;

    useEffect(() => {
        return () => {
            if (pollingRef.current) clearInterval(pollingRef.current);
        };
    }, []);

    const startPolling = (userData) => {
        pollingRef.current = setInterval(async () => {
            try {
                const user = auth.currentUser;
                if (!user) return;

                await user.reload();

                if (user?.emailVerified) {
                    clearInterval(pollingRef.current);
                    setVerificationChecking(true);

                    const freshToken = await user.getIdToken(true);

                    const response = await fetch(`${apiUrl}/auth/email-signup`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${freshToken}`
                        },
                        body: JSON.stringify(userData)
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData?.detail || "Signup failed");
                    }

                    const data = await response.json();
                    console.log('daata: ', data);

                    // localStorage.setItem("token", freshToken);
                    localStorage.setItem("user", JSON.stringify({
                        id: data.id,
                        email: data.email,
                        firebase_uid: data.firebase_uid,
                        full_name: data.full_name,
                        photo_url: data.photo_url,
                        is_onboarded: data?.is_onboarded  // ← save this too
                    }));

                    window.dispatchEvent(new Event("userUpdated"));

                    // ← Route based on onboarding status
                    if (!data.is_onboarded) {
                        router.replace("/onboarding");
                    } else {
                        router.replace("/dashboard");
                    }
                }
            } catch (err) {
                clearInterval(pollingRef.current);
                setError(err.message || "Something went wrong after verification.");
                setWaitingForVerification(false);
                setVerificationChecking(false);
            }
        }, 3000);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            await sendEmailVerification(userCredential.user, {
                url: `${front_end_url}/onboarding`
            });

            setWaitingForVerification(true);
            startPolling({
                firebase_uid: userCredential.user.uid,
                full_name: name,
                email: email,
                password: password
            });
        } catch (err) {
            const code = err?.code || "";
            if (code === "auth/email-already-in-use") {
                setError("This email is already registered. Please login.");
            } else if (code === "auth/weak-password") {
                setError("Password is too weak. Use at least 6 characters.");
            } else {
                setError(err.message || "Signup failed. Please check your connection.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResendLoading(true);
        setResendSuccess(false);
        try {
            await sendEmailVerification(auth.currentUser, {
                url: `${apiUrl}/dashboard`
            });
            setResendSuccess(true);
            setTimeout(() => setResendSuccess(false), 4000);
        } catch (err) {
            setError("Failed to resend. Please wait a moment and try again.");
        } finally {
            setResendLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        console.log('entered');

        setError("");
        setLoading(true);

        console.log('apiurl: ', apiUrl);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const token = await user.getIdToken();

            const response = await fetch(`${apiUrl}/auth/google`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    firebase_uid: user.uid,
                    full_name: user.displayName,
                    email: user.email,
                    photo_url: user.photoURL
                })
            });

            const data = await response.json();

            console.log('data: ', data);
            console.log('onboarded: ', data?.is_onboarded);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Google signup failed");
            }

            // localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify({
                id: data.id,
                email: data.email,
                firebase_uid: data.firebase_uid,
                full_name: data.full_name,
                photo_url: data.photo_url,
                is_onboarded: data.is_onboarded  // ← save this too
            }));

            window.dispatchEvent(new Event("userUpdated"));

            // ← Route based on onboarding status
            if (!data.is_onboarded) {
                router.replace("/onboarding");
            } else {
                router.replace("/dashboard");
            }
        } catch (err) {
            console.log('sign up error: ', err);
            setError("Google Authentication Failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Shared input style helpers
    const inputBase = {
        backgroundColor: 'var(--surface-card)',
        border: '1px solid var(--border-solid)',
        color: 'var(--text-main)',
    };

    const onInputFocus = (e) => {
        e.currentTarget.style.borderColor = 'var(--primary)';
        e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent)';
    };

    const onInputBlur = (e) => {
        e.currentTarget.style.borderColor = 'var(--border-solid)';
        e.currentTarget.style.boxShadow = 'none';
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6 font-sans overflow-hidden relative"
            style={{ backgroundColor: 'var(--background)' }}
        >
            {/* Ambient glows */}
            <div
                className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full blur-[130px] animate-pulse pointer-events-none"
                style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 12%, transparent)' }}
            />
            <div
                className="absolute bottom-[-10%] right-[-5%] w-125 h-[500px] rounded-full blur-[110px] pointer-events-none"
                style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)' }}
            />

            {/* Go to Home */}
            <Link
                href="/"
                className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all duration-300"
                style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border-solid)',
                    color: 'var(--text-muted)',
                    boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-solid)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                }}
            >
                <Home className="w-3.5 h-3.5" />
                Go to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10 w-full max-w-120"
            >
                {/* Brand */}
                <div className="flex flex-row gap-4 items-center mt-4 justify-center">
                    <div className="relative h-10 w-50 rounded-full">
                        <Image src="/images/logo_with_text_2.png" alt="Logo" fill sizes="(max-width: 640px) 100vw, 160px" className="object-contain" priority />
                    </div>
                    {/* <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-main)' }}>
                        Demo
                    </h1> */}
                </div>

                <p
                    className="text-sm font-medium text-center mb-10 tracking-wide uppercase mt-4"
                    style={{ color: 'var(--text-subtle)' }}
                >
                    Start your intelligence journey
                </p>

                <AnimatePresence mode="wait">
                    {waitingForVerification ? (

                        /* ── Verification Screen ── */
                        <motion.div
                            key="verification"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="backdrop-blur-xl p-10"
                            style={{
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--glass-border)',
                                boxShadow: 'var(--shadow-lg)',
                            }}
                        >
                            {/* Arctic shimmer top */}
                            <div
                                className="absolute top-0 left-8 right-8 h-px rounded-full"
                                style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.3 }}
                            />

                            <div className="flex flex-col items-center text-center">
                                <div
                                    className="w-20 h-20 flex items-center justify-center mb-6"
                                    style={{
                                        backgroundColor: 'var(--surface-card)',
                                        border: '1px solid var(--glass-border)',
                                    }}
                                >
                                    {verificationChecking
                                        ? <Loader2 className="w-9 h-9 animate-spin" style={{ color: 'var(--primary)' }} />
                                        : <MailCheck className="w-9 h-9" style={{ color: 'var(--accent)' }} />
                                    }
                                </div>

                                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
                                    {verificationChecking ? "Completing Signup..." : "Check Your Email"}
                                </h2>

                                <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                                    {verificationChecking
                                        ? "Email verified! Setting up your account..."
                                        : "We sent a verification link to"
                                    }
                                </p>

                                {!verificationChecking && (
                                    <>
                                        <p className="font-bold text-sm mb-6" style={{ color: 'var(--primary)' }}>
                                            {email}
                                        </p>

                                        <div
                                            className="rounded-none p-4 w-full mb-6 text-left"
                                            style={{
                                                backgroundColor: 'var(--surface-card)',
                                                border: '1px solid var(--border-solid)',
                                            }}
                                        >
                                            <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                                                Click the link in the email, then come back to this tab.
                                                It will automatically continue once verified.
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs font-medium mb-6" style={{ color: 'var(--text-subtle)' }}>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            Checking every 3 seconds...
                                        </div>

                                        <button
                                            onClick={handleResend}
                                            disabled={resendLoading}
                                            className="flex items-center gap-2 text-xs font-bold transition-all disabled:opacity-50"
                                            style={{ color: 'var(--primary)' }}
                                            onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-hover)'}
                                            onMouseLeave={e => e.currentTarget.style.color = 'var(--primary)'}
                                        >
                                            {resendLoading
                                                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                : <RefreshCw className="w-3.5 h-3.5" />
                                            }
                                            Resend verification email
                                        </button>

                                        <AnimatePresence>
                                            {resendSuccess && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: 4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="text-xs font-bold mt-3"
                                                    style={{ color: 'var(--success)' }}
                                                >
                                                    Verification email resent!
                                                </motion.p>
                                            )}
                                        </AnimatePresence>

                                        <AnimatePresence>
                                            {error && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="mt-4 rounded-none p-4 flex items-center gap-3 w-full"
                                                    style={{
                                                        backgroundColor: 'var(--destructive-bg)',
                                                        border: '1px solid color-mix(in srgb, var(--destructive) 20%, transparent)',
                                                        color: 'var(--destructive)',
                                                    }}
                                                >
                                                    <AlertCircle size={16} className="flex-shrink-0" />
                                                    <p className="text-xs font-bold">{error}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                )}
                            </div>
                        </motion.div>

                    ) : (

                        /* ── Signup Form ── */
                        <motion.div
                            key="signup"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="backdrop-blur-xl p-10 relative overflow-hidden"
                            style={{
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--glass-border)',
                                boxShadow: 'var(--shadow-lg)',
                            }}
                        >
                            {/* Arctic shimmer top */}
                            <div
                                className="absolute top-0 left-8 right-8 h-px rounded-full"
                                style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.3 }}
                            />

                            <div className="mb-8 text-center">
                                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
                                    Create Account
                                </h2>
                                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                                    Join 2,000+ founders using Demo
                                </p>
                            </div>

                            {/* Error */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mb-6 overflow-hidden"
                                    >
                                        <div
                                            className="rounded-none p-4 flex items-center gap-3"
                                            style={{
                                                backgroundColor: 'var(--destructive-bg)',
                                                border: '1px solid color-mix(in srgb, var(--destructive) 20%, transparent)',
                                                color: 'var(--destructive)',
                                            }}
                                        >
                                            <AlertCircle size={18} className="shrink-0" />
                                            <p className="text-xs font-bold leading-snug">{error}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-5">
                                {/* Google Button */}
                                <button
                                    onClick={handleGoogleSignup}
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-3 py-3.5 rounded-none text-[15px] font-semibold transition-all duration-200 disabled:opacity-50"
                                    style={{
                                        backgroundColor: 'var(--surface-card)',
                                        border: '1px solid var(--border-solid)',
                                        color: 'var(--text-main)',
                                        boxShadow: 'var(--shadow-sm)',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.backgroundColor = 'var(--surface-raised)';
                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.backgroundColor = 'var(--surface-card)';
                                        e.currentTarget.style.borderColor = 'var(--border-solid)';
                                    }}
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Sign up with Google
                                </button>

                                {/* Divider */}
                                <div className="relative flex items-center py-1">
                                    <div className="flex-grow border-t" style={{ borderColor: 'var(--border-solid)' }} />
                                    <span
                                        className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-widest"
                                        style={{ color: 'var(--text-subtle)' }}
                                    >
                                        Or enter details
                                    </span>
                                    <div className="flex-grow border-t" style={{ borderColor: 'var(--border-solid)' }} />
                                </div>

                                <form onSubmit={handleSignup} className="space-y-4">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-xs font-bold mb-2 ml-1" style={{ color: 'var(--text-muted)' }}>
                                            Full Name
                                        </label>
                                        <input
                                            type="text" value={name} onChange={(e) => setName(e.target.value)}
                                            placeholder="Your name" required
                                            className="w-full rounded-none pl-5 pr-6 py-3.5 text-base font-medium outline-none transition-all"
                                            style={inputBase}
                                            onFocus={onInputFocus}
                                            onBlur={onInputBlur}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-xs font-bold mb-2 ml-1" style={{ color: 'var(--text-muted)' }}>
                                            Work Email
                                        </label>
                                        <input
                                            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@company.com" required
                                            className="w-full rounded-none pl-5 pr-6 py-3.5 text-base font-medium outline-none transition-all"
                                            style={inputBase}
                                            onFocus={onInputFocus}
                                            onBlur={onInputBlur}
                                        />
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-xs font-bold mb-2 ml-1" style={{ color: 'var(--text-muted)' }}>
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password} onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Create a strong password" required
                                                className="w-full rounded-none pl-5 pr-14 py-3.5 text-base font-medium outline-none transition-all"
                                                style={inputBase}
                                                onFocus={onInputFocus}
                                                onBlur={onInputBlur}
                                            />
                                            <button
                                                type="button" onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-5 top-1/2 -translate-y-1/2 transition-colors"
                                                style={{ color: 'var(--text-subtle)' }}
                                                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-subtle)'}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block text-xs font-bold mb-2 ml-1" style={{ color: 'var(--text-muted)' }}>
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Repeat your password" required
                                                className="w-full rounded-none pl-5 pr-14 py-3.5 text-base font-medium outline-none transition-all"
                                                style={{
                                                    backgroundColor: 'var(--surface-card)',
                                                    color: 'var(--text-main)',
                                                    border: confirmPassword && confirmPassword !== password
                                                        ? '1px solid var(--destructive)'
                                                        : confirmPassword && confirmPassword === password
                                                            ? '1px solid var(--success)'
                                                            : '1px solid var(--border-solid)',
                                                }}
                                                onFocus={e => {
                                                    if (!confirmPassword || confirmPassword === password) {
                                                        e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent)';
                                                    }
                                                }}
                                                onBlur={e => { e.currentTarget.style.boxShadow = 'none'; }}
                                            />
                                            <button
                                                type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-5 top-1/2 -translate-y-1/2 transition-colors"
                                                style={{ color: 'var(--text-subtle)' }}
                                                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-subtle)'}
                                            >
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                            {confirmPassword && confirmPassword === password && (
                                                <CheckCircle2
                                                    className="absolute right-12 top-1/2 -translate-y-1/2 w-4 h-4"
                                                    style={{ color: 'var(--success)' }}
                                                />
                                            )}
                                        </div>
                                        {confirmPassword && confirmPassword !== password && (
                                            <p className="text-[11px] font-semibold mt-1.5 ml-1" style={{ color: 'var(--destructive)' }}>
                                                Passwords don't match
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit" disabled={loading}
                                        className="w-full py-4 mt-2 rounded-none font-bold text-base flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 70%, var(--accent)))',
                                            color: '#ffffff',
                                            boxShadow: '0 4px 20px color-mix(in srgb, var(--primary) 35%, transparent)',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.boxShadow = '0 6px 28px color-mix(in srgb, var(--accent) 30%, transparent)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.boxShadow = '0 4px 20px color-mix(in srgb, var(--primary) 35%, transparent)';
                                        }}
                                    >
                                        {loading
                                            ? <Loader2 className="w-5 h-5 animate-spin" />
                                            : <>Create Account <ArrowRight className="w-5 h-5" /></>
                                        }
                                    </button>
                                </form>
                            </div>

                            <p className="mt-8 text-center text-xs font-medium px-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                                Already have an account?{' '}
                                <span
                                    onClick={() => router.push('/login')}
                                    className="font-bold hover:underline cursor-pointer"
                                    style={{ color: 'var(--primary)' }}
                                >
                                    Log In
                                </span>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer badge */}
                <div className="mt-8 flex items-center justify-center">
                    <div
                        className="flex items-center gap-2 px-4 py-2 backdrop-blur-sm"
                        style={{
                            backgroundColor: 'var(--surface)',
                            border: '1px solid var(--glass-border)',
                        }}
                    >
                        <ShieldCheck className="w-4 h-4" style={{ color: 'var(--success)' }} />
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                            Enterprise Secure
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};