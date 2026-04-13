import { useState, useRef, useEffect } from "react";
import { CardHeader } from "@/components/ui/card";
import { SectionLabel } from "@/features/reddit/components/SectionLabel";
import { Button } from "@/components/ui/button";
import { Sparkles, Pencil, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createQuery } from "@/lib/api/reddit";
import QueryProcessingLoader from "../../../_components/QueryProcessingLoader";
import { useQueryClient } from "@tanstack/react-query";

export function QueryCard({ query, isCompleted, onRequeryStart }) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(query || null);
    const textareaRef = useRef(null);
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [queryId, setQueryId] = useState(null);
    const [navigating, setNavigating] = useState(false);

    const user_id = typeof window !== 'undefined' ? localStorage.getItem('user')?.firebase_uid : null;
    const queryClient = useQueryClient();

    useEffect(() => {
        if (editing) {
            textareaRef.current?.focus();
            const len = textareaRef.current?.value.length;
            textareaRef.current?.setSelectionRange(len, len);
        }
    }, [editing]);

    const handleSubmitQuery = async () => {
        onRequeryStart?.();
        setLoading(true);
        setError(null);
        setStatus(null);

        try {
            const response = await createQuery(value);
            if (response) {
                setQueryId(response?.id);
                queryClient.invalidateQueries({ queryKey: ["queries", user_id] });
            };

            if (response.status === "CLARIFYING") {
                setNavigating(true);
                router.push(`/dashboard/reddit/query/${response.id}/clarify`);
            } else if (response.status === "CLARIFIED") {
                setNavigating(true);
                router.push(`/dashboard/reddit/query/${response.id}`);
            } else if (response?.status === "FAILED") {
                setStatus("FAILED");
                setError(response?.failure_reason || "Something went wrong");
            }
        } catch (err) {
            setError(err?.response?.data?.detail || "Something went wrong");
            setStatus("FAILED");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setValue(query ?? "");
        setEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmitQuery(); }
        if (e.key === "Escape") handleCancel();
    };

    if (loading || navigating) return <QueryProcessingLoader />;

    return (
        <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out px-0 md:px-0">
            {/* Card Header */}
            <CardHeader className="px-0 pt-5 pb-0">
                <SectionLabel
                    icon={<Sparkles className="w-3.5 h-3.5 text-white" />}
                    label="Your Query"
                />
            </CardHeader>

            {/* Main row — Fixed h-16 changed to min-h-[4rem] for text wrapping */}
            <div 
                className="flex flex-row border border-border-solid min-h-[4rem] w-full transition-all" 
                style={{ backgroundColor: "var(--surface)" }}
            >
                {/* Query content */}
                <div className="flex-1 px-4 md:px-5 py-3 md:py-4 flex items-center">
                    {editing ? (
                        <Input
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            // Responsive text size: base (16px) on mobile, lg (18px) on desktop
                            className="w-full text-base md:text-lg font-semibold leading-relaxed rounded-none border-0 p-0 shadow-none focus-visible:ring-0 h-auto"
                            style={{ color: "var(--text-main)", backgroundColor: "transparent" }}
                        />
                    ) : (
                        <p
                            className="text-base md:text-lg font-semibold leading-relaxed break-words"
                            style={{ color: "var(--text-main)" }}
                        >
                            {value}
                        </p>
                    )}
                </div>

                {/* Divider + icon container */}
                <div
                    className="flex flex-col items-center justify-center px-3 md:px-4 border-l border-border-solid shrink-0"
                    style={{ backgroundColor: "var(--surface-raised)" }}
                >
                    {editing ? (
                        <div className="flex flex-col md:flex-row gap-2 md:gap-1">
                            <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8 md:h-7 md:w-7 text-green-500 md:text-inherit" 
                                onClick={handleSubmitQuery}
                            >
                                <Check className="w-4 h-4 md:w-3.5 md:h-3.5" />
                            </Button>
                            <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8 md:h-7 md:w-7 text-red-500 md:text-inherit" 
                                onClick={handleCancel}
                            >
                                <X className="w-4 h-4 md:w-3.5 md:h-3.5" />
                            </Button>
                        </div>
                    ) : (
                        <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 md:h-7 md:w-7" 
                            onClick={() => setEditing(true)}
                        >
                            <Pencil className="w-4 h-4 md:w-3.5 md:h-3.5" />
                        </Button>
                    )}
                </div>
            </div>

            {error && (
                <p className="text-xs text-red-500 mt-2 font-medium">
                    {error}
                </p>
            )}
        </div>
    );
}