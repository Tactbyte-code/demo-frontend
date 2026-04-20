"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowRight,
    ArrowLeft,
    Loader2,
    MessageSquare,
    HelpCircle,
    Sparkles,
    AlertCircle
} from "lucide-react";
import { getQuery, submitClarification } from "@/lib/api/reddit";
import AILoader from "@/components/shared/AiLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useSidebarStore } from "@/context/useSidebarStore";
import { useQueryClient } from "@tanstack/react-query";

export default function ClarifyPage({ params }) {

    const { query_id } = use(params);
    const router = useRouter();

    const [originalQuery, setOriginalQuery] = useState("");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([]);                    // NEW
    const [selectedOption, setSelectedOption] = useState(null);    // NEW
    const [showCustomInput, setShowCustomInput] = useState(false); // NEW
    const [answer, setAnswer] = useState("");
    const [clarificationCount, setClarificationCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const textareaRef = useRef(null);

    // NEW: canSubmit accounts for options
    const canSubmit = !submitting && (
        (selectedOption && selectedOption !== "others") ||
        (selectedOption === "others" && answer.trim())
    );

    const { setSidebarOpen } = useSidebarStore();

    const user_id = localStorage.getItem('user').firebase_uid;

    const queryClient = useQueryClient();

    // Auto-collapse sidebar on mount, restore on leave
    useEffect(() => {
        setSidebarOpen(false);
        return () => setSidebarOpen(true);
    }, []);

    // fetch a single query
    useEffect(() => {
        const fetchQuery = async () => {
            try {
                const data = await getQuery(query_id);
                console.log('a single query: ', data);

                // any status other than CLARIFYING means we don't belong here
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
                    setOptions(lastAssistant.options || []); // NEW
                }
            } catch (err) {
                setError("Failed to load query. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuery();
    }, [query_id]);

    // NEW: focus textarea only when Others is selected
    useEffect(() => {
        if (showCustomInput && textareaRef.current) textareaRef.current.focus();
    }, [showCustomInput]);

    // NEW: handle option selection
    const handleOptionSelect = (opt) => {
        const isOthers = opt === "Others";
        setSelectedOption(isOthers ? "others" : opt);
        setShowCustomInput(isOthers);
        if (!isOthers) setAnswer("");
    };

    // submit clarification answer
    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (!canSubmit) return;
        setSubmitting(true);
        setError(null);

        const finalAnswer = selectedOption === "others" ? answer.trim() : selectedOption; // NEW

        try {
            const response = await submitClarification(query_id, finalAnswer); // CHANGED: answer → finalAnswer

            if (response) queryClient.invalidateQueries({ queryKey: ["queries", user_id] });

            if (response.status === "CLARIFYING") {
                setQuestion(response.question);
                setOptions(response.options || []); // NEW
                setSelectedOption(null);            // NEW
                setShowCustomInput(false);          // NEW
                setClarificationCount(response.clarification_count);
                setAnswer("");
                return;
            }

            // CLARIFIED, FAILED, or anything else — go to query_id page
            router.push(`/dashboard/reddit/query/${query_id}`);
        } catch (err) {
            setError(err.response?.data?.detail || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    // on pressing Enter (only relevant in Others textarea)
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    // loading UI
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6">
                <AILoader />

                <div className="text-center space-y-2">
                    <p className="text-sm font-medium">
                        Intent clarification in progress
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Asking a few quick questions
                    </p>
                </div>

            </div>
        );
    };

    return (
        <div className="min-h-screen flex justify-center px-4 py-10">
            <div className="w-full max-w-2xl space-y-6">
                {/* Top */}
                <div className="flex justify-between items-center">
                    <Button
                        variant="ghost"
                        className="px-0"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>

                    <span className="text-sm text-muted">
                        Clarifying the intent
                    </span>
                </div>

                {/* Progress */}
                <Card className="p-4 my-5 rounded-none gap-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                        <MessageSquare className="w-5 h-5" />
                        Your Query
                    </div>

                    {/* <Separator /> */}

                    <p className="text-sm font-medium leading-relaxed pl-7">
                        {originalQuery}
                    </p>
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
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                                {/* Icon bubble */}
                                <div
                                    className="w-8 h-8 flex items-center justify-center shrink-0"
                                    style={{
                                        background: "linear-gradient(135deg, var(--primary), var(--accent))",
                                    }}
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-white" />
                                </div>

                                <div>
                                    <p
                                        className="text-sm font-bold uppercase tracking-wider"
                                        style={{ color: "var(--text-subtle)" }}
                                    >
                                        Clarification needed
                                    </p>
                                    <p
                                        className="text-[11px] font-medium"
                                        style={{ color: "var(--primary)" }}
                                    >
                                        Question {clarificationCount}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Separator style={{ backgroundColor: "var(--border-solid)", opacity: 0.4 }} />

                        {/* Question text */}
                        <p
                            className="text-sm leading-relaxed font-medium mt-5"
                            style={{ color: "var(--text-main)" }}
                        >
                            {question}
                        </p>

                        {/* NEW: Options list with hardcoded Others at the end */}
                        {options.length > 0 && (
                            <div className="space-y-2">
                                {[...options, "Others"].map((opt) => {
                                    const isOthers = opt === "Others";
                                    const isSelected = selectedOption === (isOthers ? "others" : opt);
                                    return (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => handleOptionSelect(opt)}
                                            className={`w-full flex items-center gap-3 px-4 py-2.5 border text-sm text-left rounded-none transition-colors ${
                                                isSelected
                                                    ? "border-primary bg-primary/5 text-primary font-medium"
                                                    : "border-border hover:bg-muted/20 text-foreground"
                                            }`}
                                        >
                                            <span
                                                className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${
                                                    isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                                                }`}
                                            >
                                                {isSelected && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                )}
                                            </span>
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* NEW: Others free-text input */}
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
                                    style={{ minHeight: "100px" }}
                                />
                            </div>
                        )}

                        {/* Submit row — moved inside question card */}
                        <div className="flex justify-between items-center pt-1">
                            <span className="text-xs text-muted-foreground">
                                {selectedOption && selectedOption !== "others"
                                    ? `"${selectedOption}" selected`
                                    : selectedOption === "others" && answer.trim()
                                    ? `${answer.length} chars`
                                    : "Select an option above"}
                            </span>
                            <Button disabled={!canSubmit} onClick={handleSubmit} className="text-white">
                                {submitting ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <ArrowRight className="w-4 h-4" />
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </CardContent>

                {/* Error */}
                {error && (
                    <Alert variant="destructive" className="rounded-none">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
}