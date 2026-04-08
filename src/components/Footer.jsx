"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
    Twitter,
    Github,
    Linkedin,
    Instagram,
    Youtube,
    ArrowUpRight,
    Mail
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
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t pt-16 pb-8 overflow-hidden"
            style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--glass-border)',
            }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">

                    {/* Left: Brand Section */}
                    <div className="lg:w-1/3 flex flex-col justify-center space-y-6">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="relative h-10 w-10">
                                <Image
                                    src="/images/logo2.png"
                                    alt="Logo"
                                    priority
                                    fill
                                    sizes="(max-width: 640px) 100vw, 160px"
                                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <span
                                className="font-bold text-xl tracking-tight"
                                style={{ color: 'var(--text-main)' }}
                            >
                                DEMO
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
                    <div className="lg:w-2/3 flex flex-col gap-12">

                        {/* Top: Newsletter Container */}
                        <div
                            className="p-6 flex flex-col md:flex-row items-center justify-between gap-6"
                            style={{
                                backgroundColor: 'var(--background)',
                                border: '1px solid var(--glass-border)',
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-10 h-10 flex items-center justify-center"
                                    style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
                                >
                                    <Mail className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                </div>
                                <div>
                                    <h4
                                        className="font-bold text-sm"
                                        style={{ color: 'var(--text-main)' }}
                                    >
                                        Join the pulse
                                    </h4>
                                    <p
                                        className="text-[11px] uppercase tracking-widest font-semibold"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        Weekly market insights
                                    </p>
                                </div>
                            </div>

                            <form className="relative flex-1 max-w-md w-full">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 text-sm focus:outline-none transition-all"
                                    style={{
                                        backgroundColor: 'var(--surface)',
                                        border: '1px solid var(--glass-border)',
                                        color: 'var(--text-main)',
                                        caretColor: 'var(--primary)',
                                    }}
                                    onFocus={e => {
                                        e.currentTarget.style.boxShadow = '0 0 0 2px color-mix(in srgb, var(--primary) 20%, transparent)';
                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                    }}
                                    onBlur={e => {
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.borderColor = 'var(--glass-border)';
                                    }}
                                />

                                <div
                                    type="submit"
                                    className="absolute right-1.75 top-2.25 px-4 py-1.5 text-xs font-bold flex items-center gap-1 transition-all hover:brightness-110"
                                    style={{
                                        backgroundColor: 'var(--primary)',
                                        color: '#ffffff',
                                    }}
                                >
                                    Join
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </div>

                                {/* <button
                                    type="submit"
                                    className="absolute right-1.75 top-2.25 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all hover:brightness-110"
                                    style={{
                                        backgroundColor: 'var(--primary)',
                                        color: '#ffffff',
                                    }}
                                >
                                    Join
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </button> */}

                            </form>
                        </div>

                        {/* Bottom: Links Container */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pb-4 justify-items-end">
                            {Object.entries(footerLinks).map(([category, links]) => (
                                <div key={category} className="space-y-5">
                                    <h4
                                        className="font-bold text-[16px] uppercase tracking-widest opacity-80"
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
                    className="mt-5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t"
                    style={{ borderColor: 'var(--glass-border)' }}
                >
                    <p
                        className="text-[11px] font-medium"
                        style={{ color: 'color-mix(in srgb, var(--text-subtle) 50%, transparent)' }}
                    >
                        © {currentYear} Demo. Built with precision for the future.
                    </p>
                </div>
            </div>
        </footer>
    );
}