"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Check } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export const ActionsTab = ({ data, onReachEndSwipe, onReachStartSwipe }) => {

    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const steps = [...(data?.actionable_next_steps ?? [])].sort(
        (a, b) => a.priority - b.priority
    );

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

    const scrollToIndex = (index) => {
        const container = scrollRef.current;
        if (!container) return;
        container.scrollTo({ left: index * container.clientWidth, behavior: 'smooth' });
        setCurrentIndex(index);
    };

    if (!steps?.length) {
        return (
            <div className="">
                <div
                    onTouchStart={(e) => {
                        const touch = e.touches[0];
                        scrollRef.current = {
                            ...scrollRef.current,
                            _startX: touch.clientX,
                        };
                    }}
                    onTouchEnd={(e) => {
                        const touch = e.changedTouches[0];
                        const diffX = touch.clientX - scrollRef.current?._startX;
                        const SWIPE_THRESHOLD = 50;
                        if (diffX > SWIPE_THRESHOLD) onReachStartSwipe?.();
                        if (diffX < -SWIPE_THRESHOLD) onReachEndSwipe?.();
                    }}
                    className="min-h-50 flex items-center bg-input-background justify-center border border-border"
                >
                    <p className="text-sm text-muted-foreground text-center px-4">
                        No actions found.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {/* ── MOBILE SWIPE VIEW ── */}
            <div className="sm:hidden">
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
                        const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

                        const SWIPE_THRESHOLD = 50;

                        if (diffX > SWIPE_THRESHOLD && atStart) onReachStartSwipe?.();
                        if (diffX < -SWIPE_THRESHOLD && atEnd) onReachEndSwipe?.();
                    }}
                    className="overflow-x-auto flex snap-x snap-mandatory gap-3 scroll-smooth [-webkit-overflow-scrolling:touch]"
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

                {/* ── Dot indicators + swipe hint ── */}
                <div className="flex flex-col items-center gap-2 mt-3">

                    {/* Dots */}
                    <div className="flex items-center justify-center gap-1.5">
                        {steps.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToIndex(i)}
                                className={`rounded-full transition-all duration-300 ${
                                    i === currentIndex
                                        ? 'w-4 h-1.5 bg-primary'
                                        : 'w-1.5 h-1.5 bg-border-solid active:bg-primary/50'
                                }`}
                            />
                        ))}
                    </div>

                    {/* Swipe hint — only show when not on last card */}
                    {currentIndex < steps.length - 1 && (
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground/50 animate-pulse select-none">
                            <span>swipe</span>
                            <ArrowRight className="w-3 h-3" />
                        </div>
                    )}
                </div>
            </div>

            {/* ── DESKTOP VIEW ── */}
            <div className="hidden sm:block space-y-3">
                {steps.map((item, i) => (
                    <Card key={i} className="border border-border rounded-none shadow-none p-0">
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
                                        <div className="border border-border-input p-3 bg-surface-card">
                                            <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                                                Execution Plan
                                            </p>
                                            <p className="text-xs text-foreground leading-relaxed">
                                                {item.how}
                                            </p>
                                        </div>

                                        <div className="border border-border-input p-3 bg-surface-card">
                                            <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                                                Outcome
                                            </p>
                                            <p className="text-xs text-foreground leading-relaxed">
                                                {item.impact}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border border-border-input p-3 bg-surface-card">
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