"use client";

import { motion } from 'framer-motion';
import { Rocket, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export default function FinalCTA() {
    return (
        <section className="relative py-24 bg-white overflow-hidden">
            <div className="max-w-8xl mx-auto px-6">
                {/* The "Power" Container */}
                <div className="relative bg-[#050505] rounded-[3.5rem] p-8 md:p-16 lg:p-24 overflow-hidden shadow-2xl shadow-primary/20">

                    {/* Background Decorative Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Technical Grid */}
                        <div className="absolute inset-0 opacity-[0.15]"
                            style={{ backgroundImage: 'radial-gradient(circle, #0ea5e9 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                        />
                        {/* Animated Radar Pulse */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 blur-[120px] rounded-full animate-pulse" />

                        {/* Floating Icons for "Depth" */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-20 right-20 text-primary/20"
                        >
                            <Globe className="w-16 h-16" />
                        </motion.div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                        >
                            <Zap className="w-4 h-4 text-primary fill-primary" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Ready to Deploy</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-8"
                        >
                            Turn digital noise into <br />
                            <span className="text-primary drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">your roadmap.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
                        >
                            Join the next generation of founders and product teams using
                            high-fidelity sentiment analysis to build what users actually want.
                        </motion.p>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <Link
                                href="/signup"
                                className="group flex items-center gap-2 bg-primary text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/25"
                            >
                                Start Building Now
                                <Rocket className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>

                            <Link
                                href="/demo"
                                className="group flex items-center gap-2 bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
                            >
                                Book a Demo
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Trust Footer */}
                        <div className="mt-16 pt-8 border-t border-white/5 w-full flex flex-col md:flex-row items-center justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-white" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Enterprise Secure</span>
                            </div>
                            <div className="h-1 w-1 rounded-full bg-white/20 hidden md:block" />
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">256-bit Encryption</span>
                            </div>
                            <div className="h-1 w-1 rounded-full bg-white/20 hidden md:block" />
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">GDPR Compliant</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}