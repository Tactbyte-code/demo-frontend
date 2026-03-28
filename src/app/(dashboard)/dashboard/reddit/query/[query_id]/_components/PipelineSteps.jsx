import { STEPS } from "../_hooks/constants";

export function PipelineSteps({ currentStep, isCompleted, isTerminal }) {
    return (
        <div
            className="grid border-t"
            style={{ gridTemplateColumns: `repeat(${STEPS.length}, 1fr)`, borderColor: "var(--border-solid)" }}
        >
            {STEPS.map((step, i) => {
                const done = i < currentStep || isCompleted;
                const active = i === currentStep && !isCompleted && !isTerminal;
                const future = i > currentStep && !isCompleted;
                return (
                    <div
                        key={step.key}
                        className="flex flex-col gap-1.5 px-3 py-4 border-r last:border-r-0"
                        style={{ borderColor: "var(--border-solid)", backgroundColor: active ? "var(--info-bg)" : "transparent" }}
                    >
                        <div className="flex items-center gap-1.5">
                            <div
                                className="w-2 h-2 rounded-full shrink-0 transition-all duration-500"
                                style={{
                                    background: done ? "var(--success)" : active ? "var(--primary)" : "var(--surface-raised)",
                                    boxShadow: active ? "0 0 0 3px var(--info-bg)" : "none",
                                }}
                            />
                            <span
                                className="text-[10px] font-semibold leading-tight hidden lg:block"
                                style={{ color: done ? "var(--success)" : active ? "var(--primary)" : "var(--text-subtle)" }}
                            >
                                {step.label}
                            </span>
                        </div>
                        <p
                            className="text-[10px] leading-tight hidden xl:block"
                            style={{ color: future ? "var(--text-subtle)" : "var(--text-muted)" }}
                        >
                            {step.desc}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}