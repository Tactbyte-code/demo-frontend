
"use client";

import { useState } from "react";
import {
    ArrowUpRight,
    ChevronDown,
    CircleHelp,
    MessageCircle,
} from "lucide-react";
import Link from "next/link";

const faqs = [
    {
        question: "What exactly does ProblemPulseAI help me validate?",
        answer:
            "ProblemPulseAI helps you understand whether your idea addresses a meaningful problem, whether people are actively looking for solutions, what alternatives already exist, and whether there may be a viable business opportunity. It turns scattered research signals into a structured starting point for making decisions.",
    },
    {
        question: "How does ProblemPulseAI research my idea?",
        answer:
            "ProblemPulseAI analyzes relevant research signals, including discussions and user feedback from sources such as Reddit and the Play Store where applicable. It organizes those findings into insights around customer pain points, demand, competition, and business potential.",
    },
    {
        question: "Do I need to have a fully developed business idea?",
        answer:
            "Not at all. You can start with a rough concept, a problem you've noticed, or an early product idea. The more context you provide about the intended audience and solution, the more focused your research can be.",
    },
    {
        question: "How long does an idea analysis take?",
        answer:
            "Analysis runs in the background, so you don't have to keep the page open and wait. You can revisit your analysis workspace to check its progress and open the report once it is ready.",
    },
    {
        question: "Can I try ProblemPulseAI without creating an account?",
        answer:
            "Yes. You can submit an idea and start an analysis as a guest. When the analysis is complete, you'll be asked to sign in to access the full report. Your guest analysis can then be associated with your account.",
    },
    {
        question: "How reliable are the results?",
        answer:
            "ProblemPulseAI is designed to support your research, not replace real-world validation. Its findings are based on available data and AI-generated analysis, so use them as evidence to guide your next steps rather than as a guarantee that an idea will succeed.",
    },
    {
        question: "Will ProblemPulseAI tell me whether my idea will succeed?",
        answer:
            "No tool can guarantee the success of a business idea. ProblemPulseAI helps you identify promising signals, potential risks, and unanswered questions so you can make a more informed decision before investing further.",
    },
    {
        question: "Can I revisit my previous reports?",
        answer:
            "Yes. Once you're signed in, you can access your saved analyses from your workspace and revisit completed reports whenever you need them.",
    },
];

function FAQItem({ item, index, isOpen, onToggle }) {
    return (
        <div
            className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                isOpen
                    ? "border-[#DCC8F1] bg-white shadow-[0_12px_35px_rgba(113,56,213,0.09)]"
                    : "border-[#EEE6F5] bg-white/70 hover:border-[#DCC8F1] hover:shadow-[0_8px_24px_rgba(113,56,213,0.06)]"
            }`}
        >
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
            >
                <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold transition-colors duration-300 ${
                        isOpen
                            ? "bg-gradient-to-br from-[#7138D5] to-[#C12D9A] text-white"
                            : "bg-[#F3ECFA] text-[#9875BB] group-hover:bg-[#EDE2FA]"
                    }`}
                >
                    {String(index + 1).padStart(2, "0")}
                </span>

                <span
                    className={`flex-1 text-sm font-bold leading-6 transition-colors duration-300 sm:text-[15px] ${
                        isOpen ? "text-[#7138D5]" : "text-[#342148]"
                    }`}
                >
                    {item.question}
                </span>

                <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                            ? "rotate-180 bg-[#F1E8FB] text-[#7138D5]"
                            : "bg-[#F8F5FB] text-[#9A86AD] group-hover:bg-[#F1E8FB]"
                    }`}
                >
                    <ChevronDown className="h-4 w-4" />
                </span>
            </button>

            <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="ml-[60px] border-t border-[#F1EAF7] px-5 pb-6 pt-4 sm:ml-[68px] sm:px-6">
                        <p className="max-w-2xl text-sm leading-7 text-[#78658D]">
                            {item.answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section
            id="faq"
            className="relative overflow-hidden bg-white px-5 py-20 sm:px-8 lg:px-12 lg:pb-20"
        >
            {/* Background accents */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#E9D5FF]/25 blur-[110px]" />

            <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#FBCFE8]/25 blur-[110px]" />

            <div className="relative mx-auto max-w-[1240px]">
                <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-20">

                    {/* Left introduction */}
                    <div className="flex w-full flex-none flex-col self-start lg:w-[38%]">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E9D5FF] bg-[#FCF9FF] px-4 py-2">
                            <CircleHelp className="h-3.5 w-3.5 text-[#A52BC2]" />

                            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7138D5]">
                                Got questions?
                            </span>
                        </div>

                        <h2 className="mt-7 text-4xl font-black leading-[1.12] tracking-tight text-[#291542] sm:text-5xl lg:text-[56px]">
                            A little
                            <br />
                            <span className="bg-gradient-to-r from-[#7138D5] via-[#A52BC2] to-[#E0449B] bg-clip-text text-transparent">
                                clarity goes
                            </span>
                            <br />
                            a long way.
                        </h2>

                        <p className="mt-6 max-w-md text-sm leading-7 text-[#78658D]">
                            Starting something new comes with questions.
                            Here are a few things you might want to know
                            before validating your next big idea.
                        </p>

                        {/* Support card */}
                        <div className="relative mt-10 overflow-hidden rounded-[24px] border border-[#E9DDF5] bg-gradient-to-br from-[#F8F1FF] via-[#FCF7FF] to-[#FFF2F8] p-6 shadow-[0_12px_35px_rgba(113,56,213,0.07)]">
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/60 blur-2xl" />

                            <div className="relative">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                                    <MessageCircle className="h-5 w-5 text-[#A52BC2]" />
                                </div>

                                <h3 className="mt-5 text-lg font-extrabold text-[#342148]">
                                    Still curious?
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-[#857196]">
                                    Have a question that isn't covered here?
                                    We'd love to help you figure things out.
                                </p>

                                <Link
                                    href="mailto:support@ProblemPulseAI.site"
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#7138D5] transition-all hover:gap-3"
                                >
                                    Talk to our team
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Decorative footer */}
                        <div className="mt-9 hidden items-center gap-3 lg:flex">
                            <div className="flex -space-x-2">
                                <span className="h-2.5 w-2.5 rounded-full border-2 border-white bg-[#7138D5]" />
                                <span className="h-2.5 w-2.5 rounded-full border-2 border-white bg-[#A52BC2]" />
                                <span className="h-2.5 w-2.5 rounded-full border-2 border-white bg-[#F04D9A]" />
                            </div>

                            <span className="text-[11px] font-medium text-[#A18EAF]">
                                Better questions lead to better decisions.
                            </span>
                        </div>
                    </div>

                    {/* Right accordion */}
                    <div className="min-w-0 flex-1">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#A18EAF]">
                                Frequently asked questions
                            </p>

                            <span className="rounded-full bg-[#F5EFFB] px-3 py-1.5 text-[10px] font-bold text-[#8B65B5]">
                                {faqs.length} QUESTIONS
                            </span>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((item, index) => (
                                <FAQItem
                                    key={item.question}
                                    item={item}
                                    index={index}
                                    isOpen={activeIndex === index}
                                    onToggle={() =>
                                        setActiveIndex((current) =>
                                            current === index ? -1 : index
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
