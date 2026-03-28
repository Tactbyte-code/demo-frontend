import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function QueryCard({ query }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border p-5 mb-8"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }}
        >
            <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--primary)" }}>
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
                    Your question
                </span>
            </div>
            <p className="text-lg font-semibold leading-relaxed" style={{ color: "var(--text-main)" }}>
                {query?.query}
            </p>
        </motion.div>
    );
}