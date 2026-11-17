"use client"

import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    Sparkles,
    Github,
    Linkedin,
    Twitter,
    Mail,
    MoveUpRight,
} from "lucide-react";
import { scrollToSection } from "@/lib/scrollToSection";
import Image from "next/image";

const footerLinks = {
    product: [
        { label: "Reddit Analysis", href: "/reddit" },
        { label: "Play Store Analysis", href: "/playstore" },
        { label: "Validate Idea", href: "/validate-idea" },
    ],
    explore: [
        { label: "How it works", href: "/validate-idea#how-it-works" },
        { label: "Why ProblemPulse", href: "/validate-idea#why-validate" },
        { label: "FAQs", href: "/validate-idea#faq" },
    ],
    company: [
        { label: "About us", href: "/about" },
        { label: "Contact", href: "mailto:support@problempulse.site" },
        { label: "Privacy policy", href: "/privacy-policy" },
        { label: "Terms & conditions", href: "/terms-and-conditions" },
    ],
};

function FooterLink({ href, children }) {
    const isExternal = href.startsWith("mailto:");

    const className =
        "group inline-flex items-center gap-1 text-[14px] text-[#A99AB9] transition-colors duration-200 hover:text-white";

    if (isExternal) {
        return (
            <a href={href} className={className}>
                {children}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </a>
        );
    }

    return (
        <Link href={href} className={className}>
            {children}
            <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
        </Link>
    );
};

function FooterColumn({ title, links }) {
    return (
        <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
                {title}
            </h3>

            <ul className="space-y-3">
                {links.map((link) => (
                    <li key={link.label}>
                        <FooterLink href={link.href}>
                            {link.label}
                        </FooterLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#190D2B] text-white pt-15">

            {/* Ambient background */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#7138D5]/20 blur-[130px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#D946A8]/15 blur-[130px]" />

            <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">

                {/* CTA banner */}
                <div className="relative -mt-1 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-r from-[#7138D5] via-[#922CCB] to-[#D43E9A] px-7 py-10 shadow-[0_20px_60px_rgba(113,56,213,0.25)] sm:px-10 sm:py-12 lg:px-14">
                    {/* Decorative elements */}
                    <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute -right-2 -top-16 h-56 w-56 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute bottom-[-100px] right-[28%] h-52 w-52 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
                                <Sparkles className="h-3.5 w-3.5 text-white" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/90">
                                    Your next big idea starts here
                                </span>
                            </div>

                            <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-[42px]">
                                Stop guessing.
                                <br className="hidden sm:block" />
                                Start validating.
                            </h2>

                            <p className="mt-4 max-w-lg text-sm leading-7 text-white/75">
                                Turn your ideas into informed decisions.
                                Discover the opportunity before you build.
                            </p>
                        </div>

                        <div
                            onClick={() => scrollToSection("validate-idea-hero")}
                            className="group inline-flex cursor-pointer w-fit shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-extrabold text-[#7138D5] shadow-[0_8px_25px_rgba(35,12,65,0.15)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FBF7FF] hover:shadow-[0_14px_35px_rgba(35,12,65,0.25)]"
                        >
                            Validate your idea
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>

                {/* Main footer content */}
                <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 lg:py-20">

                    {/* Brand */}
                    <div className="max-w-sm">
                        <Link href="/" className="inline-flex items-center gap-2.5">
                            <div className="relative h-16 w-16 shrink-0 sm:h-[72px] sm:w-[72px]">
                                <Image
                                    src="/images/logo-new-no-bg.png"
                                    alt="Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            <span className="text-xl font-bold tracking-tight text-white">
                                Problem<span className="text-[#D8B4FE]">Pulse</span>
                            </span>
                        </Link>

                        <p className="mt-6 text-[13px] leading-6 text-[#A99AB9]">
                            Validate ideas with real-world signals.
                            Understand problems, discover opportunities,
                            and build with greater confidence.
                        </p>

                        <a
                            href="mailto:support@problempulse.site"
                            className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#D8B4FE] transition-colors hover:text-white"
                        >
                            <Mail className="h-4 w-4" />
                            support@problempulse.site
                        </a>
                    </div>

                    {/* Navigation columns */}
                    <FooterColumn title="Product" links={footerLinks.product} />
                    <FooterColumn title="Explore" links={footerLinks.explore} />
                    <FooterColumn title="Company" links={footerLinks.company} />
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 py-7">
                    <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
                        <p className="text-center text-xs text-[#887999] sm:text-left">
                            © {new Date().getFullYear()} ProblemPulse. All rights reserved.
                        </p>

                        <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#887999]">
                                Built for people who think ahead.
                            </span>

                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5">
                                <MoveUpRight className="h-3.5 w-3.5 text-[#D8B4FE]" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
