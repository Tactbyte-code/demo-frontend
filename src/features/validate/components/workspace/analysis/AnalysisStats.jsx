import { Activity, CheckCircle2, Layers3 } from "lucide-react";

const statConfig = [
    {
        key: "total",
        label: "Total analyses",
        icon: Layers3,
    },
    {
        key: "completed",
        label: "Completed",
        icon: CheckCircle2,
    },
    {
        key: "processing",
        label: "In progress",
        icon: Activity,
    },
];

export default function AnalysisStats({
    total,
    completed,
    processing,
}) {
    const values = {
        total,
        completed,
        processing,
    };

    return (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {statConfig.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.key}
                        className="rounded-lg border border-slate-100 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.09)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.14)]"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                {stat.label}
                            </p>

                            <Icon
                                size={19}
                                className="text-violet-500"
                            />
                        </div>

                        <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                            {values[stat.key]}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}