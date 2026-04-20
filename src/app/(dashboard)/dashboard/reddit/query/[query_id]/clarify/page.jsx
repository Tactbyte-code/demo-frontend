"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ArrowLeft,
    Loader2,
    MessageSquare,
    Sparkles,
} from "lucide-react";
import { getQuery, submitClarification } from "@/lib/api/reddit";
import AILoader from "@/components/shared/AiLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSidebarStore } from "@/context/useSidebarStore";
import { useQueryClient } from "@tanstack/react-query";

export default function ClarifyPage({ params }) {

    const { query_id } = use(params);
    const router = useRouter();

    const [originalQuery, setOriginalQuery] = useState("");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [answer, setAnswer] = useState("");
    const [clarificationCount, setClarificationCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const textareaRef = useRef(null);

    const canSubmit = !submitting && (
        (selectedOption && selectedOption !== "others") ||
        (selectedOption === "others" && answer.trim())
    );

    const { setSidebarOpen } = useSidebarStore();
    const user_id = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user'))?.firebase_uid : null;
    const queryClient = useQueryClient();

    useEffect(() => {
        setSidebarOpen(false);
        return () => setSidebarOpen(true);
    }, []);

    useEffect(() => {
        const fetchQuery = async () => {
            try {
                const data = await getQuery(query_id);
                if (data?.status !== "CLARIFYING") {
                    router.replace(`/dashboard/reddit/query/${query_id}`);
                    return;
                }
                setOriginalQuery(data.query);
                setClarificationCount(data.clarification_count);
                const history = data.conversation_history || [];
                const lastAssistant = [...history].reverse().find((m) => m.role === "assistant");
                if (lastAssistant) {
                    setQuestion(lastAssistant.content);
                    setOptions(lastAssistant.options || []);
                }
            } catch (err) {
                setError("Failed to load query. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuery();
    }, [query_id, router]);

    useEffect(() => {
        if (showCustomInput && textareaRef.current) textareaRef.current.focus();
    }, [showCustomInput]);

    const handleOptionSelect = (opt) => {
        const isOthers = opt === "Others";
        setSelectedOption(isOthers ? "others" : opt);
        setShowCustomInput(isOthers);
        if (!isOthers) setAnswer("");
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (!canSubmit) return;
        setSubmitting(true);
        setError(null);

        const finalAnswer = selectedOption === "others" ? answer.trim() : selectedOption;

        try {
            const response = await submitClarification(query_id, finalAnswer);
            if (response) queryClient.invalidateQueries({ queryKey: ["queries", user_id] });

            if (response.status === "CLARIFYING") {
                setQuestion(response.question);
                setOptions(response.options || []);
                setSelectedOption(null);
                setShowCustomInput(false);
                setClarificationCount(response.clarification_count);
                setAnswer("");
                return;
            }
            router.push(`/dashboard/reddit/query/${query_id}`);
        } catch (err) {
            setError(err.response?.data?.detail || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6">
                <AILoader />
                <div className="text-center space-y-2">
                    <p className="text-sm font-medium">Intent clarification in progress</p>
                    <p className="text-xs text-muted-foreground">Asking a few quick questions</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center px-4 py-10">
            <div className="w-full max-w-2xl space-y-6">

                {/* Top */}
                <div className="flex justify-between items-center">
                    <Button variant="ghost" className="px-0" onClick={() => router.back()}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <span className="text-sm text-muted">Clarifying the intent</span>
                </div>

                {/* Original query */}
                <Card className="p-4 my-5 rounded-none gap-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                        <MessageSquare className="w-5 h-5" />
                        Your Query
                    </div>
                    <p className="text-sm font-medium leading-relaxed pl-7">{originalQuery}</p>
                </Card>

                {/* Question Card */}
                <CardContent
                    className="border overflow-hidden rounded-none p-3"
                    style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
                    }}
                >
                    <CardContent className="p-5 space-y-4">

                        {/* Header row */}
                        <div className="flex items-start justify-between gap-3 min-h-[40px]">
                            <div className="flex items-center gap-2.5">
                                <div
                                    className="w-8 h-8 flex items-center justify-center shrink-0"
                                    style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-white" />
                                </div>

                                <div>
                                    <p className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
                                        Clarification needed
                                    </p>
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={clarificationCount}
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 6 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-[11px] font-semibold px-2 py-0.5 inline-block"
                                            style={{
                                                color: "var(--primary)",
                                                backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
                                            }}
                                        >
                                            Question {clarificationCount}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Label: Shown when question appears, hidden when arrow is clicked */}
                            <AnimatePresence>
                                {!submitting && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="flex items-center gap-2 mt-1"
                                    >
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-700 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-700"></span>
                                        </span>
                                        <span className="text-xs font-semibold uppercase tracking-tighter text-green-700">
                                            Awaiting user response
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Separator style={{ backgroundColor: "var(--border-solid)", opacity: 0.4 }} />

                        {/* Entire question body slides in fresh on each new question */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={clarificationCount}
                                initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="space-y-4"
                            >
                                <p className="text-sm leading-relaxed font-medium mt-1" style={{ color: "var(--text-main)" }}>
                                    {`${clarificationCount}. ${question}`}
                                </p>

                                {options.length > 0 && (
                                    <div className="space-y-2">
                                        {[...options, "Others"].map((opt, i) => {
                                            const isOthers = opt === "Others";
                                            const isSelected = selectedOption === (isOthers ? "others" : opt);
                                            return (
                                                <motion.button
                                                    key={opt}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.06, duration: 0.25 }}
                                                    type="button"
                                                    onClick={() => handleOptionSelect(opt)}
                                                    className={`w-full flex items-center gap-3 px-4 py-2.5 border text-sm text-left rounded-none transition-colors ${
                                                        isSelected
                                                            ? "border-primary bg-primary/5 text-primary font-medium"
                                                            : "border-border hover:bg-muted/20 text-foreground"
                                                    }`}
                                                >
                                                    <span className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${isSelected ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                                                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                    </span>
                                                    {opt}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                )}

                                {showCustomInput && (
                                    <div className="space-y-2 pt-1">
                                        <Separator style={{ backgroundColor: "var(--border-solid)", opacity: 0.3 }} />
                                        <p className="text-xs text-muted-foreground">Describe what you're looking for</p>
                                        <Textarea
                                            ref={textareaRef}
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Type your answer..."
                                            className="rounded-none"
                                            style={{ minHeight: "100px" }}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Submit */}
                        <div className="flex justify-end items-center pt-1">
                            <Button disabled={!canSubmit} onClick={handleSubmit} className="text-white rounded-none">
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                            </Button>
                        </div>

                    </CardContent>
                </CardContent>

                {error && (
                    <Alert variant="destructive" className="rounded-none">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

            </div>
        </div>
    );
}