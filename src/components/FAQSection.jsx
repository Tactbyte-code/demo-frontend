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
        <section className="pb-24 bg-white relative overflow-hidden">
            {/* Subtle neutral texture to avoid the "blue wash" */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-4">
                            <HelpCircle className="w-4 h-4 text-primary" />
                            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em]">Support Center</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-none">
                            Common
                            <span className="text-primary"> Inquiries.</span>
                        </h2>
                    </div>
                </div>

                {/* --- NON-CARD ACCORDION UI --- */}
                <div className="border-t border-glass-border">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`border-b border-glass-border transition-all duration-500 ${isOpen ? 'bg-surface/50' : 'hover:bg-surface/30'}`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    className="w-full py-8 flex items-center justify-between text-left group"
                                >
                                    <div className="flex items-center gap-6">
                                        <span className={`text-xs font-mono font-bold transition-colors ${isOpen ? 'text-primary' : 'text-muted/40'}`}>
                                            0{index + 1}
                                        </span>
                                        <h3 className={`text-lg lg:text-xl font-bold tracking-tight transition-colors ${isOpen ? 'text-foreground' : 'text-muted group-hover:text-foreground'}`}>
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <div className={`shrink-0 ml-4 p-2 cursor-pointer rounded-full border transition-all duration-300 ${isOpen ? 'bg-primary border-primary text-white rotate-180' : 'border-glass-border text-muted'}`}>
                                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="pb-8 pl-14 pr-12">
                                                <p className="text-muted text-base leading-relaxed max-w-3xl border-l-2 border-primary/20 pl-6">
                                                    {faq.answer}
                                                </p>
                                                {/* <div className="mt-6 pl-6">
                                                    <button className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 hover:gap-3 transition-all">
                                                        Read Documentation <ArrowRight className="w-3 h-3" />
                                                    </button>
                                                </div> */}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Footer CTA */}
                <div className="mt-12 p-8 rounded-4xl bg-foreground text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-primary/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Still have questions?</h4>
                            <p className="text-xs text-white/50 uppercase tracking-widest">Speak with a product specialist</p>
                        </div>
                    </div>
                    <button className="bg-white cursor-pointer text-foreground px-8 py-3 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all">
                        Contact Support
                    </button>
                </div>
            </div>
        </section>
    );
}