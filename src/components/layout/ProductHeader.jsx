
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ArrowUpRight,
    LayoutDashboard,
    MessageCircle,
    Smartphone,
    Lightbulb,
    ChevronDown,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";

const products = [
    {
        label: "Reddit",
        href: "/reddit",
        icon: MessageCircle,
    },
    {
        label: "Play Store",
        href: "/playstore",
        icon: Smartphone,
    },
    {
        label: "Validate Idea",
        href: "/validate-idea",
        icon: Lightbulb,
    },
];

export default function ProductHeader() {
    const user = useAuthStore((state) => state.user);
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const lastScrollY = useRef(0);
    const squeezeScrollY = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDifference = currentScrollY - lastScrollY.current;

            setIsScrolled(currentScrollY > 30);

            if (currentScrollY <= 30) {
                setIsVisible(true);
                squeezeScrollY.current = null;
            } else if (scrollDifference > 0) {
                if (squeezeScrollY.current === null) {
                    squeezeScrollY.current = currentScrollY;
                }

                // Hide only after scrolling another 300px
                if (currentScrollY - squeezeScrollY.current > 300) {
                    setIsVisible(false);
                }
            } else if (scrollDifference < 0) {
                setIsVisible(true);
                squeezeScrollY.current = null;
            }

            lastScrollY.current = currentScrollY;
        };

        lastScrollY.current = window.scrollY;

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const isActive = (href) => {
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const transition = {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
    };

    const activeProduct = products.find((product) =>
        isActive(product.href)
    );

    return (
        <motion.header
            initial={false}
            animate={{
                y: isVisible ? 0 : -120,
                paddingTop: isScrolled ? 16 : 0,
                paddingLeft: isScrolled ? 16 : 0,
                paddingRight: isScrolled ? 16 : 0,
            }}
            transition={transition}
            className="pointer-events-none fixed inset-x-0 top-0 z-[9999] flex justify-center"
        >
            <motion.div
                layout
                transition={transition}
                className={`pointer-events-auto flex w-full items-center justify-between gap-3 ${isScrolled
                        ? "h-[78px] max-w-[1120px] rounded-2xl border border-white/70 bg-white/75 px-4 shadow-[0_8px_32px_rgba(75,35,120,0.14)] backdrop-blur-xl sm:px-6"
                        : "h-[96px] max-w-[1440px] rounded-none border border-transparent bg-transparent px-6 shadow-none sm:px-12 lg:px-16"
                    }`}
            >
                {/* Brand */}
                <Link
                    href="/"
                    className="group flex shrink-0 items-center gap-2"
                >
                    <motion.div
                        layout
                        transition={transition}
                        className={`relative shrink-0 ${isScrolled ? "h-11 w-11" : "h-14 w-14"
                            }`}
                    >
                        <Image
                            src="/images/logo-new-no-bg.png"
                            alt="ProblemPulse"
                            fill
                            priority
                            sizes="56px"
                            className="object-contain"
                        />
                    </motion.div>

                    <span className="hidden whitespace-nowrap bg-linear-to-r from-[#7138D5] via-[#C12AAE] to-[#FF4D83] bg-clip-text text-xl font-bold tracking-tight text-transparent sm:inline">
                        ProblemPulse
                    </span>
                </Link>

                {/* Desktop Product Navigation */}
                <nav className="hidden items-center gap-2 md:flex">
                    {products.map((product) => {
                        const active = isActive(product.href);
                        const Icon = product.icon;

                        return (
                            <Link
                                key={product.href}
                                href={product.href}
                                aria-current={active ? "page" : undefined}
                                className={`relative inline-flex h-11 items-center gap-1 rounded-lg px-3.5 text-[13px] font-semibold transition-all duration-200 lg:px-4 ${active
                                        ? "bg-[#F3EAFF] text-[#7138D5]"
                                        : "text-slate-600 hover:bg-[#faf7ff] hover:text-[#7138D5]"
                                    }`}
                            >
                                <Icon
                                    className={`h-4 w-4 ${active
                                            ? "text-[#7138D5]"
                                            : "text-slate-400"
                                        }`}
                                />
                                {product.label}

                                {/* {active && (
                                    <motion.span
                                        layoutId="active-product-indicator"
                                        className="absolute inset-x-2 bottom-0 h-[3px] rounded-full bg-linear-to-r from-[#7138D5] via-[#C12AAE] to-[#FF4D83] shadow-[0_0_8px_rgba(147,38,213,0.3)]"
                                        transition={transition}
                                    />
                                )} */}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile Product Switcher */}
                <div className="relative md:hidden">
                    <button
                        type="button"
                        onClick={() =>
                            setIsMobileMenuOpen((previous) => !previous)
                        }
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Switch product"
                        className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#E8D9F8] bg-white/80 px-3 text-sm font-semibold text-[#7138D5] shadow-sm"
                    >
                        {activeProduct?.label || "Explore"}
                        <ChevronDown
                            className={`h-4 w-4 transition-transform ${isMobileMenuOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {isMobileMenuOpen && (
                        <div className="absolute right-0 top-full z-50 mt-1 w-48 overflow-hidden rounded-xl border border-[#E9DDF5] bg-white p-1.5 shadow-[0_12px_35px_rgba(75,35,120,0.16)]">
                            {products.map((product) => {
                                const active = isActive(product.href);
                                const Icon = product.icon;

                                return (
                                    <Link
                                        key={product.href}
                                        href={product.href}
                                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active
                                                ? "bg-[#F3EAFF] text-[#7138D5]"
                                                : "text-slate-600 hover:bg-[#FAF7FF] hover:text-[#7138D5]"
                                            }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {product.label}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Auth CTA */}
                <motion.div
                    layout
                    transition={transition}
                    className="shrink-0"
                >
                    {user ? (
                        <Link
                            href="/validate-idea/analysis"
                            className="group inline-flex h-10 items-center gap-2 rounded-lg bg-linear-to-r from-[#7628ED] via-[#B22AE1] to-[#F02D83] px-3.5 text-xs font-bold text-white shadow-[0_5px_18px_rgba(147,38,213,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_9px_25px_rgba(147,38,213,0.32)] sm:h-12 sm:px-5 sm:text-sm"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            <span className="hidden sm:inline">
                                My Workspace
                            </span>
                            <span className="sm:hidden">Workspace</span>
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="group inline-flex h-10 items-center gap-2 rounded-lg border border-[#DCC8F1] bg-white/75 px-4 text-sm font-bold text-[#7138D5] shadow-[0_3px_12px_rgba(113,56,213,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFA0E8] hover:bg-white hover:shadow-[0_8px_20px_rgba(113,56,213,0.12)] sm:h-12 sm:px-6"
                        >
                            Log in
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    )}
                </motion.div>
            </motion.div>
        </motion.header>
    );
}
