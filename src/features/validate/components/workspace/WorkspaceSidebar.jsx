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
    MessageCircle,
    Smartphone,
    Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { workspaceMenu } from "@/utils/validate/workspaceMenu";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import WorkspaceCreditCard from "@/components/shared/WorkspaceCreditCard";
import { useCreditStore } from "@/store/useCreditStore";
import CreditPurchaseModal from "@/components/credits/CreditPurchaseModal";

/**
 * Layout notes (collapsed rail = 72px, expanded = 280px):
 * - Every row uses CONSTANT padding in both states, so icons never move.
 * - Labels are always mounted and only fade (opacity). The overflow-hidden
 *   parents clip them while the sidebar width animates.
 */
const labelClass = (collapsed) =>
    `overflow-hidden whitespace-nowrap transition-opacity duration-200 ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100 delay-100"
    }`;

export default function WorkspaceSidebar({
    collapsed,
    onToggle,
    onTopUp,
}) {
    const pathname = usePathname();
    const router = useRouter();

    const user = useAuthStore((state) => state.user);
    const firebaseUser = useAuthStore((state) => state.firebaseUser);
    const loading = useAuthStore((state) => state.loading);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [showCreditPurchaseModal, setShowCreditPurchaseModal] = useState(false);

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
                    className={`
                        flex w-full min-w-0 items-center gap-3
                        overflow-hidden
                        px-[15px] py-3 rounded-md
                        text-sm font-medium
                        transition-colors duration-200
                        ${isActive
                            ? "bg-linear-to-r from-[#7138D5] to-[#9326D5] text-white shadow-lg shadow-purple-950/20"
                            : "text-purple-200 hover:bg-white/10 hover:text-white"
                        }
                    `}
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
            clearAuth();
            useCreditStore.getState().resetCredits();

            setUserMenuOpen(false);
            setMobileOpen(false);

            router.replace("/validate-idea");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const userName = user?.display_name || user?.full_name || "My Account";
    const userEmail = user?.email || "";
    const userPhoto = user?.photo_url || null;
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <>
            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-purple-100 bg-white px-4 lg:hidden">
                <Link
                    href="/"
                    className="flex flex-row items-center no-underline group gap-0"
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

                    <span className="bg-linear-to-r from-[#7138D5] via-[#C12AAE] to-[#FF4D83] bg-clip-text text-transparent text-xl font-bold tracking-tight whitespace-nowrap">
                        ProblemPulse
                    </span>
                </Link>

                <button
                    type="button"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="rounded-lg p-2 text-[#281344] hover:bg-purple-50"
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
                animate={{
                    width: collapsed ? 72 : 280,
                }}
                transition={{
                    width: {
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    },
                }}
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex flex-col
                    overflow-visible
                    bg-[#281344]
                    w-[280px] max-lg:!w-[280px]
                    ${mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }
                `}
                style={{
                    width: collapsed ? 72 : 280,
                }}
            >
                {/* Brand — constant px-3 so the 48px logo is centred in the 72px rail */}
                <div className="relative flex h-[73px] shrink-0 items-center px-3">
                    <Link
                        href="/validate-idea"
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

                            {/* <div className="mt-1 flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />

                                <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-purple-200/80">
                                    Validate Idea Workspace
                                </span>
                            </div> */}
                        </div>
                    </Link>

                    {/* Desktop Toggle */}
                    <button
                        type="button"
                        onClick={onToggle}
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        className="
                            hidden lg:flex
                            absolute top-1/2 -right-3 z-50
                            h-6 w-6 -translate-y-1/2
                            items-center justify-center
                            rounded-full
                            border border-purple-300/30
                            bg-[#493064] text-purple-100
                            shadow-md
                            transition-colors hover:bg-[#7138D5]
                        "
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
                        <div className="flex justify-center px-2 py-3 text-purple-200">
                            <Loader2 size={18} className="animate-spin" />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-5">
                            {/* Other Workspaces */}
                            <div>
                                <p
                                    className={`mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.15em] text-purple-300/50 ${labelClass(collapsed)}`}
                                    aria-hidden={collapsed}
                                >
                                    Other Workspaces
                                </p>

                                <nav className="flex flex-col gap-1">
                                    {[
                                        {
                                            title: "Reddit Analysis",
                                            href: "/reddit",
                                            icon: MessageCircle,
                                        },
                                        {
                                            title: "Play Store Analysis",
                                            href: "/playstore",
                                            icon: Smartphone,
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
                                                className={`
                                    flex w-full min-w-0 items-center gap-3
                                    overflow-hidden
                                    rounded-md border border-transparent
                                    px-[15px] py-3
                                    text-sm font-medium
                                    transition-colors duration-200
                                    ${isActive
                                                        ? "border-white/15 bg-white/10 text-white"
                                                        : "text-purple-200/70 hover:border-white/10 hover:bg-white/5 hover:text-white"
                                                    }
                                    ${collapsed ? "justify-center px-0" : ""}
                                `}
                                            >
                                                <Icon
                                                    size={17}
                                                    strokeWidth={2}
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
                                href="/validate-idea"
                                onClick={() => setMobileOpen(false)}
                                title={collapsed ? "Start New Analysis" : undefined}
                                className={`
                    flex w-full min-w-0 items-center gap-3
                    overflow-hidden rounded-md
                    bg-linear-to-r from-[#7138D5] to-[#9326D5]
                    px-[15px] py-3
                    text-sm font-semibold text-white
                    shadow-lg shadow-purple-950/20
                    transition-all duration-200
                    hover:brightness-110
                    ${collapsed ? "justify-center px-0" : ""}
                `}
                            >
                                <Plus size={18} strokeWidth={2.5} className="shrink-0" />

                                <span
                                    aria-hidden={collapsed}
                                    className={labelClass(collapsed)}
                                >
                                    Start New Analysis
                                </span>
                            </Link>

                            {/* Divider */}
                            <div className="border-t border-white/10" />

                            {/* Validate Idea Menu */}
                            <div>
                                <p
                                    className={`mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.15em] text-purple-300/50 ${labelClass(collapsed)}`}
                                    aria-hidden={collapsed}
                                >
                                    Validate Idea
                                </p>

                                <nav className="flex flex-col gap-2">
                                    {renderMenuItems()}
                                </nav>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Section — constant px-3 in both states */}
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
                                {/* Dropup Menu */}
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
                                            className={`
                                                absolute z-50
                                                ${collapsed
                                                    ? "bottom-0 left-full ml-3 w-56 origin-bottom-left"
                                                    : "bottom-full left-0 right-0 mb-2 origin-bottom"
                                                }
                                                overflow-hidden
                                                rounded-lg
                                                bg-linear-to-br from-[#49204F] via-[#3D1D50] to-[#30204F]
                                                p-1.5
                                                shadow-[0_0_0_1px_rgba(232,121,249,0.18),0_0_18px_2px_rgba(0,0,0,0.4),0_0_30px_5px_rgba(168,85,247,0.12)]
                                                `}
                                        >
                                            <Link
                                                href="#"
                                                onClick={() => {
                                                    setUserMenuOpen(false);
                                                    setMobileOpen(false);
                                                }}
                                                className="
        flex items-center gap-3
        rounded-lg px-3 py-2.5
        text-sm font-medium text-purple-50
        transition-colors
        hover:bg-white/10 hover:text-white
    "
                                            >
                                                <Settings size={17} />
                                                <span>My Account</span>
                                            </Link>

                                            <Link
                                                href="#"
                                                onClick={() => {
                                                    setUserMenuOpen(false);
                                                    setMobileOpen(false);
                                                }}
                                                className="
        flex items-center gap-3
        rounded-lg px-3 py-2.5
        text-sm font-medium text-purple-50
        transition-colors
        hover:bg-white/10 hover:text-white
    "
                                            >
                                                <Headset size={17} />
                                                <span>Support</span>
                                            </Link>

                                            <div className="my-1 border-t border-white/10" />

                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                disabled={isLoggingOut}
                                                className="
                    flex w-full items-center gap-3
                    rounded-lg px-3 py-2.5
                    text-sm font-medium text-red-300
                    transition-colors
                    hover:bg-red-500/10 hover:text-red-200
                    disabled:cursor-not-allowed disabled:opacity-50
                "
                                            >
                                                {isLoggingOut ? (
                                                    <Loader2 size={17} className="animate-spin" />
                                                ) : (
                                                    <LogOut size={17} />
                                                )}

                                                <span>
                                                    {isLoggingOut ? "Logging out..." : "Logout"}
                                                </span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* User Menu Trigger — constant px-1.5 centres the 36px avatar in the 48px collapsed width */}
                                <button
                                    type="button"
                                    onClick={() => setUserMenuOpen((prev) => !prev)}
                                    title={collapsed ? userName : undefined}
                                    aria-expanded={userMenuOpen}
                                    className="
                                        flex w-full items-center gap-3
                                        overflow-hidden
                                        rounded-lg px-1.5 py-3
                                        text-left
                                        transition-colors
                                        hover:bg-white/10
                                    "
                                >
                                    {/* Avatar */}
                                    <div className="
    flex h-9 w-9 shrink-0 items-center justify-center
    overflow-hidden rounded-full
    border border-purple-300/30
    bg-linear-to-br from-[#8B5CF6] to-[#C026D3]
    text-sm font-bold text-white
">
                                        {userPhoto ? (
                                            <img
                                                src={userPhoto}
                                                alt={userName}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            userInitial || <UserRound size={18} />
                                        )}
                                    </div>

                                    {/* User Details */}
                                    <div
                                        aria-hidden={collapsed}
                                        className={`min-w-0 flex-1 ${labelClass(collapsed)}`}
                                    >
                                        <p className="truncate text-sm font-semibold text-white">
                                            {userName}
                                        </p>

                                        <p className="truncate text-[11px] text-purple-200/60">
                                            {userEmail}
                                        </p>
                                    </div>

                                    <motion.span
                                        animate={{
                                            rotate: userMenuOpen ? 180 : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className={`shrink-0 transition-opacity duration-200 ${collapsed ? "opacity-0" : "opacity-100 delay-100"
                                            }`}
                                    >
                                        <ChevronUp
                                            size={17}
                                            className="text-purple-300"
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