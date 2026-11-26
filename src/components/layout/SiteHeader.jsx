"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
    ArrowRight,
    User,
    Zap,
    ChevronDown,
    Menu,
    X,
    Tag,
    LogOut,
    Settings,
} from "lucide-react"; import LoginModal from "@/components/auth/loginModal/LoginModal";
import { scrollToSection } from "@/lib/scrollToSection";
import { features, navItems, navButtonClass } from "@/components/layout/siteNav";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useCreditStore } from "@/store/useCreditStore";

export default function SiteHeader() {
    const user = useAuthStore((state) => state.user);
    const router = useRouter();
    const pathname = usePathname();

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [featuresOpen, setFeaturesOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const profileName = user?.full_name || user?.name || "User";
    const profileEmail = user?.email || "";
    const profileImage = user?.profile_image_url || user?.photo_url || user?.photoURL;

    const initials = profileName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    const handleLoginSuccess = () => setShowLoginModal(false);

    // Sections live on the home page; from any other page, go there first.
    const goToSection = (id) => {
        if (pathname === "/") scrollToSection(id);
        else router.push(`/#${id}`);
    };

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            setProfileOpen(false);

            await signOut(auth);

            useCreditStore.getState().resetCredits();

            router.replace("/");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <>
            <header className="sticky top-0 z-30 flex h-[88px] shrink-0 items-center justify-between border-b border-[#EAE2F1] bg-[#FDFBFF]/85 px-4 backdrop-blur-md sm:px-10 lg:px-16">
                {/* Logo */}
                <Link href="/" className="flex min-w-0 items-center gap-0">
                    <div className="relative h-10 w-10 shrink-0 sm:h-18 sm:w-18">
                        <Image src="/images/logo-new-no-bg.png" alt="ProblemPulse Logo" fill className="object-contain transition-all" priority />
                    </div>
                    <span className="bg-linear-to-r from-[#5F19C5] via-[#9326D5] to-[#FA418B] bg-clip-text text-base font-bold tracking-tight whitespace-nowrap sm:text-2xl text-transparent">ProblemPulse</span>
                </Link>

                {/* Navigation links */}
                <nav className="hidden items-center gap-1 lg:flex">
                    {navItems.map((item) => {
                        const NavIcon = item.icon;
                        return (
                            <button key={item.id} type="button" onClick={() => goToSection(item.id)} className={navButtonClass}>
                                <NavIcon className="h-4 w-4 opacity-70" />
                                {item.name}
                            </button>
                        );
                    })}

                    <div className="relative" onMouseEnter={() => setFeaturesOpen(true)} onMouseLeave={() => setFeaturesOpen(false)}>
                        <button type="button" aria-haspopup="true" aria-expanded={featuresOpen} onClick={() => setFeaturesOpen((open) => !open)} className={navButtonClass}>
                            <Zap className="h-4 w-4 opacity-70" />
                            Features
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${featuresOpen ? "rotate-180" : ""}`} />
                        </button>

                        {featuresOpen && (
                            <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-2">
                                <div className="rounded-2xl border border-[#EAE2F1] bg-white p-2 shadow-[0_18px_40px_rgba(95,25,197,0.10)]">
                                    {features.map((feature) => {
                                        const FeatureIcon = feature.icon;
                                        return (
                                            <Link key={feature.number} href={feature.href} className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-[#F4EFFA]">
                                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${feature.iconBg} ${feature.iconColor}`}>
                                                    <FeatureIcon size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#292333]">{feature.title}</p>
                                                    <p className="mt-0.5 text-xs leading-5 text-[#756B80]">{feature.tag}</p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/pricing" className={navButtonClass}>
                        <Tag className="h-4 w-4 opacity-70" />
                        Pricing
                    </Link>
                </nav>

                {/* Navbar actions */}
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    {user ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setProfileOpen((open) => !open)}
                                aria-expanded={profileOpen}
                                aria-label="Open profile menu"
                                className="group flex items-center gap-2 rounded-xl border border-[#E9DDF5] bg-white/90 px-2 py-1.5 shadow-[0_2px_10px_rgba(113,56,213,0.04)] transition-all duration-200 hover:border-[#D2B4F0] hover:bg-[#FCFAFF] hover:shadow-[0_4px_14px_rgba(113,56,213,0.10)] sm:gap-3 sm:px-3"
                            >
                                {profileImage ? (
                                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[#E9DDF5]">
                                        <Image
                                            src={profileImage}
                                            alt={profileName}
                                            fill
                                            sizes="36px"
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7628ED] to-[#F02D83] text-xs font-bold text-white shadow-sm shadow-[#9326D5]/20">
                                        {initials}
                                    </div>
                                )}

                                <div className="hidden min-w-0 text-left sm:block">
                                    <p className="max-w-[130px] truncate text-sm font-bold text-[#29154F]">
                                        {profileName}
                                    </p>
                                    <p className="max-w-[150px] truncate text-[11px] font-medium text-[#88769F]">
                                        {profileEmail}
                                    </p>
                                </div>

                                <ChevronDown
                                    className={`hidden h-4 w-4 shrink-0 text-[#A27BC8] transition-transform duration-200 sm:block ${profileOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {profileOpen && (
                                <>
                                    <button
                                        type="button"
                                        aria-label="Close profile menu"
                                        onClick={() => setProfileOpen(false)}
                                        className="fixed inset-0 z-30 cursor-default"
                                    />

                                    <div className="absolute right-0 top-full z-40 mt-3 w-[280px] overflow-hidden rounded-2xl border border-[#E9DDF5] bg-white shadow-[0_18px_45px_rgba(75,35,120,0.13)]">
                                        {/* Profile details */}
                                        <div className="relative overflow-hidden border-b border-[#F0E7F8] bg-gradient-to-br from-[#FCF8FF] via-white to-[#FFF5FA] px-4 py-5">
                                            <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[#E9D5FF]/30 blur-2xl" />
                                            <div className="relative flex items-center gap-3">
                                                {profileImage ? (
                                                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-[0_2px_10px_rgba(113,56,213,0.15)]">
                                                        <Image
                                                            src={profileImage}
                                                            alt={profileName}
                                                            fill
                                                            sizes="48px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7628ED] to-[#F02D83] text-sm font-bold text-white shadow-[0_3px_12px_rgba(147,38,213,0.22)]">
                                                        {initials}
                                                    </div>
                                                )}

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-bold text-[#29154F]">
                                                        {profileName}
                                                    </p>
                                                    <p className="mt-1 truncate text-xs font-medium text-[#88769F]">
                                                        {profileEmail}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu items */}
                                        <div className="p-2">
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                disabled={isLoggingOut}
                                                className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-[#FFF1F5] disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFF0F5] text-[#E33D78] transition-colors group-hover:bg-[#FFE1EC]">
                                                    {isLoggingOut ? (
                                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#E33D78]/30 border-t-[#E33D78]" />
                                                    ) : (
                                                        <LogOut className="h-[18px] w-[18px]" />
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-bold text-[#35204F]">
                                                        {isLoggingOut ? "Logging out..." : "Logout"}
                                                    </p>
                                                    <p className="mt-0.5 text-[11px] font-medium text-[#9887AC]">
                                                        Sign out of your account
                                                    </p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowLoginModal(true)}
                            className="flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#7628ED] via-[#B22AE1] to-[#F02D83] px-3 py-2 text-xs font-bold whitespace-nowrap text-white shadow-md shadow-[#9326D5]/20 transition hover:scale-[1.02] hover:shadow-lg sm:px-5 sm:py-2.5 sm:text-sm"
                        >
                            Get Started
                            <ArrowRight className="hidden size-4 sm:block" />
                        </button>
                    )}


                    <button type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} onClick={() => setMobileOpen((open) => !open)} className="shrink-0 rounded-lg border border-[#EAE2F1] p-2.5 text-[#5F19C5] transition hover:bg-[#F4EFFA] lg:hidden">
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="absolute left-0 right-0 top-full border-b border-[#EAE2F1] bg-[#FDFBFF] px-5 pb-5 pt-3 shadow-[0_18px_40px_rgba(95,25,197,0.08)] sm:px-10 lg:hidden">
                        {navItems.map((item) => {
                            const NavIcon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        goToSection(item.id);
                                        setMobileOpen(false);
                                    }}
                                    className={`${navButtonClass} w-full`}
                                >
                                    <NavIcon className="h-4 w-4 opacity-70" />
                                    {item.name}
                                </button>
                            );
                        })}

                        <Link href="/pricing" onClick={() => setMobileOpen(false)} className={`${navButtonClass} w-full`}>
                            <Tag className="h-4 w-4 opacity-70" />
                            Pricing
                        </Link>

                        <p className="mt-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-[#968AA3]">Features</p>
                        {features.map((feature) => {
                            const FeatureIcon = feature.icon;
                            return (
                                <Link key={feature.number} href={feature.href} onClick={() => setMobileOpen(false)} className={`${navButtonClass} w-full`}>
                                    <FeatureIcon className={`h-4 w-4 ${feature.iconColor}`} />
                                    {feature.title}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </header>

            {/* Login Modal */}
            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />}
        </>
    );
}