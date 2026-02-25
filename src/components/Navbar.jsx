"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ChevronDown,
    LogIn,
    Activity,
    Shield,
    Zap,
    Globe,
    Briefcase,
    LayoutGrid,
    Tag,
    BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsFeaturesOpen(true);
        }, 100);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsFeaturesOpen(false);
        }, 200);
    };

    useEffect(() => {
        if (isFeaturesOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isFeaturesOpen]);

    // Mapping icons to your tab names
    const navItems = [
        { name: 'How It Works', href: '/how-it-works', icon: Briefcase },
        { name: 'Use Cases', href: '/use-cases', icon: LayoutGrid },
        { name: 'Pricing', href: '/pricing', icon: Tag },
        { name: 'Resources', href: '/resources', icon: BookOpen },
    ];

    return (
        <>
            <AnimatePresence>
                {isFeaturesOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/30 backdrop-blur-md z-40"
                    />
                )}
            </AnimatePresence>

            <nav className="fixed top-0 left-0 w-full flex justify-center z-50 py-3 px-4">
                <div className="w-[93%] flex justify-between items-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-[14px] px-4 py-3 shadow-2xl transition-all duration-300 relative">

                    {/* Left: Navigation */}
                    <div className="flex gap-1 text-[13px] font-medium">
                        <button
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${isFeaturesOpen
                                ? 'bg-white/10 text-white'
                                : 'text-white/90 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Zap className="w-3.5 h-3.5" />
                            <span>Features</span>
                            <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300"
                            >
                                <item.icon className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Center: Logo */}
                    <Link href="/" className="absolute left-[54%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center cursor-pointer">
                        <div className="relative h-14 w-14">
                            <Image src="/images/logo2.png" alt="Logo" fill className="object-contain" priority />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-white">DEMO</span>
                    </Link>

                    {/* Right: Login Button */}
                    <Link
                        href="/login"
                        className="bg-white/10 hover:bg-white/60 text-white hover:text-black px-4 py-2 rounded-full text-[13px] font-medium flex items-center gap-2 border border-white/10 transition-all active:scale-95"
                    >
                        <LogIn className="w-3.5 h-3.5" />
                        Login
                    </Link>
                </div>

                {/* Features Mega Menu Dropdown adjusted to match Crystal Blue Theme */}
                <AnimatePresence>
                    {isFeaturesOpen && (
                        <motion.div
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            // Updated: Using var(--surface) and var(--glass-border)
                            className="absolute top-full left-1/2 -translate-x-1/2 w-[93%] mt-4 bg-surface/90 backdrop-blur-2xl border border-glass-border rounded-4xl p-8 shadow-2xl z-50 origin-top"
                        >
                            <div className="grid grid-cols-12 gap-8">
                                {/* Left Sidebar: Using Theme Variables */}
                                <div className="col-span-4 space-y-2 border-r border-glass-border pr-8">
                                    <div className="p-3 hover:bg-primary/5 rounded-2xl transition-all cursor-pointer group">
                                        <div className="flex items-center gap-3 mb-1">
                                            {/* Icon color now uses var(--primary) */}
                                            <Activity className="w-5 h-5 text-primary" />
                                            <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                                Real-time Analytics
                                            </h4>
                                        </div>
                                        <p className="text-xs text-muted ml-8">
                                            Track your app performance with instant data insights.
                                        </p>
                                    </div>

                                    <div className="p-3 hover:bg-primary/5 rounded-2xl transition-all cursor-pointer group">
                                        <div className="flex items-center gap-3 mb-1">
                                            <Shield className="w-5 h-5 text-primary" />
                                            <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                                Enterprise Security
                                            </h4>
                                        </div>
                                        <p className="text-xs text-muted ml-8">
                                            Bank-grade encryption and advanced threat protection.
                                        </p>
                                    </div>

                                    <div className="p-3 hover:bg-primary/5 rounded-2xl transition-all cursor-pointer group">
                                        <div className="flex items-center gap-3 mb-1">
                                            <Globe className="w-5 h-5 text-primary" />
                                            <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                                Global Scale
                                            </h4>
                                        </div>
                                        <p className="text-xs text-muted ml-8">
                                            Deploy infrastructure across 30+ edge regions.
                                        </p>
                                    </div>
                                </div>

                                {/* Right Content Showcase */}
                                <div className="col-span-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <p className="text-xs font-bold text-muted uppercase tracking-widest">
                                            Featured Innovation
                                        </p>
                                        <Link href="/features" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
                                            View all features →
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Feature Cards with Theme Accent Glows */}
                                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-background border border-glass-border group cursor-pointer shadow-sm">
                                            <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <Image src="/images/f1.png" alt="Feature 1" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute bottom-4 left-4 z-20">
                                                <span className="bg-primary/20 backdrop-blur-md text-primary text-[10px] px-2 py-0.5 rounded-full border border-primary/20 mb-2 block w-fit font-bold">
                                                    New Update
                                                </span>
                                                <p className="text-foreground group-hover:text-white font-bold text-sm transition-colors">
                                                    AI-Powered Optimization
                                                </p>
                                            </div>
                                        </div>

                                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-background border border-glass-border group cursor-pointer shadow-sm">
                                            <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <Image src="/images/f2.png" alt="Feature 2" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute bottom-4 left-4 z-20">
                                                <span className="bg-primary/20 backdrop-blur-md text-primary text-[10px] px-2 py-0.5 rounded-full border border-primary/20 mb-2 block w-fit font-bold">
                                                    Case Study
                                                </span>
                                                <p className="text-foreground group-hover:text-white font-bold text-sm transition-colors">
                                                    Scaling for 1M+ Users
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}