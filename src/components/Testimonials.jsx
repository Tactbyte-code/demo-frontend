"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "Lead Product Manager",
        company: "Nexus Systems",
        result: "32% Faster Iteration",
        content: "We started building based on the Frustration Scores. It's the closest thing to having a direct line into our users' brains.",
        index: "01"
    },
    {
        id: 2,
        name: "Marcus Thorne",
        role: "Startup Founder",
        company: "Velocity AI",
        result: "P-M Fit in 4 Months",
        content: "The Demand Signals caught a Reddit thread we completely missed. That one insight led to our most successful feature launch to date.",
        index: "02"
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "UX Strategy Lead",
        company: "Pixel & Code",
        result: "80% Less Manual Research",
        content: "I used to spend weeks on qualitative research. Now, the AI Sentiment Analysis gives me a baseline in minutes. It's a total paradigm shift.",
        index: "03"
    }
];

export default function Testimonials() {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState(1);
    const timerRef = useRef(null);

    const resetTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => go(1), 6000);
    };

    useEffect(() => {
        resetTimer();
        return () => clearInterval(timerRef.current);
    }, [active]);

    const go = (dir) => {
        setDirection(dir);
        setActive((p) => (p + dir + testimonials.length) % testimonials.length);
    };

    const goTo = (i) => {
        setDirection(i > active ? 1 : -1);
        setActive(i);
        resetTimer();
    };

    const t = testimonials[active];

    return (
        <section className="relative py-16 md:py-24 overflow-hidden select-none bg-background">

            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[50%] h-[60%] bg-primary/5 blur-[80px] md:blur-[130px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-5 md:px-6 lg:px-12">

                {/* ── Header ───────────────────────────── */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-14">
                    <div className="text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 text-primary font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] px-4 py-2 mb-4 md:mb-5"
                        >
                            <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
                            Validation Pulse
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight md:leading-none"
                        >
                            Real results.<br />
                            <span className="text-primary">Real conviction.</span>
                        </motion.h2>
                    </div>

                    {/* Pill indicators - Desktop/Tablet */}
                    <div className="hidden sm:flex items-center gap-2.5">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`
                                    relative h-1.5 md:h-2 transition-all duration-500 cursor-pointer
                                    ${i === active
                                        ? 'w-8 md:w-10 bg-primary'
                                        : 'w-1.5 md:w-2 bg-border-solid hover:bg-primary/40'
                                    }
                                `}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Main Card ─────────────────────────── */}
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={active}
                        custom={direction}
                        initial={{ opacity: 0, x: direction > 0 ? 20 : -20, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: "easeOut" } }}
                        exit={{ opacity: 0, x: direction > 0 ? -20 : 20, filter: 'blur(6px)', transition: { duration: 0.3 } }}
                        className="grid lg:grid-cols-[1fr_auto] bg-surface border border-border-solid overflow-hidden shadow-lg rounded-none"
                    >
                        {/* Left — content */}
                        <div className="p-8 md:p-10 lg:p-14 flex flex-col justify-between gap-8 md:gap-10">

                            {/* Top row — badge + quote icon */}
                            <div className="flex items-start justify-between">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[9px] md:text-[11px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                                    <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
                                    {t.result}
                                </div>
                                <div className="p-2 md:p-2.5 bg-primary/8 border border-primary/15 text-primary opacity-60">
                                    <Quote className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                            </div>

                            {/* Quote */}
                            <blockquote className="text-xl md:text-2xl lg:text-[1.7rem] font-semibold text-foreground leading-snug tracking-tight">
                                &ldquo;{t.content}&rdquo;
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-6 border-t border-border">
                                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                    <span className="text-primary font-black text-xs md:text-sm tracking-tight">
                                        {t.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-foreground font-bold text-xs md:text-sm">{t.name}</p>
                                    <p className="text-subtle text-[10px] md:text-xs mt-0.5">
                                        {t.role}
                                        <span className="mx-1 text-border-solid">·</span>
                                        <span className="text-primary font-semibold">{t.company}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right — index panel (Hidden on Mobile/Tablet) */}
                        <div className="hidden lg:flex flex-col items-center justify-between w-24 py-10 border-l border-border-solid bg-surface-raised">
                            <span className="text-[72px] font-black leading-none tracking-tighter text-primary/15">
                                {t.index}
                            </span>
                            <div className="flex flex-col gap-3">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goTo(i)}
                                        className={`
                                            transition-all duration-300 cursor-pointer
                                            ${i === active
                                                ? 'w-1.5 h-5 bg-primary'
                                                : 'w-1.5 h-1.5 bg-border-solid hover:bg-primary/40'
                                            }
                                        `}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* ── Bottom Nav ────────────────────────── */}
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex gap-2.5 w-full md:w-auto">
                        {[
                            { label: 'Prev', dir: -1, iconClass: 'rotate-180' },
                            { label: 'Next', dir: 1, iconClass: '' },
                        ].map(({ label, dir, iconClass }) => (
                            <button
                                key={label}
                                onClick={() => { go(dir); resetTimer(); }}
                                className="group flex flex-1 md:flex-none items-center justify-center gap-2 px-5 py-3 md:py-2.5 border border-border-solid hover:border-primary/40 bg-surface text-muted hover:text-primary text-sm font-semibold transition-all duration-200 shadow-sm cursor-pointer"
                            >
                                {label === 'Prev' && (
                                    <ArrowRight className={`w-4 h-4 transition-transform group-hover:-translate-x-0.5 ${iconClass}`} />
                                )}
                                {label}
                                {label === 'Next' && (
                                    <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${iconClass}`} />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Progress bar (Hidden on mobile) */}
                    <div className="hidden sm:flex items-center gap-3">
                        <span className="text-subtle text-[11px] font-mono tabular-nums">
                            {String(active + 1).padStart(2, '0')}
                        </span>
                        <div className="w-20 md:w-28 h-px bg-border-solid relative overflow-hidden">
                            <motion.div
                                key={active}
                                className="absolute left-0 top-0 h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 6, ease: 'linear' }}
                            />
                        </div>
                        <span className="text-subtle text-[11px] font-mono tabular-nums">
                            {String(testimonials.length).padStart(2, '0')}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}