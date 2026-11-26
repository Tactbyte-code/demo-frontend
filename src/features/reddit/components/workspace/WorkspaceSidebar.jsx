
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    Menu,
    X,
    Loader2,
    LogOut,
    Settings,
    Headset,
    ChevronUp,
    UserRound,
    ChevronRight,
    Smartphone,
    Lightbulb,
    Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { workspaceMenu } from "@/utils/reddit/workspaceMenu";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import WorkspaceCreditCard from "@/components/shared/WorkspaceCreditCard";
import { useCreditStore } from "@/store/useCreditStore";
import CreditPurchaseModal from "@/components/credits/CreditPurchaseModal";

const labelClass = (collapsed) =>
    `overflow-hidden whitespace-nowrap transition-opacity duration-200 ${collapsed
        ? "opacity-0 pointer-events-none"
        : "opacity-100 delay-100"
    }`;

export default function RedditWorkspaceSidebar({
    collapsed,
    onToggle,
    onTopUp,
}) {
    const pathname = usePathname();
    const router = useRouter();

    // Backend application user
    const user = useAuthStore((state) => state.user);

    // Firebase user is kept separately
    const firebaseUser = useAuthStore((state) => state.firebaseUser);

    const loading = useAuthStore((state) => state.loading);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [showCreditPurchaseModal, setShowCreditPurchaseModal] =
        useState(false);

    const menuItems = loading
        ? []
        : user
            ? workspaceMenu.authenticated
            : workspaceMenu.guest;

    const renderMenuItems = () =>
        menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

            return (
                <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? item.title : undefined}
                    className={`flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-md px-[15px] py-3 text-sm font-medium transition-all duration-200 ${isActive
                        ? "bg-gradient-to-r from-[#B8320A] to-[#D13A0B] text-white shadow-lg shadow-[0_4px_14px_rgba(184,50,10,0.22)]"
                        : "text-orange-100/80 hover:bg-[#FF4500]/10 hover:text-white"
                        }`}
                >
                    {Icon && (
                        <Icon
                            size={17}
                            strokeWidth={2}
                            className="shrink-0"
                        />
                    )}

                    <span
                        aria-hidden={collapsed}
                        className={labelClass(collapsed)}
                    >
                        {item.title}
                    </span>
                </Link>
            );
        });

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);

            await signOut(auth);

            // Clear application auth state
            clearAuth();

            // Reset shared credit state
            useCreditStore.getState().resetCredits();

            setUserMenuOpen(false);
            setMobileOpen(false);

            router.replace("/reddit");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Backend User model fields
    const userName =
        user?.display_name ||
        user?.full_name ||
        "My Account";

    const userEmail = user?.email || "";

    const userPhoto = user?.photo_url || null;

    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <>
            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-[#FFE0D5] bg-white px-4 lg:hidden">
                <Link
                    href="/"
                    className="group flex flex-row items-center gap-0 no-underline"
                >
                    <div className="relative h-13 w-13 shrink-0">
                        <Image
                            src="/images/logo-new-no-bg.png"
                            alt="Logo"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain"
                            priority
                        />
                    </div>

                    <span className="bg-linear-to-r from-[#FF4500] via-[#FF5A1F] to-[#FF8A50] bg-clip-text text-xl font-bold tracking-tight whitespace-nowrap text-transparent">
                        ProblemPulseAI
                    </span>
                </Link>

                <button
                    type="button"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="rounded-lg p-2 text-[#B9380A] hover:bg-[#FFF1EB]"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: collapsed ? 72 : 280 }}
                transition={{
                    width: {
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    },
                }}
                className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col overflow-visible bg-[#291714] max-lg:!w-[280px] ${mobileOpen
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"
                    }`}
                style={{ width: collapsed ? 72 : 280 }}
            >
                {/* Brand */}
                <div className="relative flex h-[73px] shrink-0 items-center px-3">
                    <Link
                        href="/reddit"
                        className="group flex w-full min-w-0 items-center gap-3 overflow-hidden"
                    >
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                            <Image
                                src="/images/logo-new-no-bg.png"
                                alt="ProblemPulse"
                                fill
                                className="object-contain p-1"
                                priority
                            />
                        </div>

                        <div
                            aria-hidden={collapsed}
                            className={`min-w-0 ${labelClass(collapsed)}`}
                        >
                            <span className="block text-[15px] font-bold tracking-tight text-white">
                                ProblemPulseAI
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Toggle */}
                    <button
                        type="button"
                        onClick={onToggle}
                        title={
                            collapsed
                                ? "Expand sidebar"
                                : "Collapse sidebar"
                        }
                        className="absolute top-1/2 -right-3 z-50 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-[#FF8A50]/30 bg-[#3A2822] text-orange-100 shadow-md transition-colors hover:bg-[#FF4500] lg:flex"
                    >
                        <motion.span
                            animate={{ rotate: collapsed ? 0 : 180 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-center justify-center"
                        >
                            <ChevronRight size={14} />
                        </motion.span>
                    </button>
                </div>

                {/* Navigation */}
                <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-3">
                    {loading ? (
                        <div className="flex justify-center px-2 py-3 text-orange-100/70">
                            <Loader2 size={18} className="animate-spin" />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-5">

                            {/* Other Workspaces */}
                            <div>
                                <p
                                    className={`mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.16em] text-orange-100/45 ${labelClass(collapsed)}`}
                                    aria-hidden={collapsed}
                                >
                                    Other Workspaces
                                </p>

                                <nav className="flex flex-col gap-1">
                                    {[
                                        {
                                            title: "Play Store Analysis",
                                            href: "/playstore",
                                            icon: Smartphone,
                                        },
                                        {
                                            title: "Validate Idea",
                                            href: "/validate-idea",
                                            icon: Lightbulb,
                                        },
                                    ].map((item) => {
                                        const Icon = item.icon;

                                        const isActive =
                                            pathname === item.href ||
                                            pathname.startsWith(`${item.href}/`);

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setMobileOpen(false)}
                                                title={collapsed ? item.title : undefined}
                                                className={`flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-md border px-[14px] py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                                                    ? "border-white/15 bg-white/10 text-white"
                                                    : "border-transparent text-orange-100/55 hover:border-white/10 hover:bg-white/5 hover:text-white"
                                                    } ${collapsed ? "justify-center px-0" : ""}`}
                                            >
                                                <Icon
                                                    size={17}
                                                    strokeWidth={1.8}
                                                    className="shrink-0"
                                                />

                                                <span
                                                    aria-hidden={collapsed}
                                                    className={labelClass(collapsed)}
                                                >
                                                    {item.title}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>

                            {/* New Analysis */}
                            <Link
                                href="/reddit"
                                onClick={() => setMobileOpen(false)}
                                title={collapsed ? "Start New Analysis" : undefined}
                                className={`flex items-center justify-center gap-2.5 rounded-md bg-gradient-to-r from-[#B8320A] to-[#D13A0B] px-3 py-3 text-sm font-semibold text-white shadow-md shadow-orange-950/20 transition-all hover:brightness-110 ${collapsed ? "px-0" : ""
                                    }`}
                            >
                                <Plus
                                    size={18}
                                    strokeWidth={2.5}
                                    className="shrink-0"
                                />

                                <span
                                    aria-hidden={collapsed}
                                    className={labelClass(collapsed)}
                                >
                                    Start New Analysis
                                </span>
                            </Link>

                            {/* Divider */}
                            <div className="border-t border-white/10" />

                            {/* Reddit Menu */}
                            <div>
                                <p
                                    className={`mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.16em] text-orange-100/45 ${labelClass(collapsed)}`}
                                    aria-hidden={collapsed}
                                >
                                    Reddit
                                </p>

                                <nav className="flex flex-col gap-2">
                                    {renderMenuItems()}
                                </nav>
                            </div>

                        </div>
                    )}
                </div>

                {/* Bottom Section */}
                {!loading && (
                    <div className="relative z-20 shrink-0 px-3 pt-4 pb-3">
                        {/* Credits */}
                        {user && (
                            <div className="mb-3 overflow-hidden">
                                <WorkspaceCreditCard
                                    collapsed={collapsed}
                                    onTopUp={() => {
                                        onTopUp?.();
                                        setShowCreditPurchaseModal(true);
                                    }}
                                />
                            </div>
                        )}

                        {/* User Dropup */}
                        {user && (
                            <div className="relative">
                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 8,
                                                scale: 0.97,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 8,
                                                scale: 0.97,
                                            }}
                                            transition={{ duration: 0.18 }}
                                            className={`absolute z-50 ${collapsed
                                                ? "bottom-0 left-full ml-3 w-56 origin-bottom-left"
                                                : "bottom-full left-0 right-0 mb-2 origin-bottom"
                                                } overflow-hidden rounded-lg bg-gradient-to-br from-[#49251B] via-[#35221D] to-[#251D1A] p-1.5 shadow-[0_0_0_1px_rgba(255,100,55,0.22),0_0_18px_2px_rgba(0,0,0,0.4),0_0_30px_5px_rgba(255,69,0,0.16)]`}
                                        >
                                            <Link
                                                href="/account"
                                                onClick={() => {
                                                    setUserMenuOpen(false);
                                                    setMobileOpen(false);
                                                }}
                                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-orange-50 transition-colors hover:bg-white/10 hover:text-white"
                                            >
                                                <Settings size={17} />
                                                <span>My Account</span>
                                            </Link>

                                            <Link
                                                href="/support"
                                                onClick={() => {
                                                    setUserMenuOpen(false);
                                                    setMobileOpen(false);
                                                }}
                                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-orange-50 transition-colors hover:bg-white/10 hover:text-white"
                                            >
                                                <Headset size={17} />
                                                <span>Support</span>
                                            </Link>

                                            <div className="my-1 border-t border-white/10" />

                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                disabled={isLoggingOut}
                                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {isLoggingOut ? (
                                                    <Loader2
                                                        size={17}
                                                        className="animate-spin"
                                                    />
                                                ) : (
                                                    <LogOut size={17} />
                                                )}

                                                <span>
                                                    {isLoggingOut
                                                        ? "Logging out..."
                                                        : "Logout"}
                                                </span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* User Menu Trigger */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setUserMenuOpen((prev) => !prev)
                                    }
                                    title={collapsed ? userName : undefined}
                                    aria-expanded={userMenuOpen}
                                    className="flex w-full items-center gap-3 overflow-hidden rounded-lg px-1.5 py-3 text-left transition-colors hover:bg-white/10"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#FF8A50]/30 bg-gradient-to-br from-[#B8320A] to-[#FF6A33] text-sm font-bold text-white">
                                        {userPhoto ? (
                                            <img
                                                src={userPhoto}
                                                alt={userName}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            userInitial || (
                                                <UserRound size={18} />
                                            )
                                        )}
                                    </div>

                                    <div
                                        aria-hidden={collapsed}
                                        className={`min-w-0 flex-1 ${labelClass(collapsed)}`}
                                    >
                                        <p className="truncate text-sm font-semibold text-white">
                                            {userName}
                                        </p>

                                        <p className="truncate text-[11px] text-orange-100/55">
                                            {userEmail}
                                        </p>
                                    </div>

                                    <motion.span
                                        animate={{
                                            rotate: userMenuOpen ? 180 : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className={`shrink-0 transition-opacity duration-200 ${collapsed
                                            ? "opacity-0"
                                            : "opacity-100 delay-100"
                                            }`}
                                    >
                                        <ChevronUp
                                            size={17}
                                            className="text-orange-200"
                                        />
                                    </motion.span>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Credit Purchase Modal */}
                <CreditPurchaseModal
                    isOpen={showCreditPurchaseModal}
                    onClose={() => setShowCreditPurchaseModal(false)}
                    user={user}
                    redirectAfterPurchase={false}
                />
            </motion.aside>
        </>
    );
}
