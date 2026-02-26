"use client";

import React from 'react';
import {
    Search,
    TrendingUp,
    AlertCircle,
    Zap,
    Filter,
    ChevronRight,
    ArrowUpRight,
    MessageSquare
} from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="min-h-full bg-white">
            {/* --- DASHBOARD HEADER --- */}
            <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-glass-border px-10 py-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black tracking-tight">Market Overview</h1>
                    <p className="text-xs text-muted font-medium uppercase tracking-widest">
                        Engine Status: <span className="text-emerald-500">Optimal</span>
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                            type="text"
                            placeholder="Search pain points..."
                            className="bg-surface border border-glass-border rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 w-64 transition-all"
                        />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-surface border border-glass-border flex items-center justify-center overflow-hidden">
                        {/* Avatar placeholder */}
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            DX
                        </div>
                    </div>
                </div>
            </header>

            {/* --- CONTENT SCROLL AREA --- */}
            <div className="p-10 space-y-10 max-w-7xl mx-auto">

                {/* --- ANALYTICS WIDGETS --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Trending Problems', value: '1,284', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
                        { label: 'Opportunities', value: '412', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
                        { label: 'Market Highlights', value: '89', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/5' },
                    ].map((widget, i) => (
                        <div key={i} className="p-6 rounded-3xl border border-glass-border bg-white hover:border-primary/20 transition-all group cursor-pointer shadow-sm hover:shadow-xl hover:shadow-primary/5">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl ${widget.bg} ${widget.color}`}>
                                    <widget.icon className="w-5 h-5" />
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                            </div>
                            <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-1">{widget.label}</p>
                            <h3 className="text-3xl font-black tracking-tighter text-foreground">{widget.value}</h3>
                        </div>
                    ))}
                </div>

                {/* --- DATA FEED SECTION --- */}
                <section className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-foreground">Recent Signals</h2>
                            <p className="text-xs text-muted">High-velocity market frustrations detected in the last 24h.</p>
                        </div>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 px-3 py-2 rounded-lg transition-all border border-transparent hover:border-primary/20">
                            <Filter className="w-3 h-3" /> Filter Results
                        </button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { title: "API Latency in Checkout", source: "Reddit", frustration: 8.9, category: "Fintech", time: "2h ago" },
                            { title: "Missing Dark Mode in Dashboard", source: "Play Store", frustration: 4.2, category: "SaaS", time: "5h ago" },
                            { title: "Inconsistent Calorie Tracking", source: "Reddit", frustration: 9.1, category: "Health", time: "8h ago" },
                        ].map((problem, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-6 rounded-[2rem] border border-glass-border bg-white hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-surface border border-glass-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{problem.category}</p>
                                        <h4 className="font-bold text-foreground text-lg tracking-tight group-hover:text-primary transition-colors">{problem.title}</h4>
                                        <p className="text-xs text-muted">
                                            Via <span className="font-bold text-foreground/70">{problem.source}</span> • {problem.time}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Frustration</p>
                                        <div className="flex items-center gap-2 justify-end">
                                            <div className={`w-1.5 h-1.5 rounded-full ${problem.frustration > 7 ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`} />
                                            <p className={`text-xl font-black ${problem.frustration > 7 ? 'text-rose-500' : 'text-amber-500'}`}>
                                                {problem.frustration}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="h-10 w-px bg-glass-border hidden sm:block" />
                                    <ChevronRight className="w-5 h-5 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-4 border border-dashed border-glass-border rounded-[2rem] text-xs font-black uppercase tracking-widest text-muted hover:text-primary hover:border-primary/30 transition-all">
                        Load More Intelligence
                    </button>
                </section>
            </div>
        </div>
    );
}