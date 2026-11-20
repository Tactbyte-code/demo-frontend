
import { Smartphone, Plus } from "lucide-react";

export default function PlaystoreAnalysisHeader({
    isAuthenticated,
    onNewAnalysis,
}) {
    return (
        <div className="flex flex-col justify-between gap-6 rounded-2xl py-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-[#188038]/10 text-[#188038]">
                    <Smartphone size={24} strokeWidth={2} />
                </div>

                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#142B1B] sm:text-2xl">
                        Your Analysis
                    </h1>

                    <p className="mt-0 max-w-xl text-sm leading-6 text-[#718477]">
                        {isAuthenticated
                            ? "Manage your Play Store research and revisit the app reviews, user feedback, and insights you've discovered."
                            : "Track your app research and explore user reviews, feedback patterns, and insights from your guest session."}
                    </p>
                </div>
            </div>

            <button
                onClick={onNewAnalysis}
                className="group relative inline-flex h-11 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-md bg-linear-to-r from-[#188038] to-[#34A853] px-6 text-sm font-semibold text-white shadow-lg shadow-green-900/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-900/30 active:translate-y-0"
            >
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />

                <Plus
                    size={18}
                    className="transition-transform group-hover:rotate-90"
                />

                New Play Store Analysis
            </button>
        </div>
    );
}
