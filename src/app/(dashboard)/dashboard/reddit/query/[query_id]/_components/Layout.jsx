export function PageShell({ children }) {
    return (
        <div className="min-h-screen p-8" style={{ backgroundColor: "var(--background)" }}>
            <div className="w-full max-w-7xl mx-auto">{children}</div>
        </div>
    );
}

export function LoadingSkeleton() {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="h-6 w-16 rounded-lg" style={{ backgroundColor: "var(--surface)" }} />
            <div className="rounded-2xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }}>
                <div className="h-4 w-24 rounded mb-3" style={{ backgroundColor: "var(--surface-raised)" }} />
                <div className="h-6 w-3/4 rounded" style={{ backgroundColor: "var(--surface-raised)" }} />
            </div>
            <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }}>
                <div className="p-5 space-y-3">
                    <div className="h-4 w-32 rounded" style={{ backgroundColor: "var(--surface-raised)" }} />
                    <div className="h-1.5 rounded-full" style={{ backgroundColor: "var(--surface-raised)" }} />
                </div>
                <div className="grid border-t" style={{ gridTemplateColumns: "repeat(7, 1fr)", borderColor: "var(--border-solid)" }}>
                    {[...Array(14)].map((_, i) => (
                        <div key={i} className="px-3 py-4 border-r last:border-r-0" style={{ borderColor: "var(--border-solid)" }}>
                            <div className="h-2 w-2 rounded-full mb-2" style={{ backgroundColor: "var(--surface-raised)" }} />
                            <div className="h-3 rounded w-full" style={{ backgroundColor: "var(--surface-raised)" }} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }}>
                <div className="p-5 space-y-3">
                    <div className="h-4 w-32 rounded" style={{ backgroundColor: "var(--surface-raised)" }} />
                    <div className="h-1.5 rounded-full" style={{ backgroundColor: "var(--surface-raised)" }} />
                </div>
                <div className="grid border-t" style={{ gridTemplateColumns: "repeat(7, 1fr)", borderColor: "var(--border-solid)" }}>
                    {[...Array(14)].map((_, i) => (
                        <div key={i} className="px-3 py-4 border-r last:border-r-0" style={{ borderColor: "var(--border-solid)" }}>
                            <div className="h-2 w-2 rounded-full mb-2" style={{ backgroundColor: "var(--surface-raised)" }} />
                            <div className="h-3 rounded w-full" style={{ backgroundColor: "var(--surface-raised)" }} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="rounded-2xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }}>
                <div className="h-4 w-24 rounded mb-3" style={{ backgroundColor: "var(--surface-raised)" }} />
                <div className="h-6 w-3/4 rounded" style={{ backgroundColor: "var(--surface-raised)" }} />
            </div>
        </div>
    );
}