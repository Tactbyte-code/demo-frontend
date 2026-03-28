// _hooks/usePolling.js
import { useEffect, useRef } from "react";
import { getQuery } from "@/lib/api/reddit";

const POLL_INTERVAL_MS = 3000;
const MAX_POLLS = 100; // 5 min timeout

export function usePolling({ queryId, active, onStatusChange, onDone }) {
    const countRef = useRef(0);
    const timerRef = useRef(null);

    useEffect(() => {
        if (!active) {
            clearTimeout(timerRef.current);
            countRef.current = 0;
            return;
        }

        const poll = async () => {
            if (countRef.current >= MAX_POLLS) {
                onStatusChange("TIMEOUT");
                return;
            }

            try {
                const data = await getQuery(queryId);
                countRef.current += 1;

                onStatusChange(data.status, data);

                const isDone = ["SEARCH_COMPLETE", "COMPLETED", "FAILED", "TIMEOUT", "CANCELLED"].includes(data.status);
                if (isDone) {
                    // defer onDone so React flushes the onStatusChange state updates
                    // (postsLoaded: false, setSources([])) before fetchPosts runs
                    setTimeout(() => onDone(data), 0);
                    return;
                }
            } catch (e) {
                console.error("[poll] error", e);
            }

            timerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
        };

        poll();
        return () => clearTimeout(timerRef.current);
    }, [active, queryId]);
}