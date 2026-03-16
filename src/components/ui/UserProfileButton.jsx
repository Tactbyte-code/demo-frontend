"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function UserProfileButton() {
    const [user, setUser] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const router = useRouter();

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
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsProfileOpen(false);
        router.replace("/login");
    };

    if (!user) return null;

    return (
        <div className="relative" ref={profileRef}>
            {/* Trigger */}
            <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 bg-black/20 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-full px-2 py-1.5 transition-all duration-200 active:scale-95"
            >
                {user.photo_url ? (
                    <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-white/20">
                        <Image src={user.photo_url} alt="Profile" fill className="object-cover" />
                    </div>
                ) : (
                    <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: '#080f14' }}
                    >
                        {user.full_name?.charAt(0).toUpperCase() || "U"}
                    </div>
                )}
                <span className="text-white/90 text-[13px] font-medium pr-1">
                    {user.full_name?.split(" ")[0] || "Account"}
                </span>
                <ChevronDown
                    className={`w-3 h-3 text-white/50 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isProfileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute -right-1/7 mt-4 w-56 rounded-2xl p-2 z-50 backdrop-blur-xl"
                        style={{
                            backgroundColor: 'var(--surface)',
                            border: '1px solid var(--glass-border)',
                            boxShadow: 'var(--shadow-lg)',
                        }}
                    >
                        {/* User Info Card */}
                        <div
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-1"
                            style={{ backgroundColor: 'var(--surface-card)' }}
                        >
                            {user.photo_url ? (
                                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                                    <Image src={user.photo_url} alt="Profile" fill className="object-cover" />
                                </div>
                            ) : (
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                                    style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: '#080f14' }}
                                >
                                    {user.full_name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold truncate" style={{ color: 'var(--text-main)' }}>
                                    {user.full_name || "User"}
                                </p>
                                <p className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div
                            className="mx-3 my-1.5 h-px rounded-full"
                            style={{ background: 'linear-gradient(90deg, var(--accent), transparent)', opacity: 0.25 }}
                        />

                        {/* Theme toggle row */}
                        <div className="flex items-center justify-between px-3 py-2">
                            <span className="text-xs font-bold text-main">
                                Appearance
                            </span>
                            <ThemeToggle />
                        </div>

                        {/* Divider */}
                        <div
                            className="mx-3 my-1.5 h-px rounded-full"
                            style={{ backgroundColor: 'var(--border-solid)', opacity: 0.6 }}
                        />

                        {/* Go to Dashboard */}
                        <button
                            onClick={() => { setIsProfileOpen(false); router.push('/dashboard'); }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-150 hover:bg-[var(--surface-card)]"
                            style={{ color: 'var(--text-main)' }}
                        >
                            <LayoutDashboard className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                            Go to Dashboard
                        </button>

                        {/* Sign Out */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-150 hover:bg-[var(--destructive-bg)]"
                            style={{ color: 'var(--destructive)' }}
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign Out
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}