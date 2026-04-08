"use client";

import { motion } from 'framer-motion';
import {
    MessageSquare,
    PlayCircle,
    TrendingUp,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';

const samples = [
    {
        source: "Reddit",
        category: "FinTech",
        comment: "I've been trying to link my bank account for 3 days and it keeps timing out. The support team is non-existent. Extremely frustrated.",
        score: 9.4,
        status: "Critical",
        label: "Frustration Index",
        color: "rose"
    },
    {
        source: "Play Store",
        category: "Health & Fitness",
        comment: "The UI is beautiful but the calorie tracker is so laggy. I love the concept but it's getting hard to use daily.",
        score: 6.8,
        status: "Moderate",
        label: "Pain Point",
        color: "amber"
    },
    {
        source: "Reddit",
        category: "SaaS / Productivity",
        comment: "I wish there was a way to export these tasks to Notion. Right now I have to copy-paste everything manually. Huge time sink.",
        score: 8.2,
        status: "High Demand",
        label: "Feature Gap",
        color: "primary"
    }
];

export default function SampleInsights() {
    return (
        <section className="pb-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header — right aligned */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="flex items-center gap-2 mb-4 justify-center">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em]">Live Intelligence</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                            Real-world <span className="text-primary">signals.</span>
                        </h2>
                        <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
                            Our engine processes millions of comments. Here is a snapshot of how we
                            quantify raw user feedback into actionable data.
                        </p>
                    </div>
                </div>

                {/* Data Feed */}
                <div className="space-y-4">
                    {samples.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex flex-col lg:flex-row items-stretch lg:items-center gap-6 p-6 lg:p-8 bg-surface border border-border hover:border-primary/30 cursor-pointer transition-all duration-500"
                        >
                            {/* Source Identity */}
                            <div className="flex items-center gap-4 lg:w-48 shrink-0">
                                <div className="p-3 rounded-full bg-background border border-border-solid shadow-sm group-hover:scale-110 transition-transform">
                                    {item.source === "Reddit" ? (
                                        <MessageSquare className="w-5 h-5 text-[#FF4500]" />
                                    ) : (
                                        <PlayCircle className="w-5 h-5 text-[#3DDC84]" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-subtle uppercase tracking-widest">{item.source}</p>
                                    <p className="text-sm font-bold text-foreground">{item.category}</p>
                                </div>
                            </div>

                            {/* The Comment */}
                            <div className="flex-1 bg-surface-raised border border-border p-5 rounded-none italic text-sm text-muted leading-relaxed relative">
                                "{item.comment}"
                                <div className="absolute -top-2 -left-2">
                                    <div className="h-4 w-4 bg-primary/10 rounded-none flex items-center justify-center">
                                        <div className="h-1.5 w-1.5 bg-primary rounded-none animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            {/* Intelligence Metrics */}
                            <div className="flex items-center justify-between lg:justify-end gap-8 lg:w-64 shrink-0">
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-subtle uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                    <div className="flex items-center justify-end gap-2">
                                        <div className={`text-2xl font-black text-${item.color}-500 tracking-tighter`}>
                                            {item.score.toFixed(1)}
                                        </div>
                                        <div className={`px-2 py-0.5 rounded-none bg-${item.color}-50 text-${item.color}-600 text-[10px] font-bold border border-${item.color}-100 uppercase`}>
                                            {item.status}
                                        </div>
                                    </div>
                                </div>
                                <div className="h-10 w-px bg-border-solid hidden lg:block" />
                                <div className="p-2 rounded-full bg-background border border-border-solid text-muted group-hover:text-primary transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* <div className="mt-12 flex justify-center">
                    <button className="flex items-center gap-2 text-xs font-bold text-muted hover:text-primary tracking-widest uppercase transition-all cursor-pointer">
                        Refresh Sample Feed <CheckCircle2 className="w-4 h-4" />
                    </button>
                </div> */}
            </div>
        </section>
    );
}