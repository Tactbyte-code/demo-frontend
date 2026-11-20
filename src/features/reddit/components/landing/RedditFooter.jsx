
import Link from "next/link";
import {
    ArrowUpRight,
    Instagram,
    Linkedin,
    Twitter,
} from "lucide-react";

const footerLinks = {
    Product: [
        { label: "Reddit Analysis", href: "/reddit" },
        { label: "Play Store Analysis", href: "/playstore" },
        { label: "Validate an Idea", href: "/validate-idea" },
        { label: "Pricing", href: "/pricing" },
    ],
    Resources: [
        { label: "How it works", href: "/how-it-works" },
        { label: "Use cases", href: "/use-cases" },
        { label: "Resources", href: "/resources" },
    ],
    Company: [
        { label: "About us", href: "/about" },
        { label: "Contact", href: "/contact" },
    ],
    Legal: [
        { label: "Privacy policy", href: "/privacy-policy" },
        { label: "Terms of service", href: "/terms-of-service" },
    ],
};

export default function RedditFooter() {
    return (
        <footer className="relative overflow-hidden bg-[#FFF1EB] text-[#38251D]">
            {/* Subtle decorative accents */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#FF7442]/[0.07] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#FFB49A]/20 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
                <div className="grid gap-14 border-b border-[#EBD5CA] py-16 lg:grid-cols-[1.5fr_2fr] lg:py-20">

                    {/* Brand */}
                    <div className="max-w-sm">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <img
                                src="/images/logo-new-no-bg.png"
                                alt="ProblemPulse"
                                className="h-10 w-auto object-contain"
                            />
                            <span className="text-xl font-semibold tracking-tight">
                                Problem<span className="text-[#E85D2A]">Pulse</span>
                            </span>
                        </Link>

                        <p className="mt-6 text-sm leading-7 text-[#826B60]">
                            Find real problems. Discover meaningful
                            opportunities. Build products people actually
                            want.
                        </p>

                        <div className="mt-8 flex items-center gap-3">
                            {[
                                {
                                    label: "LinkedIn",
                                    href: "https://www.linkedin.com/",
                                    Icon: Linkedin,
                                },
                                {
                                    label: "X",
                                    href: "https://x.com/",
                                    Icon: Twitter,
                                },
                                {
                                    label: "Instagram",
                                    href: "https://www.instagram.com/",
                                    Icon: Instagram,
                                },
                            ].map(({ label, href, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E9CFC2] bg-white/60 text-[#826B60] transition-all hover:-translate-y-1 hover:border-[#E85D2A] hover:bg-[#E85D2A] hover:text-white"
                                >
                                    <Icon size={17} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
                        {Object.entries(footerLinks).map(([heading, links]) => (
                            <div key={heading}>
                                <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-[#D95B30]">
                                    {heading}
                                </h3>

                                <ul className="space-y-4">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="group inline-flex items-center gap-1 text-sm text-[#826B60] transition-colors hover:text-[#D95B30]"
                                            >
                                                {link.label}
                                                <ArrowUpRight
                                                    size={12}
                                                    className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                                                />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-[#A58A7D]">
                        © {new Date().getFullYear()} ProblemPulse. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center gap-5 text-xs text-[#A58A7D]">
                        <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#E85D2A]" />
                            Built for curious minds
                        </span>

                        <Link
                            href="/"
                            className="font-medium transition-colors hover:text-[#D95B30]"
                        >
                            Back to home ↑
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
