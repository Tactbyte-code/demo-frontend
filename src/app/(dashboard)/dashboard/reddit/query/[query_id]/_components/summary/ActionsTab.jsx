"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

export const ActionsTab = ({ data }) => {

    const steps = [...(data?.actionable_next_steps ?? [])].sort(
        (a, b) => a.priority - b.priority
    );

    if (!steps.length) {
        return (
            <p className="text-sm text-muted-foreground py-8 text-center">
                No actions found.
            </p>
        );
    }

    return (
        <div className="space-y-3">
            {steps.map((item, i) => (
                <Card key={i} className="border-0 rounded-none shadow-none p-0">
                    <CardContent className="p-0 border-0">
                        <div className="grid grid-cols-12">
                            {/* LEFT STRIP (priority + meta) */}
                            <div className="col-span-12 sm:col-span-1 border-r border-border p-4 flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono font-bold text-center w-full">#{item.priority}</span>
                                </div>
                            </div>

                            {/* MAIN CONTENT */}
                            <div className="col-span-12 sm:col-span-11 p-4 flex flex-col gap-3 bg-surface">
                                {/* Replace the step title div */}
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

                                {/* NEW EFFORT SECTION */}
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
    );
};

// ---------------- INSTALL COMMANDS ----------------
// npx shadcn-ui@latest add card
// npx shadcn-ui@latest add badge
// npx shadcn-ui@latest add separator

// ---------------- CHANGES ----------------
// - Removed effort from left strip
// - Added a dedicated "Estimated Effort" section at bottom
// - Makes effort clearer + more readable (not just a badge anymore)
// - Keeps visual flow: Why → How → Outcome → Effort




// ---------------- INSTALL COMMANDS ----------------
// npx shadcn-ui@latest add card
// npx shadcn-ui@latest add badge
// npx shadcn-ui@latest add separator

// ---------------- WHAT CHANGED ----------------
// - Switched from card blocks → structured list with vertical separation
// - Added LEFT STRIP for priority + meta (scannable like a dashboard)
// - Renamed sections to be more intuitive:
//   "Why this matters" instead of rationale
//   "Execution Plan" instead of how
//   "Outcome" instead of impact
// - Boxed execution + outcome for clearer separation
// - Removed visual clutter → flatter, more product-like UI




{/* {item.addresses_themes?.length > 0 && (
    <div className="mt-3 flex flex-wrap gap-1.5">
        {item.addresses_themes.map(t => (
            <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-border-solid text-muted">
                {t}
            </span>
        ))}
    </div>
)} */}