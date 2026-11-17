import { FileChartColumnIncreasing, Plus } from "lucide-react";

export default function AnalysisHeader({
    isAuthenticated,
    onNewAnalysis,
}) {
    return (
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center rounded-2xl py-2">
            <div className="flex items-center gap-3">
                <div className="flex w-13 h-13 shrink-0 items-center justify-center rounded-full bg-violet-700 text-violet-100">
                    <FileChartColumnIncreasing size={24} strokeWidth={2} />
                </div>

                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                        Your Analysis
                    </h1>

                    <p className="mt-0 max-w-xl text-sm leading-6 text-slate-600">
                        {isAuthenticated
                            ? "Manage your idea validations and revisit your research whenever you need."
                            : "Track your idea validations and see how your ideas are progressing."}
                    </p>
                </div>
            </div>

            <button
                onClick={onNewAnalysis}
                className="group relative inline-flex h-11 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-lg bg-linear-to-r from-[#7138D5] to-[#9326D5] px-6 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/40 active:translate-y-0"
            >
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <Plus size={18} className="transition-transform group-hover:rotate-90" />
                Validate a New Idea
            </button>
        </div>
    );
}