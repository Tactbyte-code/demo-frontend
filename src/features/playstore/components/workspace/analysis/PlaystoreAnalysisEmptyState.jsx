
import { ArrowRight, Smartphone, Sparkles } from "lucide-react";

export default function PlaystoreAnalysisEmptyState({ onNewAnalysis }) {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed border-[#A8D5B3] bg-white px-6 py-12 text-center">
            <div className="relative mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#E5F5E9]">
                    <Smartphone
                        size={36}
                        strokeWidth={1.5}
                        className="text-[#188038]"
                    />
                </div>

                <Sparkles
                    size={20}
                    className="absolute -right-3 -top-3 text-[#FBBC04]"
                />
            </div>

            <h3 className="text-xl font-semibold text-[#142B1B]">
                Understand what users think about your app
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#718477]">
                You haven't started a Play Store analysis yet. Explore real
                user reviews, uncover recurring complaints, identify feature
                requests, and discover opportunities to improve your app.
            </p>

            <button
                onClick={onNewAnalysis}
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-[#188038] px-5 text-sm font-semibold text-white transition hover:bg-[#146C2E]"
            >
                Start your first Play Store analysis
                <ArrowRight size={16} />
            </button>
        </div>
    );
}
