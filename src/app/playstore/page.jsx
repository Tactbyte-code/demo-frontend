
"use client";

import { motion } from "framer-motion";
import { Smartphone, Sparkles, ArrowLeft, Bell } from "lucide-react";
import Link from "next/link";

const PlayStoreLandingPage = () => {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FDFBFF] px-6 py-16 text-[#292333]">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full bg-[#D82C9E]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-[#5F19C5]/10 blur-3xl" />

            <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
                {/* Icon */}
                <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "backOut" }} className="relative mx-auto mb-9 flex h-24 w-24 items-center justify-center rounded-[28px] bg-linear-to-br from-[#5F19C5]/10 via-[#9326D5]/10 to-[#FA418B]/10">
                    <div className="absolute inset-0 rounded-[28px] border border-[#D82C9E]/15" />
                    <Smartphone size={42} strokeWidth={1.5} className="text-[#9326D5]" />
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-md">
                        <Sparkles size={17} className="text-[#FA418B]" />
                    </motion.div>
                </motion.div>

                {/* Coming soon badge */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D82C9E]/20 bg-white px-4 py-2 text-xs font-bold tracking-[0.14em] text-[#9326D5] shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FA418B] opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FA418B]" />
                    </span>
                    COMING SOON
                </motion.div>

                {/* Heading */}
                <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }} className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    App reviews hold
                    <br />
                    <span className="bg-linear-to-r from-[#5F19C5] via-[#9326D5] to-[#FA418B] bg-clip-text text-transparent">
                        untapped insights.
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#756B80] sm:text-base">
                    We're working on a smarter way to uncover user frustrations, identify missing features, and discover opportunities hidden inside app reviews. Play Store Analysis is coming to ProblemPulse soon.
                </motion.p>

                {/* Feature highlights */}
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }} className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-3">
                    {[
                        "Review insights",
                        "Feature gaps",
                        "User sentiment",
                    ].map((item) => (
                        <div key={item} className="rounded-xl border border-[#EAE2F1] bg-white/80 px-3 py-4 text-xs font-semibold text-[#756B80] shadow-sm sm:text-sm">
                            {item}
                        </div>
                    ))}
                </motion.div>

                {/* Bottom actions */}
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }} className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#5F19C5] via-[#9326D5] to-[#FA418B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#9326D5]/20 transition hover:-translate-y-0.5 hover:shadow-xl">
                        <ArrowLeft size={16} />
                        Back to home
                    </Link>
                </motion.div>

                <p className="mt-12 text-xs text-[#A398AF]">
                    ProblemPulse <span className="mx-1">·</span> Better research starts with better insights.
                </p>
            </div>
        </main>
    );
};

export default PlayStoreLandingPage;
