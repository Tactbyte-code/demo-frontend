"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useQueryClient } from '@tanstack/react-query';

export default function UserProfileButton() {
    const [user, setUser] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const router = useRouter();
    const queryClient = useQueryClient();

    const loadUser = () => {
        const stored = localStorage.getItem("user");
        if (stored) {
            setUser(JSON.parse(stored));
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        loadUser();
        window.addEventListener("storage", loadUser);
        window.addEventListener("userUpdated", loadUser);
        return () => {
            window.removeEventListener("storage", loadUser);
            window.removeEventListener("userUpdated", loadUser);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        queryClient.clear();
        localStorage.removeItem("user");
        setUser(null);
        setIsProfileOpen(false);
        router.replace("/login");
    };

    if (!user) return null;

    return (
        <div className="relative" ref={profileRef}>
            {/* Trigger - Adjusted for White Background on Mobile */}
            <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-2 py-1.5 transition-all duration-200 cursor-pointer rounded-full bg-primary/30 hover:bg-primary/40"
            >
                {user.photo_url ? (
                    <div className="relative w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden ring-1 ring-slate-200 md:ring-white/20">
                        <Image src={user.photo_url} alt="Profile" fill sizes="32px" className="object-cover" priority />
                    </div>
                ) : (
                    <div
                        className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: '#080f14' }}
                    >
                        {user.full_name?.charAt(0).toUpperCase() || "U"}
                    </div>
                )}

                {/* Text Color Adjusted: Slate-900 for mobile white nav, text-main for desktop */}
                <span className="hidden sm:inline-block text-foreground text-[13px] font-semibold md:font-medium pr-1">
                    {user?.full_name?.split(" ")?.[0] || "Account"}
                </span>

                <ChevronDown
                    className={`w-3 h-3 text-foreground md:text-sidebar-item-active-tex transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown - Kept the Blur but ensured it works on light nav */}
            <AnimatePresence>
                {isProfileOpen && (
                    <motion.div
                        onClick={() => setIsProfileOpen(false)}
                        initial={{ opacity: 0, y: -10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute right-0 mt-3 lg:mt-5 w-68 p-2 z-60 rounded-xl backdrop-blur-xl bg-surface-raised"
                        style={{
                            // background: "rgba(255,255,255)",
                            border: "1px solid var(--glass-border)",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                        }}
                    >
                        {/* USER CARD */}
                        <div
                            className="flex items-center gap-3 px-3 py-3 mb-2 rounded-lg bg-surface-card"
                            style={{
                                // background: "var(--surface-raised)",
                                border: "1px solid var(--border-solid)",
                            }}
                        >
                            {user?.photo_url ? (
                                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-white/40">
                                    <Image
                                        src={user.photo_url}
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div
                                    className="w-10 h-10 flex rounded-full items-center justify-center text-sm font-bold shrink-0"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, var(--primary), var(--accent))",
                                        color: "#080f14",
                                    }}
                                >
                                    {user.full_name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}

                            <div className="min-w-0 flex-1">
                                <p
                                    className="text-sm font-semibold truncate"
                                    style={{ color: "var(--text-main)" }}
                                >
                                    {user.full_name || "User"}
                                </p>
                                <p
                                    className="text-xs truncate opacity-70"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        {/* APPEARANCE */}
                        {/* <div className="flex items-center justify-between px-3 py-2">
                            <span className="text-xs font-medium text-muted">
                                Appearance
                            </span>
                            <ThemeToggle />
                        </div> */}

                        {/* DIVIDER */}
                        <div
                            className="mx-2 my-2 h-px"
                            style={{
                                background: "linear-gradient(to right, transparent, var(--border-solid), transparent)",
                                opacity: 0.7,
                            }}
                        />

                        {/* MENU ITEMS */}
                        <div className="space-y-1">
                            {/* Dashboard */}
                            <button
                                onClick={() => {
                                    setIsProfileOpen(false);
                                    router.push("/dashboard");
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-foreground rounded-lg text-sm font-medium transition-all duration-150 hover:bg-accent/30 active:scale-[0.98]"
                            >
                                <LayoutDashboard
                                    className="w-4 h-4 text-foreground hover:text-light"
                                />
                                Dashboard
                            </button>

                            {/* Sign Out */}
                            <button
                                onClick={async () => {
                                    setIsProfileOpen(false);
                                    await handleLogout();
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 hover:bg-accent/30 active:bg-red-100 active:scale-[0.98]"
                                style={{ color: "var(--destructive)" }}
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}