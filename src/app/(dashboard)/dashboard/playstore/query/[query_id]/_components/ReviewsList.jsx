"use client";

import { motion } from "framer-motion";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function StarRating({ score }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    className="w-3 h-3"
                    fill={s <= score ? "var(--color-warning)" : "none"}
                    style={{ color: s <= score ? "var(--color-warning)" : "var(--color-border-solid)" }}
                />
            ))}
        </div>
    );
}

function fmtDate(dateStr) {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function ReviewCard({ review, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
        >
            <Card
                className="border border-[var(--color-border-solid)] shadow-sm rounded-none"
                style={{ backgroundColor: "var(--color-surface)" }}
            >
                <CardContent className="p-4 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-[var(--color-foreground)]">
                                {review.username || "Anonymous"}
                            </span>
                            <StarRating score={review.score ?? 0} />
                        </div>

                        <div className="flex items-center gap-3">
                            {review.thumbs_up > 0 && (
                                <div className="flex items-center gap-1 text-[var(--color-subtle)]">
                                    <ThumbsUp className="w-3 h-3" />
                                    <span className="text-xs">{review.thumbs_up}</span>
                                </div>
                            )}

                            {review.review_created && (
                                <span className="text-xs text-[var(--color-subtle)]">
                                    {fmtDate(review.review_created)}
                                </span>
                            )}
                        </div>
                    </div>

                    {review.content && (
                        <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                            {review.content}
                        </p>
                    )}

                    {review.reply_content && (
                        <div
                            className="mt-1 px-3 py-2 text-xs leading-relaxed border rounded-none"
                            style={{
                                backgroundColor: "var(--color-info-bg)",
                                borderColor: "var(--color-info)",
                                color: "var(--color-muted)",
                            }}
                        >
                            <span className="font-semibold text-[var(--color-primary)]">
                                Dev reply ·{" "}
                            </span>
                            {review.reply_content}
                        </div>
                    )}
                </CardContent>
            </Card>
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
        >
            <Card
                className="border border-[var(--color-border-solid)] shadow-sm rounded-none"
                style={{ backgroundColor: "var(--color-surface)" }}
            >
                <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                    <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-[var(--color-primary)]" />
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-subtle)]">
                            Reviews
                        </h3>
                    </div>

                    {reviewsLoaded && (
                        <Badge
                            className="rounded-none text-xs font-semibold border"
                            style={{
                                backgroundColor: "var(--color-info-bg)",
                                color: "var(--color-primary)",
                                borderColor: "var(--color-info)",
                            }}
                        >
                            {reviews.length} reviews
                        </Badge>
                    )}
                </CardHeader>

                <CardContent className="p-6 pt-2 flex flex-col gap-4">
                    {!reviewsLoaded ? (
                        <div className="flex flex-col gap-3 animate-pulse">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-20 border border-[var(--color-border-solid)] rounded-none"
                                    style={{ backgroundColor: "var(--color-surface-raised)" }}
                                />
                            ))}
                        </div>
                    ) : reviews.length === 0 ? (
                        <p className="text-sm py-4 text-center text-[var(--color-subtle)]">
                            No reviews found.
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-1">
                            {reviews.map((r, i) => (
                                <ReviewCard
                                    key={r.id ?? r.review_id ?? i}
                                    review={r}
                                    index={i}
                                />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}