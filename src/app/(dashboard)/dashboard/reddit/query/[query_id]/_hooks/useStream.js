import { FAILURE_MESSAGES } from "./constants";
import { getToken } from "@/utils/getToken";

export function useStreamLabel(sources) {
    console.log('stream sources: ', sources);

    return (chunk) => {
        const count = sources?.length;
        switch (chunk.status) {
            case "CREATED": return "Query saved to database";
            case "CLARIFIED": return "Intent understood — ready to search Reddit";
            case "WEB_SEARCHING": return "Searching Reddit for relevant threads...";
            case "SEARCH_COMPLETE": return `Found ${count} Reddit posts`;
            case "SUMMARIZING": return `Analysing 10 posts — generating answer...`;
            case "COMPLETED": return `Done — answer ready from ${count} Reddit posts`;
            case "FAILED": return `Failed — ${FAILURE_MESSAGES[chunk.failure_reason] ?? "Unknown error"}`;
            case "TIMEOUT": return "Request timed out";
            case "CANCELLED": return "Cancelled";
            default: return chunk.status;
        }
    };
}

export async function streamRequest({
    queryId,
    endpoint,
    onStatus,
    onAnswer,
    onFailureReason,
    onFailedAtStep,
    onResults,
    onFetchPosts,
    onChunk,
}) {
    console.log('onStatus: ', onStatus);

    const token = await getToken();
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reddit/query/${queryId}/${endpoint}`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    );

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Request failed");
    };

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split("\n").filter(Boolean);

        for (const line of lines) {
            try {
                const data = JSON.parse(line);

                if (data.status) onStatus(data.status);
                if (data.answer) onAnswer(data.answer);
                if (data.failure_reason) onFailureReason(data.failure_reason);
                if (data.failed_at_step) onFailedAtStep?.(data.failed_at_step);

                if (data.results) {
                    onResults(data.results);
                    await onFetchPosts();
                } else if (data.status === "SEARCH_COMPLETE") {
                    await onFetchPosts();
                }

                onChunk({
                    ...data,
                    _count: data.results?.length ?? data.total ?? null,
                });
            } catch (e) {
                console.error("Stream parse error", e);
            }
        }
    }
}