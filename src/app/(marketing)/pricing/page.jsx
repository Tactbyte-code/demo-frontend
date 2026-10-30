"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Zap, ArrowRight, Loader2 } from "lucide-react";
import { plans } from "@/utils/data";
import { useRouter } from "next/navigation";
import { initiatePayment, preloadRazorpay } from "@/lib/razorpay";

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function PricingPage() {
    const [yearly, setYearly] = useState(false);
    const [user, setUser] = useState(null);
    const [hoveredPlan, setHoveredPlan] = useState(null);
    const [purchasingPlan, setPurchasingPlan] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false); // full-screen blocking spinner
    const [error, setError] = useState("");

    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        // Warm up Razorpay SDK and the dashboard route
        preloadRazorpay();
        router.prefetch("/dashboard");
    }, [router]);

    // Lock page scroll while the overlay is visible
    useEffect(() => {
        document.body.style.overflow = isProcessing ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isProcessing]);

    const handlePurchase = (plan) => {
        setError("");
        setPurchasingPlan(plan.id);

        initiatePayment({
            amount: 1900,
            userEmail: user?.email,
            userName: user?.full_name,
            onProcessing: () => setIsProcessing(true),
            onSuccess: () => {
                // Keep the overlay up; the page unmounts once navigation completes
                router.push("/dashboard");
            },
            onFailure: () => {
                setIsProcessing(false);
                setPurchasingPlan(null);
                setError("Payment failed or was cancelled. Please try again.");
            },
        });
    };

    return (
        <div
            className="min-h-screen relative overflow-hidden"
            style={{ backgroundColor: "var(--background)", color: "var(--text-main)" }}
        >
            {/* Blocking loader overlay */}
            <AnimatePresence>
                {isProcessing && (
                    <motion.div
                        key="processing-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md px-4"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", cursor: "wait" }}
                        role="alert"
                        aria-busy="true"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center justify-center p-8 pt-6 rounded-2xl shadow-2xl max-w-sm w-full border"
                            style={{
                                backgroundColor: "var(--surface)",
                                borderColor: "var(--border-solid)",
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            {/* Outer glowing container with increased vertical space */}
                            <div className="relative flex items-center justify-center my-6 py-2">
                                <div
                                    className="absolute w-20 h-20 rounded-full animate-ping opacity-20"
                                    style={{ backgroundColor: "var(--primary)" }}
                                />
                                <div
                                    className="relative w-14 h-14 rounded-full flex items-center justify-center border shadow-inner"
                                    style={{
                                        backgroundColor: "var(--surface-raised)",
                                        borderColor: "var(--border-solid)"
                                    }}
                                >
                                    <Loader2 className="w-7 h-7 animate-spin" style={{ color: "var(--primary)" }} />
                                </div>
                            </div>

                            <h3 className="text-lg font-bold tracking-tight mb-1 mt-6 text-center" style={{ color: "var(--text-main)" }}>
                                Confirming your payment
                            </h3>

                            <p className="text-xs font-medium text-center" style={{ color: "var(--text-muted)" }}>
                                Please wait while we secure your payment and update your credits. Do not close this window.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-15%] left-[10%] w-[600px] h-[600px] rounded-none blur-[160px] opacity-30"
                    style={{ backgroundColor: "var(--primary)" }} />
                <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-none blur-[140px] opacity-20"
                    style={{ backgroundColor: "var(--accent)" }} />
                <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-none blur-[120px] opacity-10"
                    style={{ backgroundColor: "var(--warning)" }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-35">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-black tracking-tight mb-5 leading-tight"
                        style={{ color: "var(--text-main)" }}>
                        Invest in your
                        <span className="italic" style={{ color: "var(--primary)" }}>
                            {" "} growth.
                        </span>
                    </h1>

                    <p className="text-lg font-medium max-w-3xl mx-auto leading-relaxed"
                        style={{ color: "var(--text-muted)" }}>
                        Start free, scale as you grow. No hidden fees, no surprises.
                        Cancel anytime.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mt-10">
                        <span className="text-sm font-bold" style={{ color: yearly ? "var(--text-subtle)" : "var(--text-main)" }}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setYearly(!yearly)}
                            className="relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none border border-border-input"
                            style={{ backgroundColor: yearly ? "var(--primary)" : "var(--surface-raised)" }}
                        >
                            <motion.div
                                className="absolute top-0.75 w-5 h-5 rounded-full shadow-md"
                                style={{ backgroundColor: "white" }}
                                animate={{ left: yearly ? "calc(100% - 24px)" : "4px" }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold" style={{ color: yearly ? "var(--text-main)" : "var(--text-subtle)" }}>
                                Yearly
                            </span>
                            <AnimatePresence>
                                {yearly && (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.8, x: -10 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, x: -10 }}
                                        className="text-[10px] font-black px-2 py-0.5 rounded-none uppercase tracking-widest"
                                        style={{ backgroundColor: "var(--success-bg)", color: "var(--success)" }}
                                    >
                                        Save 20%
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            variants={cardVariants}
                            onMouseEnter={() => setHoveredPlan(plan.id)}
                            onMouseLeave={() => setHoveredPlan(null)}
                            className="relative p-6 flex flex-col transition-all duration-300 cursor-pointer"
                            style={{
                                backgroundColor: "var(--surface)",
                                border: hoveredPlan === plan.id
                                    ? `1px solid ${plan.accent}`
                                    : plan.popular
                                        ? `1px solid ${plan.accent}`
                                        : "1px solid var(--border-solid)",
                                boxShadow: plan.popular
                                    ? "0 20px 60px rgba(0,229,255,0.08), 0 4px 20px rgba(0,0,0,0.1)"
                                    : hoveredPlan === plan.id
                                        ? "var(--shadow-lg)"
                                        : "var(--shadow-sm)",
                                transform: plan.popular ? "scale(1.02)" : "scale(1)",
                            }}
                        >
                            {/* Popular badge */}
                            {plan.popular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                    <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-none text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
                                        style={{ backgroundColor: "var(--accent)", color: "#000" }}>
                                        <Zap className="w-3 h-3 fill-current" />
                                        Best Value
                                    </div>
                                </div>
                            )}

                            {/* Plan tag */}
                            <div className="flex items-center justify-between mb-5">
                                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-none"
                                    style={{ backgroundColor: plan.accentBg, color: plan.accent }}>
                                    {plan.tag}
                                </span>
                            </div>

                            {/* Plan name */}
                            <h2 className="text-2xl font-black mb-1" style={{ color: "var(--text-main)" }}>
                                {plan.name}
                            </h2>

                            {/* Plan description */}
                            <p className="text-xs font-medium leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                                {plan.description}
                            </p>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-end gap-1">
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={yearly ? "yearly" : "monthly"}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-4xl font-black"
                                            style={{ color: "var(--text-main)" }}
                                        >
                                            {plan.monthlyPrice === 0
                                                ? "Free"
                                                : `$${yearly ? plan.yearlyPrice : plan.monthlyPrice}`}
                                        </motion.span>
                                    </AnimatePresence>
                                    {plan.monthlyPrice > 0 && (
                                        <span className="text-sm font-medium mb-1" style={{ color: "var(--text-subtle)" }}>
                                            / mo
                                        </span>
                                    )}
                                </div>
                                {yearly && plan.monthlyPrice > 0 && (
                                    <p className="text-[11px] font-semibold mt-1" style={{ color: "var(--text-subtle)" }}>
                                        Billed ${plan.yearlyPrice * 12}/year
                                    </p>
                                )}
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={() => handlePurchase(plan)}
                                disabled={purchasingPlan !== null || isProcessing}
                                className="w-full py-3.5 rounded-none font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] mb-6 disabled:opacity-70"
                                style={{
                                    backgroundColor: plan.popular ? "var(--accent)" : plan.monthlyPrice === 0 ? "var(--surface-raised)" : "var(--primary)",
                                    color: plan.popular ? "#000" : plan.monthlyPrice === 0 ? "var(--text-main)" : "#fff",
                                    border: plan.monthlyPrice === 0 ? "1px solid var(--border-solid)" : "none",
                                }}
                            >
                                {purchasingPlan === plan.id
                                    ? <Loader2 className="w-4 h-4 animate-spin" />
                                    : <>{plan.cta} <ArrowRight className="w-4 h-4" /></>
                                }
                            </button>

                            {/* Divider */}
                            <div className="w-full h-px mb-6" style={{ backgroundColor: "var(--border-solid)" }} />

                            {/* Features */}
                            <ul className="space-y-3 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-4 h-4 rounded-none flex items-center justify-center flex-shrink-0 mt-0.5"
                                            style={{
                                                backgroundColor: feature.included ? "var(--success-bg)" : "var(--surface-raised)",
                                            }}>
                                            {feature.included
                                                ? <Check className="w-2.5 h-2.5" style={{ color: "var(--success)" }} />
                                                : <X className="w-2.5 h-2.5" style={{ color: "var(--text-subtle)" }} />
                                            }
                                        </div>
                                        <span className="text-xs font-medium leading-relaxed"
                                            style={{ color: feature.included ? "var(--text-main)" : "var(--text-subtle)" }}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {error && (
                    <p className="text-center text-sm font-semibold mt-4"
                        style={{ color: "var(--destructive)" }}>
                        {error}
                    </p>
                )}

                {/* Bottom note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-center mt-16"
                >
                    <p className="text-sm font-medium" style={{ color: "var(--text-subtle)" }}>
                        All plans include a <span className="font-bold" style={{ color: "var(--text-main)" }}>14-day free trial</span>. No credit card required.
                    </p>
                </motion.div>
            </div>
        </div >
    );
}