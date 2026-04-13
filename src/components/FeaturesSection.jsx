"use client";

import { useState, useEffect } from "react";
import {
    Database,
    Zap,
    BrainCircuit,
    Download,
    Terminal,
} from "lucide-react";

const features = [
    {
        id: "db",
        title: "Intelligent Database",
        shortTitle: "Database",
        description:
            "A centralized repository of millions of global conversations, indexed and ready for deep-dive research.",
        icon: Database,
        tag: "Data Ingestion",
        stats: "2.4B Records Indexed",
    },
    {
        id: "signals",
        title: "Demand Signals",
        shortTitle: "Signals",
        description:
            "Identify high-velocity trends before they hit the mainstream. See what users are asking for in real-time.",
        icon: Zap,
        tag: "Trend Analysis",
        stats: "Real-time Detection",
    },
    {
        id: "ai",
        title: "AI Sentiment Analysis",
        shortTitle: "AI Sentiment",
        description:
            "Our proprietary models categorize raw feedback into actionable emotional insights.",
        icon: BrainCircuit,
        tag: "NLP Engine",
        stats: "99.2% Accuracy",
    },
    {
        id: "export",
        title: "Instant Data Export",
        shortTitle: "Export",
        description:
            "Export clean CSV/JSON outputs directly into your engineering workflow.",
        icon: Download,
        tag: "Portability",
        stats: "REST API v2",
    }
];

export default function FeaturesTabsSection() {
    const [activeTab, setActiveTab] = useState("db");

    const activeFeature = features.find(f => f.id === activeTab);

    return (
        <section className="pt-8 pb-16 md:pb-24 bg-background">
            <div className="max-w-7xl mx-auto px-5 md:px-6">

                {/* Header */}
                <div className="mb-10 md:mb-14 max-w-2xl">
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">
                        System Capabilities
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight md:leading-none">
                        High-fidelity <br />
                        <span className="text-primary">market decoding.</span>
                    </h2>
                </div>

                {/* Container */}
                <div className="border border-border overflow-hidden shadow-sm">
                    {/* Tabs (Scrollable on mobile, Grid on desktop) */}
                    <div className="border-b border-border bg-primary overflow-x-auto scrollbar-hide">
                        <div className="flex md:grid md:grid-cols-4 w-full min-w-max md:min-w-0">
                            {features.map((feature) => {
                                const Icon = feature.icon;
                                const isActive = activeTab === feature.id;

                                return (
                                    <button
                                        key={feature.id}
                                        onClick={() => setActiveTab(feature.id)}
                                        className={`flex-1 cursor-pointer px-4 md:px-6 py-4 flex items-center justify-center gap-2 border-r border-white/10 last:border-r-0 transition-all
                                                ${isActive
                                                ? "bg-white/10 text-white"
                                                : "text-white/70 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        <Icon className="w-4 h-4 shrink-0" />
                                        <span className="text-sm md:text-base font-semibold whitespace-nowrap">
                                            {/* Show shorter title on mobile if needed, or stick to full title */}
                                            {feature.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-10 bg-surface">
                        {activeFeature && (
                            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
                                {/* Text Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 border border-border bg-background text-primary rounded-full shrink-0">
                                            <activeFeature.icon className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary font-bold">
                                                {activeFeature.tag}
                                            </p>
                                            <h3 className="text-lg md:text-xl font-bold text-foreground">
                                                {activeFeature.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground mb-8 max-w-lg text-sm md:text-base leading-relaxed">
                                        {activeFeature.description}
                                    </p>
                                </div>

                                {/* Terminal Panel */}
                                <div className="flex-1 bg-black text-white font-mono text-[11px] md:text-xs p-5 md:p-6 border border-white/10 relative rounded-none shadow-2xl">
                                    <div className="flex gap-2 mb-4 border-b border-white/10 pb-3">
                                        <div className="w-2.5 h-2.5 bg-[#FF5F56] rounded-full" />
                                        <div className="w-2.5 h-2.5 bg-[#FFBD2E] rounded-full" />
                                        <div className="w-2.5 h-2.5 bg-[#27C93F] rounded-full" />
                                    </div>

                                    <div className="space-y-2.5 text-white/70">
                                        <p>
                                            <span className="text-primary font-bold">status:</span>{" "}
                                            <span className="text-green-400">"operational"</span>
                                        </p>
                                        <p>
                                            <span className="text-primary font-bold">metric:</span>{" "}
                                            <span className="text-yellow-200">"{activeFeature.stats}"</span>
                                        </p>
                                        <p>
                                            <span className="text-primary font-bold">
                                                integrity_check:
                                            </span>{" "}
                                            <span className="text-blue-400">true</span>
                                        </p>
                                        <p>
                                            <span className="text-primary font-bold">
                                                last_sync:
                                            </span>{" "}
                                            "{new Date().toLocaleTimeString()}"
                                        </p>
                                    </div>

                                    <Terminal className="absolute bottom-4 right-4 w-6 h-6 opacity-10" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}