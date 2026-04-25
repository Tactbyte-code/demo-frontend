"use client";

import { useState } from "react";
import {
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

function getScoreType(score) {
    if (score <= 6) return "detractor";
    if (score <= 8) return "passive";
    return "promoter";
}

export default function FeedbackPage() {
    const [score, setScore] = useState(null);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [otherFeedback, setOtherFeedback] = useState("");
    const [comments, setComments] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const toggleFeature = (id) => {
        setSelectedFeatures((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const handleSubmit = () => {
        if (score === null) return;

        console.log({
            score,
            selectedFeatures,
            otherFeedback,
            comments,
            email,
        });

        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div
                className="min-h-screen flex items-center justify-center px-4 pt-28"
                style={{ backgroundColor: "var(--background)" }}
            >
                <div
                    className="w-full max-w-md p-8 text-center"
                    style={{
                        backgroundColor: "var(--surface)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow)",
                    }}
                >
                    <div
                        className="w-16 h-16 mx-auto flex items-center justify-center mb-5"
                        style={{ backgroundColor: "var(--success-bg)" }}
                    >
                        <CheckCircle2
                            className="w-8 h-8"
                            style={{ color: "var(--success)" }}
                        />
                    </div>

                    <h2
                        className="text-2xl font-semibold"
                        style={{ color: "var(--text-main)" }}
                    >
                        Thank You!
                    </h2>

                    <p
                        className="text-sm mt-2"
                        style={{ color: "var(--text-muted)" }}
                    >
                        Your feedback helps us improve our platform experience.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen px-4 py-10 pt-28"
            style={{ backgroundColor: "var(--background)" }}
        >
            <div className="w-full max-w-2xl mx-auto space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <p
                        className="text-sm font-medium uppercase tracking-wider"
                        style={{ color: "var(--primary)" }}
                    >
                        Customer Feedback
                    </p>

                    <h1
                        className="text-3xl font-bold"
                        style={{ color: "var(--text-main)" }}
                    >
                        Help us improve
                    </h1>

                    <p
                        className="text-sm"
                        style={{ color: "var(--text-muted)" }}
                    >
                        Your feedback helps us build a better experience.
                    </p>
                </div>

                {/* Score Section */}
                <div
                    className="p-6"
                    style={{
                        backgroundColor: "var(--surface)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-sm)",
                    }}
                >
                    <h2
                        className="text-lg font-semibold mb-5"
                        style={{ color: "var(--text-main)" }}
                    >
                        How likely are you to recommend us?
                    </h2>

                    <div className="grid grid-cols-11 gap-2">
                        {Array.from({ length: 11 }, (_, i) => {
                            const active = score === i;

                            let bg = "var(--surface-card)";
                            let color = "var(--text-main)";

                            if (active) {
                                if (i <= 6) {
                                    bg = "var(--destructive)";
                                    color = "white";
                                } else if (i <= 8) {
                                    bg = "var(--warning)";
                                    color = "white";
                                } else {
                                    bg = "var(--success)";
                                    color = "white";
                                }
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => setScore(i)}
                                    className="h-11 font-medium"
                                    style={{
                                        backgroundColor: bg,
                                        color,
                                        border: "1px solid var(--border)",
                                    }}
                                >
                                    {i}
                                </button>
                            );
                        })}
                    </div>

                    <div
                        className="flex justify-between mt-3 text-xs"
                        style={{ color: "var(--text-subtle)" }}
                    >
                        <span>Not likely</span>
                        <span>Very likely</span>
                    </div>
                </div>

                {/* Features Section */}
                <div
                    className="p-6"
                    style={{
                        backgroundColor: "var(--surface)",
                        border: "1px solid var(--border)",
                    }}
                >
                    <h2
                        className="text-lg font-semibold mb-4"
                        style={{ color: "var(--text-main)" }}
                    >
                        What should we improve?
                    </h2>

                    <div className="grid grid-cols-2 gap-3">
                        {FEATURES.map(({ id, label, icon: Icon }) => {
                            const selected = selectedFeatures.includes(id);

                            return (
                                <button
                                    key={id}
                                    onClick={() => toggleFeature(id)}
                                    className="flex items-center justify-between p-3 text-left font-medium"
                                    style={{
                                        backgroundColor: selected
                                            ? "var(--success-bg)"
                                            : "var(--surface-card)",
                                        border: selected
                                            ? "1px solid var(--primary)"
                                            : "1px solid var(--border)",
                                        color: selected
                                            ? "var(--success)"
                                            : "var(--text-main)",
                                    }}
                                >
                                    {/* Left Content */}
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm">{label}</span>
                                    </div>

                                    {/* Selected Check Icon */}
                                    {selected && (
                                        <div
                                            className="w-6 h-6 flex items-center justify-center"
                                            style={{
                                                backgroundColor: "var(--success)",
                                                borderRadius: "999px",
                                            }}
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}

                        {/* Others Input */}
                        <div className="col-span-2 mt-2">
                            <label
                                className="block text-sm mb-2"
                                style={{ color: "var(--text-muted)" }}
                            >
                                Others
                            </label>

                            <input
                                type="text"
                                value={otherFeedback}
                                onChange={(e) => setOtherFeedback(e.target.value)}
                                placeholder="Tell us what else you'd like improved..."
                                className="w-full h-12 px-4 outline-none"
                                style={{
                                    backgroundColor: "var(--input-background)",
                                    border: "1px solid var(--border-input)",
                                    color: "var(--text-main)",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Comments */}
                <div
                    className="p-6 space-y-4"
                    style={{
                        backgroundColor: "var(--surface)",
                        border: "1px solid var(--border)",
                    }}
                >
                    <div>
                        <label
                            className="block text-sm mb-2"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Additional Comments
                        </label>

                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Tell us more about your experience..."
                            className="w-full h-28 p-4 outline-none resize-none"
                            style={{
                                backgroundColor: "var(--input-background)",
                                border: "1px solid var(--border-input)",
                                color: "var(--text-main)",
                            }}
                        />
                    </div>

                    <div>
                        <label
                            className="block text-sm mb-2"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Email (Optional)
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full h-12 px-4 outline-none"
                            style={{
                                backgroundColor: "var(--input-background)",
                                border: "1px solid var(--border-input)",
                                color: "var(--text-main)",
                            }}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={score === null}
                    className="w-full h-12 font-medium"
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
    );
}