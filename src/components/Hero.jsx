"use client";
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* 1. Background Image Container */}
            <div className="absolute inset-0 -z-10">
                {/* <Image
                    src="/images/hero4.png"
                    alt="AI Problem Discovery Background"
                    fill
                    className="object-cover object-center"
                    priority
                /> */}

                {/* 2. Overlays using your Background Variable */}
                <div className="absolute inset-0 bg-linear-to-b from-white/20 via-transparent to-background" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-background)_100%)] opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                {/* Headline - Using --color-foreground (Sky 900) */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]"
                >
                    Build the future of <br />
                    {/* Darker Gradient: Transitions from your Navy Foreground to your Primary Blue */}
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-foreground via-foreground to-primary">
                        intelligent apps.
                    </span>
                </motion.h1>

                {/* Subheadline - Using --color-muted (Slate 700) */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8 text-lg lg:text-xl text-muted max-w-3xl mx-auto leading-relaxed"
                >
                    Find the gap in any market. Our AI scans millions of reviews and threads to highlight the exact solutions users are searching for right now.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    {/* Primary CTA */}
                    <Link
                        href="/dashboard"
                        className="w-full sm:w-auto bg-primary hover:brightness-105 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/30 transition-all duration-500 ease-out hover:scale-102 active:scale-95"
                    >
                        Start Building Free
                        <ArrowRight className="w-5 h-5" />
                    </Link>

                    {/* Secondary CTA */}
                    <Link
                        href="/demo"
                        className="w-full sm:w-auto bg-overlay backdrop-blur-md border border-glass-border text-foreground px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-surface-raised transition-all"
                    >
                        <Play className="w-4 h-4 fill-current text-foreground" />
                        Watch Demo
                    </Link>
                </motion.div>

                {/* Trust Badge */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 text-sm font-medium text-secondary"
                >
                    Used by over 2,000+ developers worldwide. No credit card required.
                </motion.p>
            </div>
        </section>
    );
}