import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { STEPS } from "../_hooks/constants";

const SPRING = { duration: 0.45, ease: [0.4, 0, 0.2, 1] };

export function PipelineSteps({ currentStep, isCompleted, isTerminal }) {
    return (
        /* Changed from 'flex' to 'flex-col md:flex-row' 
           Added 'w-full' to ensure it fills the container.
        */
        <div className="flex flex-col md:flex-row gap-2 md:gap-1.5 items-stretch w-full">
            {STEPS.map((step, i) => {
                const done = i < currentStep || isCompleted;
                const active = i === currentStep && !isCompleted && !isTerminal;
                const failed = isTerminal && i === currentStep;
                const pending = !done && !active && !failed;

                const Icon = step.icon;

                const iconColor = done ? "var(--success)"
                    : active ? "var(--primary)"
                        : failed ? "var(--destructive)"
                            : "var(--text-subtle)";

                const iconBg = done ? "var(--success-bg, rgba(34,197,94,0.12))"
                    : active ? "var(--primary-bg, rgba(99,102,241,0.12))"
                        : failed ? "var(--destructive-bg, rgba(239,68,68,0.1))"
                            : "var(--surface-raised)";

                const borderColor = done ? "var(--success)"
                    : active ? "var(--primary)"
                        : failed ? "var(--destructive)"
                            : "var(--border-solid)";

                return (
                    <motion.div
                        key={step.key}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{
                            opacity: pending ? 0.45 : 1,
                            y: 0,
                            /* On mobile, flex stays 1. 
                               On desktop (md:), it uses the expanded 2.8 logic.
                            */
                            flex: typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : (active ? 2.8 : 1),
                            // Disable scaleY on mobile to prevent weird vertical jumps in column layout
                            scaleY: typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : (active ? 1.18 : 1),
                        }}
                        transition={{
                            opacity: { duration: 0.3 },
                            y: { duration: 0.3, delay: i * 0.07 },
                            flex: SPRING,
                            scaleY: SPRING,
                        }}
                        className="relative border overflow-hidden min-w-0 w-full md:w-auto"
                        style={{
                            background: active
                                ? "linear-gradient(135deg, var(--surface-raised), var(--surface))"
                                : "var(--surface)",
                            borderColor,
                            transformOrigin: "center",
                            transition: "border-color 0.3s",
                        }}
                    >
                        {active && (
                            <motion.div
                                className="absolute inset-0 pointer-events-none"
                                animate={{ opacity: [0.4, 0.9, 0.4] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                            />
                        )}

                        <motion.div
                            animate={{ 
                                // Disable inverse scaleY on mobile
                                scaleY: typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : (active ? 1 / 1.18 : 1) 
                            }}
                            transition={SPRING}
                            style={{ transformOrigin: "center" }}
                            className="flex items-center gap-3 px-3 py-3 w-full h-full"
                        >
                            <div
                                className="shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center"
                                style={{ background: iconBg }}
                            >
                                {done ? (
                                    <CheckCircle2 style={{ color: iconColor, width: 16, height: 16 }} />
                                ) : active ? (
                                    <Loader2 className="animate-spin" style={{ color: iconColor, width: 16, height: 16 }} />
                                ) : (
                                    Icon && <Icon style={{ color: iconColor, width: 16, height: 16 }} />
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p
                                    className="text-xs md:text-sm font-semibold mb-0.5 truncate"
                                    style={{ color: pending ? "var(--text-subtle)" : "var(--text-main)" }}
                                >
                                    {step.label}
                                </p>
                                <p
                                    className="text-[10px] md:text-[11px] truncate"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    {step.desc}
                                </p>
                            </div>

                            {/* Status pill - hidden on very small screens if necessary, or just kept small */}
                            <div className="flex shrink-0">
                                {done && <StatusPill label="Done" bg="var(--success-bg)" color="var(--success)" />}
                                {active && <StatusPill label="Running" bg="var(--primary-bg)" color="var(--primary)" />}
                                {failed && <StatusPill label="Failed" bg="var(--destructive-bg)" color="var(--destructive)" />}
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
}

// Helper component for cleaner code
function StatusPill({ label, bg, color }) {
    return (
        <span
            className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-1.5 md:px-2 py-0.5 rounded-full"
            style={{ background: bg, color: color }}
        >
            {label}
        </span>
    );
}