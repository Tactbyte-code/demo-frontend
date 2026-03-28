import { useEffect, useRef } from "react";
import { getQueryStatus } from "@/lib/api/playstore";

const TERMINAL_STATUSES = ["COMPLETED", "FAILED"];
const POLL_INTERVAL_MS = 3000;

/**
 * usePolling
 * Polls GET /playstore/query/:id/status on an interval while `active` is true.
 * Stops automatically on terminal statuses or when deactivated.
 *
 * @param {object} opts
 * @param {string}   opts.queryId
 * @param {boolean}  opts.active           – start/stop the loop
 * @param {function} opts.onStatusChange   – (newStatus, data) called on every non-terminal tick
 * @param {function} opts.onDone           – (data) called once when terminal status is reached
 */
export function usePolling({ queryId, active, onStatusChange, onDone }) {
    const timerRef = useRef(null);
    const onChangeRef = useRef(onStatusChange);
    const onDoneRef = useRef(onDone);

    // Keep refs fresh without restarting the loop
    useEffect(() => { onChangeRef.current = onStatusChange; }, [onStatusChange]);
    useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

    useEffect(() => {
        if (!active || !queryId) return;

        let cancelled = false;

        const poll = async () => {
            try {
                const data = await getQueryStatus(queryId);
                if (cancelled) return;

                if (TERMINAL_STATUSES.includes(data.status)) {
                    onDoneRef.current?.(data);
                    return; // stop recursing
                }

                onChangeRef.current?.(data.status, data);
                timerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
            } catch (e) {
                console.error("[usePolling] error:", e);
                if (!cancelled) {
                    timerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
                }
            }
        };

        poll();

        return () => {
            cancelled = true;
            clearTimeout(timerRef.current);
        };
    }, [active, queryId]);
}