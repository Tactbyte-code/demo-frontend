
"use client";

import { useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useMotionValueEvent,
} from "framer-motion";

import {
    ArrowRight,
    BrainCircuit,
    Check,
    CircleHelp,
    Crosshair,
    Lightbulb,
    Search,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Users,
} from "lucide-react";

const stages = [
    {
        number: "01",
        eyebrow: "THE STARTING POINT",
        title: "Every big idea starts with a question.",
        description:
            "You have an idea. You believe it could solve a real problem. But is that belief backed by anything?",
    },
    {
        number: "02",
        eyebrow: "THE INVESTIGATION",
        title: "Let AI explore what you cannot see.",
        description:
            "Go beyond assumptions. Explore customer pain points, market demand, and the competitive landscape.",
    },
    {
        number: "03",
        eyebrow: "THE DISCOVERY",
        title: "Connect the dots. Find the signals.",
        description:
            "Bring together research findings to understand where opportunities exist and where challenges remain.",
    },
    {
        number: "04",
        eyebrow: "THE NEXT MOVE",
        title: "Move forward with a clearer direction.",
        description:
            "Turn your research into a structured validation report that helps you think through your next move.",
    },
];

/* ----------------------------------------
   STAGE 01 — IDEA
---------------------------------------- */

function IdeaVisual() {
    return (
        <div className="relative mx-auto w-full max-w-[510px]">
            <div className="absolute inset-10 rounded-full bg-purple-500/20 blur-[90px]" />

            <div className="relative rotate-[-2deg] rounded-[28px] border border-white/10 bg-[#191525] p-6 shadow-2xl sm:p-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Lightbulb className="h-4 w-4 text-purple-300" />
                        New idea
                    </div>

                    <span className="rounded-full bg-purple-400/10 px-3 py-1 text-[10px] font-bold text-purple-300">
                        YOUR STARTING POINT
                    </span>
                </div>

                <div className="mt-9">
                    <p className="text-xs text-gray-500">What if...</p>

                    <h3 className="mt-3 text-2xl font-bold leading-relaxed text-white sm:text-3xl">
                        I could build something that solves a real problem?
                    </h3>
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <div className="flex items-center gap-2">
                        <CircleHelp className="h-4 w-4 text-purple-300" />

                        <span className="text-xs font-semibold text-gray-300">
                            But first, ask yourself...
                        </span>
                    </div>

                    <div className="mt-5 space-y-4">
                        {[
                            "Does this problem actually exist?",
                            "Who experiences this problem?",
                            "Are people looking for a solution?",
                        ].map((question, index) => (
                            <div
                                key={question}
                                className="flex items-center gap-3"
                            >
                                <span className="text-[11px] text-purple-300">
                                    0{index + 1}
                                </span>

                                <p className="text-sm text-gray-400">
                                    {question}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-xs text-gray-500">
                        An idea is only the beginning.
                    </span>

                    <Sparkles className="h-5 w-5 text-purple-300" />
                </div>
            </div>

            <motion.div
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 3, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                }}
                className="absolute -right-3 top-8 rounded-2xl border border-white/10 bg-[#251B37] p-4 shadow-xl sm:-right-7"
            >
                <Lightbulb className="h-6 w-6 text-yellow-300" />
            </motion.div>
        </div>
    );
}

/* ----------------------------------------
   STAGE 02 — RESEARCH
---------------------------------------- */

function ResearchVisual() {
    const categories = [
        {
            icon: Users,
            title: "Customer pain points",
            status: "Exploring",
        },
        {
            icon: TrendingUp,
            title: "Market demand",
            status: "Researching",
        },
        {
            icon: Crosshair,
            title: "Competition",
            status: "Comparing",
        },
        {
            icon: Search,
            title: "Market opportunities",
            status: "Discovering",
        },
    ];

    return (
        <div className="relative mx-auto w-full max-w-[510px]">
            <div className="absolute inset-10 rounded-full bg-purple-500/20 blur-[90px]" />

            <div className="relative rounded-[28px] border border-white/10 bg-[#191525] p-6 shadow-2xl sm:p-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15">
                            <BrainCircuit className="h-5 w-5 text-purple-300" />
                        </div>

                        <div>
                            <p className="text-sm font-bold text-white">
                                Research engine
                            </p>

                            <p className="text-[11px] text-gray-500">
                                Investigating your idea
                            </p>
                        </div>
                    </div>

                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                        className="h-2.5 w-2.5 rounded-full bg-purple-400"
                    />
                </div>

                <div className="my-8 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />

                    <span className="text-[10px] font-bold tracking-[0.18em] text-purple-300">
                        RESEARCH IN PROGRESS
                    </span>

                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-3">
                    {categories.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: 18 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: index * 0.15,
                                }}
                                className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15">
                                    <Icon className="h-5 w-5 text-purple-300" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-gray-200">
                                        {item.title}
                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-500">
                                        {item.status}
                                    </p>
                                </div>

                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    <Sparkles className="h-4 w-4 text-purple-300" />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* <div className="mt-7 rounded-xl bg-purple-400/[0.08] p-4">
                    <p className="text-xs leading-6 text-purple-200">
                        Connecting research across multiple dimensions to
                        build a more complete picture.
                    </p>
                </div> */}
            </div>
        </div>
    );
}

/* ----------------------------------------
   STAGE 03 — DISCOVERY
---------------------------------------- */

function SignalsVisual() {
    const signals = [
        {
            label: "Customer pain",
            width: "88%",
            color: "bg-violet-400",
        },
        {
            label: "Market demand",
            width: "73%",
            color: "bg-fuchsia-400",
        },
        {
            label: "Market opportunity",
            width: "65%",
            color: "bg-pink-400",
        },
        {
            label: "Competitive pressure",
            width: "46%",
            color: "bg-orange-300",
        },
    ];

    return (
        <div className="relative mx-auto w-full max-w-[510px]">
            <div className="absolute inset-10 rounded-full bg-fuchsia-500/20 blur-[90px]" />

            <div className="relative rounded-[28px] border border-white/10 bg-[#191525] p-6 shadow-2xl sm:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-white">
                            Market signals
                        </p>

                        <p className="mt-1 text-[11px] text-gray-500">
                            Illustrative research visualization
                        </p>
                    </div>

                    <TrendingUp className="h-5 w-5 text-fuchsia-300" />
                </div>

                <div className="mt-9 space-y-7">
                    {signals.map((signal, index) => (
                        <div key={signal.label}>
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-300">
                                    {signal.label}
                                </span>

                                <span className="text-[10px] text-gray-500">
                                    Signal {index + 1}
                                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: signal.width }}
                                    transition={{
                                        duration: 1,
                                        delay: index * 0.15,
                                        ease: "easeOut",
                                    }}
                                    className={`h-full rounded-full ${signal.color}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-9 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <Search className="h-4 w-4 text-purple-300" />

                        <p className="mt-3 text-xs font-semibold text-white">
                            Research findings
                        </p>

                        <p className="mt-1 text-[10px] text-gray-500">
                            Evidence to examine
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <Crosshair className="h-4 w-4 text-pink-300" />

                        <p className="mt-3 text-xs font-semibold text-white">
                            Opportunity areas
                        </p>

                        <p className="mt-1 text-[10px] text-gray-500">
                            Potential directions
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ----------------------------------------
   STAGE 04 — DECISION
---------------------------------------- */

function DecisionVisual() {
    return (
        <div className="relative mx-auto w-full max-w-[510px]">
            <div className="absolute inset-10 rounded-full bg-pink-500/20 blur-[90px]" />

            <div className="relative rounded-[28px] border border-white/10 bg-[#191525] p-6 shadow-2xl sm:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-white">
                            Your validation report
                        </p>

                        <p className="mt-1 text-[11px] text-gray-500">
                            A structured view of your idea
                        </p>
                    </div>

                    <ShieldCheck className="h-6 w-6 text-pink-300" />
                </div>

                <div className="my-8 rounded-2xl border border-purple-300/20 bg-gradient-to-br from-purple-500/15 to-pink-500/10 p-6">
                    <div className="flex items-center gap-2 text-xs font-semibold text-purple-200">
                        <Sparkles className="h-4 w-4" />
                        YOUR NEXT STEP
                    </div>

                    <h3 className="mt-4 text-2xl font-bold leading-snug text-white">
                        Understand your opportunity before you build.
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-gray-400">
                        Use the findings to identify what needs more research,
                        what looks promising, and where to focus next.
                    </p>
                </div>

                <div className="space-y-3">
                    {[
                        "Review the customer problem",
                        "Understand market demand",
                        "Evaluate the competitive landscape",
                    ].map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15">
                                <Check className="h-3.5 w-3.5 text-emerald-300" />
                            </div>

                            <p className="text-xs text-gray-300">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-[11px] text-gray-500">
                        Research-backed direction
                    </span>

                    <span className="flex items-center gap-2 text-xs font-bold text-pink-300">
                        Ready to explore
                        <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ----------------------------------------
   VISUAL SWITCHER
---------------------------------------- */

const visuals = [
    IdeaVisual,
    ResearchVisual,
    SignalsVisual,
    DecisionVisual,
];

function StageVisual({ index }) {
    return (
        <div className="relative flex h-full w-full items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex h-full w-full items-center justify-center"
                >
                    {index === 0 && <IdeaVisual />}
                    {index === 1 && <ResearchVisual />}
                    {index === 2 && <SignalsVisual />}
                    {index === 3 && <DecisionVisual />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

/* ----------------------------------------
   STAGE TEXT
---------------------------------------- */

function StageContent({ stage, activeStage }) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeStage}
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                exit={{
                    opacity: 0,
                    y: -20,
                }}
                transition={{
                    duration: 0.35,
                }}
                className="min-h-[280px]"
            >
                <p className="text-xs font-bold tracking-[0.2em] text-purple-300">
                    {stage.eyebrow}
                </p>

                <p className="mt-5 text-7xl font-black tracking-tighter text-white/[0.08]">
                    {stage.number}
                </p>

                <h3 className="mt-2 max-w-[430px] text-3xl font-bold leading-tight text-white sm:text-4xl">
                    {stage.title}
                </h3>

                <p className="mt-5 max-w-[400px] text-sm leading-7 text-gray-400">
                    {stage.description}
                </p>
            </motion.div>
        </AnimatePresence>
    );
}

/* ----------------------------------------
   PROGRESS INDICATOR
---------------------------------------- */

function StageProgress({ activeStage, progress }) {
    return (
        <div className="mt-8 max-w-[390px]">
            <div className="mb-4 flex justify-between text-[10px] font-bold tracking-wider text-gray-500">
                <span>YOUR VALIDATION JOURNEY</span>
                <span>0{activeStage + 1} / 04</span>
            </div>

            <div className="relative h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                    style={{ width: progress }}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                />
            </div>

            <div className="mt-4 flex justify-between">
                {stages.map((stage, index) => (
                    <div
                        key={stage.number}
                        className="flex flex-col gap-2"
                    >
                        <span
                            className={`text-[10px] font-bold transition-colors ${activeStage === index
                                ? "text-purple-300"
                                : "text-gray-500"
                                }`}
                        >
                            {stage.number}
                        </span>

                        <motion.span
                            animate={{
                                backgroundColor:
                                    activeStage === index
                                        ? "#C084FC"
                                        : "rgba(255,255,255,0.1)",
                                width: activeStage === index ? 34 : 20,
                            }}
                            className="h-1 rounded-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ----------------------------------------
   DESKTOP PINNED EXPERIENCE
---------------------------------------- */

function DesktopStorySection() {
    const sectionRef = useRef(null);
    const [activeStage, setActiveStage] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const progress = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", "100%"]
    );

    const activeIndex = useTransform(
        scrollYProgress,
        [0, 0.249, 0.25, 0.499, 0.5, 0.749, 0.75, 1],
        [0, 0, 1, 1, 2, 2, 3, 3]
    );

    useMotionValueEvent(activeIndex, "change", (latest) => {
        const nextStage = Math.max(
            0,
            Math.min(3, Math.round(latest))
        );

        setActiveStage((current) =>
            current === nextStage ? current : nextStage
        );
    });

    return (
        <section
            ref={sectionRef}
            className="relative hidden h-[400vh] bg-[#0D0B16] lg:block"
        >
            <div className="sticky top-0 flex h-screen min-h-[650px] flex-col justify-center overflow-hidden px-12">
                {/* Background */}
                <div className="pointer-events-none absolute -left-40 top-10 h-[450px] w-[450px] rounded-full bg-purple-700/15 blur-[130px]" />

                <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-pink-700/10 blur-[130px]" />

                {/* Background grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "55px 55px",
                    }}
                />

                <div className="relative mx-auto w-full max-w-[1250px]">
                    {/* Heading */}
                    <div className="mb-10 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/[0.08] px-4 py-2">
                            <Sparkles className="h-3.5 w-3.5 text-purple-300" />

                            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-purple-200">
                                From idea to insight
                            </span>
                        </div>

                        <h2 className="text-4xl font-black tracking-tight text-white xl:text-5xl">
                            Don't just believe in your idea.
                            <span className="block bg-gradient-to-r from-[#A78BFA] to-[#FB83B4] bg-clip-text text-transparent">
                                Understand it.
                            </span>
                        </h2>
                    </div>

                    {/* Main layout */}
                    <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
                        <div>
                            <StageContent
                                stage={stages[activeStage]}
                                activeStage={activeStage}
                            />

                            <StageProgress
                                activeStage={activeStage}
                                progress={progress}
                            />
                        </div>

                        <div className="relative flex h-[520px] w-full items-center justify-center">
                            <StageVisual index={activeStage} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ----------------------------------------
   MOBILE / TABLET VERSION
---------------------------------------- */

function MobileStorySection() {
    return (
        <section className="relative overflow-hidden bg-[#0D0B16] px-6 py-24 lg:hidden">
            <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-purple-700/15 blur-[120px]" />

            <div className="relative mx-auto max-w-[650px]">
                <div className="mb-16 text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/[0.08] px-4 py-2">
                        <Sparkles className="h-3.5 w-3.5 text-purple-300" />

                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-purple-200">
                            From idea to insight
                        </span>
                    </div>

                    <h2 className="text-4xl font-black leading-tight tracking-tight text-white">
                        Don't just believe in your idea.
                        <span className="block bg-gradient-to-r from-[#A78BFA] to-[#FB83B4] bg-clip-text text-transparent">
                            Understand it.
                        </span>
                    </h2>
                </div>

                <div className="space-y-20">
                    {stages.map((stage, index) => (
                        <div key={stage.number}>
                            <div className="mb-7">
                                <p className="text-xs font-bold tracking-[0.2em] text-purple-300">
                                    {stage.eyebrow}
                                </p>

                                <p className="mt-3 text-6xl font-black tracking-tighter text-white/[0.08]">
                                    {stage.number}
                                </p>

                                <h3 className="mt-2 text-3xl font-bold leading-tight text-white">
                                    {stage.title}
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-gray-400">
                                    {stage.description}
                                </p>
                            </div>

                            <StageVisual index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ----------------------------------------
   MAIN COMPONENT
---------------------------------------- */

export default function WhyValidate() {
    return (
        <>
            <DesktopStorySection />
            <MobileStorySection />
        </>
    );
}
