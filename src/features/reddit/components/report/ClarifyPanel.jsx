"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, MessageCircleQuestion, SkipForward } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitClarification } from "../../hooks/useRedditAnalysis";

/**
 * Inline clarification UI shown when status === "CLARIFYING".
 * Reads the latest assistant question from the cached query and submits answers
 * through a TanStack mutation. The parent keeps polling paused until a
 * non-CLARIFYING status comes back.
 */
export default function ClarifyPanel({ queryId, data }) {
  const [selected, setSelected] = useState(null); // option text | "others"
  const [custom, setCustom] = useState("");
  const textareaRef = useRef(null);

  const mutation = useSubmitClarification(queryId);
  const submitting = mutation.isPending;

  const count = data?.clarification_count ?? 1;

  const { question, options } = useMemo(() => {
    const history = data?.conversation_history || [];
    const last = [...history].reverse().find((m) => m.role === "assistant");
    return { question: last?.content || "", options: last?.options || [] };
  }, [data?.conversation_history]);

  // Reset local selection whenever a new question arrives.
  useEffect(() => {
    setSelected(null);
    setCustom("");
  }, [count, question]);

  useEffect(() => {
    if (selected === "others") textareaRef.current?.focus();
  }, [selected]);

  const canSubmit =
    !submitting &&
    ((selected && selected !== "others") ||
      (selected === "others" && custom.trim().length > 0));

  const submit = (skip = false) => {
    if (!skip && !canSubmit) return;
    const answer = skip ? "" : selected === "others" ? custom.trim() : selected;
    mutation.mutate({ answer, skip });
  };

  const errorMessage =
    mutation.error?.response?.data?.detail ||
    (mutation.isError ? "Something went wrong. Please try again." : null);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FF4500] to-[#FF7A45] text-white shadow-md shadow-orange-200">
            <MessageCircleQuestion size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF4500]">
              Quick clarification
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={count}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18 }}
                className="text-sm font-semibold text-[#1A1A1B]"
              >
                Question {count}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {!submitting && (
          <div className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF4500] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4500]" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C23B00]">
              Waiting for you
            </span>
          </div>
        )}
      </div>

      {/* Question + options */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${count}-${question}`}
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          <div className="rounded-2xl rounded-tl-sm border border-orange-100 bg-[#FFF6F1] px-4 py-3.5">
            <p className="text-sm font-medium leading-6 text-[#1A1A1B]">
              {question}
            </p>
          </div>

          {options.length > 0 && (
            <div className="flex flex-col gap-2">
              {[...options, "Others"].map((opt, i) => {
                const isOthers = opt === "Others";
                const value = isOthers ? "others" : opt;
                const isSelected = selected === value;

                return (
                  <motion.button
                    key={opt}
                    type="button"
                    disabled={submitting}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.22 }}
                    onClick={() => setSelected(value)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
                      isSelected
                        ? "border-[#FF4500] bg-orange-50 font-semibold text-[#C23B00] shadow-sm ring-1 ring-orange-200"
                        : "border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50/40"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        isSelected
                          ? "border-[#FF4500] bg-[#FF4500]"
                          : "border-slate-300"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Free-text: shown for "Others", or as the only input if no options */}
          {(selected === "others" || options.length === 0) && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-slate-500">
                Describe what you&apos;re looking for
              </p>
              <Textarea
                ref={textareaRef}
                value={custom}
                disabled={submitting}
                onChange={(e) => {
                  setCustom(e.target.value);
                  if (options.length === 0) setSelected("others");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit(false);
                  }
                }}
                placeholder="Type your answer..."
                className="min-h-[96px] rounded-xl border-slate-200 focus-visible:border-[#FF4500] focus-visible:ring-orange-200"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {errorMessage && (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
          {errorMessage}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          disabled={submitting}
          onClick={() => submit(true)}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition-colors hover:border-orange-300 hover:text-[#C23B00] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SkipForward size={15} />
          Skip
        </button>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => submit(false)}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-[#FF4500] to-[#FF6A33] px-5 text-sm font-semibold text-white shadow-lg shadow-orange-200/70 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {submitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Continue
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}