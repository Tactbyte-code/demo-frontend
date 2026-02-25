"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database,
    Zap,
    BrainCircuit,
    Download,
    ArrowRight,
    Terminal,
} from 'lucide-react';
import Link from 'next/link';

const features = [
    {
        id: "db",
        title: "Intelligent Database",
        description: "A centralized repository of millions of global conversations, indexed and ready for deep-dive research.",
        icon: Database,
        tag: "Data Ingestion",
        stats: "2.4B Records Indexed"
    },
    {
        id: "signals",
        title: "Demand Signals",
        description: "Identify high-velocity trends before they hit the mainstream. See what users are asking for in real-time.",
        icon: Zap,
        tag: "Trend Analysis",
        stats: "Real-time Detection"
    },
    {
        id: "ai",
        title: "AI Sentiment Analysis",
        description: "Our proprietary models categorize raw feedback into actionable emotional insights and frustration scores.",
        icon: BrainCircuit,
        tag: "NLP Engine",
        stats: "99.2% Accuracy"
    },
    {
        id: "export",
        title: "Instant Data Export",
        description: "Port your findings directly into your workflow with clean CSV or JSON exports designed for engineering teams.",
        icon: Download,
        tag: "Portability",
        stats: "REST API v2"
    }
];

export default function FeaturesSection() {

    const [activeId, setActiveId] = useState(features[0].id);
    const [hasMounted, setHasMounted] = useState(false);

    // Find the current active feature object once per render
    const activeFeature = features.find(f => f.id === activeId) || features[0];
    const ActiveIcon = activeFeature.icon;

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        // Render a "skeleton" or a consistent placeholder for the server
        return <div className="h-10 w-full bg-surface animate-pulse rounded-xl" />;
    }

    return (
        <section id="features" className="pb-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-14">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-px w-12 bg-primary" />
                            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em]">System Capabilities</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tighter leading-none">
                            High-fidelity <br />
                            <span className="text-primary">market decoding.</span>
                        </h2>
                    </div>
                    <Link href="/features" className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors">
                        View All Features
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* --- NON-CARD GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Side: Navigation List */}
                    <div className="lg:col-span-5 flex flex-col">
                        {features.map((feature) => (
                            <div
                                key={feature.id}
                                onMouseEnter={() => setActiveId(feature.id)}
                                className={`py-10 border-b border-glass-border cursor-pointer transition-all duration-500 relative group ${activeId === feature.id ? 'pl-6' : 'pl-0 opacity-40 hover:opacity-100'
                                    }`}
                            >
                                {/* Active Indicator Bar */}
                                {activeId === feature.id && (
                                    <motion.div
                                        layoutId="activeBar"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-14 bg-primary rounded-full"
                                    />
                                )}

                                <div className="flex items-center gap-3">
                                    <feature.icon className={`w-6 h-6 transition-colors ${activeId === feature.id ? 'text-primary' : 'text-muted'}`} />
                                    <h3 className={`text-2xl font-bold tracking-tight transition-all ${activeId === feature.id ? 'text-foreground' : 'text-muted'}`}>
                                        {feature.title}
                                    </h3>
                                </div>

                                <AnimatePresence>
                                    {activeId === feature.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="mt-4 text-muted text-[16px] leading-relaxed max-w-sm">
                                                {feature.description}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Visual Preview Panel */}
                    <div className="lg:col-span-7 py-10 sticky top-24 self-start">
                        {/* Fixed aspect ratio class */}
                        <div className="aspect-4/3 bg-surface rounded-[3rem] border border-glass-border relative overflow-hidden flex items-center justify-center p-12">
                            {/* Technical Mesh Background */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeId}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="w-full h-full flex flex-col justify-center"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-4 rounded-2xl bg-white shadow-xl text-primary border border-glass-border">
                                            <ActiveIcon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                                                {activeFeature.tag}
                                            </span>
                                            <h4 className="text-xl font-bold text-foreground tracking-tight">
                                                Module Instance
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Mock Code / UI Preview */}
                                    <div className="bg-mauve-900 rounded-3xl p-6 font-mono text-[10px] sm:text-xs text-white/70 shadow-2xl relative">
                                        <div className="flex gap-2 mb-4 border-b border-white/10 pb-4">
                                            <div className="w-2 h-2 rounded-full bg-rose-500" />
                                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <p><span className="text-primary font-bold">status:</span> "operational"</p>
                                            <p><span className="text-primary font-bold">metric:</span> "{activeFeature.stats}"</p>
                                            <p><span className="text-primary font-bold">integrity_check:</span> true</p>
                                            <p><span className="text-primary font-bold">last_sync:</span> "{new Date().toLocaleTimeString()}"</p>
                                        </div>
                                        <Terminal className="absolute bottom-6 right-6 w-8 h-8 opacity-10" />
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}