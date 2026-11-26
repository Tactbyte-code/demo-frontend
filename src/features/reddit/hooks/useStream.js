
import { getToken } from "@/lib/getToken";
import { FAILURE_MESSAGES } from "@/utils/reddit/constants";

export function useStreamLabel(sources) {
    return (chunk) => {
        const count = sources?.length;

        switch (chunk.status) {
            case "CREATED":
                return "Query saved to database";
            case "CLARIFIED":
                return "Intent understood — ready to search Reddit";
            case "WEB_SEARCHING":
                return "Searching Reddit for relevant threads...";
            case "SEARCH_COMPLETE":
                return `Found ${count} Reddit posts`;
            case "SUMMARIZING":
                return "Analysing 10 posts — generating answer...";
            case "COMPLETED":
                return `Done — answer ready from ${count} Reddit posts`;
            case "FAILED":
                return `Failed — ${FAILURE_MESSAGES[chunk.failure_reason] ?? "Unknown error"}`;
            case "TIMEOUT":
                return "Request timed out";
            case "CANCELLED":
                return "Cancelled";
            default:
                return chunk.status;
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
    const token = await getToken();

    const headers = {};

    // Only send Authorization when an actual token exists.
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reddit/query/${queryId}/${endpoint}`,
        {
            method: "POST",
            headers,
            credentials: "include",
        }
    );

    if (!response.ok) {
        const error = await response.json().catch(() => null);

        throw new Error(
            error?.detail || `Request failed with status ${response.status}`
        );
    }

    if (!response.body) {
        throw new Error("The server returned an empty response stream.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    const processLine = async (rawLine) => {
        let line = rawLine.trim();

        if (!line) return;

        // Support Server-Sent Events as well as newline-delimited JSON.
        if (line.startsWith(":")) return;

        if (line.startsWith("data:")) {
            line = line.slice(5).trim();
        } else if (
            line.startsWith("event:") ||
            line.startsWith("id:") ||
            line.startsWith("retry:")
        ) {
            return;
        }

        if (!line || line === "[DONE]") return;

        let data;

        try {
            data = JSON.parse(line);
        } catch (error) {
            console.error("Invalid streaming JSON:", line, error);
            throw new Error("Received an invalid event from the analysis stream.");
        }

        if (data.status) {
            onStatus?.(data.status);
        }

        if (data.answer) {
            onAnswer?.(data.answer);
        }

        if (data.failure_reason) {
            onFailureReason?.(data.failure_reason);
        }

        if (data.failed_at_step) {
            onFailedAtStep?.(data.failed_at_step);
        }

        if (data.results) {
            onResults?.(data.results);
            await onFetchPosts?.();
        } else if (data.status === "SEARCH_COMPLETE") {
            await onFetchPosts?.();
        }

        onChunk?.({
            ...data,
            _count: data.results?.length ?? data.total ?? null,
        });
    };

    try {
        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            // Keep incomplete JSON lines in the buffer.
            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");

            // The last part may be incomplete, so retain it.
            buffer = lines.pop() || "";

            for (const line of lines) {
                await processLine(line);
            }
        }

        // Flush any remaining decoder bytes.
        buffer += decoder.decode();

        // Process the final line if the stream doesn't end with a newline.
        if (buffer.trim()) {
            await processLine(buffer);
        }
    } catch (error) {
        await reader.cancel().catch(() => { });
        throw error;
    } finally {
        reader.releaseLock();
    }
}
