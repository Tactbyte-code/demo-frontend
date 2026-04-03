import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { STEPS } from "../_hooks/constants";

const SPRING = { duration: 0.45, ease: [0.4, 0, 0.2, 1] };

export function PipelineSteps({ currentStep, isCompleted, isTerminal }) {
    return (
        <div className="flex gap-1.5 items-stretch">
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
                            flex: active ? 2.8 : 1,
                            scaleY: active ? 1.18 : 1,
                        }}
                        transition={{
                            opacity: { duration: 0.3 },
                            y: { duration: 0.3, delay: i * 0.07 },
                            flex: SPRING,
                            scaleY: SPRING,
                        }}
                        className="relative border overflow-hidden min-w-0"
                        style={{
                            background: active
                                ? "linear-gradient(135deg, var(--surface-raised), var(--surface))"
                                : "var(--surface)",
                            borderColor,
                            transformOrigin: "center",
                            transition: "border-color 0.3s",
                        }}
                    >
                        {/* Pulsing border ring on active step */}
                        {active && (
                            <motion.div
                                className="absolute inset-0 pointer-events-none"
                                // style={{ border: "1.5px solid var(--primary)" }}
                                animate={{ opacity: [0.4, 0.9, 0.4] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                            />
                        )}

                        {/* Inner wrapper — inverse scaleY to keep content crisp */}
                        <motion.div
                            animate={{ scaleY: active ? 1 / 1.18 : 1 }}
                            transition={SPRING}
                            style={{ transformOrigin: "center" }}
                            className="flex items-center gap-3 px-3 py-3 w-full h-full"
                        >
                            {/* Icon badge */}
                            <div
                                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                                style={{ background: iconBg }}
                            >
                                {done ? (
                                    <CheckCircle2 style={{ color: iconColor, width: 18, height: 18 }} />
                                ) : active ? (
                                    <Loader2 className="animate-spin" style={{ color: iconColor, width: 18, height: 18 }} />
                                ) : (
                                    Icon && <Icon style={{ color: iconColor, width: 18, height: 18 }} />
                                )}
                            </div>

                            {/* Text */}
                            <div className="min-w-0 flex-1">
                                <p
                                    className="text-sm font-semibold mb-0.5 truncate"
                                    style={{ color: pending ? "var(--text-subtle)" : "var(--text-main)" }}
                                >
                                    {step.label}
                                </p>
                                <p
                                    className="text-[11px] truncate"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    {step.desc}
                                </p>
                            </div>

                            {/* Status pill */}
                            {done && (
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0"
                                    style={{
                                        background: "var(--success-bg, rgba(34,197,94,0.12))",
                                        color: "var(--success, #22c55e)",
                                    }}
                                >
                                    Done
                                </span>
                            )}
                            {active && (
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0"
                                    style={{
                                        background: "var(--primary-bg, rgba(99,102,241,0.12))",
                                        color: "var(--primary)",
                                    }}
                                >
                                    Running
                                </span>
                            )}
                            {failed && (
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0"
                                    style={{
                                        background: "var(--destructive-bg, rgba(239,68,68,0.1))",
                                        color: "var(--destructive)",
                                    }}
                                >
                                    Failed
                                </span>
                            )}
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
}