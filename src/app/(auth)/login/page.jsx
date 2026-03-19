"use client";

import React, { useState } from 'react';
import {
    Zap, ArrowRight, ShieldCheck,
    Eye, EyeOff, AlertCircle, Loader2, Home,
    Mail, CheckCircle2, KeyRound, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { auth, googleProvider } from "@/config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

// ── Steps: "email" → "otp" → "password" → "done"
const STEPS = { EMAIL: "email", OTP: "otp", PASSWORD: "password", DONE: "done" };

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    console.log('user: ', localStorage.getItem('user'));

    // Forgot password states
    const [showForgot, setShowForgot] = useState(false);
    const [forgotStep, setForgotStep] = useState(STEPS.EMAIL);
    const [forgotEmail, setForgotEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotError, setForgotError] = useState('');

    const router = useRouter();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // ── Login ─────────────────────────────────────────────────
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();
            const response = await fetch(`${apiUrl}/auth/email-login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    firebase_uid: user.uid,
                    full_name: user.displayName,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Google signup failed");
            }

            localStorage.setItem("token", token);
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
            const code = err?.code || "";

            // ← Handle Firebase specific errors
            if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
                // Could be wrong password OR a Google account trying email login
                // Check backend to distinguish
                const check = await fetch(`${apiUrl}/auth/check-provider`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email })
                });

                console.log('check: ', check);
                if (check.ok) {
                    const checkData = await check.json();
                    if (checkData.provider === "google") {
                        setError("This account uses Google Sign-In. Please use 'Continue with Google'.");
                    } else {
                        setError("Incorrect password. Please try again.");
                    }
                } else {
                    setError("Incorrect email or password.");
                }
            } else if (code === "auth/user-not-found") {
                setError("No account found with this email.");
            } else if (code === "auth/too-many-requests") {
                setError("Too many attempts. Please try again later.");
            } else {
                setError(err.message || "Login failed.");
            }
        } finally {
            setLoading(false);
        }
    };

    // ── Google Login ──────────────────────────────────────────
    const handleGoogleLogin = async () => {
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

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Google signup failed");
            }

            localStorage.setItem("token", token);
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
            console.error("Error: ", err);
            setError("Google Authentication Failed.");
        } finally {
            setLoading(false);
        }
    };

    // ── Step 1: Send OTP ──────────────────────────────────────
    const handleSendOTP = async (e) => {
        e.preventDefault();
        setForgotError("");
        setForgotLoading(true);
        try {
            const response = await fetch(`${apiUrl}/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotEmail })
            });
            const data = await response.json();
            console.log('response data: ', data);

            if (!response.ok) throw new Error(data.detail || "Failed to send OTP");
            setForgotStep(STEPS.OTP);
        } catch (err) {
            console.log('Error: ', err);
            setForgotError(err.message);
        } finally {
            setForgotLoading(false);
        }
    };

    // ── Step 2: Verify OTP ────────────────────────────────────
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setForgotError("");
        setForgotLoading(true);
        try {
            const response = await fetch(`${apiUrl}/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotEmail, otp })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.detail || "Invalid OTP");
            setResetToken(data.reset_token);
            setForgotStep(STEPS.PASSWORD);
        } catch (err) {
            setForgotError(err.message);
        } finally {
            setForgotLoading(false);
        }
    };

    // ── Step 3: Reset Password ────────────────────────────────
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setForgotError("");
        if (newPassword !== confirmNewPassword) {
            setForgotError("Passwords do not match");
            return;
        }
        setForgotLoading(true);
        try {
            const response = await fetch(`${apiUrl}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reset_token: resetToken, new_password: newPassword })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.detail || "Password reset failed");
            setForgotStep(STEPS.DONE);
        } catch (err) {
            setForgotError(err.message);
        } finally {
            setForgotLoading(false);
        }
    };

    const resetForgotFlow = () => {
        setShowForgot(false);
        setForgotStep(STEPS.EMAIL);
        setForgotEmail('');
        setOtp('');
        setResetToken('');
        setNewPassword('');
        setConfirmNewPassword('');
        setForgotError('');
    };

    // ── Shared input style helpers ────────────────────────────
    const inputClass = "w-full rounded-2xl px-6 py-4 text-base font-medium transition-all outline-none";

    const inputStyle = {
        backgroundColor: 'var(--surface-card)',
        border: '1px solid var(--border-solid)',
        color: 'var(--text-main)',
    };

    const onFocus = e => {
        e.currentTarget.style.borderColor = 'var(--primary)';
        e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent)';
    };

    const onBlur = e => {
        e.currentTarget.style.borderColor = 'var(--border-solid)';
        e.currentTarget.style.boxShadow = 'none';
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6 font-sans overflow-hidden relative"
            style={{ backgroundColor: 'var(--background)' }}
        >
            <Link
                href="/"
                className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--text-muted)', boxShadow: 'var(--shadow-sm)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-solid)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
                <Home size={16} />
                <span>Go to Home</span>
            </Link>

            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[130px] animate-pulse pointer-events-none"
                style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 12%, transparent)' }} />
            <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[110px] pointer-events-none"
                style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)' }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10 w-full max-w-115"
            >
                {/* Brand */}
                <div className="flex flex-row gap-4 items-center mt-4 justify-center mb-2">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-md)' }}>
                        <Zap className="w-8 h-8" style={{ color: 'var(--accent)', fill: 'var(--accent)' }} />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-main)' }}>Demo</h1>
                </div>

                <p className="text-sm font-medium text-center mb-12" style={{ color: 'var(--text-subtle)' }}>
                    Intelligence at your fingertips
                </p>

                <div className="backdrop-blur-xl rounded-[2.5rem] p-10 relative overflow-hidden bg-background" style={{ border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-lg)' }}>
                    <div className="absolute top-0 left-8 right-8 h-px rounded-full" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.3 }} />
                    <AnimatePresence mode="wait">
                        {/* ── Forgot Password Flow ────────── */}
                        {showForgot ? (
                            <motion.div key="forgot"
                                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>

                                <AnimatePresence mode="wait">

                                    {/* DONE */}
                                    {forgotStep === STEPS.DONE && (
                                        <motion.div key="done"
                                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                            className="py-6 text-center">
                                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                                                style={{ backgroundColor: 'var(--success-bg)', border: '1px solid color-mix(in srgb, var(--success) 20%, transparent)' }}>
                                                <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--success)' }} />
                                            </div>
                                            <h3 className="text-xl font-black mb-2" style={{ color: 'var(--text-main)' }}>Password Reset!</h3>
                                            <p className="text-sm font-medium mb-8" style={{ color: 'var(--text-muted)' }}>
                                                Your password has been updated. You can now log in.
                                            </p>
                                            <button onClick={resetForgotFlow}
                                                className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all"
                                                style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border-solid)', color: 'var(--text-main)' }}>
                                                Back to Login
                                            </button>
                                        </motion.div>
                                    )}

                                    {/* STEP 1: Email */}
                                    {forgotStep === STEPS.EMAIL && (
                                        <motion.div key="step-email" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <div className="mb-8">
                                                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>Reset Password</h2>
                                                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                                                    Enter your email and we'll send you a 6-digit OTP.
                                                </p>
                                            </div>

                                            {forgotError && (
                                                <div className="mb-5 rounded-2xl p-4 flex items-center gap-3"
                                                    style={{ backgroundColor: 'var(--destructive-bg)', border: '1px solid color-mix(in srgb, var(--destructive) 20%, transparent)', color: 'var(--destructive)' }}>
                                                    <AlertCircle size={16} className="shrink-0" />
                                                    <p className="text-xs font-bold">{forgotError}</p>
                                                </div>
                                            )}

                                            <form onSubmit={handleSendOTP} className="space-y-5">
                                                <div>
                                                    <label className="block text-xs font-bold mb-2 ml-1" style={{ color: 'var(--text-muted)' }}>Email Address</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-subtle)' }} />
                                                        <input type="email" required placeholder="name@company.com"
                                                            value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}
                                                            className="w-full rounded-2xl pl-12 pr-6 py-4 text-base font-medium transition-all outline-none"
                                                            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                                                    </div>
                                                </div>
                                                <button type="submit" disabled={forgotLoading}
                                                    className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70"
                                                    style={{ background: 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 70%, var(--accent)))', color: '#ffffff', boxShadow: '0 4px 20px color-mix(in srgb, var(--primary) 35%, transparent)' }}>
                                                    {forgotLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send OTP <ArrowRight className="w-5 h-5" /></>}
                                                </button>
                                                <button type="button" onClick={resetForgotFlow}
                                                    className="w-full py-3 rounded-2xl font-bold text-sm transition-all"
                                                    style={{ backgroundColor: 'transparent', color: 'var(--text-subtle)' }}
                                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-main)'}
                                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-subtle)'}>
                                                    ← Back to Login
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* STEP 2: OTP */}
                                    {forgotStep === STEPS.OTP && (
                                        <motion.div key="step-otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <div className="mb-8">
                                                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>Enter OTP</h2>
                                                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                                                    We sent a 6-digit code to{' '}
                                                    <span className="font-bold" style={{ color: 'var(--primary)' }}>{forgotEmail}</span>
                                                </p>
                                            </div>

                                            {forgotError && (
                                                <div className="mb-5 rounded-2xl p-4 flex items-center gap-3"
                                                    style={{ backgroundColor: 'var(--destructive-bg)', border: '1px solid color-mix(in srgb, var(--destructive) 20%, transparent)', color: 'var(--destructive)' }}>
                                                    <AlertCircle size={16} className="shrink-0" />
                                                    <p className="text-xs font-bold">{forgotError}</p>
                                                </div>
                                            )}

                                            <form onSubmit={handleVerifyOTP} className="space-y-5">
                                                <div>
                                                    <label className="block text-xs font-bold mb-2 ml-1" style={{ color: 'var(--text-muted)' }}>6-Digit OTP</label>
                                                    <div className="relative">
                                                        <KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-subtle)' }} />
                                                        <input type="text" required placeholder="______"
                                                            maxLength={6} value={otp}
                                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                            className="w-full rounded-2xl pl-12 pr-6 py-4 text-base font-bold tracking-[0.5em] transition-all outline-none"
                                                            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                                                    </div>
                                                </div>
                                                <button type="submit" disabled={forgotLoading || otp.length !== 6}
                                                    className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70"
                                                    style={{ background: 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 70%, var(--accent)))', color: '#ffffff', boxShadow: '0 4px 20px color-mix(in srgb, var(--primary) 35%, transparent)' }}>
                                                    {forgotLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Verify OTP <ArrowRight className="w-5 h-5" /></>}
                                                </button>
                                                <button type="button" onClick={() => { setForgotStep(STEPS.EMAIL); setForgotError(''); setOtp(''); }}
                                                    className="w-full py-3 rounded-2xl font-bold text-sm transition-all"
                                                    style={{ backgroundColor: 'transparent', color: 'var(--text-subtle)' }}
                                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-main)'}
                                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-subtle)'}>
                                                    ← Resend OTP
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* STEP 3: New Password */}
                                    {forgotStep === STEPS.PASSWORD && (
                                        <motion.div key="step-password" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <div className="mb-8">
                                                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>New Password</h2>
                                                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                                                    Choose a strong password for your account.
                                                </p>
                                            </div>

                                            {forgotError && (
                                                <div className="mb-5 rounded-2xl p-4 flex items-center gap-3"
                                                    style={{ backgroundColor: 'var(--destructive-bg)', border: '1px solid color-mix(in srgb, var(--destructive) 20%, transparent)', color: 'var(--destructive)' }}>
                                                    <AlertCircle size={16} className="shrink-0" />
                                                    <p className="text-xs font-bold">{forgotError}</p>
                                                </div>
                                            )}

                                            <form onSubmit={handleResetPassword} className="space-y-5">
                                                <div>
                                                    <label className="block text-xs font-bold mb-2 ml-1" style={{ color: 'var(--text-muted)' }}>New Password</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-subtle)' }} />
                                                        <input type={showNewPassword ? "text" : "password"} required
                                                            placeholder="Create a strong password" value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                            className="w-full rounded-2xl pl-12 pr-14 py-4 text-base font-medium transition-all outline-none"
                                                            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                                                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}
                                                            className="absolute right-5 top-1/2 -translate-y-1/2 transition-colors"
                                                            style={{ color: 'var(--text-subtle)' }}>
                                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold mb-2 ml-1" style={{ color: 'var(--text-muted)' }}>Confirm Password</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-subtle)' }} />
                                                        <input type="password" required placeholder="Repeat your password"
                                                            value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                            className="w-full rounded-2xl pl-12 pr-6 py-4 text-base font-medium transition-all outline-none"
                                                            style={{
                                                                ...inputStyle,
                                                                borderColor: confirmNewPassword && confirmNewPassword !== newPassword ? 'var(--destructive)' : confirmNewPassword && confirmNewPassword === newPassword ? 'var(--success)' : 'var(--border-solid)'
                                                            }}
                                                            onFocus={onFocus} onBlur={onBlur} />
                                                    </div>
                                                    {confirmNewPassword && confirmNewPassword !== newPassword && (
                                                        <p className="text-[11px] font-semibold mt-1.5 ml-1" style={{ color: 'var(--destructive)' }}>Passwords don't match</p>
                                                    )}
                                                </div>
                                                <button type="submit" disabled={forgotLoading}
                                                    className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70"
                                                    style={{ background: 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 70%, var(--accent)))', color: '#ffffff', boxShadow: '0 4px 20px color-mix(in srgb, var(--primary) 35%, transparent)' }}>
                                                    {forgotLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Reset Password <ArrowRight className="w-5 h-5" /></>}
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}

                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            /* ── Login View ─────────────────── */
                            <motion.div key="login"
                                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>

                                <div className="mb-10 text-center">
                                    <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>Welcome Back</h2>
                                    <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Log in to manage your market insights</p>
                                </div>

                                <AnimatePresence>
                                    {error && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                                            <div className="rounded-2xl p-4 flex items-center gap-3"
                                                style={{ backgroundColor: 'var(--destructive-bg)', border: '1px solid color-mix(in srgb, var(--destructive) 20%, transparent)', color: 'var(--destructive)' }}>
                                                <AlertCircle size={18} className="flex-shrink-0" />
                                                <p className="text-xs font-bold">{error}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="space-y-6">
                                    {/* Google */}
                                    <button onClick={handleGoogleLogin} disabled={loading}
                                        className="w-full flex items-center justify-center cursor-pointer gap-3 py-3.5 rounded-2xl font-semibold text-[15px] transition-all disabled:opacity-50"
                                        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--text-main)', boxShadow: 'var(--shadow-sm)' }}
                                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--surface-card)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--surface)'; e.currentTarget.style.borderColor = 'var(--border-solid)'; }}>
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="#EA4335" d="M24 12.27c0-.85-.07-1.7-.22-2.53H12.27v4.8h6.58a5.62 5.62 0 0 1-2.44 3.7v3.08h3.94c2.31-2.13 3.65-5.26 3.65-8.85z" />
                                            <path fill="#FBBC05" d="M12.27 24c3.24 0 5.96-1.07 7.95-2.9l-3.94-3.08c-1.09.73-2.49 1.16-4.01 1.16-3.08 0-5.7-2.08-6.64-4.88H1.63v3.18A12 12 0 0 0 12.27 24z" />
                                            <path fill="#34A853" d="M5.63 14.3a7.22 7.22 0 0 1 0-4.6V6.52H1.63a12 12 0 0 0 0 10.96l4-3.18z" />
                                            <path fill="#4285F4" d="M12.27 4.78c1.76 0 3.34.6 4.58 1.8l3.44-3.44A12 12 0 0 0 1.63 6.52l4 3.18c.94-2.8 3.56-4.92 6.64-4.92z" />
                                        </svg>
                                        Continue with Google
                                    </button>

                                    <div className="relative flex items-center py-2">
                                        <div className="flex-grow border-t" style={{ borderColor: 'var(--border-solid)' }} />
                                        <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Or login with email</span>
                                        <div className="flex-grow border-t" style={{ borderColor: 'var(--border-solid)' }} />
                                    </div>

                                    <form onSubmit={handleLogin} className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-bold mb-2 ml-1" style={{ color: 'var(--text-muted)' }}>Work Email</label>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                                placeholder="name@company.com" required
                                                className={inputClass} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mb-2 ml-1">
                                                <label className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>Password</label>
                                                <button type="button"
                                                    onClick={() => { setShowForgot(true); setForgotEmail(email); setError(''); }}
                                                    className="text-[13px] font-bold transition-colors"
                                                    style={{ color: 'var(--primary)' }}
                                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-hover)'}
                                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--primary)'}>
                                                    Forgot Password?
                                                </button>
                                            </div>
                                            <div className="relative">
                                                <input type={showPassword ? "text" : "password"}
                                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="••••••••" required
                                                    className={inputClass} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-5 top-1/2 -translate-y-1/2 transition-colors"
                                                    style={{ color: 'var(--text-subtle)' }}
                                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-subtle)'}>
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        <button type="submit" disabled={loading}
                                            className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70"
                                            style={{ background: 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 70%, var(--accent)))', color: '#ffffff', boxShadow: '0 4px 20px color-mix(in srgb, var(--primary) 35%, transparent)' }}
                                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 28px color-mix(in srgb, var(--accent) 30%, transparent)'}
                                            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px color-mix(in srgb, var(--primary) 35%, transparent)'}>
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-5 h-5" /></>}
                                        </button>
                                    </form>
                                </div>

                                <div className="mt-5 flex justify-center">
                                    <Link href="/signup" className="text-xs">
                                        <span className="font-medium" style={{ color: 'var(--text-subtle)' }}>Don't have an account? </span>
                                        <span className="font-bold hover:underline" style={{ color: 'var(--primary)' }}>Sign Up</span>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-10 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--glass-border)' }}>
                        <ShieldCheck className="w-4 h-4" style={{ color: 'var(--success)' }} />
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Enterprise Secure</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}