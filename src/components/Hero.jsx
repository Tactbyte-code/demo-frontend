"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, Users, Zap, Star } from 'lucide-react';
import Link from 'next/link';

const stagger = {
    container: { animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } },
    item: {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
    }
};

const STATS = [
    { icon: Users, value: "2,000+", label: "Builders" },
    { icon: TrendingUp, value: "48K+", label: "Insights" },
    { icon: Zap, value: "~190s", label: "Analysis" },
];

const AVATARS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"];

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-5 lg:pt-30 overflow-hidden">
            {/* Grid texture */}
            <div
                className="absolute inset-0 -z-20"
                style={{
                    backgroundImage: `
                        linear-gradient(var(--color-border) 1px, transparent 1px),
                        linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
                    `,
                    backgroundSize: "48px 48px", // Slightly smaller grid for mobile
                    opacity: 0.35,
                }}
            />

            {/* Radial vignette */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, var(--background) 70%)"
                }}
            />
            
            <div
                className="absolute bottom-0 left-0 right-0 h-48 -z-10"
                style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
            />

            {/* Floating accent orbs - Hidden on very small screens to reduce clutter */}
            <motion.div
                animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-32 left-8 md:left-16 w-3 h-3 rounded-full hidden xs:block"
                style={{ backgroundColor: "var(--primary)", opacity: 0.6 }}
            />
            <motion.div
                animate={{ y: [0, 14, 0], rotate: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-48 right-12 md:right-24 w-2 h-2 rounded-full hidden xs:block"
                style={{ backgroundColor: "var(--primary)", opacity: 0.4 }}
            />

            <motion.div
                variants={stagger.container}
                initial="initial"
                animate="animate"
                className="w-full max-w-5xl mx-auto px-5 md:px-6 text-center relative z-10"
            >
                {/* Live badge */}
                <motion.div variants={stagger.item} className="flex justify-center mb-6 md:mb-8">
                    <span
                        className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-widest border"
                        style={{
                            borderColor: "var(--border-solid)",
                            backgroundColor: "var(--surface)",
                            color: "var(--text-muted)"
                        }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                style={{ backgroundColor: "var(--primary)" }}
                            />
                            <span
                                className="relative inline-flex rounded-full h-2 w-2"
                                style={{ backgroundColor: "var(--primary)" }}
                            />
                        </span>
                        AI-Powered · Real-time Discovery
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={stagger.item}
                    className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] md:leading-[1.08] mb-6"
                    style={{ color: "var(--text-main)" }}
                >
                    Find problems{" "}
                    <br className="hidden sm:block" />
                    <span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage: "linear-gradient(90deg, var(--text-main) 0%, var(--primary) 100%)"
                        }}
                    >
                        worth solving.
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    variants={stagger.item}
                    className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-10"
                    style={{ color: "var(--text-muted)" }}
                >
                    AI analyzes 50,000+ real customer complaints from <span className='font-bold'>Reddit</span> and <span className='font-bold'>Playstore</span> to reveal validated business opportunities — before you invest time or money.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    variants={stagger.item}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-14"
                >
                    <Link
                        href="/dashboard"
                        className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:brightness-110 active:scale-95"
                        style={{ backgroundColor: "var(--primary)" }}
                    >
                        Get Early Access
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                {/* Stat pills */}
                <motion.div
                    variants={stagger.item}
                    className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10"
                >
                    {STATS.map(({ icon: Icon, value, label }) => (
                        <div
                            key={label}
                            className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 border"
                            style={{
                                borderColor: "var(--border-solid)",
                                backgroundColor: "var(--surface)",
                            }}
                        >
                            <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--primary)" }} />
                            <span className="text-sm font-black" style={{ color: "var(--text-main)" }}>{value}</span>
                            <span className="text-[10px] md:text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Social proof */}
                <motion.div
                    variants={stagger.item}
                    className="flex flex-col items-center justify-center gap-4"
                >
                    {/* Avatar stack */}
                    <div className="flex items-center -space-x-2">
                        {AVATARS.map((color, i) => (
                            <div
                                key={i}
                                className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold text-white"
                                style={{ backgroundColor: color, borderColor: "var(--background)", zIndex: AVATARS.length - i }}
                            />
                        ))}
                    </div>

                    {/* Stars + text */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "#F59E0B" }} />
                            ))}
                        </div>
                        <span className="text-[11px] md:text-xs font-medium max-w-xs md:max-w-none leading-relaxed" style={{ color: "var(--text-muted)" }}>
                            Trusted by <span className="font-bold" style={{ color: "var(--text-main)" }}>2,000+ builders</span> to identify high demand opportunities.
                        </span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};