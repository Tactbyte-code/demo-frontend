"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export const ActionsTab = ({ data, onReachEndSwipe, onReachStartSwipe }) => {

    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const steps = [...(data?.actionable_next_steps ?? [])].sort(
        (a, b) => a.priority - b.priority
    );

    // ✅ Hooks must always be called before any early return
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const width = container.clientWidth;
            const index = Math.round(scrollLeft / width);
            setCurrentIndex(index);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    if (!steps?.length) {
        return (
            <p className="text-sm text-muted-foreground py-8 text-center">
                No actions found.
            </p>
        );
    }

    const progressValue = steps.length <= 1
        ? 100
        : (currentIndex / (steps.length - 1)) * 100;

    return (
        <div className="space-y-3">
            {/* ── MOBILE SWIPE VIEW ── */}
            <div className="sm:hidden">
                {/* ── Progress indicator ── */}
                <div className="my-3 px-1 flex items-center gap-3">
                    <Progress
                        value={progressValue}
                        className="h-1 flex-1 rounded-none bg-border/90"
                    />
                    <span className="text-[11px] font-mono text-muted-foreground shrink-0 tabular-nums">
                        {currentIndex + 1} / {steps.length}
                    </span>
                </div>

                {/* Swipe cards */}
                <div
                    ref={scrollRef}
                    onTouchStart={(e) => {
                        const touch = e.touches[0];
                        scrollRef.current._startX = touch.clientX;
                    }}
                    onTouchEnd={(e) => {
                        const container = scrollRef.current;
                        if (!container) return;

                        const touch = e.changedTouches[0];
                        const diffX = touch.clientX - container._startX;

                        const atStart = container.scrollLeft <= 0;
                        const atEnd =
                            container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

                        const SWIPE_THRESHOLD = 50;

                        // 👉 Swipe RIGHT at first card → go to previous tab
                        if (diffX > SWIPE_THRESHOLD && atStart) {
                            onReachStartSwipe?.();
                        }

                        // 👉 Swipe LEFT at last card → go to next tab
                        if (diffX < -SWIPE_THRESHOLD && atEnd) {
                            onReachEndSwipe?.();
                        }
                    }}
                    className="overflow-x-auto flex gap-3 snap-x snap-mandatory scroll-smooth [-webkit-overflow-scrolling:touch]"
                >
                    {steps.map((item, i) => (
                        <div key={i} className="min-w-full snap-start border border-border">
                            <Card className="border-0 rounded-none shadow-none p-0">
                                <CardContent className="p-0 border-0">
                                    <div className="col-span-12 p-4 flex flex-col gap-3 bg-surface">
                                        <div className="flex flex-row items-start justify-between gap-3 mb-4">
                                            <div className="flex items-start gap-3">
                                                <div className="text-xs font-mono font-semibold bg-surface-raised px-2 py-1 shrink-0 border border-solid">
                                                    #{item.priority}
                                                </div>
                                                <p className="text-sm font-semibold text-foreground leading-snug">
                                                    {item.step}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-[13px] uppercase tracking-wide text-muted-foreground mb-1">
                                                Why this matters
                                            </p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                {item.rationale}
                                            </p>
                                        </div>

                                        <Separator />

                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="border border-border-input p-3">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <p className="text-[13px] uppercase tracking-wide text-muted-foreground">
                                                        Execution Plan
                                                    </p>
                                                    {item.quick_win && (
                                                        <Badge className="flex items-center gap-1 text-[10px] uppercase tracking-wide bg-green-100 text-green-700 rounded-none shrink-0">
                                                            <Check size={14} strokeWidth={3} />
                                                            Quick Win
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs text-foreground leading-relaxed">
                                                    {item.how}
                                                </p>
                                            </div>

                                            <div className="border border-border-input p-3">
                                                <p className="text-[13px] uppercase tracking-wide text-muted-foreground mb-1">
                                                    Outcome
                                                </p>
                                                <p className="text-xs text-foreground leading-relaxed">
                                                    {item.impact}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border border-border-input p-3">
                                            <p className="text-[13px] uppercase tracking-wide text-muted-foreground mb-1">
                                                Estimated Effort
                                            </p>
                                            <p className="text-xs text-foreground leading-relaxed">
                                                {item.effort}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── DESKTOP VIEW ── */}
            <div className="hidden sm:block space-y-3">
                {steps.map((item, i) => (
                    <Card key={i} className="border-0 rounded-none shadow-none p-0">
                        <CardContent className="p-0 border-0">
                            <div className="grid grid-cols-12">
                                {/* LEFT STRIP */}
                                <div className="col-span-12 sm:col-span-1 border-r border-border p-4 flex flex-col gap-3">
                                    <span className="text-xs font-mono font-bold text-center w-full">
                                        #{item.priority}
                                    </span>
                                </div>

                                {/* MAIN CONTENT */}
                                <div className="col-span-12 sm:col-span-11 p-4 flex flex-col gap-3 bg-surface">
                                    <div className="flex items-start justify-between gap-3">
                                        <p className="text-sm font-semibold text-foreground leading-snug">
                                            {item.step}
                                        </p>
                                        {item.quick_win && (
                                            <Badge className="flex items-center gap-1 text-[10px] uppercase tracking-wide bg-green-100 text-green-700 rounded-none shrink-0 mt-0.5">
                                                <Check size={14} strokeWidth={3} />
                                                Quick Win
                                            </Badge>
                                        )}
                                    </div>

                                    <div>
                                        <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                                            Why this matters
                                        </p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {item.rationale}
                                        </p>
                                    </div>

                                    <Separator />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border border-border-input p-3">
                                            <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                                                Execution Plan
                                            </p>
                                            <p className="text-xs text-foreground leading-relaxed">
                                                {item.how}
                                            </p>
                                        </div>

                                        <div className="border border-border-input p-3">
                                            <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                                                Outcome
                                            </p>
                                            <p className="text-xs text-foreground leading-relaxed">
                                                {item.impact}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border border-border-input p-3">
                                        <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                                            Estimated Effort
                                        </p>
                                        <p className="text-xs text-foreground leading-relaxed">
                                            {item.effort}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};