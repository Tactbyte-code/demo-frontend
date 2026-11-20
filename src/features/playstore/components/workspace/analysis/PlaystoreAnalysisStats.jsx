
import { Activity, CheckCircle2, Layers3 } from "lucide-react";

const statConfig = [
    { key: "total", label: "Total analyses", icon: Layers3 },
    { key: "completed", label: "Completed", icon: CheckCircle2 },
    { key: "processing", label: "In progress", icon: Activity },
];

export default function PlaystoreAnalysisStats({
    total,
    completed,
    processing,
}) {
    const values = { total, completed, processing };

    return (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {statConfig.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.key}
                        className="rounded-lg border border-[#DCEBE0] bg-white p-5 shadow-[0_8px_28px_rgba(24,128,56,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A8D5B3] hover:shadow-[0_16px_40px_rgba(24,128,56,0.12)]"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[#718477]">
                                {stat.label}
                            </p>

                            <Icon size={19} className="text-[#188038]" />
                        </div>

                        <p className="mt-3 text-3xl font-bold tracking-tight text-[#142B1B]">
                            {values[stat.key]}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
