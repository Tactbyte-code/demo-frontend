"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Zap, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getToken } from '@/utils/getToken';
import { questions } from '@/utils/data';
import { useCreditStore } from '@/store/useCreditStore';

// ── Background orbs ───────────────────────────────────────────────────────────
function BackgroundOrbs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div className="absolute rounded-full"
                style={{ width: 420, height: 420, top: '-10%', left: '-15%', background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 22%, transparent), transparent 70%)', filter: 'blur(2px)' }}
                animate={{ x: [0, 18, 0], y: [0, -12, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.div className="absolute rounded-full"
                style={{ width: 280, height: 280, bottom: '5%', right: '-8%', background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%)', filter: 'blur(2px)' }}
                animate={{ x: [0, -14, 0], y: [0, 16, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
            <motion.div className="absolute rounded-full"
                style={{ width: 160, height: 160, top: '45%', left: '35%', background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 10%, transparent), transparent 70%)' }}
                animate={{ x: [0, 10, 0], y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
            <div className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: 'radial-gradient(circle, var(--text-main) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        </div>
    );
};

// ── Left panel ────────────────────────────────────────────────────────────────
function LeftPanel({ step, done }) {
    const steps = questions.map((q) => ({ label: q.question, number: q.step }));
    return (
        <div className="relative hidden lg:flex flex-col justify-between p-10 overflow-hidden"
            style={{ background: 'linear-gradient(160deg, var(--surface) 0%, color-mix(in srgb, var(--primary) 8%, var(--background)) 100%)', borderRight: '1px solid var(--glass-border)', minWidth: 340, maxWidth: 380 }}>
            <BackgroundOrbs />
            <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-12">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', boxShadow: '0 2px 14px color-mix(in srgb, var(--primary) 40%, transparent)' }}>
                        <Zap className="w-4 h-4 text-white fill-white" />
                    </div>
                    <span className="text-sm font-black tracking-tight" style={{ color: 'var(--text-main)' }}>DEMO</span>
                </div>
                <div className="mb-10">
                    <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-main)' }}>Let's get you set up</h1>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>A few quick questions to personalize your experience.</p>
                </div>
                <div className="flex flex-col gap-1">
                    {steps.map((s, i) => {
                        const isActive = i === step && !done;
                        const isComplete = i < step || done;
                        return (
                            <div key={i} className="flex items-start gap-3.5">
                                <div className="flex flex-col items-center gap-0 pt-0.5">
                                    <motion.div
                                        animate={{ backgroundColor: isComplete || isActive ? 'var(--primary)' : 'var(--surface-raised)', borderColor: isComplete || isActive ? 'var(--primary)' : 'var(--border-solid)', scale: isActive ? 1.15 : 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                                    >
                                        <AnimatePresence mode="wait">
                                            {isComplete ? (
                                                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                                                </motion.div>
                                            ) : isActive ? (
                                                <motion.div key="dot" initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 rounded-full bg-white" />
                                            ) : (
                                                <motion.div key="empty" initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--border-solid)' }} />
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                    {i < steps.length - 1 && (
                                        <div className="w-px flex-1 my-1" style={{ height: 28, background: isComplete ? 'linear-gradient(180deg, var(--primary), color-mix(in srgb, var(--primary) 30%, var(--border-solid)))' : 'var(--border-solid)', transition: 'background 0.4s ease' }} />
                                    )}
                                </div>
                                <div className="pb-7">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] font-mono mb-0.5"
                                        style={{ color: isActive || isComplete ? 'var(--primary)' : 'var(--text-subtle)' }}>Step {s.number}</p>
                                    <p className="text-[13px] font-semibold leading-tight"
                                        style={{ color: isActive ? 'var(--text-main)' : isComplete ? 'var(--text-muted)' : 'var(--text-subtle)' }}>{s.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                    style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--glass-border)' }}>
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                    <p className="text-[11px] leading-snug" style={{ color: 'var(--text-muted)' }}>Your answers help us tailor insights just for you.</p>
                </div>
            </div>
        </div>
    );
};

// ── Done screen ───────────────────────────────────────────────────────────────
function DoneScreen({ answers, router }) {
    return (
        <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            className="relative overflow-hidden">

            {/* Top accent line */}
            <div className="h-px w-full"
                style={{ background: 'linear-gradient(90deg, transparent 0%, var(--primary) 30%, var(--accent) 70%, transparent 100%)' }} />

            {/* Ambient floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(14)].map((_, i) => (
                    <motion.div key={i} className="absolute rounded-full"
                        style={{
                            width: i % 3 === 0 ? 5 : i % 3 === 1 ? 3 : 2,
                            height: i % 3 === 0 ? 5 : i % 3 === 1 ? 3 : 2,
                            left: `${6 + (i * 6.8) % 86}%`,
                            top: `${8 + (i * 11) % 76}%`,
                            backgroundColor: i % 2 === 0 ? 'var(--primary)' : 'var(--accent)',
                        }}
                        animate={{ y: [0, -(8 + (i % 5) * 4), 0], opacity: [0.1, 0.35, 0.1], scale: [1, 1.4, 1] }}
                        transition={{ duration: 2.8 + (i % 4) * 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                    />
                ))}
            </div>

            <div className="p-8 flex flex-col items-center text-center relative z-10">

                {/* Icon with double-pulse rings */}
                <div className="relative mb-6 mt-2">
                    <motion.div className="absolute -inset-4 rounded-3xl"
                        style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
                        animate={{ scale: [1, 1.28, 1], opacity: [0.15, 0, 0.15] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
                    <motion.div className="absolute -inset-2 rounded-2xl"
                        style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
                        animate={{ scale: [1, 1.14, 1], opacity: [0.25, 0, 0.25] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
                    <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', boxShadow: '0 0 48px color-mix(in srgb, var(--primary) 45%, transparent)' }}>
                        <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.1, duration: 0.45, type: 'spring', stiffness: 240, damping: 16 }}>
                            <Check className="w-7 h-7 text-white" strokeWidth={2.5} />
                        </motion.div>
                    </div>
                </div>

                {/* Badge */}
                <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                    className="text-[9px] font-black uppercase tracking-[0.25em] font-mono px-2.5 py-0.5 rounded mb-2 inline-block"
                    style={{ color: 'var(--success)', backgroundColor: 'var(--success-bg)', border: '1px solid color-mix(in srgb, var(--success) 20%, transparent)' }}>
                    Setup Complete
                </motion.span>

                <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
                    className="text-2xl font-bold tracking-tight mb-1.5" style={{ color: 'var(--text-main)' }}>
                    You're all set!
                </motion.h2>

                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="text-sm leading-relaxed mb-7 max-w-xs" style={{ color: 'var(--text-muted)' }}>
                    Your workspace is being personalized based on your profile.
                </motion.p>

                {/* Profile summary card */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
                    className="w-full rounded-2xl p-4 mb-6 text-left"
                    style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--glass-border)' }}>

                    <div className="flex items-center gap-2 mb-3.5">
                        <div className="w-4 h-4 rounded flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                            <Sparkles className="w-2.5 h-2.5 text-white" />
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] font-mono" style={{ color: 'var(--text-subtle)' }}>
                            Your Profile Summary
                        </p>
                    </div>

                    <div className="flex flex-col gap-3.5">
                        {questions.map((q, qi) => {
                            const ans = answers[q.id] ?? [];
                            if (!ans.length) return null;
                            return (
                                <motion.div key={qi} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.44 + qi * 0.08 }}>
                                    {qi > 0 && <div className="h-px mb-3.5" style={{ backgroundColor: 'var(--border-solid)' }} />}
                                    <p className="text-[10px] font-semibold mb-2" style={{ color: 'var(--text-subtle)' }}>{q.question}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {ans.slice(0, 5).map((a, ai) => (
                                            <motion.span key={a}
                                                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.5 + qi * 0.08 + ai * 0.04 }}
                                                className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                                                style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 12%, var(--surface))', color: 'var(--primary)', border: '1px solid color-mix(in srgb, var(--primary) 22%, transparent)' }}>
                                                {a}
                                            </motion.span>
                                        ))}
                                        {ans.length > 5 && (
                                            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                                                style={{ backgroundColor: 'var(--surface-raised)', color: 'var(--text-subtle)', border: '1px solid var(--border-solid)' }}>
                                                +{ans.length - 5} more
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.button
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 32px color-mix(in srgb, var(--primary) 50%, transparent)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 65%, var(--accent)))', color: '#fff', boxShadow: '0 4px 20px color-mix(in srgb, var(--primary) 35%, transparent)', border: '1px solid transparent' }}
                    onClick={() => router.replace("/dashboard")}
                >
                    Go to Dashboard <ArrowRight className="w-4 h-4" />
                </motion.button>
            </div>
        </motion.div>
    );
};

// ── Main page ─────────────────────────────────────────────────────────────────
export default function OnboardingPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [done, setDone] = useState(false);
    const [dir, setDir] = useState(1);
    const [authReady, setAuthReady] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const { getCredits } = useCreditStore();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (!firebaseUser) { router.replace("/login"); return; }
            const storedUser = localStorage.getItem("user");
            if (!storedUser) { router.replace("/login"); return; }
            const user = JSON.parse(storedUser);
            if (user.is_onboarded) { router.replace("/dashboard"); return; }
            setAuthReady(true);
        });
        return () => unsubscribe();
    }, []);

    const q = questions[step];
    const selected = answers[q?.id] ?? [];
    const hasAnswer = selected.length > 0;
    const isLast = step === questions.length - 1;

    const toggle = (opt) => {
        setAnswers(prev => {
            const cur = prev[q.id] ?? [];
            if (q.multi) {
                return { ...prev, [q.id]: cur.includes(opt) ? cur.filter(o => o !== opt) : [...cur, opt] };
            } else {
                return { ...prev, [q.id]: cur.includes(opt) ? [] : [opt] };
            }
        });
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setError("");

        try {
            const token = await getToken();
            if (!token) { router.replace("/login"); return; }

            const response = await fetch(`${apiUrl}/onboarding`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({
                    discovery: answers.discovery || [],
                    usage: answers.usage || [],
                    occupation: (answers.occupation || [])[0] || ""
                })
            });

            // ← read body only once
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Submission failed");
            };

            await getCredits(true);

            const storedUser = localStorage.getItem("user");

            if (storedUser) {
                const user = JSON.parse(storedUser);
                localStorage.setItem("user", JSON.stringify({ ...user, is_onboarded: true }));
                window.dispatchEvent(new Event("userUpdated"));
            }

            setDone(true);
        } catch (err) {
            console.error("Onboarding error:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const next = () => {
        if (!hasAnswer) return;
        if (isLast) { handleSubmit(); return; }
        setDir(1);
        setStep(s => s + 1);
    };

    const back = () => {
        if (step === 0) return;
        setDir(-1);
        setStep(s => s - 1);
    };

    if (!authReady) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
                <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded-full animate-spin"
                        style={{ border: '2px solid var(--border-solid)', borderTopColor: 'var(--primary)' }} />
                    <div className="absolute inset-2 rounded-full animate-spin"
                        style={{ border: '2px solid transparent', borderTopColor: 'var(--accent)', animationDirection: 'reverse', animationDuration: '0.7s' }} />
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex items-stretch font-sans" style={{ backgroundColor: 'var(--background)' }}>
            <LeftPanel step={step} done={done} />

            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div className="absolute rounded-full"
                        style={{ width: 500, height: 500, bottom: '-20%', right: '-15%', background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 6%, transparent), transparent 65%)' }}
                        animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
                </div>

                {/* Mobile brand */}
                <div className="lg:hidden flex items-center gap-2 mb-8 relative z-10">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                        <Zap className="w-3.5 h-3.5 text-white fill-white" />
                    </div>
                    <span className="text-sm font-black tracking-tight" style={{ color: 'var(--text-main)' }}>Problem Pulse</span>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="relative z-10 w-full max-w-lg">
                    <div className="rounded-2xl overflow-hidden"
                        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-lg)' }}>

                        {/* Progress bar */}
                        <div className="relative h-1 w-full" style={{ backgroundColor: 'var(--surface-raised)' }}>
                            <motion.div className="h-full rounded-full"
                                style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}
                                animate={{ width: done ? '100%' : `${((step + 1) / questions.length) * 100}% ` }}
                                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }} />
                        </div>

                        <AnimatePresence mode="wait" custom={dir}>
                            {!done ? (
                                <motion.div key={step} custom={dir}
                                    initial={{ opacity: 0, x: dir > 0 ? 28 : -28 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: dir > 0 ? -28 : 28 }}
                                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                                    className="p-8">

                                    {/* Header */}
                                    <div className="mb-7">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-black uppercase tracking-[0.25em] font-mono px-2 py-0.5 rounded"
                                                    style={{ color: 'var(--primary)', backgroundColor: 'var(--info-bg)', border: '1px solid color-mix(in srgb, var(--primary) 20%, transparent)' }}>
                                                    {q.step} / {questions.length}
                                                </span>
                                                {q.multi && (
                                                    <span className="text-[9px] font-semibold uppercase tracking-widest font-mono" style={{ color: 'var(--text-subtle)' }}>
                                                        multi-select
                                                    </span>
                                                )}
                                            </div>
                                            <AnimatePresence>
                                                {selected.length > 0 && (
                                                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                                        className="text-[10px] font-bold font-mono px-2 py-0.5 rounded"
                                                        style={{ color: 'var(--success)', backgroundColor: 'var(--success-bg)', border: '1px solid color-mix(in srgb, var(--success) 20%, transparent)' }}>
                                                        {selected.length} selected
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>{q.question}</h2>
                                        <p className="text-xs mt-1" style={{ color: 'var(--text-subtle)' }}>{q.hint}</p>
                                    </div>

                                    {/* Chips */}
                                    <div className="flex flex-wrap gap-2 mb-7 max-h-64 overflow-y-auto pr-1"
                                        style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--border-solid) transparent' }}>
                                        {q.options.map((opt, idx) => {
                                            const isSelected = selected.includes(opt);
                                            return (
                                                <motion.button key={opt}
                                                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.015, duration: 0.18 }}
                                                    onClick={() => toggle(opt)}
                                                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer"
                                                    style={{
                                                        backgroundColor: isSelected ? 'var(--primary)' : 'var(--surface-card)',
                                                        color: isSelected ? '#fff' : 'var(--text-muted)',
                                                        border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-solid)'} `,
                                                        boxShadow: isSelected ? '0 2px 10px color-mix(in srgb, var(--primary) 30%, transparent)' : 'none',
                                                        transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                                                    }}
                                                    onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.backgroundColor = 'var(--info-bg)'; } }}
                                                    onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = 'var(--border-solid)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.backgroundColor = 'var(--surface-card)'; } }}
                                                >
                                                    <AnimatePresence>
                                                        {isSelected && (
                                                            <motion.span initial={{ width: 0, opacity: 0 }} animate={{ width: 'auto', opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.15 }} className="overflow-hidden">
                                                                <Check className="w-3 h-3 flex-shrink-0" strokeWidth={3} />
                                                            </motion.span>
                                                        )}
                                                    </AnimatePresence>
                                                    {opt}
                                                </motion.button>
                                            );
                                        })}
                                    </div>

                                    {/* Error */}
                                    <AnimatePresence>
                                        {error && (
                                            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                                className="mb-4 flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold"
                                                style={{ backgroundColor: 'var(--destructive-bg)', border: '1px solid color-mix(in srgb, var(--destructive) 20%, transparent)', color: 'var(--destructive)' }}>
                                                {error}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Divider */}
                                    <div className="h-px w-full mb-6" style={{ background: 'linear-gradient(90deg, var(--border-solid), color-mix(in srgb, var(--primary) 20%, transparent), var(--border-solid))' }} />

                                    {/* Nav */}
                                    <div className="flex items-center justify-between">
                                        <button onClick={back} disabled={step === 0}
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
                                            style={{ color: step === 0 ? 'var(--text-subtle)' : 'var(--text-muted)', cursor: step === 0 ? 'not-allowed' : 'pointer', backgroundColor: 'transparent', border: `1px solid ${step === 0 ? 'var(--surface-raised)' : 'var(--border-solid)'} `, opacity: step === 0 ? 0.4 : 1 }}
                                            onMouseEnter={e => { if (step > 0) { e.currentTarget.style.backgroundColor = 'var(--surface-card)'; e.currentTarget.style.color = 'var(--text-main)'; } }}
                                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = step === 0 ? 'var(--text-subtle)' : 'var(--text-muted)'; }}>
                                            <ArrowLeft className="w-3.5 h-3.5" /> Back
                                        </button>
                                        <button onClick={next} disabled={!hasAnswer || submitting}
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150"
                                            style={{ background: hasAnswer ? 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 70%, var(--accent)))' : 'var(--surface-card)', color: hasAnswer ? '#fff' : 'var(--text-subtle)', cursor: hasAnswer && !submitting ? 'pointer' : 'not-allowed', border: `1px solid ${hasAnswer ? 'transparent' : 'var(--border-solid)'} `, boxShadow: hasAnswer ? '0 2px 16px color-mix(in srgb, var(--primary) 30%, transparent)' : 'none', opacity: !hasAnswer ? 0.6 : 1 }}>
                                            {submitting ? (
                                                <><div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Processing…</>
                                            ) : (
                                                <>{isLast ? 'Finish' : 'Continue'} <ArrowRight className="w-3.5 h-3.5" /></>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <DoneScreen answers={answers} router={router} />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Step dots — mobile only */}
                    {!done && (
                        <div className="lg:hidden flex items-center justify-center gap-1.5 mt-5">
                            {questions.map((_, i) => (
                                <motion.div key={i}
                                    animate={{ width: i === step ? '1.25rem' : '0.35rem', backgroundColor: i <= step ? 'var(--primary)' : 'var(--border-solid)' }}
                                    transition={{ duration: 0.3 }}
                                    className="rounded-full" style={{ height: '0.35rem' }} />
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}