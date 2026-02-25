"use client";
import { motion } from 'framer-motion';
import { HelpCircle, BarChart2, DollarSign, Clock, AlertCircle } from 'lucide-react';
import Image from 'next/image';

const painPoints = [
    {
        title: "Dangerous Guesswork",
        description: "Launching features based on 'gut feeling' instead of hard evidence is a recipe for wasted engineering hours.",
        icon: HelpCircle,
        color: "text-amber-500",
        bg: "bg-amber-50"
    },
    {
        title: "Data Blindspots",
        description: "Operating without real-time metrics is like flying a plane in a storm with no radar. You can't fix what you can't see.",
        icon: BarChart2,
        color: "text-rose-500",
        bg: "bg-rose-50"
    },
    {
        title: "Expensive Research",
        description: "Traditional market validation costs thousands and takes months. Most startups run out of runway before they find the truth.",
        icon: DollarSign,
        color: "text-emerald-500",
        bg: "bg-emerald-50"
    },
    {
        title: "Slow Validation",
        description: "Waiting weeks for feedback loops kills momentum. In today's market, if you aren't validating daily, you're falling behind.",
        icon: Clock,
        color: "text-primary",
        bg: "bg-primary/10"
    }
];

export default function ProblemSection() {
    return (
        <section className="py-24 bg-surface relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent/10 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-4"
                    >
                        <AlertCircle className="w-4 h-4" />
                        The Problem
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl lg:text-5xl font-extrabold text-foreground mb-6"
                    >
                        Stop building in the <span className="text-primary">dark.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted text-lg max-w-2xl mx-auto"
                    >
                        Most teams spend 80% of their time building things that users don't actually want.
                        We identify the friction points so you can focus on growth.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {painPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-3xl bg-background border border-glass-border hover:border-primary/30 transition-all duration-300 group"
                        >
                            <div className={`w-12 h-12 ${point.bg} ${point.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <point.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-4">{point.title}</h3>
                            <p className="text-sm text-muted leading-relaxed">
                                {point.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Visual Contrast Illustration */}
                {/* Visual Contrast Illustration - Strategic Analysis Look */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 lg:p-12 rounded-[2.5rem] bg-white border border-glass-border shadow-sm flex flex-col lg:flex-row items-center gap-12"
                >
                    <div className="flex-1 space-y-8">
                        <div>
                            <h4 className="text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight">
                                The Research Gap
                            </h4>
                            <p className="text-muted mt-2 text-sm lg:text-base">
                                Traditional methods are built for a world that moved slower. Today, they are your biggest bottleneck.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: "Surveys", issue: "Reflect intent, not actual behavior.", stat: "70% Bias" },
                                { label: "Silos", issue: "Disconnected data leads to wrong conclusions.", stat: "Fragmented" },
                                { label: "Latency", issue: "Weeks to validate what takes hours to build.", stat: "Slow Loop" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-background border border-glass-border group hover:bg-white hover:shadow-md transition-all">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-foreground text-sm uppercase tracking-wide">{item.label}</span>
                                            <span className="text-[10px] font-bold py-0.5 px-2 rounded-md bg-rose-50 text-rose-600 border border-rose-100">{item.stat}</span>
                                        </div>
                                        <p className="text-muted text-sm leading-relaxed">{item.issue}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Container - Using a "Dashboard Preview" style frame */}
                    <div className="flex-1 w-full aspect-square lg:aspect-video rounded-3xl overflow-hidden bg-slate-50 relative border-8 border-background shadow-2xl group">
                        <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent z-10 pointer-events-none" />
                        <Image
                            src="/images/ps.png"
                            alt="Strategic Data Analysis"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            priority
                        />
                        {/* Decorative UI elements to make it look like a dashboard */}
                        <div className="absolute top-4 left-4 z-20 flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}