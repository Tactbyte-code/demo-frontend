"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, LayoutDashboard } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { motion, AnimatePresence } from "framer-motion";

export default function ValidateIdeaHeader() {
    const user = useAuthStore((state) => state.user);

    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

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

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const transition = {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
    };

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
                className={`pointer-events-auto flex w-full items-center justify-between ${isScrolled
                    ? "h-[78px] max-w-[1120px] rounded-2xl border border-white/70 bg-white/75 px-5 shadow-[0_8px_32px_rgba(75,35,120,0.14)] backdrop-blur-xl sm:px-4"
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

                    <span className="whitespace-nowrap bg-linear-to-r from-[#7138D5] via-[#C12AAE] to-[#FF4D83] bg-clip-text text-xl font-bold tracking-tight text-transparent">
                        ProblemPulse
                    </span>
                </Link>

                {/* Auth CTA */}
                <motion.div layout transition={transition}>
                    {user ? (
                        <Link
                            href="/validate-idea/analysis"
                            className="group inline-flex h-12 items-center gap-2 rounded-lg bg-linear-to-r from-[#7628ED] via-[#B22AE1] to-[#F02D83] px-5 text-sm font-bold text-white shadow-[0_5px_18px_rgba(147,38,213,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_9px_25px_rgba(147,38,213,0.32)] sm:px-6"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            My Workspace
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="group inline-flex h-10 items-center gap-2 rounded-xl border border-[#DCC8F1] bg-white/75 px-5 text-sm font-bold text-[#7138D5] shadow-[0_3px_12px_rgba(113,56,213,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFA0E8] hover:bg-white hover:shadow-[0_8px_20px_rgba(113,56,213,0.12)] sm:px-6"
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