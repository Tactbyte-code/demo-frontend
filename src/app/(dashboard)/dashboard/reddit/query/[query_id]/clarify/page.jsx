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
    const [answer, setAnswer] = useState("");
    const [clarificationCount, setClarificationCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const textareaRef = useRef(null);
    const canSubmit = answer.trim() && !submitting;

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
                if (lastAssistant) setQuestion(lastAssistant.content);
            } catch (err) {
                setError("Failed to load query. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuery();
    }, [query_id, router]);

    // NEW: focus textarea only when Others is selected
    useEffect(() => {
        if (!loading && textareaRef.current) textareaRef.current.focus();
    }, [loading, question]);

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
        try {
            const response = await submitClarification(query_id, answer);

            if (response) queryClient.invalidateQueries({ queryKey: ["queries", user_id] });

            if (response.status === "CLARIFYING") {
                setQuestion(response.question);
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

    // on pressing Enter
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

                            {/* <Badge
                                variant="outline"
                                className="text-[10px] px-2 py-0.5 shrink-0"
                                style={{
                                    backgroundColor: "var(--info-bg)",
                                    color: "var(--primary)",
                                    borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
                                }}
                            >
                                AI generated
                            </Badge> */}
                        </div>

                        <Separator style={{ backgroundColor: "var(--border-solid)", opacity: 0.4 }} />

                        {/* Question text */}
                        <p
                            className="text-sm leading-relaxed font-medium mt-5"
                            style={{ color: "var(--text-main)" }}
                        >
                            {question}
                        </p>
                    </CardContent>
                </CardContent>

                {/* Input */}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <Textarea
                        ref={textareaRef}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your answer..."
                        style={{ minHeight: "140px" }}
                    />

                    <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                            {answer.length} chars
                        </span>

                        <Button disabled={!canSubmit} type="submit" className={'text-white'}>
                            {submitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <ArrowRight className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                </form>

                {error && (
                    <Alert variant="destructive" className="rounded-none">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

            </div>
        </div>
    );
}