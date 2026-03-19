import { ChevronRight } from "lucide-react";
import Link from "next/link";

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export default function JobRow({ job }) {
    const getStatusStyle = (status) => {
        switch (status) {
            case "COMPLETED": return { bg: 'var(--success-bg)', text: 'var(--success)', label: 'Ready' };
            case "PROCESSING": return { bg: 'var(--info-bg)', text: 'var(--info)', label: 'Processing' };
            case "USER_PENDING": return { bg: 'var(--warning-bg)', text: 'var(--warning)', label: 'Selection Needed' };
            case "FAILED": return { bg: 'var(--destructive-bg)', text: 'var(--destructive)', label: 'Failed' };
            default: return { bg: 'var(--surface-raised)', text: 'var(--text-subtle)', label: status };
        }
    };

    const style = getStatusStyle(job.status);
    const isProcessing = job.status === "PROCESSING";

    return (
        <tr className="transition-colors" style={{ backgroundColor: "var(--surface)" }}>
            <td className="px-6 py-4 text-sm font-medium" style={{ color: "var(--text-main)" }}>{job.query}</td>
            <td className="px-6 py-4 text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>{formatDate(job.created_at)}</td>
            <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
                    style={{ backgroundColor: style.bg, color: style.text }}>
                    {isProcessing && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                    {style.label}
                </span>
            </td>
            <td className="px-6 py-4">
                {job.status === "USER_PENDING" ? (
                    <Link href={`/dashboard/posts?jobId=${job.id}`} className="bg-primary inline-flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest text-white hover:opacity-90 transition-all shadow-sm">
                        Select Post
                    </Link>
                ) : job.status === "COMPLETED" ? (
                    <Link href={`/dashboard/posts/summary?jobId=${job.id}`}
                        className="text-xs font-bold flex items-center gap-1 hover:underline"
                        style={{ color: "var(--primary)" }}>
                        View Summary <ChevronRight className="w-3 h-3" />
                    </Link>
                ) : isProcessing ? (
                    <span className="text-[10px] font-mono italic" style={{ color: "var(--text-subtle)", opacity: 0.5 }}>
                        Analyzing...
                    </span>
                ) : null}
            </td>
        </tr>
    );
}