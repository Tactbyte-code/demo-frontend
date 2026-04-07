"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";

function StarRating({ score }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    className="w-3 h-3"
                    fill={s <= score ? "var(--warning, #f59e0b)" : "none"}
                    style={{ color: s <= score ? "var(--warning, #f59e0b)" : "var(--border-solid)" }}
                />
            ))}
        </div>
    );
}

function fmtDate(dateStr) {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function ReviewCard({ review, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="p-4 flex flex-col gap-2"
            style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border-solid)",
            }}
        >
            <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold" style={{ color: "var(--text-main)" }}>
                        {review.username || "Anonymous"}
                    </span>
                    <StarRating score={review.score ?? 0} />
                </div>
                <div className="flex items-center gap-3">
                    {review.thumbs_up > 0 && (
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" style={{ color: "var(--text-subtle)" }} />
                            <span className="text-xs" style={{ color: "var(--text-subtle)" }}>{review.thumbs_up}</span>
                        </div>
                    )}
                    {review.review_created && (
                        <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                            {fmtDate(review.review_created)}
                        </span>
                    )}
                </div>
            </div>

            {review.content && (
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {review.content}
                </p>
            )}

            {review.reply_content && (
                <div
                    className="mt-1 px-3 py-2 rounded-lg text-xs leading-relaxed"
                    style={{
                        backgroundColor: "color-mix(in srgb, var(--primary) 6%, var(--background))",
                        border: "1px solid color-mix(in srgb, var(--primary) 15%, transparent)",
                        color: "var(--text-muted)",
                    }}
                >
                    <span className="font-semibold" style={{ color: "var(--primary)" }}>Dev reply · </span>
                    {review.reply_content}
                </div>
            )}
        </motion.div>
    );
}

export function ReviewsList({ reviewsLoaded, showReviews, reviews }) {
    if (!showReviews) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 flex flex-col gap-4"
            style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border-solid)",
                boxShadow: "var(--shadow-sm)",
            }}
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" style={{ color: "var(--primary)" }} />
                    <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
                        Reviews
                    </h3>
                </div>
                {reviewsLoaded && (
                    <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{
                            backgroundColor: "color-mix(in srgb, var(--primary) 10%, var(--surface))",
                            color: "var(--primary)",
                            border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)",
                        }}
                    >
                        {reviews.length} reviews
                    </span>
                )}
            </div>

            {!reviewsLoaded ? (
                <div className="flex flex-col gap-3 animate-pulse">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-20" style={{ backgroundColor: "var(--border-solid)" }} />
                    ))}
                </div>
            ) : reviews.length === 0 ? (
                <p className="text-sm py-4 text-center" style={{ color: "var(--text-subtle)" }}>
                    No reviews found.
                </p>
            ) : (
                <div className="flex flex-col gap-3 max-h-150 overflow-y-auto pr-1">
                    {reviews.map((r, i) => (
                        <ReviewCard key={r.id ?? r.review_id ?? i} review={r} index={i} />
                    ))}
                </div>
            )}
        </motion.div>
    );
}