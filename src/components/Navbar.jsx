"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ChevronDown, LogIn, Activity, Shield, Zap,
    Globe, Briefcase, LayoutGrid, Tag, Book, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import UserProfileButton from '@/components/ui/UserProfileButton';

export default function Navbar() {
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const timeoutRef = useRef(null);
    const router = useRouter();

    const checkUser = () => {
        const stored = localStorage.getItem("user");
        setIsLoggedIn(!!stored);
    };

    useEffect(() => {
        checkUser();
        window.addEventListener("storage", checkUser);
        window.addEventListener("userUpdated", checkUser);
        return () => {
            window.removeEventListener("storage", checkUser);
            window.removeEventListener("userUpdated", checkUser);
        };
    }, []);

    const handleMouseEnter = () => {
        if (window.innerWidth < 1024) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsFeaturesOpen(true), 100);
    };

    const handleMouseLeave = () => {
        if (window.innerWidth < 1024) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsFeaturesOpen(false), 200);
    };

    useEffect(() => {
        document.body.style.overflow = (isFeaturesOpen || isMobileMenuOpen) ? 'hidden' : 'unset';
    }, [isFeaturesOpen, isMobileMenuOpen]);

    const navItems = [
        { name: 'How It Works', href: '/how-it-works', icon: Briefcase },
        { name: 'Use Cases', href: '/use-cases', icon: LayoutGrid },
        { name: 'Pricing', href: '/pricing', icon: Tag },
        { name: 'Resources', href: '/resources', icon: Book },
    ];

    return (
        <>
            <AnimatePresence>
                {isFeaturesOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 hidden lg:block"
                    />
                )}
            </AnimatePresence>

            <nav className="fixed top-0 left-0 w-full flex justify-center z-50 py-3 px-4 md:py-4">
                <div className="w-full lg:w-[93%] flex rounded-lg justify-between items-center border border-gray-200 lg:border-navbar-border backdrop-blur-xl bg-white lg:bg-black/40 px-4 py-2.5 shadow-2xl relative transition-all duration-300">

                    {/* Left: Hamburger (Mobile) / Nav Links (Desktop) */}
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden text-slate-900 p-2 hover:bg-slate-100 rounded-md transition-colors"
                        >
                            <Menu size={20} />
                        </button>

                        <div className="hidden lg:flex gap-1 text-[13px] font-medium">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center rounded-xs gap-1.5 px-2.5 py-1.5 text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300"
                                >
                                    <item.icon className="w-3.5 h-3.5 opacity-70" />
                                    <span>{item.name}</span>
                                </Link>
                            ))}

                            <button
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className={`flex items-center gap-1.5 px-2.5 py-1.5 transition-all cursor-pointer rounded-xs ${
                                    isFeaturesOpen ? 'bg-white/10 text-white' : 'text-white/90 hover:bg-white/5'
                                }`}
                            >
                                <Zap className="w-3.5 h-3.5" />
                                <span>Features</span>
                                <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {/* Center: Logo (Background Removed) */}
                    <Link
                        href="/"
                        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all"
                    >
                        <div className="relative h-7 w-28 md:h-9 md:w-36 lg:h-10 lg:w-44">
                            <Image
                                src="/images/logo_with_text_2.png"
                                alt="Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Right: Auth */}
                    <div className="flex items-center gap-2">
                        {isLoggedIn ? (
                            <div className="text-slate-900 lg:text-white">
                                <UserProfileButton />
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-slate-900 lg:bg-white/15 hover:bg-slate-800 lg:hover:bg-white/60 text-white lg:hover:text-black px-4 py-2 text-[12px] md:text-[13px] font-bold flex items-center gap-2 border border-transparent lg:border-white/10 transition-all rounded-sm active:scale-95"
                            >
                                <LogIn className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Login</span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Desktop Features Mega Menu */}
                <AnimatePresence>
                    {isFeaturesOpen && (
                        <motion.div
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            className="absolute hidden lg:block rounded-sm top-full left-1/2 -translate-x-1/2 w-[93%] bg-surface/90 backdrop-blur-2xl border border-glass-border p-8 shadow-2xl z-50 origin-top"
                        >
                            <div className="grid grid-cols-12 gap-8">
                                <div className="col-span-4 space-y-2 border-r border-glass-border pr-8">
                                    <FeatureItem icon={Activity} title="Real-time Analytics" desc="Track app performance instantly." />
                                    <FeatureItem icon={Shield} title="Enterprise Security" desc="Bank-grade encryption." />
                                    <FeatureItem icon={Globe} title="Global Scale" desc="Deploy infrastructure globally." />
                                </div>
                                <div className="col-span-8 grid grid-cols-2 gap-6">
                                    <MegaMenuCard href='/dashboard/reddit' img="/images/f3.png" label="New Update" title="Reddit Analysis" />
                                    <MegaMenuCard href='/dashboard/playstore' img="/images/f4.jpeg" label="Case Study" title="Playstore Analysis" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Side Menu & Backdrop */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z- lg:hidden"
                            />

                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed inset-y-0 left-0 w-[85%] max-w-xs bg-white border-r border-slate-100 z- p-6 flex flex-col lg:hidden shadow-2xl"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Navigation</p>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-slate-400 hover:text-slate-900 p-1 transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-5">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-4 text-lg font-semibold text-slate-600 active:text-slate-900 transition-colors"
                                        >
                                            <item.icon className="w-5 h-5 text-slate-400" />
                                            {item.name}
                                        </Link>
                                    ))}

                                    <div className="h-px bg-slate-100 my-2" />

                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Features</p>

                                    <Link
                                        href="/dashboard/reddit"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 active:bg-slate-100 transition-all"
                                    >
                                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                            <Activity className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold">Reddit Analysis</span>
                                    </Link>

                                    <Link
                                        href="/dashboard/playstore"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 active:bg-slate-100 transition-all"
                                    >
                                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                            <LayoutGrid className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold">Playstore Analysis</span>
                                    </Link>
                                </div>

                                {!isLoggedIn && (
                                    <div className="mt-auto pt-6">
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                                        >
                                            <LogIn size={18} />
                                            Login to Dashboard
                                        </Link>
                                    </div>
                                )}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}

// Sub-components
function FeatureItem({ icon: Icon, title, desc }) {
    return (
        <div className="p-3 hover:bg-primary/10 transition-all cursor-pointer group rounded-sm">
            <div className="flex items-center gap-3 mb-1">
                <Icon className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{title}</h4>
            </div>
            <p className="text-xs text-muted ml-8">{desc}</p>
        </div>
    );
}

function MegaMenuCard({ href, img, label, title }) {
    return (
        <Link href={href} className="relative aspect-video overflow-hidden bg-background border border-border-solid group cursor-pointer shadow-sm">
            <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image src={img} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-primary/20 backdrop-blur-md text-primary text-[10px] px-2 py-0.5 border border-primary/20 mb-2 block w-fit font-bold">{label}</span>
                <p className="text-foreground group-hover:text-white font-bold text-sm transition-colors">{title}</p>
            </div>
        </Link>
    );
}