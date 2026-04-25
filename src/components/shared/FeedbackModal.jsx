"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare,
    X,
    CheckCircle2,
    Zap,
    Smartphone,
    Puzzle,
    BarChart3,
    BookOpen,
    HeadphonesIcon,
} from "lucide-react";

const FEATURES = [
    { id: "performance", label: "Faster performance", icon: Zap },
    { id: "mobile", label: "Smooth user experience", icon: Smartphone },
    { id: "integrations", label: "Accurate results", icon: Puzzle },
    { id: "reporting", label: "Improved reporting", icon: BarChart3 },
    { id: "onboarding", label: "Better onboarding", icon: BookOpen },
    { id: "support", label: "24/7 support", icon: HeadphonesIcon },
];

export default function FeedbackModal() {
    const [open, setOpen] = useState(false);
    const [score, setScore] = useState(null);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [otherFeedback, setOtherFeedback] = useState("");
    const [comments, setComments] = useState("");
    const [email, setEmail] = useState("");

    const toggleFeature = (id) => {
        setSelectedFeatures((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const handleSubmit = () => {
        console.log({
            score,
            selectedFeatures,
            otherFeedback,
            comments,
            email,
        });

        setOpen(false);

        setScore(null);
        setSelectedFeatures([]);
        setOtherFeedback("");
        setComments("");
        setEmail("");
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setOpen(true)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-[70] flex items-center gap-2 px-5 py-3 shadow-2xl"
                style={{
                    background:
                        "linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 75%, white))",
                    color: "white",
                    borderRadius: "999px",
                }}
            >
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm font-semibold hidden sm:block">
                    Submit Feedback
                </span>
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6"
                        >
                            <div
                                className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-none"
                                style={{
                                    backgroundColor: "var(--surface)",
                                    border: "1px solid var(--border)",
                                }}
                            >
                                {/* Header */}
                                <div
                                    className="sticky top-0 flex items-center justify-between px-6 py-5"
                                    style={{
                                        backgroundColor: "var(--surface)",
                                        borderBottom: "1px solid var(--border)",
                                    }}
                                >
                                    <div>
                                        <p
                                            className="text-xs font-semibold uppercase tracking-wider"
                                            style={{ color: "var(--primary)" }}
                                        >
                                            Customer Feedback
                                        </p>

                                        <h2
                                            className="text-xl font-bold mt-1"
                                            style={{
                                                color: "var(--text-main)",
                                            }}
                                        >
                                            Help us improve
                                        </h2>
                                    </div>

                                    <button onClick={() => setOpen(false)}>
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Score */}
                                    <div>
                                        <h3 className="font-semibold mb-4">
                                            How likely are you to recommend us for our services?
                                        </h3>

                                        <div className="grid grid-cols-11 gap-2">
                                            {Array.from(
                                                { length: 11 },
                                                (_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() =>
                                                            setScore(i)
                                                        }
                                                        className="h-10 rounded-none"
                                                        style={{
                                                            backgroundColor:
                                                                score === i
                                                                    ? "var(--primary)"
                                                                    : "var(--surface-card)",
                                                            color:
                                                                score === i
                                                                    ? "white"
                                                                    : "var(--text-main)",
                                                            border:
                                                                "1px solid var(--border)",
                                                        }}
                                                    >
                                                        {i}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div>
                                        <h3 className="font-semibold mb-4">
                                            What should we improve?
                                        </h3>

                                        <div className="grid md:grid-cols-2 gap-3">
                                            {FEATURES.map(
                                                ({
                                                    id,
                                                    label,
                                                    icon: Icon,
                                                }) => {
                                                    const selected =
                                                        selectedFeatures.includes(
                                                            id
                                                        );

                                                    return (
                                                        <button
                                                            key={id}
                                                            onClick={() =>
                                                                toggleFeature(
                                                                    id
                                                                )
                                                            }
                                                            className="flex items-center justify-between p-3 rounded-none"
                                                            style={{
                                                                backgroundColor:
                                                                    selected
                                                                        ? "var(--success-bg)"
                                                                        : "var(--surface-card)",
                                                                border: selected
                                                                    ? "1px solid var(--primary)"
                                                                    : "1px solid var(--border)",
                                                            }}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <Icon className="w-4 h-4" />
                                                                <span className="text-sm">
                                                                    {label}
                                                                </span>
                                                            </div>

                                                            {selected && (
                                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                            )}
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>

                                    

                                    {/* Comments */}
                                    <textarea
                                        value={comments}
                                        onChange={(e) =>
                                            setComments(e.target.value)
                                        }
                                        placeholder="Additional comments..."
                                        className="w-full h-28 p-4 rounded-none resize-none outline-none"
                                        style={{
                                            backgroundColor:
                                                "var(--input-background)",
                                            border:
                                                "1px solid var(--border-input)",
                                        }}
                                    />

                                    {/* Email */}
                                    <input
                                        type="email"
                                        placeholder="Email (optional)"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="w-full h-12 px-4 rounded-none outline-none"
                                        style={{
                                            backgroundColor:
                                                "var(--input-background)",
                                            border:
                                                "1px solid var(--border-input)",
                                        }}
                                    />

                                    {/* Submit */}
                                    <button
                                        onClick={handleSubmit}
                                        disabled={score === null || !selectedFeatures}
                                        className="w-full h-12 rounded-none font-semibold"
                                        style={{
                                            backgroundColor:
                                                score === null
                                                    ? "var(--border)"
                                                    : "var(--primary)",
                                            color: "white",
                                        }}
                                    >
                                        Submit Feedback
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}