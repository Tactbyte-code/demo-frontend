"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, Zap, Sparkles, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { initiatePayment } from "@/lib/razorpay";
import { useCreditStore } from "@/store/useCreditStore";

function AnimatedNumber({ value, prefix = "", suffix = "" }) {
    const motionValue = useMotionValue(value);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 250,
    });

    useEffect(() => {
        motionValue.set(value);
    }, [value, motionValue]);

    const displayText = useTransform(springValue, (latest) => {
        return `${prefix}${Math.round(latest)}${suffix}`;
    });

    return <motion.span>{displayText}</motion.span>;
}

export default function CreditPurchaseModal({ isOpen, onClose, user, onPurchaseSuccess }) {
    const router = useRouter();

    // Slider state: 1 to 9 sections (1 section = $3 / 22 credits)
    const [sections, setSections] = useState(1);

    // Payment states
    const [error, setError] = useState("");
    const [purchasingPlan, setPurchasingPlan] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [needsRetry, setNeedsRetry] = useState(false); // payment done, unlock/refetch failed

    const customPrice = sections * 3;
    const customCredits = sections * 22;

    const { getCredits } = useCreditStore();

    // Runs after a successful payment (and again when the user presses "Retry")
    const finishPurchase = async () => {
        await getCredits(true);

        // Path 1: opened from the report page -> unlock sections, refresh the report, stay on the page
        if (typeof onPurchaseSuccess === "function") {
            setError("");
            setNeedsRetry(false);
            setIsProcessing(true);
            try {
                await onPurchaseSuccess();
                setPurchasingPlan(null);
                setIsProcessing(false);
                onClose();
            } catch (err) {
                setPurchasingPlan(null);
                setIsProcessing(false);
                setNeedsRetry(true);
                setError("Your payment went through, but unlocking your sections failed. Please retry.");
            }
            return;
        }

        // Path 2: default -> keep the overlay up; the page unmounts once navigation completes
        router.push("/dashboard");
    };

    const handleCheckout = (packId, price, credits) => {
        setError("");
        setNeedsRetry(false);
        setPurchasingPlan(packId);

        initiatePayment({
            amount: price * 100, // Multiplied by 100 for backend conversion
            userEmail: user?.email,
            userName: user?.full_name,
            onProcessing: () => setIsProcessing(true),
            onSuccess: finishPurchase,
            onFailure: () => {
                setIsProcessing(false);
                setPurchasingPlan(null);
                setError("Payment failed or was cancelled. Please try again.");
            },
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={!isProcessing ? onClose : undefined}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="relative w-full max-w-5xl bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-zinc-800/60 bg-zinc-900/50">
                                <div className="flex items-start gap-3.5">
                                    {/* Title Icon */}
                                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mt-0.5 shrink-0">
                                        <Sparkles className="w-5 h-5" />
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                                            Unlock More Analyses
                                        </h2>
                                        <p className="text-sm text-zinc-400 mt-1">
                                            You need at least 66 credits to run an analysis and view a minimum of 3 sections. Choose a pack below.
                                        </p>
                                    </div>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    disabled={isProcessing}
                                    aria-label="Close"
                                    className="p-2 rounded-full hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Body / Pricing Cards */}
                            <div className="p-6 overflow-y-auto">
                                {/* Error Message */}
                                {error && (
                                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        <p className="text-sm font-medium flex-1">{error}</p>
                                        {needsRetry && (
                                            <button
                                                onClick={finishPurchase}
                                                disabled={isProcessing}
                                                className="shrink-0 px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 disabled:opacity-60 flex items-center gap-2 cursor-pointer"
                                            >
                                                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                                Retry
                                            </button>
                                        )}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Option 1: Starter Pack */}
                                    <div className="relative flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:border-blue-500/50 transition-colors">
                                        <div className="mb-4">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
                                                <Zap className="w-3.5 h-3.5" />
                                                Starter Pack
                                            </div>
                                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Quick Validation</h3>
                                            <p className="text-sm text-zinc-500 mt-1 h-10">
                                                Perfect for running a focused analysis on a single idea.
                                            </p>
                                        </div>

                                        <div className="my-4 grow">
                                            <div className="flex items-baseline gap-1 mb-6">
                                                <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">$9</span>
                                                <span className="text-sm font-medium text-zinc-500 ml-1">~$0.13/credit</span>
                                            </div>

                                            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> <span>70 Credits</span></li>
                                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> <span>4 credits extra (66 + 4)</span></li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                                    <span className="leading-tight">
                                                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">Includes:</span> Pain point + Demand signals + Unit economics
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        <button
                                            onClick={() => handleCheckout("starter", 9, 70)}
                                            disabled={isProcessing}
                                            className="w-full py-2.5 rounded-xl cursor-pointer font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                                        >
                                            {purchasingPlan === "starter" ? (
                                                <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                                            ) : (
                                                "Get 70 Credits"
                                            )}
                                        </button>
                                    </div>

                                    {/* Option 2 - Most Popular choice */}
                                    <div className="relative flex flex-col p-6 rounded-2xl border-2 border-amber-500/60 bg-gradient-to-b from-amber-500/10 via-zinc-900 to-zinc-950 shadow-[0_0_30px_rgba(245,158,11,0.15)] transform md:-translate-y-2">
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-linear-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 text-xs font-extrabold rounded-full flex items-center gap-1.5 shadow-md shadow-amber-500/20 whitespace-nowrap uppercase tracking-wider">
                                            <Sparkles className="w-3.5 h-3.5 fill-zinc-950 stroke-zinc-950" /> Most Popular
                                        </div>

                                        <div className="mb-4 mt-2">
                                            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-yellow-500">
                                                Full Analysis
                                            </h3>
                                            <p className="text-sm text-zinc-400 mt-1 h-10">
                                                Everything you need for 1 complete idea validation.
                                            </p>
                                        </div>

                                        <div className="my-4 grow">
                                            <div className="flex items-baseline gap-1 mb-6">
                                                <span className="text-4xl font-extrabold text-amber-100">$19</span>
                                                <span className="text-sm font-medium text-amber-500/80 ml-1">$0.095/credit</span>
                                            </div>
                                            <ul className="space-y-3 text-sm text-zinc-300">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                                                    <span>200 Credits</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                                                    <span>Covers all 9 sections (198c)</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                                                    <span>2 rollover credits</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <button
                                            onClick={() => handleCheckout("full", 19, 200)}
                                            disabled={isProcessing}
                                            className="w-full py-3 rounded-xl cursor-pointer font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 shadow-lg shadow-amber-500/25 transition-all hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                                        >
                                            {purchasingPlan === "full" ? (
                                                <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                                            ) : (
                                                "Get 200 Credits"
                                            )}
                                        </button>
                                    </div>

                                    {/* Option 3: Pro Pack */}
                                    <div className="relative flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:border-purple-500/50 transition-colors">
                                        <div className="mb-4">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold mb-3">
                                                <Sparkles className="w-3.5 h-3.5" />
                                                Best Value
                                            </div>
                                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Pro Pack</h3>
                                            <p className="text-sm text-zinc-500 mt-1 h-10">
                                                Perfect for serial builders. Validate multiple ideas.
                                            </p>
                                        </div>

                                        <div className="my-4 grow">
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">$55</span>
                                                <span className="text-xl font-semibold text-zinc-200 dark:text-zinc-500 line-through decoration-zinc-400/60">
                                                    $57
                                                </span>
                                                <span className="text-sm font-medium text-purple-500 ml-1">~$0.092/credit</span>
                                            </div>
                                            <span className="text-sm text-purple-600 dark:text-purple-400 font-medium block mb-5">Save $2 compared to single packs</span>

                                            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" /> 600 Credits</li>
                                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" /> 3 Complete Analyses</li>
                                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" /> 6 rollover credits</li>
                                            </ul>
                                        </div>

                                        <button
                                            onClick={() => handleCheckout("pro", 55, 600)}
                                            disabled={isProcessing}
                                            className="w-full py-2.5 rounded-xl cursor-pointer font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 text-white transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                                        >
                                            {purchasingPlan === "pro" ? (
                                                <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                                            ) : (
                                                "Get 600 Credits"
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Custom Amount Slider Block */}
                                {typeof onPurchaseSuccess === "function" && (
                                    <div className="mt-8 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                                            <div>
                                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                    Build Your Own Pack
                                                </h3>
                                                <p className="text-sm text-zinc-500 mt-1">
                                                    Slide to select the exact number of credits you need.
                                                </p>
                                            </div>

                                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start">
                                                <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                                                    <AnimatedNumber value={customPrice} prefix="$" />
                                                </div>
                                                <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                                                    <AnimatedNumber value={customCredits} /> Credits
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative pt-2 pb-6 px-1">
                                            <input
                                                type="range"
                                                min="1"
                                                max="9"
                                                step="1"
                                                value={sections}
                                                onChange={(e) => setSections(parseInt(e.target.value))}
                                                disabled={isProcessing}
                                                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                            />

                                            {/* Breakpoint markers */}
                                            <div className="flex justify-between mt-4">
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                                    <div key={num} className="flex flex-col items-center relative group">
                                                        {/* Active / Inactive dot */}
                                                        <div className={`w-1.5 h-1.5 rounded-full absolute -top-[23px] pointer-events-none transition-colors duration-300 ${sections >= num ? 'bg-white' : 'bg-transparent'}`}></div>

                                                        <span className={`text-[11px] font-medium transition-colors ${sections >= num ? 'text-zinc-900 dark:text-zinc-300' : 'text-zinc-400 dark:text-zinc-600'}`}>
                                                            ${num * 3}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleCheckout("custom", customPrice, customCredits)}
                                            disabled={isProcessing}
                                            className="w-full mt-2 py-3 rounded-xl cursor-pointer font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 text-white transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
                                        >
                                            {purchasingPlan === "custom" ? (
                                                <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                                            ) : (
                                                "Purchase Custom Pack"
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}