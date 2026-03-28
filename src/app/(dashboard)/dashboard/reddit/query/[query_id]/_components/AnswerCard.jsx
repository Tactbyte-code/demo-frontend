import { motion, AnimatePresence } from "framer-motion";

export function AnswerCard({ answer }) {
    return (
        <AnimatePresence>
            {answer && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border p-6 mb-8"
                    style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }}
                >
                    <span
                        className="text-[10px] font-mono font-extrabold uppercase tracking-widest block mb-4"
                        style={{ color: "var(--text-subtle)" }}
                    >
                        Answer
                    </span>
                    <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-main)", lineHeight: 1.9 }}
                    >
                        {answer}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}