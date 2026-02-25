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
    BrainCircuit
} from 'lucide-react';

const comparisonData = [
    {
        label: "Market Research",
        before: "Spending weeks manually reading Reddit threads and App Store reviews.",
        after: "Instant extraction of millions of data points across all platforms.",
        icon: Search
    },
    {
        label: "Sentiment Analysis",
        before: "Subjective guessing based on a handful of vocal users.",
        after: "Objective Frustration Scoring using proprietary NLP models.",
        icon: BrainCircuit
    },
    {
        label: "Feature Prioritization",
        before: "Building based on 'gut feeling' or internal team opinions.",
        after: "Data-backed roadmaps focused on highest-impact user pain points.",
        icon: Target
    }
];

export default function ComparisonSection() {
    return (
        <section className="pb-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Area */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
                    >
                        The Paradigm Shift
                    </motion.span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                        Stop guessing. <br />
                        <span className="text-primary">Start building with certainty.</span>
                    </h2>
                </div>

                {/* --- NON-CARD COMPARISON UI --- */}
                <div className="relative border border-glass-border rounded-[3rem] overflow-hidden bg-surface">

                    {/* Background Labels (Subtle) */}
                    <div className="absolute inset-0 flex pointer-events-none">
                        <div className="flex-1 border-r border-glass-border flex items-start justify-center pt-8">
                            <span className="text-[60px] font-black text-black/[0.03] uppercase">Before</span>
                        </div>
                        <div className="flex-1 flex items-start justify-center pt-8">
                            <span className="text-[60px] font-black text-primary/[0.03] uppercase">After</span>
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col">
                        {comparisonData.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-col lg:flex-row border-b border-glass-border last:border-0 hover:bg-white transition-colors duration-500`}
                            >
                                {/* Before Side (The Pain) */}
                                <div className="flex-1 p-8 lg:p-12 flex items-center gap-6 group">
                                    <div className="shrink-0 p-3 rounded-2xl bg-rose-50 text-rose-500 border border-rose-100 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <XCircle className="w-6 h-6" />
                                    </div>
                                    <p className="text-muted text-sm leading-relaxed">
                                        <span className="block font-bold text-foreground mb-1 uppercase text-[10px] tracking-widest opacity-50">Traditional Way</span>
                                        {item.before}
                                    </p>
                                </div>

                                {/* The Icon/Label Divider */}
                                <div className="hidden lg:flex items-center justify-center w-16 bg-white border-x border-glass-border relative z-20">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* After Side (The Power) */}
                                <div className="flex-1 p-8 lg:p-12 flex items-center gap-6 bg-primary/[0.01] group">
                                    <div className="shrink-0 p-3 rounded-2xl bg-emerald-50 text-emerald-500 border border-emerald-100 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                    <p className="text-foreground text-sm leading-relaxed font-medium">
                                        <span className="block font-bold text-primary mb-1 uppercase text-[10px] tracking-widest">With Demo</span>
                                        {item.after}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Stats / Social Proof */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center lg:px-20">
                    <div className="space-y-2">
                        <div className="flex justify-center text-primary mb-2"><Clock className="w-6 h-6" /></div>
                        <h4 className="text-3xl font-black tracking-tighter text-foreground leading-none">94%</h4>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Time Reduction</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-center text-primary mb-2"><TrendingUp className="w-6 h-6" /></div>
                        <h4 className="text-3xl font-black tracking-tighter text-foreground leading-none">10x</h4>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Data Granularity</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-center text-primary mb-2"><Zap className="w-6 h-6" /></div>
                        <h4 className="text-3xl font-black tracking-tighter text-foreground leading-none">Instant</h4>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Insight Delivery</p>
                    </div>
                </div>
            </div>
        </section>
    );
}