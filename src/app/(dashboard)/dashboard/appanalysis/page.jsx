"use client";

import React, { useState } from 'react';
import {
    Sparkles,
    Activity,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    Cpu,
    BarChart3,
    Quote,
    RefreshCcw,
    Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '@/config/api';

// Helper function for polling delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function AppAnalysisPage() {
    const [category, setCategory] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // IMPORTANT: Variable must be prefixed with NEXT_PUBLIC_ to work in "use client"
    const API_KEY = process.env.NEXT_PUBLIC_RUNPOD_API_KEY;

    const fetchResults = async (e) => {
        if (e) e.preventDefault();
        if (!category) return;

        setIsAnalyzing(true);
        setError(null);
        setResult(null);

        try {
            // 1. Submit the job to RunPod
            const submitRes = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    input: {
                        prompt: category,
                        // Add any other specific inputs your model requires here
                    },
                }),
            });

            if (!submitRes.ok) throw new Error(`Submission failed: ${submitRes.statusText}`);

            const { id } = await submitRes.json();

            // 2. Build the polling URL
            // Usually converts .../run to .../status/[id]
            const base = API_URL.substring(0, API_URL.lastIndexOf("/"));
            const statusURL = `${base}/status/${id}`;

            // 3. Polling Loop
            let isComplete = false;
            while (!isComplete) {
                await sleep(2000); // Wait 2 seconds between checks

                const statusRes = await fetch(statusURL, {
                    headers: { Authorization: `Bearer ${API_KEY}` },
                });

                if (!statusRes.ok) throw new Error("Failed to fetch job status");

                const statusData = await statusRes.json();
                console.log('Job Status:', statusData.status);

                if (statusData.status === "COMPLETED") {
                    // Check if your model returns data in .output or .output.body
                    const finalData = statusData.output?.body || statusData.output;
                    console.log('final data: ', finalData);

                    setResult(finalData);
                    isComplete = true;
                } else if (statusData.status === "FAILED") {
                    throw new Error("The AI model failed to process this request.");
                }

                // Safety: limit polling or handle "IN_QUEUE" / "IN_PROGRESS" if needed
            }
        } catch (err) {
            console.error("API Error:", err);
            setError(err.message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-full pb-20 bg-slate-50/50">
            {/* Header Area */}
            <header className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-30">
                <div>
                    <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        App Store Intelligence
                    </h1>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-10 pt-12">
                {/* Error Display */}
                {error && (
                    <div className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 font-bold text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                )}

                {/* --- SEARCH / INPUT STATE --- */}
                {!result && !isAnalyzing && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto text-center space-y-8 py-12"
                    >
                        <div className="inline-flex p-4 rounded-3xl bg-primary/5 text-primary">
                            <Cpu className="w-10 h-10 animate-pulse" />
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-3xl font-black tracking-tighter">What are we analyzing today?</h2>
                            <p className="text-slate-500 font-medium text-lg">Input an app category to begin the deep-scan.</p>
                        </div>

                        <form onSubmit={fetchResults} className="relative group">
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Enter App Category (e.g. Fitness)..."
                                className="w-full bg-white border-2 border-slate-100 rounded-4xl px-8 py-6 text-lg font-bold focus:outline-none focus:border-primary transition-all shadow-sm group-hover:shadow-md text-slate-800"
                            />
                            <button
                                type="submit"
                                disabled={!category}
                                className="absolute right-3 top-3 bottom-3 bg-primary text-white px-8 rounded-2xl font-black text-[0.8rem] uppercase tracking-widest hover:scale-[0.98] active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2"
                            >
                                Scan Category <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}

                {/* --- ANALYZING STATE --- */}
                {isAnalyzing && (
                    <div className="flex flex-col items-center justify-center py-32 space-y-8">
                        <div className="relative">
                            <div className="w-24 h-24 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary w-8 h-8 animate-pulse" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-black tracking-tight animate-pulse">Analyzing Market Signals...</h3>
                            <p className="text-xs text-muted font-bold uppercase tracking-[0.3em] mt-2">Connecting to GPU Node • Polling Status</p>
                        </div>
                    </div>
                )}

                {/* --- RESULTS STATE --- */}
                <AnimatePresence>
                    {result && !isAnalyzing && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                            {/* Summary Header */}
                            <section className="bg-slate-900 rounded-[3rem] p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
                                <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start">
                                    <div className="lg:w-1/3">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-[10px] font-black uppercase tracking-widest mb-6">
                                            <Activity className="w-3 h-3" /> Market Summary
                                        </div>
                                        <h2 className="text-3xl lg:text-4xl font-black tracking-tighter leading-none mb-4 uppercase">The Core <br /><span className="text-primary">Narrative.</span></h2>
                                        <button
                                            onClick={() => setResult(null)}
                                            className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all"
                                        >
                                            <RefreshCcw className="w-3 h-3" /> New Analysis
                                        </button>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-lg lg:text-xl text-white/80 leading-relaxed font-medium italic border-l-2 border-primary/30 pl-8">
                                            "{result.summary}"
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <div className="grid lg:grid-cols-2 gap-10">
                                {/* Pain Points */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 px-2">
                                        <AlertCircle className="text-rose-500 w-5 h-5" />
                                        <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Identified Pain Points</h3>
                                    </div>
                                    {result.pain_points?.map((pt, i) => (
                                        <motion.div key={i} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="font-bold text-lg text-slate-800">{pt.issue}</h4>
                                                <span className="text-[10px] font-black bg-rose-50 text-rose-500 px-2.5 py-1 rounded-lg uppercase">Freq: {pt.frequency}</span>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-2xl mb-4">
                                                <p className="text-sm italic text-slate-600">"{pt.example_quote}"</p>
                                            </div>
                                            <p className="text-xs font-bold text-slate-500"><span className="text-rose-500 uppercase">Impact:</span> {pt.impact}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 px-2">
                                        <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                                        <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Recommended Actions</h3>
                                    </div>
                                    <div className="bg-emerald-50/30 border border-emerald-100 rounded-[2.5rem] p-8 space-y-4">
                                        {result.actions?.map((action, i) => (
                                            <div key={i} className="flex gap-4 items-center bg-white p-4 rounded-2xl shadow-sm">
                                                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 font-black text-xs">{i + 1}</div>
                                                <p className="text-sm font-bold text-slate-700">{action}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}