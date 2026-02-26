"use client";
import React from 'react';
import {
    LayoutDashboard,
    Search,
    Factory,
    Zap,
    BarChart3,
    Settings
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
        { name: 'Intelligence', icon: Search, href: '/dashboard/search' },
        { name: 'Industries', icon: Factory, href: '/dashboard/industries' },
        { name: 'Signals', icon: Zap, href: '/dashboard/signals' },
        { name: 'Reports', icon: BarChart3, href: '/dashboard/reports' },
        { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
    ];

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* --- PERSISTENT SIDEBAR --- */}
            <aside className="w-64 border-r border-glass-border flex flex-col bg-surface/30 backdrop-blur-xl shrink-0">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3 mb-10 group">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg shadow-primary/20 transition-transform group-hover:rotate-12">
                            D
                        </div>
                        <span className="font-bold tracking-tighter text-xl">DEMO</span>
                    </Link>

                    <nav className="space-y-1.5">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'text-muted hover:bg-surface hover:text-foreground'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Profile / Plan Section */}
                <div className="mt-auto p-6 border-t border-glass-border">
                    <div className="bg-foreground rounded-2xl p-4 text-white">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Current Plan</p>
                        <p className="text-xs font-bold mb-3">Enterprise Intelligence</p>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-primary" />
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- DYNAMIC CONTENT AREA --- */}
            <main className="flex-1 overflow-y-auto relative">
                {children}
            </main>
        </div>
    );
}