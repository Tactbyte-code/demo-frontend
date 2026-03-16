"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Minus,
    HelpCircle,
    MessageCircle,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const faqs = [
    {
        question: "How does the AI determine the 'Frustration Score'?",
        answer: "Our NLP engine analyzes syntax, punctuation, and keyword velocity to quantify emotional intensity. It cross-references millions of baseline interactions to assign a score from 1-10, helping you identify the most critical pain points instantly."
    },
    {
        question: "Which platforms does the database track?",
        answer: "Currently, we index real-time data from Reddit, the Google Play Store, and Apple App Store. We are currently in beta for tracking niche developer forums and specialized Discord communities."
    },
    {
        question: "Can I export data directly into Jira or Linear?",
        answer: "Yes. All analyzed signals can be exported as high-fidelity JSON or CSV files structured specifically for product management tools. We also offer a direct REST API for enterprise-level automation."
    },
    {
        question: "How often is the demand signal database updated?",
        answer: "The data is indexed in real-time. High-velocity threads are processed within minutes of being posted, ensuring you catch emerging trends before they hit the mainstream."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="pb-24 bg-background relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* ── Header ───────────────────────────── */}
                <div className="flex flex-col items-center text-center gap-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 text-primary font-bold text-xs uppercase tracking-[0.3em] px-4 py-2 rounded-full"
                    >
                        <HelpCircle className="w-3.5 h-3.5" />
                        Support Center
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-none"
                    >
                        Common
                        <span className="text-primary"> Inquiries.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-sm text-muted font-medium max-w-lg leading-relaxed"
                    >
                        Everything you need to know about our intelligent market empathy engine
                        and technical integrations.
                    </motion.p>
                </div>

                {/* ── Accordion ─────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="rounded-[2rem] border border-border-solid overflow-hidden bg-surface shadow-md mb-6"
                >
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        const isLast = index === faqs.length - 1;

                        return (
                            <div
                                key={index}
                                className={`
                                    transition-colors duration-300
                                    ${!isLast ? 'border-b border-border' : ''}
                                    ${isOpen ? 'bg-primary/[0.02]' : 'hover:bg-surface-raised'}
                                `}
                            >
                                {/* Question row */}
                                <button
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    className="w-full py-7 px-8 flex items-center justify-between text-left gap-6 group cursor-pointer"
                                >
                                    <div className="flex items-center gap-5">
                                        <span className={`
                                            text-xs font-mono font-black shrink-0 transition-colors duration-300
                                            ${isOpen ? 'text-primary' : 'text-subtle'}
                                        `}>
                                            0{index + 1}
                                        </span>
                                        <h3 className={`
                                            text-base lg:text-lg font-bold tracking-tight transition-colors duration-300
                                            ${isOpen ? 'text-foreground' : 'text-muted group-hover:text-foreground'}
                                        `}>
                                            {faq.question}
                                        </h3>
                                    </div>

                                    <div className={`
                                        shrink-0 w-8 h-8 rounded-full border flex items-center justify-center
                                        transition-all duration-300
                                        ${isOpen
                                            ? 'bg-primary border-primary text-white'
                                            : 'border-border-solid text-subtle group-hover:border-primary/30 group-hover:text-primary'
                                        }
                                    `}>
                                        {isOpen
                                            ? <Minus className="w-3.5 h-3.5" />
                                            : <Plus className="w-3.5 h-3.5" />
                                        }
                                    </div>
                                </button>

                                {/* Answer */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-7 pl-[4.5rem]">
                                                <div className="border-l-2 border-primary/25 pl-5">
                                                    <p className="text-muted text-sm leading-relaxed max-w-3xl">
                                                        {faq.answer}
                                                    </p>
                                                    <button className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors duration-200 group">
                                                        Read Documentation
                                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </motion.div>

                {/* ── Footer CTA ────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative rounded-[2rem] overflow-hidden border border-border-solid"
                >
                    {/* Dark background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-[#1e293b]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary),transparent_60%)] opacity-10" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 lg:p-10">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                                <MessageCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-white">
                                    Still have questions?
                                </h4>
                                <p className="text-xs text-white/40 uppercase tracking-widest mt-0.5">
                                    Speak with a product specialist
                                </p>
                            </div>
                        </div>
                        <Link href="/contact" className="group flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-primary border border-white/15 hover:border-primary text-white px-7 py-3 rounded-xl font-bold text-sm">
                            Contact Support
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}