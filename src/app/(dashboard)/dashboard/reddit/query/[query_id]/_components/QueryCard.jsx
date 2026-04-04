import { useState, useRef, useEffect } from "react";
import { CardHeader } from "@/components/ui/card";
import { SectionLabel } from "@/features/reddit/components/SectionLabel";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Pencil, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function QueryCard({ query, isCompleted }) {

    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(query || null);
    const textareaRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (editing) {
            textareaRef.current?.focus();
            const len = textareaRef.current?.value.length;
            textareaRef.current?.setSelectionRange(len, len);
        }
    }, [editing]);

    const handleSave = () => {
        if (!value.trim()) return;
        router.replace(`/dashboard/reddit/processing?query=${encodeURIComponent(value.trim())}`);
        setEditing(false);
    };

    const handleCancel = () => {
        setValue(query?.query ?? "");
        setEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSave(); }
        if (e.key === "Escape") handleCancel();
    };

    return (
        <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            <CardHeader className="px-0 pt-5 pb-0">
                <SectionLabel
                    icon={<Sparkles className="w-3.5 h-3.5 text-white" />}
                    label="Your Query"
                />
            </CardHeader>

            {/* Main row — no rounded edges */}
            <div className="flex border border-border-solid h-16" style={{ backgroundColor: "var(--surface)" }}>

                {/* Query content */}
                <div className="flex-1 px-5 py-4">
                    {editing ? (
                        <>
                            <Input
                                ref={textareaRef}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full h-full text-lg font-semibold leading-relaxed rounded-none border-0 p-0 shadow-none focus-visible:ring-0"
                                style={{ color: "var(--text-main)", backgroundColor: "transparent" }}
                            />
                        </>
                    ) : (
                        <p
                            className="text-lg font-semibold leading-relaxed"
                            style={{ color: "var(--text-main)" }}
                        >
                            {value}
                        </p>
                    )}
                </div>

                {/* Divider + icon container */}
                <div
                    className="flex flex-col items-center justify-center px-4 border-l border-border-solid"
                    style={{ backgroundColor: "var(--surface-raised)" }}
                >
                    {editing ? (
                        <div className="flex flex-row gap-1">
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleSave}>
                                <Check className="w-3.5 h-3.5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleCancel}>
                                <X className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    ) : (
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditing(true)}>
                            <Pencil className="w-3.5 h-3.5" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}