"use client";
import Link from 'next/link';
import Image from 'next/image';
import {
    Twitter,
    Github,
    Linkedin,
    Youtube,
    Mail,
    ArrowUpRight
} from 'lucide-react';

const footerLinks = {
    product: [
        { name: 'Features', href: '/#features' },
        { name: 'How it Works', href: '/#how-it-works' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Changelog', href: '/changelog' },
    ],
    resources: [
        { name: 'Documentation', href: '/docs' },
        { name: 'API Reference', href: '/api' },
        { name: 'Community', href: '/community' },
        { name: 'Research Lab', href: '/lab' },
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ]
};

const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-glass-border pt-20 pb-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
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

                    {/* Links Sections */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-bold text-foreground text-sm uppercase tracking-widest">Product</h4>
                        <ul className="space-y-4">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-muted hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-bold text-foreground text-sm uppercase tracking-widest">Resources</h4>
                        <ul className="space-y-4">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-muted hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-bold text-foreground text-sm uppercase tracking-widest">Company</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-muted hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / CTA Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-bold text-foreground text-sm uppercase tracking-widest">Stay Updated</h4>
                        <p className="text-xs text-muted leading-relaxed">
                            Join our newsletter for the latest in AI market research.
                        </p>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-background border border-glass-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary/50 transition-colors"
                            />
                            <button className="absolute right-1.5 top-1.5 p-1 rounded-lg bg-primary text-white hover:brightness-110 transition-all">
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted/60">
                        © {currentYear} Demo. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-muted/60 uppercase tracking-tighter">Systems Operational</span>
                        </div>
                        <Link href="/contact" className="text-xs text-muted hover:text-foreground font-medium">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}