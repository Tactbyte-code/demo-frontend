"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "Lead Product Manager",
        company: "Nexus Systems",
        result: "32% Faster Iteration",
        content: "We stopped debating features and started building based on the Frustration Scores. It's the closest thing to having a direct line into our users' brains.",
        avatar: "/api/placeholder/100/100",
        index: "01"
    },
    {
        id: 2,
        name: "Marcus Thorne",
        role: "Startup Founder",
        company: "Velocity AI",
        result: "P-M Fit in 4 Months",
        content: "The Demand Signals caught a Reddit thread we completely missed. That one insight led to our most successful feature launch to date.",
        avatar: "/api/placeholder/100/100",
        index: "02"
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "UX Strategy Lead",
        company: "Pixel & Code",
        result: "80% Less Manual Research",
        content: "I used to spend weeks on qualitative research. Now, the AI Sentiment Analysis gives me a baseline in minutes. It's a total paradigm shift.",
        avatar: "/api/placeholder/100/100",
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
        <section className="relative pb-24 overflow-hidden select-none bg-white">
            <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="flex items-end justify-between mb-16">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-3 text-primary">
                            Validation Pulse
                        </p>
                        <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-none">
                            Real results.<br />
                            <span className="text-primary">Real conviction.</span>
                        </h2>
                    </div>

                    {/* Desktop pill indicators */}
                    <div className="hidden md:flex items-center gap-3">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`relative h-8 rounded-full overflow-hidden transition-all duration-500 border ${i === active
                                    ? 'w-16 bg-primary border-primary'
                                    : 'w-8 bg-surface border-glass-border hover:border-primary/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Main animated card */}
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={active}
                        custom={direction}
                        initial={{ opacity: 0, y: direction > 0 ? 40 : -40, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
                        exit={{ opacity: 0, y: direction > 0 ? -30 : 30, filter: 'blur(6px)', transition: { duration: 0.3 } }}
                        className="grid lg:grid-cols-[1fr_auto] bg-surface border border-glass-border rounded-3xl overflow-hidden shadow-xl shadow-primary/5"
                    >
                        {/* Left — main content */}
                        <div className="p-10 lg:p-14">

                            {/* Result badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 bg-primary/10 text-primary border border-primary/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                {t.result}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-2xl lg:text-[1.65rem] font-semibold text-foreground leading-[1.5] mb-10 tracking-tight">
                                &ldquo;{t.content}&rdquo;
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl border border-glass-border bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-primary font-black text-base tracking-tight">
                                        {t.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-foreground font-bold text-sm tracking-tight">{t.name}</p>
                                    <p className="text-muted text-[12px]">
                                        {t.role} ·{' '}
                                        <span className="text-primary font-semibold">{t.company}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right — index panel */}
                        <div className="hidden lg:flex flex-col items-center justify-between w-28 py-10 border-l border-glass-border bg-primary/[0.03]">
                            <span className="text-[80px] font-black leading-none tracking-tighter text-primary opacity-20">
                                {t.index}
                            </span>
                            <div className="flex flex-col gap-2.5">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goTo(i)}
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === active
                                            ? 'bg-primary scale-125'
                                            : 'bg-primary/20 hover:bg-primary/40'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Bottom nav */}
                <div className="mt-8 flex items-center justify-between">
                    <div className="flex gap-3">
                        <button
                            onClick={() => { go(-1); resetTimer(); }}
                            className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-glass-border hover:border-primary bg-surface text-muted hover:text-primary text-sm font-semibold transition-all duration-200 shadow-sm"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                            Prev
                        </button>
                        <button
                            onClick={() => { go(1); resetTimer(); }}
                            className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-glass-border hover:border-primary bg-surface text-muted hover:text-primary text-sm font-semibold transition-all duration-200 shadow-sm"
                        >
                            Next
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>

                    {/* Timed progress bar */}
                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-muted/50 text-[11px] font-mono tabular-nums">
                            {String(active + 1).padStart(2, '0')}
                        </span>
                        <div className="w-32 h-px bg-glass-border relative overflow-hidden rounded-full">
                            <motion.div
                                key={active}
                                className="absolute left-0 top-0 h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 6, ease: 'linear' }}
                            />
                        </div>
                        <span className="text-muted/50 text-[11px] font-mono tabular-nums">
                            {String(testimonials.length).padStart(2, '0')}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}