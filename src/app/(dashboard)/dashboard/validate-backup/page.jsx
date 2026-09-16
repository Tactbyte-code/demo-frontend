"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    FaLightbulb,
    FaChartLine,
    FaShieldAlt,
    FaCogs,
    FaCoins,
    FaExpandArrowsAlt,
    FaExclamationTriangle,
    FaArrowLeft,
    FaRedo,
    FaCheckCircle,
    FaSpinner,
    FaBullseye,
    FaCompass,
    FaChevronDown,
} from "react-icons/fa"
import { createQuery } from "@/features/validate/api/validate.api"

const PARAM_ICONS = {
    market_potential: FaChartLine,
    problem_solution_fit: FaLightbulb,
    differentiation: FaExpandArrowsAlt,
    feasibility: FaCogs,
    monetization: FaCoins,
    scalability: FaExpandArrowsAlt,
    risk: FaShieldAlt,
}

const EVALUATION_STEPS = [
    "Synthesizing market taxonomy and sizing TAM/SAM...",
    "Evaluating problem urgency and wedge defensibility...",
    "Benchmarking technical architecture and implementation cost...",
    "Auditing margin dynamics, CAC/LTV models, and monetization...",
    "Stress-testing competitive barriers and platform dependencies...",
    "Synthesizing institutional investment score...",
]

const ScoreRing = ({ score }) => {
    const radius = 54
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference
    const tone =
        score >= 70 ? "text-emerald-600" : score >= 40 ? "text-amber-500" : "text-rose-500"

    return (
        <div className="relative w-50 h-42 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    className="stroke-slate-200"
                    strokeWidth="10"
                    fill="none"
                />
                <motion.circle
                    cx="64"
                    cy="64"
                    r={radius}
                    className={tone}
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-slate-900">{score}</span>
                <span className="text-[11px] text-slate-500 font-semibold tracking-wider">INDEX / 100</span>
            </div>
        </div>
    )
}

// Collapsible Dropdown Parameter Card
const ParameterDropdownCard = ({ param, index, isOpen, onToggle }) => {
    const Icon = PARAM_ICONS[param.key] ?? FaLightbulb

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            className="self-start w-full border border-slate-200 bg-white hover:border-slate-300 rounded-xl overflow-hidden shadow-sm transition-all"
        >
            {/* Header Trigger */}
            <button
                type="button"
                onClick={onToggle}
                className="w-full p-4 text-left flex flex-col gap-2.5 focus:outline-none"
            >
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                            <Icon className="text-sm" />
                        </div>
                        <span className="text-sm font-semibold text-slate-900 tracking-wide">
                            {param.label}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-800">
                            {param.score}%
                        </span>
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-slate-400 text-xs"
                        >
                            <FaChevronDown />
                        </motion.div>
                    </div>
                </div>

                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-indigo-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${param.score}%` }}
                        transition={{ duration: 0.8, delay: 0.1 * index }}
                    />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed text-left">
                    {param.insight}
                </p>
            </button>

            {/* Dropdown Content */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-slate-100 bg-slate-50/80 px-4 py-3.5"
                    >
                        <div className="space-y-2 mb-3">
                            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                                Parameter Metrics Breakdown
                            </span>
                            {param.breakdown.map((item, bIdx) => (
                                <div
                                    key={bIdx}
                                    className="flex items-center justify-between text-xs py-1 border-b border-slate-200/50 last:border-0"
                                >
                                    <span className="text-slate-600">{item.label}</span>
                                    <span className="font-semibold text-slate-800 text-right">{item.val}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 border-t border-slate-200/60">
                            <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider block mb-1">
                                Strategic Takeaway
                            </span>
                            <p className="text-xs text-slate-700 leading-relaxed">
                                {param.recommendation}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

const ValidateIdeaPage = () => {
    const [stage, setStage] = useState("form") // "form" | "analyzing" | "result"
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [openDropdowns, setOpenDropdowns] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [validationResult, setValidationResult] = useState(null)

    const [form, setForm] = useState({
        title: "",
        description: "",
        industry: "",
        stage: "concept",
    })

    const canSubmit = form.title.trim().length > 0 && form.description.trim().length >= 20

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit || loading) return;

        setLoading(true);
        setError(null);

        const payload = {
            title: form.title,
            description: form.description,
            industry: form.industry,
            stage: form.stage,
            profile: {}, // Optional custom metadata or user context if required
        };

        try {
            const data = await createQuery(payload);

            console.log('Query created successfully: ', data);
            setValidationResult(data);
            setStage("analyzing");
            setCurrentStepIndex(0);

        } catch (err) {
            setError(err.response?.data?.detail || err.message || 'Failed to submit validation query');
            console.error('Submission error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Progression timer for the live evaluation animation
    useEffect(() => {
        if (stage !== "analyzing") return

        const interval = setInterval(() => {
            setCurrentStepIndex((prev) => {
                if (prev < EVALUATION_STEPS.length - 1) {
                    return prev + 1
                } else {
                    clearInterval(interval)
                    setTimeout(() => setStage("result"), 500)
                    return prev
                }
            })
        }, 600)

        return () => clearInterval(interval)
    }, [stage])

    const handleReset = () => {
        setStage("form")
        setOpenDropdowns({})
        setValidationResult(null)
    }

    const toggleDropdown = (key) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [key]: !prev[key],
        }))
    }

    return (
        <div className="min-h-[91vh] flex flex-col items-center px-4 py-8 md:py-12 bg-slate-50 text-slate-900">
            <AnimatePresence mode="wait">
                {/* ---------- FORM STAGE ---------- */}
                {stage === "form" && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        className="w-full max-w-xl"
                    >
                        <div className="text-center mb-8">
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4 text-indigo-600 text-xl shadow-sm">
                                <FaLightbulb />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
                                Validate Your Venture Idea
                            </h1>
                            <p className="text-slate-500 text-sm max-w-md mx-auto">
                                Evaluate your concept across market sizing, defensibility,
                                risk distribution, and investment viability parameters.
                            </p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="border border-slate-200 bg-white rounded-2xl p-6 shadow-sm space-y-4"
                        >
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Venture / Feature Title
                                </label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="e.g. AI-powered clinical documentation pipeline"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Idea Description & Mechanics
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({ ...form, description: e.target.value })
                                    }
                                    rows={4}
                                    placeholder="What pain point does it solve? Who pays for it? How does the product create defensibility?"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                />
                                <span className="text-xs text-slate-500 mt-1 block">
                                    {form.description.length < 20
                                        ? `Requires ${20 - form.description.length} more characters`
                                        : "Ready for quantitative scoring"}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Sector / Industry
                                    </label>
                                    <input
                                        type="text"
                                        value={form.industry}
                                        onChange={(e) =>
                                            setForm({ ...form, industry: e.target.value })
                                        }
                                        placeholder="e.g. Enterprise SaaS"
                                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Maturity Stage
                                    </label>
                                    <select
                                        value={form.stage}
                                        onChange={(e) =>
                                            setForm({ ...form, stage: e.target.value })
                                        }
                                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    >
                                        <option value="concept">Concept / Hypothesis</option>
                                        <option value="prototype">Working Alpha / Prototype</option>
                                        <option value="live">In-Market with Pilot Traction</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!canSubmit || loading}
                                className="w-full mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 text-sm tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2"
                            >
                                {loading && <FaSpinner className="animate-spin text-sm" />}
                                {loading ? "Submitting Query..." : "Run Institutional Validation"}
                            </button>
                        </form>
                    </motion.div>
                )}

                {/* ---------- ANALYZING / PARAMETER CHECK STAGE ---------- */}
                {stage === "analyzing" && (
                    <motion.div
                        key="analyzing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-lg flex flex-col items-center py-10"
                    >
                        <div className="relative mb-6">
                            <div className="absolute inset-0 blur-2xl opacity-20 bg-indigo-500 rounded-full animate-pulse" />
                            <div className="relative w-16 h-16 rounded-full border border-slate-200 bg-white flex items-center justify-center text-indigo-600 text-2xl shadow-sm">
                                <FaSpinner className="animate-spin" />
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 mb-1 text-center">
                            Validating Business Parameters
                        </h2>
                        <p className="text-slate-500 text-xs text-center mb-8 max-w-sm">
                            Running dynamic inference against real-time venture scoring frameworks.
                        </p>

                        <div className="w-full border border-slate-200 bg-white rounded-2xl p-5 space-y-3.5 shadow-sm">
                            {EVALUATION_STEPS.map((step, idx) => {
                                const isDone = idx < currentStepIndex
                                const isCurrent = idx === currentStepIndex
                                return (
                                    <div
                                        key={idx}
                                        className={`flex items-center gap-3 transition-opacity duration-300 ${idx > currentStepIndex ? "opacity-35" : "opacity-100"
                                            }`}
                                    >
                                        {isDone ? (
                                            <FaCheckCircle className="text-emerald-600 text-sm flex-shrink-0" />
                                        ) : isCurrent ? (
                                            <FaSpinner className="animate-spin text-indigo-600 text-sm flex-shrink-0" />
                                        ) : (
                                            <div className="w-3.5 h-3.5 rounded-full border border-slate-300 flex-shrink-0" />
                                        )}
                                        <span
                                            className={`text-xs ${isCurrent
                                                ? "font-semibold text-slate-900"
                                                : "text-slate-500"
                                                }`}
                                        >
                                            {step}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}

                {/* ---------- RESULT DASHBOARD STAGE ---------- */}
                {stage === "result" && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-4xl"
                    >
                        {/* Top Controls */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
                            >
                                <FaArrowLeft className="text-xs" /> Edit Idea Inputs
                            </button>
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 uppercase tracking-wider">
                                Query ID: {validationResult?.id || "Processed"}
                            </span>
                        </div>

                        {/* Executive Score Card */}
                        <div className="border border-slate-200 bg-white rounded-2xl p-6 mb-6 shadow-sm">
                            <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
                                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                                    <ScoreRing score={84} />
                                    <div>
                                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                            <FaBullseye className="text-indigo-600 text-sm" />
                                            <span className="text-xs uppercase tracking-wider font-bold text-indigo-600">
                                                Feasibility & Fit Rating
                                            </span>
                                        </div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                                            High Investment Potential
                                        </h1>
                                        <p className="text-slate-500 text-sm mt-1 max-w-md font-medium">
                                            {form.title}
                                        </p>
                                    </div>
                                </div>

                                {/* Metric Highlights */}
                                <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
                                    {[
                                        { label: "Target Segment TAM", value: "$4.2B", trend: "+18% YoY" },
                                        { label: "Projected Moat Defensibility", value: "Medium-High", trend: "IP-backed" },
                                        { label: "Est. Time to MVP", value: "8-12 Wks", trend: "Lean" },
                                    ].map((m, i) => (
                                        <div
                                            key={i}
                                            className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-center min-w-[95px]"
                                        >
                                            <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-medium">
                                                {m.label}
                                            </span>
                                            <span className="text-sm font-bold text-slate-900 block my-0.5">
                                                {m.value}
                                            </span>
                                            <span className="text-[10px] text-emerald-600 font-semibold">
                                                {m.trend}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p className="mt-6 text-xs text-slate-600 border-t border-slate-100 pt-4 leading-relaxed">
                                <strong className="text-slate-900 font-semibold">Executive Digest:</strong>{" "}
                                The model demonstrates strong market-tail chemistry, clear unit-level margins, and manageable tech hurdles. Immediate focus should prioritize early defensibility and reducing initial user acquisition drag.
                            </p>
                        </div>

                        {/* Parameter Dropdown Section */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <FaCompass className="text-indigo-600 text-xs" /> Parameter Breakdown & Analysis
                                </h2>
                                <span className="text-[11px] text-slate-500 font-medium">
                                    Click any parameter to expand details
                                </span>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3.5 items-start">
                                {[
                                    {
                                        key: "market_potential",
                                        label: "Market Potential & TAM",
                                        score: 88,
                                        insight: "Large expanding TAM with aggressive tailwinds and underserved wedge niches.",
                                        breakdown: [
                                            { label: "Addressable Wedge TAM", val: "$4.2B (US & EU Mid-Market)" },
                                            { label: "Growth Vector (CAGR)", val: "22.4% through 2029" },
                                            { label: "Demand Urgency", val: "High (Compliance & efficiency mandate)" },
                                        ],
                                        recommendation: "Focus first on Series B/C scale companies where documentation fragmentation is highest.",
                                    },
                                    {
                                        key: "problem_solution_fit",
                                        label: "Problem-Solution Fit",
                                        score: 86,
                                        insight: "Addresses acute recurring user bottlenecks with high day-to-day retention pull.",
                                        breakdown: [
                                            { label: "Pain Severity", val: "Critical (8.5/10 on daily workflow)" },
                                            { label: "Switching Inertia", val: "Low-to-Medium with native integrations" },
                                            { label: "Time-to-Value", val: "Under 15 minutes via zero-code connect" },
                                        ],
                                        recommendation: "Embed direct feedback triggers to capture audit trail inaccuracies in real time.",
                                    },
                                    {
                                        key: "monetization",
                                        label: "Monetization & Margins",
                                        score: 82,
                                        insight: "Strong software gross margins (>75%) with clear tiered SaaS subscription expansion.",
                                        breakdown: [
                                            { label: "Target ACV", val: "$18,000 - $35,000 / year" },
                                            { label: "Projected Gross Margin", val: "78% post-token & infrastructure cost" },
                                            { label: "Expansion Lever", val: "Usage volume & connected data repository seats" },
                                        ],
                                        recommendation: "Introduce milestone-based usage tiers rather than strict per-seat restrictions.",
                                    },
                                    {
                                        key: "scalability",
                                        label: "Scalability & CAC/LTV",
                                        score: 85,
                                        insight: "High programmatic distribution upside with strong viral and flywheel mechanics.",
                                        breakdown: [
                                            { label: "CAC Payback Horizon", val: "Est. 6-8 months" },
                                            { label: "LTV / CAC Multiple", val: "4.2x projected at maturity" },
                                            { label: "Distribution Flywheel", val: "Product-led team invites via Slack bot" },
                                        ],
                                        recommendation: "Leverage Slack App Directory and Notion integrations as primary inbound funnels.",
                                    },
                                ].map((p, i) => (
                                    <ParameterDropdownCard
                                        key={p.key}
                                        param={p}
                                        index={i}
                                        isOpen={Boolean(openDropdowns[p.key])}
                                        onToggle={() => toggleDropdown(p.key)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Reset CTA */}
                        <button
                            onClick={handleReset}
                            className="w-full rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold py-3.5 text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                            <FaRedo className="text-xs" /> Validate Another Hypothesis
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
};

export default ValidateIdeaPage;