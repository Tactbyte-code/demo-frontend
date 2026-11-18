
"use client";

import { useEffect } from "react";
import {
    Coins,
    RefreshCw,
    MessageSquare,
    Smartphone,
    Lightbulb,
    Sparkles,
    Plus,
} from "lucide-react";
import { useCreditStore } from "@/store/useCreditStore";

export default function WorkspaceCreditCard({ onTopUp, collapsed = false }) {
    const credits = useCreditStore((state) => state.credits);
    const loadingCredits = useCreditStore((state) => state.loadingCredits);
    const hasFetched = useCreditStore((state) => state.hasFetched);
    const getCredits = useCreditStore((state) => state.getCredits);

    useEffect(() => {
        getCredits();
    }, [getCredits]);

    if (collapsed) {
        return (
            <div className="flex flex-col items-center gap-2">
                <div
                    title={`${credits.toLocaleString("en-IN")} credits`}
                    className="
                    flex h-12 w-12 flex-col items-center justify-center
                    rounded-full border border-amber-300/20
                    bg-amber-400 text-black
                "
                >
                    <Coins size={22} />

                    {/* <span className="mt-0.5 text-[9px] font-bold">
                        {loadingCredits && !hasFetched
                            ? "..."
                            : credits > 999
                                ? `${(credits / 1000).toFixed(1)}k`
                                : credits}
                    </span> */}
                </div>

                {/* <button
                    type="button"
                    onClick={onTopUp}
                    title="Top Up Credits"
                    aria-label="Top Up Credits"
                    className="
                    flex h-9 w-9 items-center justify-center
                    rounded-lg bg-amber-400 text-[#30200A]
                    transition-colors hover:bg-amber-300
                "
                >
                    <Plus size={17} />
                </button> */}
            </div>
        );
    }

    return (
        <div className="
            relative overflow-hidden
            rounded-lg
            border border-amber-300/20
            bg-linear-to-br from-[#49300D] via-[#38280F] to-[#30210D]
            p-3.5
        ">
            {/* Decorative background */}
            <div className="
                pointer-events-none absolute
                -right-7 -top-8
                h-28 w-28 rounded-full
                bg-amber-400/15 blur-2xl
            " />

            <div className="
                pointer-events-none absolute
                right-4 top-5
                flex h-12 w-12 items-center justify-center
                rounded-2xl border border-amber-300/20
                bg-amber-400/10 rotate-12
            ">
                <Coins
                    size={27}
                    className="text-amber-300"
                    strokeWidth={1.5}
                />
            </div>

            {/* Header */}
            <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-300" />

                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-200">
                        Credit Balance
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => getCredits(true)}
                    disabled={loadingCredits}
                    title="Refresh credits"
                    aria-label="Refresh credits"
                    className="
                        rounded-md p-1
                        text-amber-200/70
                        transition-colors
                        hover:bg-white/10 hover:text-white
                        disabled:opacity-40
                    "
                >
                    <RefreshCw
                        size={13}
                        className={loadingCredits ? "animate-spin" : ""}
                    />
                </button>
            </div>

            {/* Balance */}
            <div className="relative mt-4">
                <div className="flex items-baseline gap-2">
                    <span className="text-[30px] font-bold leading-none tracking-tight text-white">
                        {loadingCredits && !hasFetched
                            ? "..."
                            : credits.toLocaleString("en-IN")}
                    </span>

                    <span className="text-xs font-medium text-amber-200/70">
                        credits
                    </span>
                </div>

                <p className="mt-1.5 text-[11px] text-amber-200/60">
                    Available for your analyses
                </p>
            </div>

            {/* Top Up Button */}
            <button
                type="button"
                onClick={onTopUp}
                className="
                    relative mt-4 flex w-full items-center justify-center gap-2
                    rounded-md bg-amber-400 px-3 py-2.5
                    text-xs font-semibold text-[#30200A]
                    transition-colors
                    hover:bg-amber-300
                    active:scale-[0.98]
                "
            >
                <Plus size={14} strokeWidth={2.5} />
                Top Up Credits
            </button>
        </div>
    );
}
