
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    Zap,
    ChevronDown,
    Menu,
    X,
    Tag,
    LogOut,
} from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import { useCreditStore } from "@/store/useCreditStore";
import { auth } from "@/lib/firebase";
import LoginModal from "@/components/auth/loginModal/LoginModal";
import { scrollToSection } from "@/lib/scrollToSection";
import { features, navItems } from "@/components/layout/siteNav";

export default function SiteHeader() {
    const user = useAuthStore((state) => state.user);
    const router = useRouter();
    const pathname = usePathname();

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [featuresOpen, setFeaturesOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const profileName = user?.full_name || user?.name || "User";
    const profileEmail = user?.email || "";
    const profileImage =
        user?.profile_image_url || user?.photo_url || user?.photoURL;

    const initials = profileName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    const handleLoginSuccess = () => {
        setShowLoginModal(false);
    };

    const closeMenus = () => {
        setFeaturesOpen(false);
        setProfileOpen(false);
        setMobileOpen(false);
    };

    const goToSection = (id) => {
        closeMenus();

        if (pathname === "/") {
            scrollToSection(id);
        } else {
            router.push(`/#${id}`);
        }
    };

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            closeMenus();

            await signOut(auth);
            useCreditStore.getState().resetCredits();

            router.replace("/");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const avatar = (size = "h-9 w-9") => (
        profileImage ? (
            <div className={`relative ${size} shrink-0 overflow-hidden rounded-full border border-[#E9DDF5] bg-[#F5EDFF]`}>
                <Image
                    src={profileImage}
                    alt={profileName}
                    fill
                    sizes="48px"
                    className="object-cover"
                />
            </div>
        ) : (
            <div className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7628ED] to-[#F02D83] font-bold text-white shadow-sm`}>
                <span className="text-xs">{initials}</span>
            </div>
        )
    );

    return (
        <>
            <header className="sticky top-0 z-50 h-[76px] border-b border-[#EEE7F5] bg-white/90 backdrop-blur-xl">
                <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-4 sm:px-8 lg:px-12">

                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={closeMenus}
                        className="group flex shrink-0 items-center gap-1"
                    >
                        <div className="relative h-11 w-11 sm:h-12 sm:w-12">
                            <Image
                                src="/images/logo-new-no-bg.png"
                                alt="ProblemPulse Logo"
                                fill
                                className="object-contain transition-transform duration-300 group-hover:scale-105"
                                priority
                            />
                        </div>

                        <span className="bg-linear-to-r from-[#5F19C5] via-[#9326D5] to-[#FA418B] bg-clip-text text-[17px] font-bold tracking-tight text-transparent sm:text-xl">
                            ProblemPulseAI
                        </span>
                    </Link>

                    {/* Desktop navigation */}
                    <nav className="hidden items-center gap-1 lg:flex">
                        {navItems.map((item) => {
                            const NavIcon = item.icon;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => goToSection(item.id)}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-[#655B72] transition-all duration-200 hover:bg-[#F6F0FC] hover:text-[#7628ED]"
                                >
                                    <NavIcon className="h-4 w-4 opacity-70" />
                                    {item.name}
                                </button>
                            );
                        })}

                        {/* Features dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setFeaturesOpen(true)}
                            onMouseLeave={() => setFeaturesOpen(false)}
                        >
                            <button
                                type="button"
                                aria-haspopup="true"
                                aria-expanded={featuresOpen}
                                onClick={() => setFeaturesOpen((open) => !open)}
                                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 ${featuresOpen
                                        ? "bg-[#F6F0FC] text-[#7628ED]"
                                        : "text-[#655B72] hover:bg-[#F6F0FC] hover:text-[#7628ED]"
                                    }`}
                            >
                                <Zap className="h-4 w-4 opacity-70" />
                                Features
                                <ChevronDown
                                    className={`h-3.5 w-3.5 transition-transform duration-200 ${featuresOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {featuresOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                        transition={{ duration: 0.16 }}
                                        className="absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 pt-3"
                                    >
                                        <div className="rounded-2xl border border-[#EDE4F5] bg-white p-2 shadow-[0_18px_50px_rgba(67,35,105,0.14)]">
                                            <div className="px-3 pb-2 pt-2">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A08EBA]">
                                                    Explore ProblemPulse
                                                </p>
                                            </div>

                                            {features.map((feature) => {
                                                const FeatureIcon = feature.icon;

                                                return (
                                                    <Link
                                                        key={feature.number}
                                                        href={feature.href}
                                                        onClick={closeMenus}
                                                        className="group flex items-center gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-[#F8F4FC]"
                                                    >
                                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${feature.iconBg} ${feature.iconColor}`}>
                                                            <FeatureIcon size={19} />
                                                        </div>

                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-[13px] font-bold text-[#30233D] transition-colors group-hover:text-[#7628ED]">
                                                                {feature.title}
                                                            </p>
                                                            <p className="mt-0.5 text-[11px] leading-4 text-[#8A7E96]">
                                                                {feature.tag}
                                                            </p>
                                                        </div>

                                                        <ArrowRight className="h-4 w-4 text-[#B7A5C8] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Pricing */}
                        <Link
                            href="/pricing"
                            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-[#655B72] transition-all duration-200 hover:bg-[#F6F0FC] hover:text-[#7628ED]"
                        >
                            <Tag className="h-4 w-4 opacity-70" />
                            Pricing
                        </Link>
                    </nav>

                    {/* Right actions */}
                    <div className="flex shrink-0 items-center gap-3">

                        {/* Authenticated profile */}
                        {user ? (
                            <div className="relative hidden sm:block">
                                <button
                                    type="button"
                                    onClick={() => setProfileOpen((open) => !open)}
                                    aria-expanded={profileOpen}
                                    aria-label="Open profile menu"
                                    className={`flex items-center gap-2.5 rounded-xl border py-1.5 pl-1.5 pr-3 transition-all duration-200 ${profileOpen
                                            ? "border-[#DCC7F2] bg-[#FAF6FF] shadow-[0_3px_12px_rgba(95,25,197,0.08)]"
                                            : "border-[#EEE7F5] bg-white hover:border-[#DCC7F2] hover:bg-[#FCFAFF]"
                                        }`}
                                >
                                    {avatar()}

                                    <div className="max-w-[130px] text-left">
                                        <p className="truncate text-[12px] font-bold text-[#352448]">
                                            {profileName}
                                        </p>
                                        <p className="truncate text-[10px] font-medium text-[#9586A4]">
                                            {profileEmail}
                                        </p>
                                    </div>

                                    <ChevronDown
                                        className={`h-3.5 w-3.5 text-[#9B82B6] transition-transform duration-200 ${profileOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {profileOpen && (
                                        <>
                                            <motion.button
                                                type="button"
                                                aria-label="Close profile menu"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                onClick={() => setProfileOpen(false)}
                                                className="fixed inset-0 z-40 cursor-default"
                                            />

                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                                transition={{ duration: 0.16 }}
                                                className="absolute right-0 top-full z-50 mt-3 w-[280px] overflow-hidden rounded-2xl border border-[#EDE4F5] bg-white shadow-[0_18px_50px_rgba(67,35,105,0.15)]"
                                            >
                                                <div className="border-b border-[#F0E9F6] bg-gradient-to-br from-[#FAF6FF] via-white to-[#FFF7FA] p-4">
                                                    <div className="flex items-center gap-3">
                                                        {avatar("h-11 w-11")}

                                                        <div className="min-w-0">
                                                            <p className="truncate text-[13px] font-bold text-[#352448]">
                                                                {profileName}
                                                            </p>
                                                            <p className="mt-0.5 truncate text-[11px] text-[#9586A4]">
                                                                {profileEmail}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-2">
                                                    <button
                                                        type="button"
                                                        onClick={handleLogout}
                                                        disabled={isLoggingOut}
                                                        className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-[#FFF2F5] disabled:opacity-60"
                                                    >
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF0F4] text-[#E04479] transition-colors group-hover:bg-[#FFE4EC]">
                                                            {isLoggingOut ? (
                                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#E04479]/30 border-t-[#E04479]" />
                                                            ) : (
                                                                <LogOut className="h-[17px] w-[17px]" />
                                                            )}
                                                        </div>

                                                        <div>
                                                            <p className="text-[12px] font-bold text-[#48364F]">
                                                                {isLoggingOut ? "Logging out..." : "Logout"}
                                                            </p>
                                                            <p className="mt-0.5 text-[10px] text-[#A092A9]">
                                                                Sign out of your account
                                                            </p>
                                                        </div>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setShowLoginModal(true)}
                                className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-[#7628ED] to-[#D52BBE] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_14px_rgba(118,40,237,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_7px_20px_rgba(118,40,237,0.28)] sm:flex"
                            >
                                Get Started
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        )}

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen((open) => !open)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#EDE5F4] bg-white text-[#6D36B5] transition-colors hover:bg-[#F7F1FC] lg:hidden"
                        >
                            {mobileOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile navigation */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18 }}
                            className="absolute left-0 right-0 top-full z-50 border-b border-[#EDE5F4] bg-white px-4 pb-5 pt-3 shadow-[0_16px_35px_rgba(67,35,105,0.10)] lg:hidden sm:px-8"
                        >
                            {/* Mobile profile */}
                            {user && (
                                <div className="mb-3 flex items-center gap-3 rounded-xl bg-[#FAF6FF] p-3">
                                    {avatar("h-10 w-10")}

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[13px] font-bold text-[#352448]">
                                            {profileName}
                                        </p>
                                        <p className="truncate text-[11px] text-[#9586A4]">
                                            {profileEmail}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        disabled={isLoggingOut}
                                        aria-label="Logout"
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#E04479] transition-colors hover:bg-[#FFF0F4] disabled:opacity-50"
                                    >
                                        {isLoggingOut ? (
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#E04479]/30 border-t-[#E04479]" />
                                        ) : (
                                            <LogOut className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Main navigation */}
                            <div className="space-y-1">
                                {navItems.map((item) => {
                                    const NavIcon = item.icon;

                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => goToSection(item.id)}
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold text-[#655B72] transition-colors hover:bg-[#F7F2FC] hover:text-[#7628ED]"
                                        >
                                            <NavIcon className="h-4 w-4 opacity-75" />
                                            {item.name}
                                        </button>
                                    );
                                })}

                                <Link
                                    href="/pricing"
                                    onClick={closeMenus}
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold text-[#655B72] transition-colors hover:bg-[#F7F2FC] hover:text-[#7628ED]"
                                >
                                    <Tag className="h-4 w-4 opacity-75" />
                                    Pricing
                                </Link>
                            </div>

                            {/* Mobile features */}
                            <div className="mt-4 border-t border-[#F0E9F6] pt-4">
                                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#A08EBA]">
                                    Explore Features
                                </p>

                                <div className="space-y-1">
                                    {features.map((feature) => {
                                        const FeatureIcon = feature.icon;

                                        return (
                                            <Link
                                                key={feature.number}
                                                href={feature.href}
                                                onClick={closeMenus}
                                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#F7F2FC]"
                                            >
                                                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${feature.iconBg} ${feature.iconColor}`}>
                                                    <FeatureIcon size={17} />
                                                </div>

                                                <div>
                                                    <p className="text-[12px] font-bold text-[#352448]">
                                                        {feature.title}
                                                    </p>
                                                    <p className="mt-0.5 text-[10px] text-[#9586A4]">
                                                        {feature.tag}
                                                    </p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Mobile CTA */}
                            {!user && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMobileOpen(false);
                                        setShowLoginModal(true);
                                    }}
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7628ED] to-[#D52BBE] px-5 py-3 text-[13px] font-bold text-white shadow-[0_4px_14px_rgba(118,40,237,0.18)]"
                                >
                                    Get Started
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Login modal */}
            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </>
    );
}