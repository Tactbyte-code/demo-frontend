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
        description:
            "A centralized repository of millions of global conversations, indexed and ready for deep-dive research.",
        icon: Database,
        tag: "Data Ingestion",
        stats: "2.4B Records Indexed",
    },
    {
        id: "signals",
        title: "Demand Signals",
        description:
            "Identify high-velocity trends before they hit the mainstream. See what users are asking for in real-time.",
        icon: Zap,
        tag: "Trend Analysis",
        stats: "Real-time Detection",
    },
    {
        id: "ai",
        title: "AI Sentiment Analysis",
        description:
            "Our proprietary models categorize raw feedback into actionable emotional insights.",
        icon: BrainCircuit,
        tag: "NLP Engine",
        stats: "99.2% Accuracy",
    },
    {
        id: "export",
        title: "Instant Data Export",
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
        <section className="pt-8 pb-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-14 max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">
                        System Capabilities
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-none">
                        High-fidelity <br />
                        <span className="text-primary">market decoding.</span>
                    </h2>
                </div>

                {/* Container */}
                <div className="border border-border">
                    {/* Tabs (CENTERED + EQUAL WIDTH) */}
                    <div className="border-b border-border">
                        <div className="grid grid-cols-4 w-full">
                            {features.map((feature) => {
                                const Icon = feature.icon;
                                const isActive = activeTab === feature.id;

                                return (
                                    <button
                                        key={feature.id}
                                        onClick={() => setActiveTab(feature.id)}
                                        className={`w-full cursor-pointer px-6 py-4 flex items-center justify-center gap-2 border-r border-border last:border-r-0 transition-colors
                                                ${isActive
                                                ? "bg-primary/80 text-light"
                                                : "bg-primary text-light hover:bg-primary/80"
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-base font-semibold whitespace-nowrap text-light">
                                            {feature.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-10 bg-surface">
                        {activeFeature && (
                            <>
                                {/* Top Info */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 border border-border bg-background text-primary rounded-full">
                                        <activeFeature.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">
                                            {activeFeature.tag}
                                        </p>
                                        <h3 className="text-xl font-bold text-foreground">
                                            {activeFeature.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-muted-foreground mb-8 max-w-lg">
                                    {activeFeature.description}
                                </p>

                                {/* Terminal Panel */}
                                <div className="bg-black text-white font-mono text-xs p-6 border border-border relative">
                                    <div className="flex gap-2 mb-4 border-b border-white/10 pb-3">
                                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    </div>

                                    <div className="space-y-2 text-white/70">
                                        <p>
                                            <span className="text-primary font-bold">status:</span>{" "}
                                            "operational"
                                        </p>
                                        <p>
                                            <span className="text-primary font-bold">metric:</span>{" "}
                                            "{activeFeature.stats}"
                                        </p>
                                        <p>
                                            <span className="text-primary font-bold">
                                                integrity_check:
                                            </span>{" "}
                                            true
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}