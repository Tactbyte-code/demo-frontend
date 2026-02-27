"use client";

import React from 'react';
import {
    LayoutDashboard,
    Search,
    Database,
    Globe,
    Zap,
    ChevronRight,
    CircleDot
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();

    const mainItems = [
        { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    ];

    const engineItems = [
        { name: 'App Store Analysis', icon: Globe, href: '/dashboard/appanalysis', color: 'text-blue-500' },
        { name: 'Reddit Analysis', icon: Database, href: '/dashboard/redditanalysis', color: 'text-orange-500' },
    ];

    return (
        <div className="flex h-screen bg-white text-foreground overflow-hidden font-sans">
            {/* --- REFINED SIDEBAR --- */}
            <aside className="w-72 border-r border-slate-100 flex flex-col bg-slate-50/40 backdrop-blur-xl shrink-0">

                {/* Brand Section */}
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3 mb-10 group px-2">
                        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/30 transition-all group-hover:scale-110 group-hover:rotate-6">
                            <Zap className="w-5 h-5 fill-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black tracking-tighter text-xl leading-none">DEMO</span>
                            <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase mt-1">Intelligence</span>
                        </div>
                    </Link>

                    {/* Navigation Groups */}
                    <div className="space-y-8">
                        {/* Group 1: General */}
                        <div>
                            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">General</p>
                            <nav className="space-y-1">
                                {mainItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <SidebarLink key={item.name} item={item} isActive={isActive} />
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Group 2: Intelligence Engines */}
                        <div>
                            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Intelligence Engines</p>
                            <nav className="space-y-1">
                                {engineItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <SidebarLink key={item.name} item={item} isActive={isActive} />
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: System Health & Plan */}
                <div className="mt-auto p-6 space-y-4">
                    {/* System Status */}
                    <div className="px-4 flex items-center gap-3">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Engine Live</span>
                    </div>

                    {/* Plan Card */}
                    <div className="bg-slate-900 rounded-[2rem] p-5 text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-all" />
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Compute Power</p>
                        <p className="text-sm font-bold mb-4">Enterprise Pro</p>

                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold">
                                <span className="opacity-60 uppercase">Tokens Used</span>
                                <span>84%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-[84%] bg-primary shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- CONTENT AREA --- */}
            <main className="flex-1 overflow-y-auto relative bg-white">
                {/* Soft gradient background for the content area */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.03),transparent_50%)] pointer-events-none" />
                <div className="relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}

// Helper Component for Sidebar Links
function SidebarLink({ item, isActive }) {
    return (
        <Link
            href={item.href}
            className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 group ${isActive
                    ? 'bg-white text-primary shadow-sm border border-slate-100'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                }`}
        >
            <div className="flex items-center gap-3">
                <div className={`transition-colors ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`}>
                    <item.icon className="w-4.5 h-4.5" />
                </div>
                <span className="tracking-tight">{item.name}</span>
            </div>
            {isActive ? (
                <CircleDot className="w-3 h-3 text-primary animate-pulse" />
            ) : (
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            )}
        </Link>
    );
}