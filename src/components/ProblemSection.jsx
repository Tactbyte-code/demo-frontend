"use client";
import { motion } from 'framer-motion';
import { HelpCircle, BarChart2, DollarSign, Clock, AlertCircle, ArrowRight } from 'lucide-react';

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
        <section id="market-friction" className="scroll-mt-24 bg-background relative overflow-hidden pb-20 pt-5 md:pb-32 md:pt-20">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/5 blur-[80px] md:blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-rose-500/5 blur-[80px] md:blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-5 md:px-6">
                {/* Header */}
                <div className="mb-12 md:mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-3 text-primary font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 md:mb-6"
                    >
                        <div className="w-6 md:w-10 h-[1px] bg-rose-500/50" />
                        Market Friction
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-2 md:mb-4 tracking-tight"
                    >
                        Most Products Fail Because They
                    </motion.h2>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight"
                    >
                        Solve the Wrong Problem.
                    </motion.h2>
                </div>

                {/* Pain Points Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-glass-border shadow-2xl bg-surface md:rounded-none">
                    {painPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative p-7 md:p-9 flex flex-col gap-5 md:gap-6 transition-all duration-500 hover:bg-surface-raised/50
                                /* Border logic for responsive grid */
                                border-b border-glass-border
                                ${index % 2 === 0 ? 'md:border-r' : ''} 
                                ${index === painPoints.length - 1 ? 'border-b-0' : 'md:last:border-b-0'}
                                ${index === 2 ? 'md:border-b-0' : ''}
                            `}
                        >
                            {/* Glow Accent */}
                            <div className={`absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-radial-gradient ${point.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none`} />

                            {/* Icon */}
                            <div className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-background border border-glass-border ${point.color} shadow-inner group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                                <point.icon className="w-6 h-6 md:w-7 md:h-7" />
                            </div>

                            {/* Content */}
                            <div className="space-y-3 md:space-y-4 relative z-10">
                                <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight flex items-center gap-3">
                                    {point.title}
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary hidden md:block" />
                                </h3>
                                <p className="text-muted leading-relaxed text-sm md:text-base">
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
                    className="mt-8 md:mt-10 border border-glass-border bg-surface-raised px-6 py-5 md:px-8 md:py-6 md:rounded-none flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-4"
                >
                    <div className="text-rose-500 shrink-0">
                        <AlertCircle className="w-6 h-6 md:w-7 md:h-7" />
                    </div>

                    <p className="text-base md:text-lg lg:text-xl font-semibold text-foreground tracking-tight">
                        <span className="text-rose-500 font-bold">Result:</span>{" "}
                        Time, money, and effort wasted on products nobody asked for.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}