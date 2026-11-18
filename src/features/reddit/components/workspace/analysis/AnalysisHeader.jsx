import { MessageSquareText, Plus } from "lucide-react";

export default function RedditAnalysisHeader({ isAuthenticated, onNewAnalysis }) {
    return (
        <div className="flex flex-col justify-between gap-6 rounded-2xl py-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-[#FF4500]/10 text-[#FF4500]">
                    <MessageSquareText size={24} strokeWidth={2} />
                </div>

                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                        Reddit Analysis
                    </h1>

                    <p className="mt-0 max-w-xl text-sm leading-6 text-slate-600">
                        {isAuthenticated
                            ? "Manage your Reddit research and revisit the pain points and insights you've discovered."
                            : "Track your Reddit research and explore the conversations, pain points, and insights behind your ideas."}
                    </p>
                </div>
            </div>

            <button
                onClick={onNewAnalysis}
                className="group relative inline-flex h-11 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-lg bg-linear-to-r from-[#B8320A] to-[#D13A0B] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-900/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-900/30 active:translate-y-0"
            >
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <Plus size={18} className="transition-transform group-hover:rotate-90" />
                New Reddit Analysis
            </button>
        </div>
    );
}