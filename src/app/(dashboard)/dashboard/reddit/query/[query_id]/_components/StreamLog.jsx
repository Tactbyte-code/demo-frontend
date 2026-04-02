import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";

// Reveals post titles one-by-one, gated by a per-item delay.
// Once all titles are visible it shows a subtle "analysis complete" line.
function PostsTicker({ sources }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    console.log('sourfedddwd: ', sources);

    useEffect(() => {
        if (sources.length === 0) return;

        setCurrentIndex(0);

        let i = 0;
        const tick = () => {
            i += 1;
            if (i < sources.length) {
                setCurrentIndex(i);
                // const delay = sources.length > 10 ? 120 : 200;
                const delay = 7000;
                setTimeout(tick, delay);
            }
        };

        const t = setTimeout(tick, 7000);
        return () => clearTimeout(t);
    }, [sources]);

    if (sources.length === 0) return null;

    const currentPost = sources[currentIndex];
    const allDone = currentIndex >= sources.length - 1;

    return (
        <div className="space-y-1.5">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
                <FileText style={{ color: "var(--text-subtle)", width: 11, height: 11 }} />
                <span
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: "var(--text-subtle)" }}
                >
                    Analyzing {currentIndex + 1} of {sources.length} posts
                </span>
            </div>

            {/* Single post display */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPost?.id ?? currentIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-2"
                >
                    <span
                        className="tabular-nums"
                        style={{ color: "var(--text-subtle)" }}
                    >
                        {String(currentIndex + 1).padStart(2, "0")}
                    </span>

                    <span
                        className="truncate"
                        style={{ color: "var(--text-muted)" }}
                        title={currentPost?.title}
                    >
                        {currentPost?.title ?? "Untitled post"}
                    </span>
                </motion.div>
            </AnimatePresence>

            {/* Done state */}
            <AnimatePresence>
                {allDone && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-start gap-2 pt-1"
                    >
                        <span style={{ color: "var(--success)" }}>✓</span>
                        <span
                            className="font-semibold"
                            style={{ color: "var(--success)" }}
                        >
                            {sources.length} posts analyzed — generating answer…
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function StreamLog({ streamChunks, getStreamLabel, sources = [] }) {
    const streamEndRef = useRef(null);

    useEffect(() => {
        streamEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [streamChunks]);

    const hasChunks = streamChunks.length > 0;
    const hasPosts = sources.length > 0;
    console.log('has posts: ', hasPosts);

    return (
        <AnimatePresence>
            {(hasChunks || hasPosts) && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border"
                    style={{ borderColor: "var(--border-solid)" }}
                >
                    <div
                        className="px-6 py-4 font-mono text-[11px] space-y-1.5 max-h-48 overflow-y-auto"
                        style={{ backgroundColor: "var(--surface-card)" }}
                    >
                        {/* ── Stream chunks ── */}
                        {streamChunks.map((chunk, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -4 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-start gap-2"
                            >
                                <span style={{ color: "var(--text-subtle)" }}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span style={{
                                    color: ["FAILED", "TIMEOUT"].includes(chunk.status)
                                        ? "var(--destructive)"
                                        : ["COMPLETED", "SEARCH_COMPLETE"].includes(chunk.status)
                                            ? "var(--success)"
                                            : "var(--text-muted)",
                                }}>
                                    {getStreamLabel(chunk)}
                                </span>
                            </motion.div>
                        ))}

                        {/* ── Divider between chunks and posts ticker ── */}
                        {hasChunks && hasPosts && (
                            <div
                                className="my-2 h-px opacity-30"
                                style={{ background: "var(--border-solid)" }}
                            />
                        )}

                        {/* ── Posts ticker ── */}
                        {hasPosts && <PostsTicker sources={sources} />}

                        <div ref={streamEndRef} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}