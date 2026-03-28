"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, AlertCircle } from "lucide-react";
import { getQuery, submitClarification } from "@/lib/api/reddit";
import { use } from "react";

export default function ClarifyPage({ params }) {
    const { query_id } = use(params);
    const router = useRouter();

    const [originalQuery, setOriginalQuery] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [clarificationCount, setClarificationCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const textareaRef = useRef(null);
    const canSubmit = answer.trim() && !submitting;

    useEffect(() => {
        const fetchQuery = async () => {
            try {
                const data = await getQuery(query_id);

                // any status other than CLARIFYING means we don't belong here
                if (data.status !== "CLARIFYING") {
                    router.replace(`/dashboard/reddit/query/${query_id}`);
                    return;
                }

                setOriginalQuery(data.query);
                setClarificationCount(data.clarification_count);

                const history = data.conversation_history || [];
                const lastAssistant = [...history].reverse().find((m) => m.role === "assistant");
                if (lastAssistant) setQuestion(lastAssistant.content);
            } catch (err) {
                setError("Failed to load query. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuery();
    }, [query_id]);

    useEffect(() => {
        if (!loading && textareaRef.current) textareaRef.current.focus();
    }, [loading, question]);

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (!canSubmit) return;
        setSubmitting(true);
        setError(null);
        try {
            const response = await submitClarification(query_id, answer);

            if (response.status === "CLARIFYING") {
                setQuestion(response.question);
                setClarificationCount(response.clarification_count);
                setAnswer("");
                return;
            }

            // CLARIFIED, FAILED, or anything else — go back to query page
            router.push(`/dashboard/reddit/query/${query_id}`);
        } catch (err) {
            setError(err.response?.data?.detail || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "var(--background)" }}>
                <div className="w-full max-w-xl space-y-4 animate-pulse">
                    <div className="h-4 rounded-lg w-1/3" style={{ backgroundColor: "var(--surface-raised)" }} />
                    <div className="h-12 rounded-xl w-full" style={{ backgroundColor: "var(--surface-raised)" }} />
                    <div className="h-24 rounded-xl w-full" style={{ backgroundColor: "var(--surface-raised)" }} />
                    <div className="h-10 rounded-xl w-full" style={{ backgroundColor: "var(--surface-raised)" }} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: "var(--background)" }}>
            <div className="w-full max-w-xl">

                {/* back */}
                <motion.button
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.push(`/dashboard/reddit/query/${query_id}`)}
                    className="flex items-center gap-2 mb-8 text-xs font-semibold uppercase tracking-widest transition-all"
                    style={{ color: "var(--text-subtle)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                </motion.button>

                {/* header */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ background: "var(--primary)" }}>
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <p className="text-[11px] font-mono uppercase tracking-widest mb-1" style={{ color: "var(--text-subtle)" }}>
                        Question {clarificationCount} of 5
                    </p>
                    <h1 className="text-2xl font-black tracking-tight" style={{ color: "var(--text-main)" }}>
                        A quick clarification
                    </h1>
                </motion.div>

                {/* original query */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="mb-6 px-4 py-3 rounded-xl border"
                    style={{ backgroundColor: "var(--surface-card)", borderColor: "var(--border-solid)" }}
                >
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: "var(--text-subtle)" }}>
                        Your query
                    </p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-main)" }}>
                        {originalQuery}
                    </p>
                </motion.div>

                {/* question + answer */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={question}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }}>

                                {/* agent question */}
                                <div className="px-5 pt-5 pb-3">
                                    <p className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
                                        Agent
                                    </p>
                                    <p className="text-sm leading-relaxed font-medium" style={{ color: "var(--text-main)" }}>
                                        {question}
                                    </p>
                                </div>

                                <div className="mx-5 border-t my-3" style={{ borderColor: "var(--border-solid)" }} />

                                {/* user answer */}
                                <div className="px-5 pb-4">
                                    <p className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-subtle)" }}>
                                        Your answer
                                    </p>
                                    <textarea
                                        ref={textareaRef}
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        rows={3}
                                        placeholder="Type your answer..."
                                        className="w-full bg-transparent outline-none resize-none text-sm leading-relaxed"
                                        style={{ color: "var(--text-main)" }}
                                    />
                                </div>

                                {/* footer */}
                                <div
                                    className="flex items-center justify-between px-5 py-3 border-t"
                                    style={{ borderColor: "var(--border-solid)", backgroundColor: "var(--surface-card)" }}
                                >
                                    <span className="text-[10px] font-mono" style={{ color: "var(--text-subtle)" }}>
                                        {answer.length > 0 ? `${answer.length} chars` : "⌘↵ to continue"}
                                    </span>
                                    <button
                                        type="submit"
                                        disabled={!canSubmit}
                                        className="flex items-center gap-2 px-5 h-9 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all"
                                        style={{
                                            background: canSubmit ? "var(--primary)" : "var(--surface-raised)",
                                            color: canSubmit ? "#fff" : "var(--text-subtle)",
                                            cursor: canSubmit ? "pointer" : "not-allowed",
                                        }}
                                    >
                                        {submitting ? "Thinking..." : <> Continue <ArrowRight className="w-3 h-3" /> </>}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </AnimatePresence>

                {/* error */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-4 p-4 rounded-xl border flex items-start gap-3"
                            style={{ backgroundColor: "var(--destructive-bg)", borderColor: "var(--destructive)" }}
                        >
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--destructive)" }} />
                            <p className="text-sm font-semibold" style={{ color: "var(--destructive)" }}>
                                {error}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}