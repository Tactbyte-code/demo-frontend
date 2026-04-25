"use client";

import React, { useState, useEffect } from 'react';
import {
    Send,
    Phone,
    MessageSquare,
    CheckCircle2,
    Loader2,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getToken } from '@/utils/getToken';

export default function ContactPage() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ phone: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [authReady, setAuthReady] = useState(false);
    const router = useRouter();
    const [phoneError, setPhoneError] = useState("");
    const [messageError, setMessageError] = useState("");
    const [supportType, setSupportType] = useState("general");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) { router.replace("/login"); return; }
            const storedUser = localStorage.getItem("user");
            if (!storedUser) { router.replace("/login"); return; }
            setUser(JSON.parse(storedUser));
            setAuthReady(true);
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validate before submitting
        if (formData.phone && formData.phone.length !== 10) {
            setPhoneError("Phone number must be exactly 10 digits");
            return;
        }
        if (formData.message.length < 10) {
            setMessageError("Feedback must be at least 10 characters");
            return;
        }

        setIsSubmitting(true);

        try {
            // const firebaseUser = auth.currentUser;
            // const freshToken = await firebaseUser.getIdToken();

            const token = await getToken();
            if (!token) { router.replace("/login"); return; }

            const response = await fetch(`${apiUrl}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    phone: formData.phone ? `+ 91${formData.phone}` : null,
                    message: formData.message
                })
            });

            console.log('response: ', response);

            if (!response.ok) {
                const errorData = await response.json();
                console.log('error: ', errorData);
                throw new Error(errorData?.detail || "Submission failed");
            }
            setIsSuccess(true);
        } catch (err) {
            console.error("Submission failed", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Loading state
    if (!authReady || !user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 overflow-hidden relative">

            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/8 rounded-full blur-[130px]" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-accent/6 rounded-full blur-[110px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-2xl"
            >
                <div className="bg-surface mt-20 border border-border-solid p-8 md:p-12 shadow-lg">
                    <AnimatePresence mode="wait">

                        {/* ── Form ──────────────────────────── */}
                        {!isSuccess ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                {/* Header */}
                                <div className="mb-10">
                                    <h1 className="text-3xl font-black text-foreground mb-3 italic">
                                        Contact Support
                                    </h1>
                                    <p className="text-sm font-medium text-muted leading-relaxed">
                                        Need help or facing an issue? Tell us what’s going on and our team will get back to you within 24 hours.
                                    </p>
                                </div>

                                {/* Error */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mb-6 overflow-hidden"
                                        >
                                            <div className="bg-destructive-bg border border-destructive/20 p-4 flex items-center gap-3 text-destructive">
                                                <AlertCircle size={16} className="shrink-0" />
                                                <p className="text-xs font-semibold">{error}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="space-y-6">

                                    {/* Auto-filled user info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-semibold uppercase tracking-wide text-subtle ml-1">
                                                Full Name
                                            </label>
                                            <div className="w-full bg-surface-raised border border-border-solid rounded-none px-5 py-4 text-sm font-semibold text-muted cursor-not-allowed">
                                                {user.full_name}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-semibold uppercase tracking-wide text-subtle ml-1">
                                                Email Address
                                            </label>
                                            <div className="w-full bg-surface-raised border border-border-solid rounded-none px-5 py-4 text-sm font-semibold text-muted cursor-not-allowed truncate">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-semibold uppercase tracking-wide text-subtle ml-1">
                                            Phone Number{' '}
                                        </label>
                                        <div className="relative flex items-center">
                                            <div className="absolute left-0 flex items-center h-full px-5 border-r border-border-solid">
                                                <span className="text-sm font-semibold text-muted select-none">+91</span>
                                            </div>
                                            <input
                                                type="tel"
                                                placeholder="00000 00000"
                                                value={formData.phone}
                                                className={`w-full bg-background border rounded-none pl-20 pr-6 py-4 text-sm font-semibold text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 primary/20 transition-all ${phoneError ? 'border-destructive/50 focus:border-destructive/50' : 'border-border-solid focus:border-primary/40'}`}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10); // only numbers, max 10
                                                    setFormData({ ...formData, phone: val });
                                                    if (val.length > 0 && val.length !== 10) {
                                                        setPhoneError("Phone number must be exactly 10 digits");
                                                    } else {
                                                        setPhoneError("");
                                                    }
                                                }}
                                            />
                                        </div>
                                        {phoneError && (
                                            <p className="text-[11px] font-semibold text-destructive ml-1">{phoneError}</p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-semibold uppercase tracking-wide text-subtle ml-1">
                                            Your Issues
                                            <span className="text-primary ml-1">*</span>
                                        </label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-5 top-5 text-subtle w-4 h-4" />
                                            <textarea
                                                required
                                                rows={5}
                                                placeholder="Tell us what issues you are facing and we'll resolve it at the earliest"
                                                value={formData.message}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, message: e.target.value });
                                                    if (e.target.value.length > 0 && e.target.value.length < 10) {
                                                        setMessageError("Issues must be at least 10 characters long");
                                                    } else {
                                                        setMessageError("");
                                                    }
                                                }}
                                                className={`w-full bg-background border rounded-none pl-12 pr-6 py-4 text-sm font-semibold text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-y ${messageError ? 'border-destructive/50 focus:border-destructive/50' : 'border-border-solid focus:border-primary'}`}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center ml-1">
                                            {messageError
                                                ? <p className="text-[11px] font-semibold text-destructive">{messageError}</p>
                                                : <span />
                                            }
                                            <p className={`text-[11px] font-semibold ml-auto ${formData.message.length < 10 && formData.message.length > 0
                                                ? 'text-destructive'
                                                : 'text-subtle'
                                                }`}>
                                                {formData.message.length}/10 min
                                            </p>
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="button"
                                        onClick={handleSubmit} // to be changed after creating the API
                                        // onClick={() => setIsSuccess(true)}
                                        disabled={isSubmitting}
                                        className="w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-none font-semibold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-60 active:scale-[0.98] cursor-pointer"
                                    >
                                        {isSubmitting
                                            ? <Loader2 className="w-5 h-5 animate-spin" />
                                            : <> Submit <Send className="w-4 h-4" /> </>
                                        }
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            /* ── Success ──────────────────────── */
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-12 text-center"
                            >
                                <div className="w-20 h-20 bg-success-bg border border-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-success" />
                                </div>
                                <h2 className="text-3xl font-black text-foreground mb-4 italic">
                                    Received!
                                </h2>
                                <p className="text-muted font-medium mb-10 max-w-70 mx-auto leading-relaxed">
                                    Thanks for helping us make Demo better. We've captured your feedback.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsSuccess(false);
                                        setFormData({ phone: '', message: '' });
                                        setError("");
                                    }}
                                    className="px-8 py-4 bg-surface-raised border border-border-solid text-muted rounded-none font-semibold text-xs uppercase tracking-widest hover:text-foreground hover:border-primary/30 transition-all cursor-pointer"
                                >
                                    Send another
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}