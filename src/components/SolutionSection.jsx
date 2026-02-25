"use client";

import { motion } from 'framer-motion';
import {
    Target,
    Sparkles,
    BarChart3,
    MessageSquare,
    PlayCircle,
    FileJson,
    FileSpreadsheet
} from 'lucide-react';

const workflowSteps = [
    {
        title: "Collect Data",
        description: "Define your market focus. We tap into the global digital conversation to gather raw, unfiltered feedback from your potential users.",
        icon: Target,
        tag: "Step 01",
        features: ["Market Mapping", "Global Data Sync"]
    },
    {
        title: "AI Analysis",
        description: "Our proprietary intelligence engine deciphers the emotional weight behind every interaction, identifying patterns you'd otherwise miss.",
        icon: Sparkles,
        tag: "Step 02",
        features: ["Sentiment Scoring", "Pattern Detection"]
    },
    {
        title: "Actionable Insights",
        description: "Receive a prioritized roadmap of real user pain points. Move from raw data to strategic decisions in a single click.",
        icon: BarChart3,
        tag: "Step 03",
        features: ["Priority Ranking", "Strategic Exports"]
    }
];

export default function SolutionSection() {
    return (
        <section className="pb-24 bg-surface relative overflow-hidden">
            {/* Background Decorative Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-40 pointer-events-none -z-10">
                <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] bg-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-accent/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
                    >
                        The Process
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-6 text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight"
                    >
                        Precision at the speed of <span className="text-primary">AI.</span>
                    </motion.h2>
                    <motion.p className="mt-6 text-muted text-lg max-w-2xl mx-auto leading-relaxed">
                        We’ve simplified market research into a three-stage engine that removes the guesswork from product development.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {workflowSteps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="p-8 rounded-[2.5rem] bg-background border border-glass-border hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group relative"
                        >
                            <div className="absolute top-8 right-8 text-[10px] font-black text-primary/20 group-hover:text-primary/40 transition-colors uppercase tracking-widest">
                                {step.tag}
                            </div>

                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-glass-border mb-8 group-hover:scale-110 transition-transform duration-500">
                                <step.icon className="w-7 h-7 text-primary" />
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                            <p className="text-sm text-muted leading-relaxed mb-8">
                                {step.description}
                            </p>

                            <div className="space-y-3">
                                {step.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-foreground/70">
                                        <div className="w-1 h-1 rounded-full bg-primary" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Integration Visualizer */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-20 p-8 lg:p-12 rounded-[3rem] bg-foreground text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--color-primary),transparent_60%)] opacity-20" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h4 className="text-3xl font-bold tracking-tight">Intelligence on Demand</h4>
                            <p className="text-white/60 leading-relaxed">
                                Our platform ensures your research is mobile, versatile, and ready for your next sprint. Connect the dots between user emotion and product features instantly.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                                    <FileJson className="w-4 h-4 text-accent" />
                                    <span className="text-xs font-bold uppercase tracking-wide">JSON Output</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                                    <FileSpreadsheet className="w-4 h-4 text-accent" />
                                    <span className="text-xs font-bold uppercase tracking-wide">CSV Dataset</span>
                                </div>
                            </div>
                        </div>

                        {/* Visualizer Cards */}
                        <div className="flex-1 w-full relative">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                                <div className="group relative p-6 rounded-4xl bg-linear-to-br from-white/10 to-transparent border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-500">
                                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 blur-3xl group-hover:bg-primary/40 transition-colors" />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-[#FF4500]/10 flex items-center justify-center mb-4 border border-[#FF4500]/20">
                                            <MessageSquare className="w-6 h-6 text-[#FF4500]" />
                                        </div>
                                        <h5 className="text-lg font-bold">Community Sentiment</h5>
                                        <p className="text-xs text-white/50 mt-2 font-medium">Analyzing social discourse</p>
                                    </div>
                                </div>

                                <div className="group relative p-6 rounded-4xl bg-linear-to-br from-white/10 to-transparent border border-white/10 overflow-hidden hover:border-accent/50 transition-all duration-500">
                                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/20 blur-3xl group-hover:bg-accent/40 transition-colors" />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-[#3DDC84]/10 flex items-center justify-center mb-4 border border-[#3DDC84]/20">
                                            <PlayCircle className="w-6 h-6 text-[#3DDC84]" />
                                        </div>
                                        <h5 className="text-lg font-bold">Market Perception</h5>
                                        <p className="text-xs text-white/50 mt-2 font-medium">Real-world user feedback</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[100px] rounded-full animate-pulse -z-10" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}