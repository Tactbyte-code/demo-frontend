"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
    Twitter,
    Github,
    Linkedin,
    Instagram,
    Youtube
} from 'lucide-react';

const footerLinks = {
    product: [
        { name: 'Features', href: '/#features' },
        { name: 'How it Works', href: '/#how-it-works' },
        { name: 'Pricing', href: '/pricing' },
    ],
    resources: [
        { name: 'Documentation', href: '/docs' },
        { name: 'API Reference', href: '/api' },
        { name: 'Community', href: '/community' },
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
    ]
};

const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    // { name: 'GitHub', icon: Github, href: '#' },
];

export default function Footer() {
    return (
        <footer className="border-t pt-12 pb-8 overflow-hidden sm:pt-16"
            style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--glass-border)',
            }}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-6">
                <div className="flex flex-col gap-10 lg:flex-row lg:gap-16 xl:gap-20">

                    {/* Left: Brand Section */}
                    <div className="flex flex-col space-y-5 lg:w-1/3 lg:shrink-0">
                        <Link href="/" className="flex items-center gap-0 group w-fit">
                            <div className="relative h-14 w-14 shrink-0">
                                <Image
                                    src="/images/logo-new-no-bg.png"
                                    alt="Logo"
                                    fill
                                    sizes="(max-width: 640px) 100vw, 160px"
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            <span className="bg-gradient-to-r from-[#7138D5] via-[#C12AAE] to-[#FF4D83] bg-clip-text text-transparent text-xl font-bold tracking-tight whitespace-nowrap">
                                ProblemPulse
                            </span>
                        </Link>
                        <p
                            className="text-sm leading-relaxed max-w-sm"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            The intelligent market empathy engine. We transform global digital
                            conversations into your product roadmap. Stop guessing, start building.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <div
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full flex items-center cursor-pointer justify-center transition-all duration-300"
                                    style={{
                                        backgroundColor: 'var(--surface)',
                                        border: '1px solid var(--glass-border)',
                                        color: 'var(--text-muted)',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.color = 'var(--primary)';
                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                        e.currentTarget.style.backgroundColor = 'var(--surface-raised)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = 'var(--text-muted)';
                                        e.currentTarget.style.borderColor = 'var(--glass-border)';
                                        e.currentTarget.style.backgroundColor = 'var(--surface)';
                                    }}
                                >
                                    <social.icon className="w-4 h-4" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Stacked Newsletter and Links */}
                    <div className="flex min-w-0 flex-col gap-8 lg:w-2/3 lg:gap-10">

                        {/* Bottom: Links Container */}
                        <div className="grid grid-cols-2 justify-items-start gap-x-6 gap-y-8 pb-2 sm:grid-cols-3">
                            {Object.entries(footerLinks).map(([category, links]) => (
                                <div key={category} className="space-y-5">
                                    <h4
                                        className="font-bold text-sm uppercase tracking-widest opacity-80 sm:text-[16px]"
                                        style={{ color: 'var(--text-main)' }}
                                    >
                                        {category}
                                    </h4>
                                    <ul className="space-y-1">
                                        {links.map((link) => (
                                            <li key={link.name}>
                                                <Link
                                                    href={'#'}
                                                    className="text-sm inline-block transition-colors duration-200 cursor-pointer"
                                                    style={{ color: 'var(--text-muted)' }}
                                                    onMouseEnter={e => {
                                                        e.currentTarget.style.color = 'var(--primary)';
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.currentTarget.style.color = 'var(--text-muted)';
                                                    }}
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Final Bottom Bar */}
                <div
                    className="mt-5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t"
                    style={{ borderColor: 'var(--glass-border)' }}
                >
                    <p
                        className="text-[11px] font-medium"
                        style={{ color: 'color-mix(in srgb, var(--text-subtle) 50%, transparent)' }}
                    >
                        ©2026 Tactbyte Technologies Pvt. Ltd.
                    </p>
                </div>
            </div>
        </footer>
    );
}