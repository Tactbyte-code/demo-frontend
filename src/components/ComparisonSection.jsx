"use client";

import { motion } from 'framer-motion';
import {
    XCircle,
    CheckCircle2,
    Zap,
    Clock,
    Target,
    TrendingUp,
    Search,
    BrainCircuit,
    ArrowRight,
    Shield,
} from 'lucide-react';

const comparisonData = [
    {
        label: "Market Research",
        before: "Expensive, slow market research",
        after: "Proven demand signals from thousands of sources",
        icon: Search
    },
    {
        label: "Idea generation",
        before: "Random idea brainstorming with no data",
        after: "Data-driven decisions backed by real evidence",
        icon: BrainCircuit
    },
    {
        label: "Timely result",
        before: "Weeks of validation before you can move",
        after: "Higher success probability from day one",
        icon: Target
    },
    {
        label: "failure shield",
        before: "High failure risk from unvalidated assumptions",
        after: "Faster product development with less guesswork",
        icon: Shield
    }
];

const stats = [
    { icon: Clock, value: "94%", label: "Time Reduction", desc: "vs. traditional research" },
    { icon: TrendingUp, value: "10x", label: "Data Granularity", desc: "more signal per insight" },
    { icon: Zap, value: "Instant", label: "Insight Delivery", desc: "from raw data to action" },
];

export default function ComparisonSection() {
    return (
        <section className="pb-24 bg-background relative overflow-hidden">

            {/* Subtle background glow */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-6xl mx-auto px-6">

                {/* ── Header ───────────────────────────── */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 text-primary font-bold text-xs uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        The Paradigm Shift
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight"
                    >
                        Stop guessing. <br />
                        <span className="text-primary">Start building with certainty.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-muted text-lg max-w-xl mx-auto"
                    >
                        See exactly how we replace outdated research workflows with
                        precision intelligence.
                    </motion.p>
                </div>

                {/* ── Column Headers ───────────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="hidden lg:grid grid-cols-[1fr_56px_1fr] mb-3 px-2"
                >
                    <div className="flex items-center gap-2.5 px-6">
                        <div className="w-2 h-2 rounded-full bg-destructive/50" />
                        <span className="text-xs font-black text-subtle uppercase tracking-[0.25em]">
                            Before — The Old Way
                        </span>
                    </div>
                    <div />
                    <div className="flex items-center gap-2.5 px-6">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-xs font-black text-primary uppercase tracking-[0.25em]">
                            After — With Demo
                        </span>
                    </div>
                </motion.div>

                {/* ── Comparison Rows ───────────────────── */}
                <div className="rounded-[2rem] border border-border-solid overflow-hidden bg-surface shadow-md">
                    {comparisonData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`
                                grid grid-cols-1 lg:grid-cols-[1fr_56px_1fr]
                                ${index !== comparisonData.length - 1 ? 'border-b border-border' : ''}
                                group hover:bg-surface-raised transition-colors duration-300
                            `}
                        >
                            {/* Before */}
                            <div className="flex items-start gap-5 p-8 lg:p-10">
                                <div className="shrink-0 mt-0.5 p-2.5 rounded-xl bg-destructive-bg border border-destructive/15 text-destructive opacity-50 group-hover:opacity-80 transition-opacity duration-300">
                                    <XCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="block text-[10px] font-black text-subtle uppercase tracking-widest mb-2">
                                        {item.label}
                                    </span>
                                    <p className="text-muted text-sm leading-relaxed">
                                        {item.before}
                                    </p>
                                </div>
                            </div>

                            {/* Center icon */}
                            <div className="hidden lg:flex flex-col items-center justify-center gap-2 border-x border-border py-4">
                                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                                    <item.icon className="w-4 h-4" />
                                </div>
                                <ArrowRight className="w-3 h-3 text-border-solid group-hover:text-primary transition-colors duration-300" />
                            </div>

                            {/* After */}
                            <div className="flex items-start gap-5 p-8 lg:p-10 bg-primary/[0.02] border-t border-border lg:border-t-0">
                                <div className="shrink-0 mt-0.5 p-2.5 rounded-xl bg-success-bg border border-success/20 text-success group-hover:scale-110 transition-transform duration-300">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2">
                                        With Demo
                                    </span>
                                    <p className="text-foreground text-sm leading-relaxed font-medium">
                                        {item.after}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── Stats Row ─────────────────────────── */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex items-center gap-5 p-6 rounded-2xl bg-surface border border-border-solid hover:border-primary/25 hover:shadow-md transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary group-hover:bg-primary/12 group-hover:scale-110 transition-all duration-300">
                                <stat.icon className="w-5 h-5" />
                            </div>

                            {/* Text */}
                            <div>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-2xl font-black tracking-tighter text-foreground leading-none">
                                        {stat.value}
                                    </span>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-wider">
                                        {stat.label}
                                    </span>
                                </div>
                                <p className="text-xs text-subtle mt-1">{stat.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}