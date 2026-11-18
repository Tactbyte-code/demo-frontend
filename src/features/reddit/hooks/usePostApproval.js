import { useRef, useState } from "react";
import api from "@/lib/axios";
import { MAX_APPROVED } from "../_hooks/constants";

export function usePostApproval(queryId, sources, setSources) {
    const [approvalError, setApprovalError] = useState(null);
    const [pendingIds, setPendingIds] = useState(new Set());
    const timerRef = useRef({});

    const approvedCount = sources.filter(s => s.user_approved).length;

    const setPending = (id) => setPendingIds(prev => new Set([...prev, id]));
    const clearPending = (id) => setPendingIds(prev => { const s = new Set(prev); s.delete(id); return s; });

    // ── single toggle ──────────────────────────────────────────────────────────
    const handleToggleApproval = (postId, currentApproved) => {
        setApprovalError(null);
        const next = !currentApproved;

        // guard before even debouncing
        if (next && approvedCount >= MAX_APPROVED && !currentApproved) {
            setApprovalError(`You can only select up to ${MAX_APPROVED} posts.`);
            return;
        }

        // show spinner immediately — no optimistic value change
        setPending(postId);

        clearTimeout(timerRef.current[postId]);
        timerRef.current[postId] = setTimeout(async () => {
            try {
                const res = await api.patch(`/reddit/query/${queryId}/posts/${postId}`, {
                    user_approved: next,
                });
                // only update from server response
                setSources(prev =>
                    prev.map(s => s.id === postId ? { ...s, user_approved: res.data.user_approved } : s)
                );
            } catch (err) {
                // nothing to revert — we never changed the value
                if (err.response?.status === 400) setApprovalError(err.response.data.detail);
            } finally {
                clearPending(postId);
                delete timerRef.current[postId];
            }
        }, 300);
    };

    // ── select top 10 ──────────────────────────────────────────────────────────
    const handleSelectTop10 = () => {
        setApprovalError(null);

        sources.forEach((source, i) => {
            const shouldBeSelected = i < MAX_APPROVED;
            if (source.user_approved === shouldBeSelected) return;

            setPending(source.id);
            clearTimeout(timerRef.current[source.id]);

            timerRef.current[source.id] = setTimeout(async () => {
                try {
                    const res = await api.patch(`/reddit/query/${queryId}/posts/${source.id}`, {
                        user_approved: shouldBeSelected,
                    });
                    setSources(prev =>
                        prev.map(s => s.id === source.id ? { ...s, user_approved: res.data.user_approved } : s)
                    );
                } catch (err) {
                    if (err.response?.status === 400) setApprovalError(err.response.data.detail);
                    console.error(err);
                } finally {
                    clearPending(source.id);
                    delete timerRef.current[source.id];
                }
            }, 300);
        });
    };

    return {
        approvedCount,
        approvalError,
        pendingIds,
        setApprovalError,
        handleToggleApproval,
        handleSelectTop10,
    };
}