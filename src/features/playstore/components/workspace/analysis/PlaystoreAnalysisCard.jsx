
import {
    ArrowUpRight,
    CheckCircle2,
    Clock3,
    LoaderCircle,
    XCircle,
} from "lucide-react";

function getStatus(status) {
    const normalized = (status || "").toLowerCase();

    if (normalized === "completed") {
        return {
            label: "Completed",
            icon: CheckCircle2,
            className: "bg-[#E5F5E9] text-[#188038]",
        };
    }

    if (["failed", "error"].includes(normalized)) {
        return {
            label: "Failed",
            icon: XCircle,
            className: "bg-red-100/70 text-red-700",
        };
    }

    if (["created", "queued", "pending"].includes(normalized)) {
        return {
            label: "Queued",
            icon: Clock3,
            className: "bg-amber-100/70 text-amber-700",
        };
    }

    return {
        label: "Processing",
        icon: LoaderCircle,
        className: "bg-blue-100/70 text-blue-700",
    };
}

function formatDate(date) {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(parsedDate);
}

export default function PlaystoreAnalysisCard({
    analysis,
    onClick,
    isPlaceholderData = false,
}) {
    const status = getStatus(analysis.status);
    const StatusIcon = status.icon;

    const title =
        analysis.app_name ||
        analysis.title ||
        analysis.app_id ||
        "Untitled Play Store analysis";

    const createdAt =
        analysis.created_at ||
        analysis.createdAt;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isPlaceholderData}
            aria-busy={isPlaceholderData}
            className={`
                group flex w-full flex-col gap-4 rounded-xl
                border border-[#DCEBE0] bg-white p-5 text-left
                shadow-[0_3px_12px_rgba(24,128,56,0.04)]
                transition-all duration-300
                sm:flex-row sm:items-center sm:justify-between
                ${isPlaceholderData
                    ? "cursor-wait opacity-50 grayscale-[0.6]"
                    : "hover:-translate-y-1 hover:border-[#A8D5B3] hover:bg-[#F8FCF9] hover:shadow-[0_14px_32px_rgba(24,128,56,0.12)]"
                }
            `}
        >
            <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-[#142B1B]">
                    {title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#718477]">
                    <span>{formatDate(createdAt)}</span>

                    {analysis.app_id && (
                        <>
                            <span className="text-[#C5D8CA]">•</span>
                            <span className="truncate text-[#718477]">
                                {analysis.app_id}
                            </span>
                        </>
                    )}
                </div>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
                <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${status.className}`}
                >
                    <StatusIcon
                        size={13}
                        className={
                            ["processing", "running"].includes(
                                analysis.status?.toLowerCase()
                            )
                                ? "animate-spin"
                                : ""
                        }
                    />
                    {status.label}
                </span>

                <ArrowUpRight
                    size={18}
                    className="text-[#9AAF9F] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#188038]"
                />
            </div>
        </button>
    );
}
