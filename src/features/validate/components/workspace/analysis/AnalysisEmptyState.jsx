import { ArrowRight, Lightbulb, Sparkles } from "lucide-react";

export default function AnalysisEmptyState({ onNewAnalysis }) {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <div className="relative mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-50">
                    <Lightbulb
                        size={36}
                        strokeWidth={1.5}
                        className="text-violet-600"
                    />
                </div>

                <Sparkles
                    size={20}
                    className="absolute -right-3 -top-3 text-amber-500"
                />
            </div>

            <h3 className="text-xl font-semibold text-slate-900">
                Your next big idea starts here
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                You haven't started an analysis yet. Submit your idea and
                let ProblemPulse research its market potential, demand,
                competition, and opportunities.
            </p>

            <button
                onClick={onNewAnalysis}
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
                Validate your first idea
                <ArrowRight size={16} />
            </button>
        </div>
    );
}