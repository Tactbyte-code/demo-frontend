"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function BrandPanel({ mode }) {
    const reduceMotion = useReducedMotion();
    const isSignup = mode === "signup";

    return (
        <aside className="relative hidden h-full min-h-0 flex-col overflow-hidden bg-[#160824] p-8 text-white lg:flex xl:p-9">
            {/* Full-bleed image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/login-img.png"
                    alt=""
                    fill
                    priority
                    sizes="50vw"
                    className="object-cover object-center"
                />

                {/* Darken only the lower area behind the text */}
                <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#160824]/95 via-[#160824]/75 to-transparent" />
            </div>

            {/* Brand */}
            <div className="relative z-10 flex items-center gap-2">
                <div className="relative h-10 w-10 shrink-0">
                    <Image
                        src="/images/logo-new-no-bg.png"
                        alt="ProblemPulse"
                        fill
                        sizes="40px"
                        className="object-contain"
                        priority
                    />
                </div>

                <span className="bg-linear-to-r from-[#e6e3f1] via-[#ecb9f5] to-[#faafb8] bg-clip-text text-lg font-bold tracking-tight text-transparent">
                    ProblemPulse
                </span>
            </div>

            {/* Content pushed towards the bottom */}
            <div className="relative z-10 mt-auto max-w-md pb-10 pt-48 xl:pb-12">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    >
                        <h2 className="max-w-sm text-2xl font-bold leading-tight tracking-tight xl:text-[30px]">
                            {isSignup
                                ? "Your next big idea deserves better research."
                                : "Intelligence at your fingertips."}
                        </h2>

                        <p className="mt-3 max-w-sm text-[13px] leading-6 text-white/80">
                            {isSignup
                                ? "Create your account and turn real conversations into product insight. Find opportunities before you build."
                                : "Sign in to continue your research, revisit your analysis, and make confident product decisions."}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <p className="relative z-10 flex items-center gap-2 text-[11px] font-medium text-white/75">
                <ShieldCheck size={14} className="text-violet-200" />
                Your research stays private and secure
            </p>
        </aside>
    );
}