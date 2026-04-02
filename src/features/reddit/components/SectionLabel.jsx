export function SectionLabel({ icon, label }) {
    return (
        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-400 mb-4">
            <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 animate-in zoom-in-75 duration-300"
                style={{ backgroundColor: "var(--primary)" }}
            >
                {icon}
            </div>
            <span
                className="text-[16px] font-semibold tracking-wide"
                style={{ color: "var(--text-subtle)" }}
            >
                {label}
            </span>
        </div>
    );
}