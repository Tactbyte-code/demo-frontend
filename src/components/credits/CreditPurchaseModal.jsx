
"use client";

import { createPortal } from "react-dom";
import React, { useState, useEffect } from "react";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import {
    X,
    Zap,
    Sparkles,
    Check,
    AlertCircle,
    Loader2,
    Coins,
    ArrowRight,
    SlidersHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { initiatePayment } from "@/lib/razorpay";
import { useCreditStore } from "@/store/useCreditStore";

const CUSTOM_MIN_CREDITS = 50;
const CUSTOM_MAX_CREDITS = 500;
const CUSTOM_CREDIT_STEP = 10;
const CUSTOM_PRICE_PER_CREDIT = 0.1;

const CREDIT_OPTIONS = [
    {
        id: "starter",
        credits: 70,
        price: 9,
        label: "Starter",
        color: "blue",
    },
    {
        id: "builder",
        credits: 200,
        price: 19,
        label: "Builder",
        color: "amber",
        popular: true,
    },
    {
        id: "pro",
        credits: 600,
        price: 55,
        label: "Pro",
        color: "purple",
        originalPrice: 57,
    },
];

function AnimatedNumber({ value, prefix = "", suffix = "" }) {
    const motionValue = useMotionValue(value);

    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 250,
    });

    useEffect(() => {
        motionValue.set(value);
    }, [value, motionValue]);

    const displayText = useTransform(
        springValue,
        (latest) => `${prefix}${Math.round(latest)}${suffix}`
    );

    return <motion.span>{displayText}</motion.span>;
}

export default function CreditPurchaseModal({
    isOpen,
    onClose,
    user,
    onPurchaseSuccess,
    redirectAfterPurchase = true,
    showCustomAmountSlider = false,
}) {
    const router = useRouter();

    const [customCredits, setCustomCredits] = useState(100);
    const { getCredits } = useCreditStore();

    const [error, setError] = useState("");
    const [purchasingPlan, setPurchasingPlan] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [needsRetry, setNeedsRetry] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const customPrice =
        Math.round(customCredits * CUSTOM_PRICE_PER_CREDIT * 100) / 100;

    const finishPurchase = async () => {
        await getCredits(true);

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
                setError(
                    "Your payment went through, but the follow-up action failed. Please retry."
                );
            }

            return;
        }

        if (redirectAfterPurchase) {
            router.push("/dashboard");
        } else {
            setPurchasingPlan(null);
            setIsProcessing(false);
            onClose();
        }
    };

    const handleCheckout = (packId, price, credits) => {
        setError("");
        setNeedsRetry(false);
        setPurchasingPlan(packId);

        initiatePayment({
            amount: price * 100,
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

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={!isProcessing ? onClose : undefined}
                        className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md"
                    />

                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
                            className="relative w-full max-w-3xl bg-[#111114] rounded-2xl shadow-2xl border border-white/[0.09] overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
                        >
                            {/* Ambient background */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                <div className="absolute -top-40 -right-20 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full" />
                                <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-purple-600/[0.08] blur-[100px] rounded-full" />
                            </div>

                            {/* Header */}
                            <div className="relative flex justify-between items-start p-6 sm:p-7 border-b border-white/[0.07]">
                                <div className="flex items-start gap-3.5">
                                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-400/15">
                                        <Coins className="w-5 h-5" />
                                    </div>

                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                                            Get more credits
                                        </h2>

                                        <p className="text-sm text-zinc-400 mt-1">
                                            Fuel your next big idea with more credits.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={onClose}
                                    disabled={isProcessing}
                                    aria-label="Close"
                                    className="p-2 rounded-full text-zinc-500 hover:text-white hover:bg-white/[0.07] transition-colors disabled:opacity-50"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="relative p-6 sm:p-7 overflow-y-auto">
                                {error && (
                                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 shrink-0" />

                                        <p className="text-sm font-medium flex-1">
                                            {error}
                                        </p>

                                        {needsRetry && (
                                            <button
                                                onClick={finishPurchase}
                                                disabled={isProcessing}
                                                className="shrink-0 px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 disabled:opacity-60 flex items-center gap-2"
                                            >
                                                {isProcessing && (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                )}
                                                Retry
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Credit options */}
                                <div className="mb-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h3 className="text-sm font-semibold text-zinc-200">
                                                Choose your credits
                                            </h3>
                                            <p className="text-xs text-zinc-500 mt-1">
                                                One-time purchases. No subscription.
                                            </p>
                                        </div>

                                        <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">
                                            3 options
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {CREDIT_OPTIONS.map((option) => {
                                            const isPopular = option.popular;

                                            return (
                                                <div
                                                    key={option.id}
                                                    className={`relative rounded-xl border p-4 flex flex-col transition-all ${isPopular
                                                            ? "border-amber-400/50 bg-amber-400/[0.07] shadow-[0_0_25px_rgba(245,158,11,0.07)]"
                                                            : "border-white/[0.08] bg-white/[0.025] hover:bg-white/[0.05] hover:border-white/[0.15]"
                                                        }`}
                                                >
                                                    {isPopular && (
                                                        <div className="absolute -top-2.5 right-3 px-2.5 py-1 rounded-full bg-amber-400 text-zinc-950 text-[9px] font-extrabold uppercase tracking-wider">
                                                            Popular
                                                        </div>
                                                    )}

                                                    <span className={`text-xs font-semibold ${option.id === "starter"
                                                            ? "text-blue-400"
                                                            : option.id === "builder"
                                                                ? "text-amber-400"
                                                                : "text-purple-400"
                                                        }`}>
                                                        {option.label}
                                                    </span>

                                                    <div className="mt-4 mb-1">
                                                        <div className="flex items-baseline gap-1.5">
                                                            <span className="text-3xl font-bold text-white tracking-tight">
                                                                {option.credits}
                                                            </span>
                                                            <span className="text-xs text-zinc-500">
                                                                credits
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 mb-5">
                                                        <span className="text-lg font-semibold text-zinc-200">
                                                            ${option.price}
                                                        </span>

                                                        {option.originalPrice && (
                                                            <span className="text-xs text-zinc-500 line-through">
                                                                ${option.originalPrice}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="mt-auto">
                                                        <div className="h-px bg-white/[0.07] mb-3" />

                                                        <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-3">
                                                            <span>Price per credit</span>
                                                            <span className="text-zinc-400">
                                                                ${(option.price / option.credits).toFixed(3)}
                                                            </span>
                                                        </div>

                                                        <button
                                                            onClick={() =>
                                                                handleCheckout(
                                                                    option.id,
                                                                    option.price,
                                                                    option.credits
                                                                )
                                                            }
                                                            disabled={isProcessing}
                                                            className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-60 ${isPopular
                                                                    ? "bg-amber-400 hover:bg-amber-300 text-zinc-950"
                                                                    : "bg-white/[0.08] hover:bg-white/[0.13] text-zinc-200 border border-white/[0.06]"
                                                                }`}
                                                        >
                                                            {purchasingPlan === option.id ? (
                                                                <>
                                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                                    Processing
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Get credits
                                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Custom credits */}
                                {showCustomAmountSlider && (
                                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                                                    <SlidersHorizontal className="w-4 h-4" />
                                                </div>

                                                <div>
                                                    <h3 className="text-sm font-semibold text-zinc-200">
                                                        Custom amount
                                                    </h3>
                                                    <p className="text-xs text-zinc-500 mt-0.5">
                                                        Choose exactly how many credits you need.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 sm:text-right">
                                                <div>
                                                    <div className="text-2xl font-bold text-white">
                                                        <AnimatedNumber
                                                            value={customCredits}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                                                        Credits
                                                    </span>
                                                </div>

                                                <div className="w-px h-9 bg-white/10" />

                                                <div>
                                                    <div className="text-2xl font-bold text-indigo-300">
                                                        <AnimatedNumber
                                                            value={customPrice}
                                                            prefix="$"
                                                        />
                                                    </div>
                                                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                                                        Total
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <input
                                            type="range"
                                            min={CUSTOM_MIN_CREDITS}
                                            max={CUSTOM_MAX_CREDITS}
                                            step={CUSTOM_CREDIT_STEP}
                                            value={customCredits}
                                            onChange={(e) =>
                                                setCustomCredits(Number(e.target.value))
                                            }
                                            disabled={isProcessing}
                                            className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-400 disabled:opacity-50"
                                        />

                                        <div className="flex justify-between mt-2 text-[10px] text-zinc-500">
                                            <span>{CUSTOM_MIN_CREDITS} credits</span>
                                            <span>{CUSTOM_MAX_CREDITS} credits</span>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleCheckout(
                                                    "custom",
                                                    customPrice,
                                                    customCredits
                                                )
                                            }
                                            disabled={isProcessing}
                                            className="w-full mt-5 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                                        >
                                            {purchasingPlan === "custom" ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Purchase {customCredits} credits
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}

                                {/* Footer note */}
                                <div className="mt-5 flex items-start gap-2.5 px-1">
                                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />

                                    <p className="text-xs text-zinc-500 leading-relaxed">
                                        Your credits are shared across Reddit Analysis, Play Store Analysis, and Validate Idea. Use them whenever you need, wherever you need.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
