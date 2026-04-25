"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare, X, CheckCircle2, Zap, Smartphone,
    Clock, BarChart3, BookOpen, Headphones, Check,
} from "lucide-react";
import { resolve } from "styled-jsx/css";
import axios from "axios";

const FEATURES = [
    { id: "performance", label: "Faster performance", icon: Zap },
    { id: "mobile", label: "Smoother experience", icon: Smartphone },
    { id: "accuracy", label: "Accurate results", icon: Clock },
    { id: "reporting", label: "Better reporting", icon: BarChart3 },
    { id: "onboarding", label: "Easier onboarding", icon: BookOpen },
    { id: "support", label: "24/7 support", icon: Headphones },
];

export default function FeedbackModal() {

    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [comments, setComments] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const toggleFeature = (id) =>
        setSelectedFeatures((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );

    const handleOpen = () => {
        setSubmitted(false);
        setScore(null);
        setSelectedFeatures([]);
        setComments("");
        setEmail("");
        setOpen(true);
    };

    const handleSubmit = async () => {
        if (score === null) return;
        if (selectedFeatures.length === 0) return;
        if (!email) {
            console.log("Email is required");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    score: score,
                    selected_features: selectedFeatures,
                    comments: comments || null,
                    email: email,
                }),
            });

            if (response?.ok) {
                setSubmitted(true);
            } else {
                const error = await response.json();
                console.error("Feedback error: ", error.detail);
            }

        } catch (err) {
            console.log('feedback error: ', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* FAB */}
            <motion.button
                onClick={handleOpen}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="fixed bottom-6 right-6 z-[70] flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium"
                style={{
                    background: "var(--primary)",
                    color: "var(--text-light)",
                    boxShadow: "var(--shadow-md)",
                }}
            >
                <MessageSquare className="w-4 h-4" />
                Share feedback
            </motion.button>

            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, y: 16, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed inset-0 z-[90] flex items-center justify-center px-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className="w-full max-w-lg overflow-hidden"
                                style={{
                                    background: "var(--surface)",
                                    border: "1px solid var(--border)",
                                    // borderRadius: "var(--radius)",
                                    boxShadow: "var(--shadow-lg)",
                                }}
                            >
                                <AnimatePresence mode="wait">
                                    {submitted ? (
                                        /* ── Success State ── */
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center gap-4 px-8 py-14 text-center"
                                        >
                                            <div
                                                className="flex items-center justify-center w-12 h-12 rounded-full"
                                                style={{
                                                    background: "var(--success-bg)",
                                                    border: "1px solid var(--success)",
                                                }}
                                            >
                                                <Check className="w-5 h-5" style={{ color: "var(--success)" }} />
                                            </div>
                                            <div>
                                                <h2
                                                    className="text-xl font-semibold mb-1"
                                                    style={{ color: "var(--text-main)" }}
                                                >
                                                    Thank you!
                                                </h2>
                                                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                                                    Your feedback helps us build something people actually love.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setOpen(false)}
                                                className="mt-1 text-sm px-5 py-2 font-medium transition-colors"
                                                style={{
                                                    background: "var(--surface-card)",
                                                    border: "1px solid var(--border)",
                                                    // borderRadius: "var(--radius-md)",
                                                    color: "var(--text-muted)",
                                                }}
                                            >
                                                Close
                                            </button>
                                        </motion.div>
                                    ) : (
                                        /* ── Form ── */
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            {/* Header */}
                                            <div
                                                className="flex items-start justify-between px-6 py-5"
                                                style={{ borderBottom: "1px solid var(--border)" }}
                                            >
                                                <div>
                                                    <p
                                                        className="text-xs font-semibold uppercase tracking-wider mb-1"
                                                        style={{ color: "var(--text-subtle)" }}
                                                    >
                                                        Your Feedback Matters
                                                    </p>
                                                    <h2
                                                        className="text-xl font-semibold"
                                                        style={{ color: "var(--text-main)" }}
                                                    >
                                                        Help us do better
                                                    </h2>
                                                </div>
                                                <button
                                                    onClick={() => setOpen(false)}
                                                    className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                                                    style={{
                                                        border: "1px solid var(--border)",
                                                        color: "var(--text-subtle)",
                                                        background: "transparent",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = "var(--surface-card)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = "transparent";
                                                    }}
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            <div className="px-6 py-5 space-y-6">
                                                {/* NPS Score */}
                                                <div>
                                                    <p
                                                        className="text-xs font-semibold uppercase tracking-wider mb-3"
                                                        style={{ color: "var(--text-subtle)" }}
                                                    >
                                                        Likelihood to recommend
                                                    </p>

                                                    {/* SCORE BUTTONS */}
                                                    <div className="flex gap-1.5">
                                                        {Array.from({ length: 11 }, (_, i) => {
                                                            // Color gradient from red → yellow → green
                                                            const getColor = (score) => {
                                                                if (score <= 3) return "#ef4444";       // red
                                                                if (score <= 6) return "#f59e0b";       // amber
                                                                if (score <= 8) return "#84cc16";       // light green
                                                                return "#22c55e";                       // green
                                                            };

                                                            return (
                                                                <button
                                                                    key={i}
                                                                    onClick={() => setScore(i)}
                                                                    className="flex-1 h-10 text-sm font-bold transition-all rounded-md"
                                                                    style={{
                                                                        background:
                                                                            score === i
                                                                                ? getColor(i)
                                                                                : "var(--surface-card)",
                                                                        color: score === i ? "#fff" : "var(--text-muted)",
                                                                        border:
                                                                            score === i
                                                                                ? `1px solid ${getColor(i)}`
                                                                                : "1px solid var(--border)",
                                                                        transform: score === i ? "scale(1.05)" : "scale(1)",
                                                                    }}
                                                                >
                                                                    {i}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* SENTIMENT FEEDBACK */}
                                                    {score !== null && (
                                                        <div className="mt-4 text-center">
                                                            <p className="text-sm font-semibold">
                                                                {score <= 3 && "😡 Very Unlikely"}
                                                                {score >= 4 && score <= 6 && "😕 Unlikely"}
                                                                {score >= 7 && score <= 8 && "🙂 Likely"}
                                                                {score >= 9 && "🤩 Highly Likely"}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Features */}
                                                <div>
                                                    <p
                                                        className="text-xs font-semibold uppercase tracking-wider mb-3"
                                                        style={{ color: "var(--text-subtle)" }}
                                                    >
                                                        What needs improvement?
                                                    </p>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {FEATURES.map(({ id, label, icon: Icon }) => {
                                                            const selected = selectedFeatures.includes(id);
                                                            return (
                                                                <button
                                                                    key={id}
                                                                    onClick={() => toggleFeature(id)}
                                                                    className="flex items-center gap-2.5 px-3 py-2.5 text-left transition-all"
                                                                    style={{
                                                                        background: selected ? "var(--info-bg)" : "var(--surface-card)",
                                                                        border: selected
                                                                            ? "1px solid var(--primary)"
                                                                            : "1px solid var(--border)",
                                                                        // borderRadius: "var(--radius-md)",
                                                                    }}
                                                                >
                                                                    <div
                                                                        className="flex items-center justify-center w-7 h-7 flex-shrink-0"
                                                                        style={{
                                                                            background: selected ? "var(--primary)" : "var(--surface-raised)",
                                                                            // borderRadius: "var(--radius-sm)",
                                                                        }}
                                                                    >
                                                                        <Icon
                                                                            className="w-3.5 h-3.5"
                                                                            style={{ color: selected ? "var(--text-light)" : "var(--secondary)" }}
                                                                        />
                                                                    </div>
                                                                    <span
                                                                        className="text-xs font-medium flex-1"
                                                                        style={{ color: selected ? "var(--primary)" : "var(--text-muted)" }}
                                                                    >
                                                                        {label}
                                                                    </span>
                                                                    {selected && (
                                                                        <CheckCircle2
                                                                            className="w-3.5 h-3.5 flex-shrink-0"
                                                                            style={{ color: "var(--primary)" }}
                                                                        />
                                                                    )}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Comments */}
                                                <div>
                                                    <p
                                                        className="text-xs font-semibold uppercase tracking-wider mb-3"
                                                        style={{ color: "var(--text-subtle)" }}
                                                    >
                                                        Anything else?
                                                    </p>
                                                    <textarea
                                                        value={comments}
                                                        onChange={(e) => setComments(e.target.value)}
                                                        placeholder="Tell us what's on your mind..."
                                                        className="w-full h-24 px-3.5 py-3 resize-none outline-none text-sm transition-colors"
                                                        style={{
                                                            background: "var(--input-background)",
                                                            border: "1px solid var(--border-input)",
                                                            // borderRadius: "var(--radius-md)",
                                                            color: "var(--text-main)",
                                                            fontFamily: "inherit",
                                                        }}
                                                        onFocus={(e) => {
                                                            e.currentTarget.style.borderColor = "var(--primary)";
                                                        }}
                                                        onBlur={(e) => {
                                                            e.currentTarget.style.borderColor = "var(--border-input)";
                                                        }}
                                                    />
                                                </div>

                                                {/* Email + Submit */}
                                                <div className="flex gap-2">
                                                    <input
                                                        type="email"
                                                        placeholder="your@email.com (optional)"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="flex-1 h-10 px-3.5 outline-none text-sm transition-colors"
                                                        style={{
                                                            background: "var(--input-background)",
                                                            border: "1px solid var(--border-input)",
                                                            // borderRadius: "var(--radius-md)",
                                                            color: "var(--text-main)",
                                                            fontFamily: "inherit",
                                                        }}
                                                        onFocus={(e) => {
                                                            e.currentTarget.style.borderColor = "var(--primary)";
                                                        }}
                                                        onBlur={(e) => {
                                                            e.currentTarget.style.borderColor = "var(--border-input)";
                                                        }}
                                                    />
                                                    <button
                                                        onClick={handleSubmit}
                                                        disabled={score === null || loading}
                                                        className="h-10 px-5 text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                                                        style={{
                                                            background: (score === null || loading) ? "var(--surface-raised)" : "var(--primary)",
                                                            color: (score === null || loading) ? "var(--text-subtle)" : "var(--text-light)",
                                                            // borderRadius: "var(--radius-md)",
                                                            border: "1px solid transparent",
                                                            cursor: (score === null || loading) ? "not-allowed" : "pointer",
                                                        }}
                                                    >
                                                        {loading ? (
                                                            <>
                                                                <svg
                                                                    className="animate-spin h-4 w-4"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                >
                                                                    <circle
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="10"
                                                                        stroke="currentColor"
                                                                        strokeWidth="3"
                                                                        opacity="0.25"
                                                                    />
                                                                    <path
                                                                        d="M22 12a10 10 0 00-10-10"
                                                                        stroke="currentColor"
                                                                        strokeWidth="3"
                                                                    />
                                                                </svg>
                                                                Sending...
                                                            </>
                                                        ) : (
                                                            "Send"
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}