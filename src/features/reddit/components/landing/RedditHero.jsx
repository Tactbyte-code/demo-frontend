"use client";

import { useState } from "react";
import {
    ArrowRight,
    Search,
    MessageCircle,
    Users,
    TrendingUp,
    Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ProductHeader from "@/components/layout/ProductHeader";
import { useCreateQuery } from "../../hooks/useCreateQuery";
import { useAuthStore } from "@/store/authStore";
import { useCreditStore } from "@/store/useCreditStore";
import CreditPurchaseModal from "@/components/credits/CreditPurchaseModal";

const insights = [
    {
        icon: MessageCircle,
        title: "Real conversations",
        description: "Explore what people are actually discussing.",
    },
    {
        icon: Users,
        title: "Audience insights",
        description: "Understand your potential customers.",
    },
    {
        icon: TrendingUp,
        title: "Market signals",
        description: "Discover trends, needs, and opportunities.",
    },
];

export default function RedditHero() {
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [error, setError] = useState("");

    const { mutateAsync: submitRedditQuery, isPending } = useCreateQuery();

    const user = useAuthStore((state) => state.user);
    const getCredits = useCreditStore((state) => state.getCredits);

    const [showCreditPurchaseModal, setShowCreditPurchaseModal] = useState(false);
    const [isCheckingCredits, setIsCheckingCredits] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedQuery = query.trim();

        if (trimmedQuery.length < 10) {
            setError("Your query must be at least 10 characters long.");
            return;
        }

        try {
            setError("");

            if (user) {
                setIsCheckingCredits(true);

                await getCredits(true);

                const { credits, hasFetched } = useCreditStore.getState();

                if (!hasFetched) {
                    throw new Error(
                        "Unable to verify your credit balance. Please try again."
                    );
                }

                if (credits < 30) {
                    setShowCreditPurchaseModal(true);
                    return;
                }
            }

            const data = await submitRedditQuery(trimmedQuery);

            if (!data?.id) {
                throw new Error("No query ID was returned from the server.");
            }

            router.push(`/reddit/analysis/${data.id}`);
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                err.message ||
                "Failed to start Reddit analysis."
            );
        } finally {
            setIsCheckingCredits(false);
        }
    };

    return (
        <>
            <ProductHeader />

            <section id="reddit-hero" className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#FFF9F6] lg:h-screen lg:min-h-0">

                {/* Background decoration */}
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

                    {/* Top-right dot pattern */}
                    <div
                        className="absolute right-0 top-0 h-[280px] w-[380px] opacity-[0.12]"
                        style={{
                            backgroundImage:
                                "radial-gradient(#FF4500 1.3px, transparent 1.3px)",
                            backgroundSize: "22px 22px",
                            maskImage:
                                "linear-gradient(to bottom left, black, transparent)",
                        }}
                    />

                    {/* Bottom-left ambient glow */}
                    <div className="absolute -left-40 bottom-[-180px] h-[420px] w-[420px] rounded-full bg-[#FF4500]/[0.06] blur-[100px]" />

                    {/* Right ambient glow */}
                    <div className="absolute -right-40 top-[25%] h-[380px] w-[380px] rounded-full bg-[#FFB69E]/20 blur-[110px]" />

                    {/* Subtle decorative circles */}
                    <div className="absolute -right-32 top-[20%] h-[360px] w-[520px] rotate-[-25deg] rounded-[100%] border border-[#FF4500]/[0.07]" />

                    <div className="absolute -right-20 top-[27%] h-[280px] w-[420px] rotate-[-25deg] rounded-[100%] border border-[#FF4500]/[0.06]" />
                </div>

                {/* Main content */}
                <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10 lg:min-h-0 lg:py-6">

                    <div className="w-full max-w-5xl text-center">

                        {/* Heading */}
                        <div className="max-w-3xl mx-auto mt-15">
                            <h1 className="text-[36px] font-extrabold leading-[1.14] tracking-tight text-[#1A1A1B] sm:text-5xl lg:text-[56px]">
                                Discover what people are{" "}
                                <span className="text-[#FF4500]">
                                    really talking about.
                                </span>
                            </h1>
                        </div>

                        {/* Description */}
                        {/* <p className="mx-auto mt-5 max-w-[620px] text-sm leading-7 text-[#77716F] sm:text-base">
                            Explore Reddit conversations to uncover real
                            opinions, customer pain points, and opportunities
                            hiding in your market.
                        </p> */}

                        {/* Query box with animated light effect */}
                        <div className="relative mx-auto mt-9 w-full max-w-[740px]">

                            {/* Ambient glow */}
                            <motion.div
                                animate={{
                                    opacity: [0.35, 0.65, 0.35],
                                    scale: [0.95, 1.08, 0.95],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="pointer-events-none absolute -inset-x-16 -inset-y-12 rounded-[50%] bg-[#FF4500]/15 blur-[65px]"
                            />

                            {/* Radiating light beams */}
                            <motion.div
                                animate={{
                                    opacity: [0.15, 0.35, 0.15],
                                    rotate: [-3, 3, -3],
                                    scaleX: [0.9, 1.08, 0.9],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="pointer-events-none absolute -inset-x-24 -inset-y-20 overflow-hidden"
                            >
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: `
                                            conic-gradient(
                                                from 250deg at 50% 50%,
                                                transparent 0deg,
                                                rgba(255,69,0,0.09) 18deg,
                                                transparent 38deg,
                                                rgba(255,130,80,0.12) 55deg,
                                                transparent 78deg,
                                                rgba(255,69,0,0.08) 105deg,
                                                transparent 130deg
                                            )
                                        `,
                                        filter: "blur(22px)",
                                    }}
                                />
                            </motion.div>

                            {/* Soft horizontal light */}
                            <motion.div
                                animate={{
                                    opacity: [0.25, 0.6, 0.25],
                                    scaleX: [0.85, 1.1, 0.85],
                                }}
                                transition={{
                                    duration: 3.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="pointer-events-none absolute -bottom-5 left-[10%] right-[10%] h-10 rounded-full bg-[#FF4500]/25 blur-2xl"
                            />

                            {/* Actual query form */}
                            <form
                                onSubmit={handleSubmit}
                                className="relative z-10 mx-auto w-full rounded-lg border border-[#F2D8CE] bg-white p-3 text-left shadow-[0_16px_50px_rgba(255,69,0,0.12)] transition-shadow duration-300 focus-within:shadow-[0_18px_60px_rgba(255,69,0,0.2)] sm:p-4"
                            >
                                <div className="flex items-center gap-3 px-2 pb-2 mt-2">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#FFF0EA]">
                                        <Search className="h-5 w-5 text-[#FF4500]" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-[#292322]">
                                            What do you want to research?
                                        </p>

                                        <p className="mt-0.5 text-xs text-[#9A8D89]">
                                            Enter a topic, product, brand, or problem.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 px-2 py-2">
                                    <textarea
                                        value={query}
                                        onChange={(e) => {
                                            setQuery(e.target.value);

                                            if (error) {
                                                setError("");
                                            }
                                        }}
                                        rows={2}
                                        maxLength={2000}
                                        placeholder="e.g. What do people dislike about existing project management tools?"
                                        className="min-h-[85px] w-full resize-none rounded-lg border border-[#F1E5E0] bg-[#FFFCFA] px-4 py-3 text-sm leading-7 text-[#292322] outline-none transition placeholder:text-[#A99B96] focus:border-[#FF8A65] focus:ring-4 focus:ring-[#FF4500]/[0.07] sm:text-base"
                                    />
                                </div>


                                <div className="flex flex-col gap-3 px-1 pt-3 sm:flex-row sm:items-center sm:justify-between">

                                    <div className="flex items-center gap-2 text-xs text-[#9A8179]">
                                        <Sparkles className="h-3.5 w-3.5 text-[#FF7043]" />
                                        Insights from real community discussions
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isPending || isCheckingCredits || !query.trim()}
                                        className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#FF4500] px-7 text-sm font-bold text-white shadow-md shadow-[#FF4500]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E83F00] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isCheckingCredits ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Analyzing...
                                            </>
                                        ) : isPending ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                Analyze Reddit
                                                <ArrowRight className="h-4 w-4" />
                                            </>
                                        )}
                                    </button>
                                </div>

                                {error && (
                                    <p className="px-2 pt-3 text-sm font-medium text-red-500">
                                        {error}
                                    </p>
                                )}
                            </form>
                        </div>

                        {/* Supporting information */}
                        <div className="mx-auto mt-12 grid w-full max-w-[1200px] grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center lg:mt-14">
                            {insights.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <div key={item.title} className="contents">

                                        <motion.div
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.15 + index * 0.12,
                                                ease: "easeOut",
                                            }}
                                            whileHover={{
                                                y: -4,
                                                transition: { duration: 0.2 },
                                            }}
                                            className="group relative overflow-hidden rounded-lg border border-[#F2E5DF] bg-white/80 px-5 py-5 text-left shadow-[0_4px_18px_rgba(80,40,20,0.035)] transition-all duration-300 hover:border-[#FFC6B2] hover:shadow-[0_12px_28px_rgba(255,69,0,0.08)]"
                                        >
                                            {/* Top accent */}
                                            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#FF4500]/70 via-[#FF9675]/40 to-transparent opacity-60 transition-opacity group-hover:opacity-100" />

                                            <div className="flex items-start gap-4">

                                                {/* Icon */}
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF0EA] transition-all duration-300 group-hover:bg-[#FFE3D8]">
                                                    <Icon
                                                        className="h-5 w-5 text-[#FF4500]"
                                                        strokeWidth={1.8}
                                                    />
                                                </div>

                                                {/* Text */}
                                                <div className="min-w-0 pt-0.5">
                                                    <h3 className="text-sm font-bold tracking-tight text-[#39302D]">
                                                        {item.title}
                                                    </h3>

                                                    <p className="mt-1.5 text-xs leading-5 text-[#94847E]">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Decorative index */}
                                            <span className="absolute bottom-2 right-3 text-[28px] font-black leading-none text-[#FF4500]/[0.045]">
                                                0{index + 1}
                                            </span>
                                        </motion.div>

                                        {/* Stage transition arrow */}
                                        {index !== insights.length - 1 && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.7 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    duration: 0.4,
                                                    delay: 0.4 + index * 0.15,
                                                }}
                                                className="hidden sm:flex items-center justify-center"
                                            >
                                                <ArrowRight
                                                    className="h-5 w-5 text-[#FF9675]"
                                                    strokeWidth={1.8}
                                                />
                                            </motion.div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </section>

            <CreditPurchaseModal
                isOpen={showCreditPurchaseModal}
                onClose={() => setShowCreditPurchaseModal(false)}
                user={user}
                onPurchaseSuccess={() => getCredits(true)}
                redirectAfterPurchase={true}
            />
        </>
    );
}
