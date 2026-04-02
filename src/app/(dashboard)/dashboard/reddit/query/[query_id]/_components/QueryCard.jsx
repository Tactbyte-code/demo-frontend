import { CardContent, CardHeader } from "@/components/ui/card";
import { SectionLabel } from "@/features/reddit/components/SectionLabel";
import { Sparkles } from "lucide-react";

export function QueryCard({ query }) {
    return (
        <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            <CardHeader className="px-0 pt-5 pb-0">
                <SectionLabel
                    icon={<Sparkles className="w-3.5 h-3.5 text-white" />}
                    label="Your Query"
                />
            </CardHeader>

            <CardContent className="px-5 pt-4 pb-5 flex flex-col gap-3 bg-surface rounded-2xl border-border-solid border">
                <p
                    className="text-lg font-semibold leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200"
                    style={{ color: "var(--text-main)" }}
                >
                    {query?.query}
                </p>
            </CardContent>
        </div>
    );
}