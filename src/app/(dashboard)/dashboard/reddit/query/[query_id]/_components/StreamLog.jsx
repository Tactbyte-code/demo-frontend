import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";

const STAGE_STATEMENTS = {
    CLARIFIED: [
        "Parsing your question...",
        "Identifying core intent...",
        "Extracting search signals...",
        "Mapping to Reddit topics...",
        "Resolving ambiguous terms...",
        "Intent confirmed — ready to search",
    ],
    WEB_SEARCHING: [
        "Hitting Reddit API...",
        "Scanning r/all for threads...",
        "Filtering by relevance score...",
        "Pulling top comments...",
        "Checking post engagement metrics...",
        "Sorting by recency & upvotes...",
        "Collecting thread metadata...",
        "Deduplicating results...",
        "Scanning subreddit crosslinks...",
        "Fetching comment trees...",
        "Evaluating post flair & tags...",
        "Checking award counts...",
        "Filtering NSFW & removed posts...",
        "Resolving shortened URLs...",
        "Ranking by community votes...",
        "Pulling pinned moderator comments...",
        "Validating post timestamps...",
        "Aggregating related threads...",
    ],
    SEARCH_COMPLETE: [
        "Threads collected successfully...",
        "Validating post metadata...",
        "Ranking by relevance...",
        "Filtering low-quality posts...",
        "Preparing posts for analysis...",
        "Cross-checking thread sources...",
    ],
    SUMMARIZING: [],
    COMPLETED: [
        "Finalising your answer...",
        "Structuring key insights...",
        "Formatting response...",
        "Verifying source attribution...",
        "Answer ready",
    ],
};

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function StatementTicker({ statements, flushAndSwitch }) {
    const [index, setIndex] = useState(0);
    const flushRef = useRef(false);

    useEffect(() => {
        setIndex(0);
        flushRef.current = false;
        let i = 0;
        let cancelled = false;
        let timeoutId;

        const schedule = (flush = false) => {
            const delay = flush ? randomBetween(180, 350) : randomBetween(4000, 5500);
            timeoutId = setTimeout(() => {
                if (cancelled) return;
                i += 1;
                if (i < statements.length) {
                    setIndex(i);
                    schedule(flushRef.current);
                }
            }, delay);
        };

        schedule();

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
    }, [statements]);

    // when parent signals status changed, flip flush mode so remaining
    // statements race through quickly before the parent swaps statements
    useEffect(() => {
        if (flushAndSwitch) {
            flushRef.current = true;
        }
    }, [flushAndSwitch]);

    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                style={{ color: "var(--text-muted)" }}
            >
                {statements[index]}
            </motion.span>
        </AnimatePresence>
    );
}

function PostsTicker({ sources }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!sources?.length) return;
        setCurrentIndex(0);

        let i = 0;
        let cancelled = false;

        const tick = () => {
            const t = setTimeout(() => {
                if (cancelled) return;
                i += 1;
                if (i < sources.length) {
                    setCurrentIndex(i);
                    tick();
                }
            }, randomBetween(4000, 5500));
            return t;
        };

        const t = setTimeout(() => { if (!cancelled) tick(); }, randomBetween(400, 700));
        return () => { cancelled = true; clearTimeout(t); };
    }, [sources]);

    if (!sources?.length) return null;

    const currentPost = sources[currentIndex];
    const allDone = currentIndex >= sources.length - 1;

    return (
        <div className="space-y-1.5">
            <div className="flex items-center gap-2 mb-2">
                <FileText style={{ color: "var(--text-subtle)", width: 11, height: 11 }} />
                <span
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: "var(--text-subtle)" }}
                >
                    Analyzing {currentIndex + 1} of {sources.length} posts
                </span>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPost?.id ?? currentIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-2"
                >
                    <span className="tabular-nums" style={{ color: "var(--text-subtle)" }}>
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

            <AnimatePresence>
                {allDone && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-2 pt-1"
                    >
                        <span style={{ color: "var(--success)" }}>✓</span>
                        <span className="font-semibold" style={{ color: "var(--success)" }}>
                            {sources.length} posts analyzed — generating answer…
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function StreamLog({ sources = [], status }) {
    const bottomRef = useRef(null);
    const prevStatusRef = useRef(status);
    const [flushing, setFlushing] = useState(false);
    const [displayedStatus, setDisplayedStatus] = useState(status);

    useEffect(() => {
        if (status === prevStatusRef.current) return;

        // signal the current ticker to flush remaining statements fast
        setFlushing(true);

        // after enough time for remaining statements to race through, switch
        const t = setTimeout(() => {
            setDisplayedStatus(status);
            setFlushing(false);
            prevStatusRef.current = status;
        }, 1200); // 1.2s window for flush to complete

        return () => clearTimeout(t);
    }, [status]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [displayedStatus]);

    const showTicker = ["CLARIFIED", "WEB_SEARCHING", "SEARCH_COMPLETE", "COMPLETED"].includes(displayedStatus);
    const showPosts = displayedStatus === "SUMMARIZING" && sources.length > 0;
    const visible = showTicker || showPosts;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border"
                    style={{ borderColor: "var(--border-solid)" }}
                >
                    <div
                        className="px-6 py-4 font-mono text-[11px] max-h-48 overflow-y-auto"
                        style={{ backgroundColor: "var(--surface-card)" }}
                    >
                        {showTicker && (
                            <div className="flex items-start gap-2">
                                <span style={{ color: "var(--text-subtle)" }}>→</span>
                                <StatementTicker
                                    key={displayedStatus}
                                    statements={STAGE_STATEMENTS[displayedStatus]}
                                    flushAndSwitch={flushing}
                                />
                            </div>
                        )}

                        {showPosts && <PostsTicker sources={sources} />}

                        <div ref={bottomRef} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}