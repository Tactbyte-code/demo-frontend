import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function StreamLog({ streamChunks, getStreamLabel }) {
    const streamEndRef = useRef(null);

    useEffect(() => {
        streamEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [streamChunks]);

    return (
        <AnimatePresence>
            {streamChunks.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-t"
                    style={{ borderColor: "var(--border-solid)" }}
                >
                    <div
                        className="px-6 py-4 font-mono text-[11px] space-y-1.5 max-h-40 overflow-y-auto"
                        style={{ backgroundColor: "var(--surface-card)" }}
                    >
                        {streamChunks.map((chunk, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -4 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-start gap-2"
                            >
                                <span style={{ color: "var(--text-subtle)" }}>{String(i + 1).padStart(2, "0")}</span>
                                <span style={{
                                    color: ["FAILED", "TIMEOUT"].includes(chunk.status) ? "var(--destructive)"
                                        : ["COMPLETED", "SEARCH_COMPLETE"].includes(chunk.status) ? "var(--success)"
                                            : "var(--text-muted)",
                                }}>
                                    {getStreamLabel(chunk)}
                                </span>
                            </motion.div>
                        ))}
                        <div ref={streamEndRef} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}