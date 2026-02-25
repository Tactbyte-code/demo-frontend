"use client";
import Link from 'next/link';
import Image from 'next/image';
import {
    Twitter,
    Github,
    Linkedin,
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
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-glass-border pt-16 pb-8 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">

                    {/* Left: Brand Section (Constant) */}
                    <div className="lg:w-1/3 flex flex-col justify-center space-y-6">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="relative h-10 w-10">
                                <Image
                                    src="/images/logo2.png"
                                    alt="Logo"
                                    fill
                                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-foreground">DEMO</span>
                        </Link>
                        <p className="text-muted text-sm leading-relaxed max-w-sm">
                            The intelligent market empathy engine. We transform global digital
                            conversations into your product roadmap. Stop guessing, start building.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-background border border-glass-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 transition-all duration-300"
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Stacked Newsletter and Links */}
                    <div className="lg:w-2/3 flex flex-col gap-12">

                        {/* Top: Newsletter Container */}
                        <div className="bg-background border border-glass-border p-6 rounded-4xl flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground text-sm">Join the pulse</h4>
                                    <p className="text-[11px] text-muted uppercase tracking-widest font-semibold">Weekly market insights</p>
                                </div>
                            </div>
                            <form className="relative flex-1 max-w-md w-full">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-white border border-glass-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                                <button className="absolute right-1.75 top-2.25 px-4 py-1.5 rounded-lg bg-primary text-white hover:brightness-110 transition-all text-xs font-bold flex items-center gap-1">
                                    Join
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                            </form>
                        </div>

                        {/* Bottom: Links Container (Right Aligned) */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pb-4 justify-items-end">
                            {Object.entries(footerLinks).map(([category, links]) => (
                                <div key={category} className="space-y-4">
                                    <h4 className="font-black text-foreground text-[10px] uppercase tracking-[0.2em] opacity-80">
                                        {category}
                                    </h4>
                                    <ul className="space-y-3">
                                        {links.map((link) => (
                                            <li key={link.name}>
                                                <Link
                                                    href={link.href}
                                                    className="text-sm text-muted hover:text-primary transition-colors inline-block"
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
                <div className="mt-5 pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] font-medium text-muted/50">
                        © {currentYear} Demo. Built with precision for the future.
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-muted/40 uppercase tracking-tighter">Engine Status: Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}