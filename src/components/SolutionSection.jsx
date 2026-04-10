"use client";

import { motion } from 'framer-motion';
import {
    Target,
    Sparkles,
    BarChart3,
    MessageSquare,
    PlayCircle,
    FileJson,
    FileSpreadsheet,
    ArrowRight
} from 'lucide-react';

const workflowSteps = [
    {
        id: 1,
        title: "Collect Data",
        description: "Define your market focus. We tap into the global digital conversation to gather raw, unfiltered feedback from your potential users.",
        icon: Target,
        tag: "Step 01",
        features: ["Market Mapping", "Global Data Sync"]
    },
    {
        id: 2,
        title: "AI Analysis",
        description: "Our proprietary intelligence engine deciphers the emotional weight behind every interaction, identifying patterns you'd otherwise miss.",
        icon: Sparkles,
        tag: "Step 02",
        features: ["Sentiment Scoring", "Pattern Detection"]
    },
    {
        id: 3,
        title: "Actionable Insights",
        description: "Receive a prioritized roadmap of real user pain points. Move from raw data to strategic decisions in a single click.",
        icon: BarChart3,
        tag: "Step 03",
        features: ["Priority Ranking", "Strategic Exports"]
    }
];

export default function SolutionSection() {
    return (
        <section className="pb-24 bg-background relative overflow-hidden">

            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-[10%] left-[5%] w-[35%] h-[35%] bg-primary/8 blur-[140px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[35%] h-[35%] bg-accent/8 blur-[140px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest bg-primary/8 px-4 py-2 border border-primary/15"
                    >
                        <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
                        The Process
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-6 text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight"
                    >
                        Precision at the speed of{' '}
                        <span className="text-primary">AI.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-muted text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        We've simplified market research into a three-stage engine that removes
                        the guesswork from product development.
                    </motion.p>
                </div>

                {/* Workflow Steps */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3">
                    {workflowSteps.map((step, index) => (
                        <>
                            {/* Card */}
                            <motion.div
                                // key={st}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="group relative p-8 bg-surface border border-border hover:border-primary/25 hover:shadow-lg transition-all duration-500 overflow-hidden cursor-pointer"
                            >
                                {/* Hover glow */}
                                <div className="absolute inset-0 bg-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Step tag */}
                                <div className="absolute top-8 right-8 text-[10px] font-black text-primary/20 group-hover:text-primary/50 transition-colors duration-300 uppercase tracking-widest">
                                    {step.tag}
                                </div>

                                {/* Icon */}
                                <div className="relative z-10 w-14 h-14 bg-background rounded-full flex items-center justify-center border border-border-solid mb-8 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500 shadow-sm">
                                    <step.icon className="w-7 h-7 text-primary" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-foreground mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed mb-8">
                                        {step.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2.5">
                                        {step.features.map((feature, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-2.5 text-xs font-semibold text-subtle group-hover:text-muted transition-colors duration-300"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Arrow (only between items) */}
                            {index < workflowSteps.length - 1 && (
                                <div className="hidden lg:flex items-center justify-center">
                                    <div className="flex items-center gap-2 bg-accent p-3">
                                        {/* <div className="w-10 h-[1px] bg-border" /> */}
                                        <ArrowRight className="w-6 h-6 text-light" />
                                        {/* <div className="w-10 h-[1px] bg-border" /> */}
                                    </div>
                                </div>
                            )}
                        </>
                    ))}
                </div>

                {/* Integration Visualizer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="mt-16 overflow-hidden border border-border relative"
                >
                    {/* Dark gradient background — works in both themes */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a2e] via-[#0a1628] to-[#051020]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary),transparent_55%)] opacity-15" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--color-accent),transparent_55%)] opacity-10" />

                    <div className="relative z-10 p-8 lg:p-14 flex flex-col lg:flex-row items-center gap-5">

                        {/* Left — Text */}
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest bg-accent/10 px-4 py-2 border border-accent/20">
                                <span className="w-1.5 h-1.5 bg-accent animate-pulse" />
                                Export Ready
                            </div>
                            <h4 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                                Intelligence on <br />
                                <span className="text-primary">Demand.</span>
                            </h4>
                            <p className="text-white/50 leading-relaxed text-sm max-w-md">
                                Your research is mobile, versatile, and ready for your next sprint.
                                Connect the dots between user emotion and product features instantly.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2.5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                                    <FileJson className="w-4 h-4 text-accent" />
                                    <span className="text-xs font-bold text-white uppercase tracking-wide">JSON Output</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2.5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                                    <FileSpreadsheet className="w-4 h-4 text-accent" />
                                    <span className="text-xs font-bold text-white uppercase tracking-wide">CSV Dataset</span>
                                </div>
                            </div>
                        </div>

                        {/* Right — Visualizer Cards */}
                        <div className="flex-1 w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative">

                                {/* Glow behind cards */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/10 blur-[80px] -z-10 animate-pulse" />

                                {/* Reddit Card */}
                                <div className="group relative p-6 bg-white/5 border border-white/10 overflow-hidden hover:border-[#FF4500]/40 hover:bg-white/8 transition-all duration-500 cursor-pointer">
                                    <div className="absolute -right-6 -top-6 w-28 h-28 bg-[#FF4500]/15 blur-3xl group-hover:bg-[#FF4500]/30 transition-colors duration-500" />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-[#FF4500]/10 flex items-center justify-center mb-5 border border-[#FF4500]/20 group-hover:scale-110 transition-transform duration-300">
                                            <MessageSquare className="w-6 h-6 text-[#FF4500]" />
                                        </div>
                                        <h5 className="text-base font-bold text-white mb-1">Community Sentiment</h5>
                                        <p className="text-xs text-white/40 font-medium">Analyzing social discourse</p>
                                        <div className="mt-4 flex items-center gap-1.5">
                                            <div className="h-1 flex-1 bg-white/10 overflow-hidden">
                                                <div className="h-full w-[78%] bg-[#FF4500]/60" />
                                            </div>
                                            <span className="text-[10px] text-white/40 font-bold">78%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Play Store Card */}
                                <div className="group relative p-6 bg-white/5 border border-white/10 overflow-hidden hover:border-[#3DDC84]/40 hover:bg-white/8 transition-all duration-500 cursor-pointer">
                                    <div className="absolute -right-6 -top-6 w-28 h-28 bg-[#3DDC84]/15 blur-3xl group-hover:bg-[#3DDC84]/30 transition-colors duration-500" />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-[#3DDC84]/10 flex items-center justify-center mb-5 border border-[#3DDC84]/20 group-hover:scale-110 transition-transform duration-300">
                                            <PlayCircle className="w-6 h-6 text-[#3DDC84]" />
                                        </div>
                                        <h5 className="text-base font-bold text-white mb-1">Market Perception</h5>
                                        <p className="text-xs text-white/40 font-medium">Real-world user feedback</p>
                                        <div className="mt-4 flex items-center gap-1.5">
                                            <div className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden">
                                                <div className="h-full w-[91%] bg-[#3DDC84]/60 rounded-full" />
                                            </div>
                                            <span className="text-[10px] text-white/40 font-bold">91%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats row */}
                                <div className="sm:col-span-2 p-5 bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                                    {[
                                        { label: "Data Points", value: "2.4M+" },
                                        { label: "Sources", value: "12+" },
                                        { label: "Accuracy", value: "94.7%" },
                                    ].map((stat, i) => (
                                        <div key={i} className="text-center flex-1">
                                            <p className="text-lg font-extrabold text-white">{stat.value}</p>
                                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-0.5">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}