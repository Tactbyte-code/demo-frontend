"use client";
import { motion } from 'framer-motion';
import { HelpCircle, BarChart2, DollarSign, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const painPoints = [
    {
        title: "Built on Assumptions",
        description: "Founders build based on gut instinct and personal experience — not what real customers are actually struggling with.",
        icon: HelpCircle,
        color: "text-amber-500",
        gradient: "from-amber-500/10"
    },
    {
        title: "Research Takes Too Long",
        description: "Traditional market research takes weeks or months. By the time you finish, the window closes or competitors move first.",
        icon: BarChart2,
        color: "text-rose-500",
        gradient: "from-rose-500/10"
    },
    {
        title: "Pain Points Are Hidden",
        description: "Real complaints are scattered across app stores, Reddit, and forums. Manual tracking is an impossible engineering bottleneck.",
        icon: DollarSign,
        color: "text-emerald-500",
        gradient: "from-emerald-500/10"
    },
    {
        title: "Competitors Get There First",
        description: "By the time you validate an idea the slow way, someone who had the data already captured your market share.",
        icon: Clock,
        color: "text-primary",
        gradient: "from-primary/10"
    }
];

export default function ProblemSection() {
    return (
        <section className="bg-background relative overflow-hidden pb-32 pt-20">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-3 text-primary font-bold text-xs uppercase tracking-[0.2em] mb-6"
                    >
                        <div className="w-10 h-[1px] bg-rose-500/50" />
                        Market Friction
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight text-center w-full"
                    >
                        Most Products Fail Because They{" "}
                    </motion.h2>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl lg:text-5xl font-extrabold text-primary mb-8 tracking-tight text-center w-full"
                    >
                        Solve the Wrong Problem.
                    </motion.h2>
                    {/* <span className="text-4xl lg:text-5xl font-extrabold text-foreground mb-8 tracking-tight text-center w-full">Solve the Wrong Problem.</span> */}
                </div>

                {/* Pain Points Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-glass-border shadow-2xl bg-surface">
                    {painPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative p-9 flex flex-col gap-6 transition-all duration-500 hover:bg-surface-raised/50
                                ${index % 2 === 0 ? 'md:border-r' : ''} 
                                ${index < 2 ? 'border-b' : ''} 
                                border-glass-border`}
                        >
                            {/* Glow */}
                            <div className={`absolute bottom-0 right-0 w-64 h-64 bg-radial-gradient ${point.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none`} />

                            {/* Icon */}
                            <div className={`w-14 h-14 flex items-center justify-center rounded-full bg-background border border-glass-border ${point.color} shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                                <point.icon className="w-7 h-7" />
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-3">
                                    {point.title}
                                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                                </h3>
                                <p className="text-muted leading-relaxed text-sm">
                                    {point.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Result Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-10 border border-glass-border bg-surface-raised px-8 py-6 flex justify-center gap-3"
                >
                    <div className="text-rose-500 mt-0.5">
                        <AlertCircle className="w-6 h-6" />
                    </div>

                    <p className="text-lg md:text-xl font-semibold text-foreground tracking-tight">
                        <span className="text-rose-500 font-bold">Result:</span>{" "}
                        Time, money, and effort wasted on products nobody asked for.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}