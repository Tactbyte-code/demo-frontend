import { ArrowRight, MessageSquareText, Sparkles } from "lucide-react";

export default function RedditAnalysisEmptyState({ onNewAnalysis }) {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed border-[#E8B5A4] bg-white px-6 py-12 text-center">
            <div className="relative mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FFF1EB]">
                    <MessageSquareText
                        size={36}
                        strokeWidth={1.5}
                        className="text-[#B8320A]"
                    />
                </div>

                <Sparkles
                    size={20}
                    className="absolute -right-3 -top-3 text-[#FF8A50]"
                />
            </div>

            <h3 className="text-xl font-semibold text-slate-900">
                Discover what people are struggling with
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                You haven't started a Reddit analysis yet. Explore real
                conversations, uncover recurring pain points, and discover
                opportunities hidden in Reddit communities.
            </p>

            <button
                onClick={onNewAnalysis}
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-[#B8320A] px-5 text-sm font-semibold text-white transition hover:bg-[#982A09]"
            >
                Start your first Reddit analysis
                <ArrowRight size={16} />
            </button>
        </div>
    );
}