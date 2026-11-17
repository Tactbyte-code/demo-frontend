"use client";

import { motion } from "framer-motion";
import {
    Target,
    Lightbulb,
    MessageSquareText,
    ArrowUpRight,
    Check,
    Quote,
    Sparkles,
    AlertCircle,
    Search,
    Users,
    Clock,
} from "lucide-react";

const deliverables = [
    {
        number: "01",
        icon: Target, // Or Users
        title: "Audience & Pain Points",
        description:
            "Discover the frustrations people repeatedly discuss and understand exactly who is experiencing them.",
        tag: "Who & what hurts",
        colSpan: "sm:col-span-1",
    },
    {
        number: "02",
        icon: Lightbulb, // Or TrendingUp
        title: "Trends & Opportunities",
        description:
            "Spot emerging themes across communities and translate recurring complaints into clear product directions.",
        tag: "What's possible",
        colSpan: "sm:col-span-1",
    },
    {
        number: "03",
        icon: MessageSquareText,
        title: "Backed by Evidence",
        description:
            "Trace every insight back to raw Reddit conversations so you can read the exact context and verify the signal yourself.",
        tag: "See the proof",
        colSpan: "sm:col-span-2", // Spans the full width of the bottom row for a clean layout
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

function DeliverableCard({ item }) {
    const Icon = item.icon;

    const renderIllustration = (id) => {
        switch (id) {
            case "01": // Audience & Pain Points
                return (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#FAFAFA] p-4 overflow-hidden">
                        {/* Abstract floating elements representing scattered complaints */}
                        <div className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm transition-all duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:rotate-[-10deg]">
                            <MessageSquareText size={14} className="text-[#D1C8C3]" />
                        </div>
                        <div className="absolute bottom-6 right-8 flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm transition-all duration-700 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:rotate-[10deg]">
                            <AlertCircle size={14} className="text-[#D1C8C3]" />
                        </div>

                        {/* Central Persona / Pain Point Card */}
                        <div className="relative z-10 w-full max-w-[160px] overflow-hidden rounded-2xl border border-[#F0EAE6] bg-white shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-md">
                            {/* Card Header (Persona) */}
                            <div className="flex items-center gap-3 border-b border-[#F0EAE6] bg-[#FAFAFA]/50 p-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF0E9]">
                                    <Users size={18} className="text-[#FF4500]" />
                                </div>
                                <div className="flex-1 space-y-1.5">
                                    <div className="h-2 w-16 rounded-full bg-[#24201E]/20" />
                                    <div className="h-2 w-10 rounded-full bg-[#24201E]/10" />
                                </div>
                            </div>
                            {/* Card Body (Pain Point Highlight) */}
                            <div className="p-3 space-y-2.5">
                                <div className="flex items-center gap-2 rounded-lg bg-[#FFF8F4] p-2 text-[#FF4500] ring-1 ring-[#FF4500]/10 transition-colors duration-300 group-hover:bg-[#FF4500] group-hover:text-white">
                                    <Target size={14} className="shrink-0 transition-colors duration-300" />
                                    <div className="h-1.5 w-full rounded-full bg-[#FF4500]/30 transition-colors duration-300 group-hover:bg-white/40" />
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="h-1.5 w-full rounded-full bg-[#F0EAE6]" />
                                    <div className="h-1.5 w-1/3 rounded-full bg-[#F0EAE6]" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "02": // Trends & Opportunities
                return (
                    <div className="absolute inset-0 flex items-end justify-center bg-[#FAFAFA] overflow-hidden">
                        {/* Analytics Grid Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F0EAE6_1px,transparent_1px),linear-gradient(to_bottom,#F0EAE6_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:linear-gradient(to_bottom,transparent_10%,white)] opacity-60" />

                        {/* Rising Bar Chart */}
                        <div className="relative z-10 flex h-full w-full max-w-[220px] items-end justify-between px-2 pb-4 pt-10">
                            {[30, 45, 35, 60, 90].map((height, i) => (
                                <div key={i} className="relative flex w-8 flex-col items-center justify-end h-full">
                                    {/* The Bars */}
                                    <div
                                        className={`w-full rounded-t-md transition-all duration-700 ease-out group-hover:scale-y-[1.15] ${i === 4
                                                ? 'bg-gradient-to-t from-[#FF4500] to-[#FF8A65] shadow-[0_0_20px_rgba(255,69,0,0.2)]'
                                                : 'bg-[#E5DFD9] group-hover:bg-[#D1C8C3]'
                                            }`}
                                        style={{ height: `${height}%`, transformOrigin: 'bottom' }}
                                    />

                                    {/* The Opportunity Sparkle on the peak */}
                                    {i === 4 && (
                                        <div className="absolute -top-7 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#F0EAE6] transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-110 group-hover:ring-[#FF4500]/30">
                                            <Lightbulb size={16} className="text-[#FF4500]" />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Connecting Trend Line */}
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute bottom-4 left-0 h-[70%] w-full text-[#FF4500] opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeDasharray: "4 4" }}>
                                <path d="M10,80 L30,65 L50,75 L70,45 L90,15" />
                            </svg>
                        </div>
                    </div>
                );
            case "03": // Backed by Evidence
                return (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#FAFAFA] p-4">
                        {/* Threaded Conversation Container */}
                        <div className="relative w-full max-w-[240px]">
                            {/* Thread Guide Line */}
                            <div className="absolute bottom-4 left-[11px] top-4 w-px bg-[#E5DFD9] transition-colors duration-500 group-hover:bg-[#FF4500]/20" />

                            {/* Background Comment */}
                            <div className="relative mb-3 flex items-start gap-3 pl-8 transition-transform duration-500 group-hover:-translate-x-1">
                                <div className="absolute left-2 top-1.5 h-2 w-2 rounded-full border-2 border-[#FAFAFA] bg-[#D1C8C3]" />
                                <div className="w-full rounded-xl rounded-tl-none border border-[#F0EAE6] bg-white p-3 shadow-sm">
                                    <div className="mb-2.5 flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-[#E5DFD9]" />
                                        <div className="h-1.5 w-16 rounded-full bg-[#E5DFD9]" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-1.5 w-full rounded-full bg-[#F0EAE6]" />
                                        <div className="h-1.5 w-4/5 rounded-full bg-[#F0EAE6]" />
                                    </div>
                                </div>
                            </div>

                            {/* Highlighted Evidence Comment */}
                            <div className="relative flex items-start gap-3 pl-8 transition-transform duration-500 delay-75 group-hover:translate-x-2">
                                {/* Active Node */}
                                <div className="absolute left-[7px] top-2 h-2.5 w-2.5 rounded-full bg-[#FF4500] ring-4 ring-[#FFF0E9] transition-all duration-500 group-hover:scale-125" />

                                <div className="relative w-full rounded-xl rounded-tl-none border border-[#FF4500]/30 bg-[#FFF8F4] p-3 shadow-sm transition-colors duration-500 group-hover:border-[#FF4500]/50 group-hover:bg-[#FFF0E9]/50">

                                    {/* Magnifying Glass Badge */}
                                    <div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF4500] text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                                        <Search size={14} strokeWidth={2.5} />
                                    </div>

                                    <div className="mb-2.5 flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-[#FF4500]/40" />
                                        <div className="h-1.5 w-20 rounded-full bg-[#FF4500]/30" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-1.5 w-full rounded-full bg-[#FF4500]/25" />
                                        <div className="h-1.5 w-[85%] rounded-full bg-[#FF4500]/25" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <motion.div
            variants={itemVariants}
            className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#F0EAE6] bg-white transition-all duration-300 hover:border-[#FF4500]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${item.colSpan}`}
        >
            {/* Visual Header */}
            <div className="relative h-44 w-full shrink-0 overflow-hidden border-b border-[#F0EAE6]/50 bg-[#FAFAFA]">
                {renderIllustration(item.number)}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-[#FFF0E9] text-[10px] font-bold text-[#FF4500]">
                            {item.number}
                        </span>
                        <span className="rounded-full bg-[#F8F5F2] px-2.5 py-1 text-[10px] font-medium text-[#81756F]">
                            {item.tag}
                        </span>
                    </div>
                    <Icon size={18} className="text-[#C8BDB7] transition-colors duration-300 group-hover:text-[#FF4500]" strokeWidth={2} />
                </div>

                <h3 className="mb-2 text-base font-semibold text-[#24201E] sm:text-lg">
                    {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#827873]">
                    {item.description}
                </p>
            </div>
        </motion.div>
    );
}

export default function WhatYouGet() {
    return (
        <section className="overflow-hidden bg-white px-5 py-15 sm:px-8 lg:pb-20">
            <div className="mx-auto max-w-7xl">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="mx-auto mb-16 max-w-2xl text-center"
                >
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FFE0D4] bg-[#FFF8F4] px-4 py-2 text-xs font-semibold text-[#FF4500]">
                        <Sparkles size={14} />
                        Your research, made actionable
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-[#24201E] sm:text-4xl lg:text-5xl">
                        More than just Reddit data.
                        <br className="hidden sm:block" />
                        <span className="text-[#FF4500]">
                            {" "}Research you can act on.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#827873]">
                        Go beyond browsing conversations. Get a structured
                        understanding of the problems, people, and opportunities
                        hiding in Reddit discussions.
                    </p>
                </motion.div>

                {/* Main content grid (Items stretch to perfectly align bottoms) */}
                <div className="grid items-stretch grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">

                    {/* Left Column - Both cards will stretch to match right side's height */}
                    <div className="flex h-full flex-col gap-6">
                        {/* Featured insight panel */}
                        <motion.div
                            initial={{ opacity: 0, x: -35 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.75,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative flex w-full flex-col justify-center overflow-hidden rounded-3xl bg-[#211D1B] p-8 text-white sm:p-10"
                        >
                            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#FF4500]/20 blur-3xl" />
                            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#FF4500]/10 blur-3xl" />

                            <div className="relative">
                                <div className="mb-10 flex items-center justify-between sm:mb-12">
                                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                                        Sample insight
                                    </span>

                                    <Quote size={30} className="text-[#FF7043]" />
                                </div>

                                <p className="text-sm font-medium text-[#FF8A65]">
                                    A recurring frustration
                                </p>

                                <h3 className="mt-4 text-2xl font-semibold leading-snug sm:text-3xl">
                                    "I spend more time managing my tools than
                                    actually getting work done."
                                </h3>

                                <div className="my-8 h-px w-full bg-white/10" />

                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="mb-1 text-xs text-white/50">
                                            What this could reveal
                                        </p>
                                        <p className="text-sm font-medium text-white/90">
                                            An opportunity to simplify workflows
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF4500] shadow-[0_0_15px_rgba(255,69,0,0.5)]">
                                        <ArrowUpRight size={19} />
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-wrap items-center gap-2 sm:mt-10">
                                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-white/70 backdrop-blur-sm">
                                        Productivity
                                    </span>
                                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-white/70 backdrop-blur-sm">
                                        Workflow
                                    </span>
                                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-white/70 backdrop-blur-sm">
                                        SaaS
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Data Processing / Time Saved Card (Flex-1 ensures perfect bottom alignment) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.75,
                                delay: 0.15,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative hidden flex-1 flex-col justify-center overflow-hidden rounded-3xl border border-[#F0EAE6] bg-[#FAFAFA] p-8 sm:flex"
                        >
                            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-[#FF4500]/5 blur-2xl" />

                            <div className="mb-5 flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#F0EAE6] bg-white text-[#FF4500] shadow-sm">
                                    <Clock size={22} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-[#24201E]">20+ hours</h4>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#A69A94]">Saved per report</p>
                                </div>
                            </div>

                            <p className="text-sm leading-relaxed text-[#71655F]">
                                We process thousands of raw comments and extract the signal from the noise, turning endless scrolling into a focused, actionable read.
                            </p>

                            <div className="mt-7 flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-16 text-[10px] font-semibold text-[#A69A94]">RAW DATA</div>
                                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E5DFD9]">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "100%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full rounded-full bg-[#D1C8C3]"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-16 text-[10px] font-semibold text-[#FF4500]">SIGNAL</div>
                                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#FFE0D4]">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "15%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
                                            className="h-full rounded-full bg-[#FF4500]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="flex h-full flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6 }}
                            className="mb-6 flex shrink-0 items-center justify-between px-1"
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-[#24201E]">
                                    Five things you'll walk away with
                                </h3>
                            </div>
                            <span className="hidden text-xs font-medium text-[#A69A94] sm:inline-block">
                                01 — 05
                            </span>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2"
                        >
                            {deliverables.map((item) => (
                                <DeliverableCard key={item.number} item={item} />
                            ))}
                        </motion.div>

                        {/* Bottom note ensures right side flushes completely with left side bottom */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-6 flex shrink-0 items-center gap-3 rounded-2xl border border-[#FFE7DC]/50 bg-[#FFF8F4] p-4"
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFE7DC] text-[#FF4500]">
                                <Check size={17} />
                            </div>
                            <p className="text-sm leading-6 text-[#71655F]">
                                Every insight is backed by real conversations,
                                giving you context instead of guesswork.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}