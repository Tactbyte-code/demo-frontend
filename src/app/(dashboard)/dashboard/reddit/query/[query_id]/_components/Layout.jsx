export function PageShell({ children }) {
    return (
        <div className="min-h-screen px-10 py-6" style={{ backgroundColor: "var(--background)" }}>
            <div className="w-full max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    );
}

export function LoadingSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">

            {/* Top Header Bar */}
            <div className="h-14 w-full border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }} />

            {/* Summary Block */}
            <div className="border p-5 space-y-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }}>
                <div className="h-4 w-28" style={{ backgroundColor: "var(--surface-raised)" }} />
                <div className="h-6 w-2/3" style={{ backgroundColor: "var(--surface-raised)" }} />
            </div>

            {/* Grid Section 1 */}
            <div className="border overflow-hidden" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }}>
                <div className="p-5 space-y-3">
                    <div className="h-4 w-32" style={{ backgroundColor: "var(--surface-raised)" }} />
                    <div className="h-1 w-full" style={{ backgroundColor: "var(--surface-raised)" }} />
                </div>

                <div className="grid border-t" style={{ gridTemplateColumns: "repeat(7, 1fr)", borderColor: "var(--border-solid)" }}>
                    {[...Array(14)].map((_, i) => (
                        <div key={i} className="px-3 py-4 border-r last:border-r-0" style={{ borderColor: "var(--border-solid)" }}>
                            <div className="h-2 w-2 mb-2" style={{ backgroundColor: "var(--surface-raised)" }} />
                            <div className="h-3 w-full" style={{ backgroundColor: "var(--surface-raised)" }} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Grid Section 2 */}
            <div className="border overflow-hidden" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }}>
                <div className="p-5 space-y-3">
                    <div className="h-4 w-32" style={{ backgroundColor: "var(--surface-raised)" }} />
                    <div className="h-1 w-full" style={{ backgroundColor: "var(--surface-raised)" }} />
                </div>

                <div className="grid border-t" style={{ gridTemplateColumns: "repeat(7, 1fr)", borderColor: "var(--border-solid)" }}>
                    {[...Array(14)].map((_, i) => (
                        <div key={i} className="px-3 py-4 border-r last:border-r-0" style={{ borderColor: "var(--border-solid)" }}>
                            <div className="h-2 w-2 mb-2" style={{ backgroundColor: "var(--surface-raised)" }} />
                            <div className="h-3 w-full" style={{ backgroundColor: "var(--surface-raised)" }} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Info Block */}
            <div className="border p-5 space-y-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }}>
                <div className="h-4 w-24" style={{ backgroundColor: "var(--surface-raised)" }} />
                <div className="h-6 w-1/2" style={{ backgroundColor: "var(--surface-raised)" }} />
            </div>

        </div>
    );
}