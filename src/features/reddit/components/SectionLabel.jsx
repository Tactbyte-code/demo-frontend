import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function SectionLabel({ icon, label }) {
    return (
        <div className="flex items-center justify-between w-full animate-in fade-in slide-in-from-left-2 duration-400 mb-4">

            {/* Left side: icon + label */}
            <div className="flex items-center gap-2">
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 animate-in zoom-in-75 duration-300"
                    style={{ backgroundColor: "var(--primary)" }}
                >
                    {icon}
                </div>

                <span
                    className="text-[16px] font-semibold tracking-wide"
                    style={{ color: "var(--text-subtle)" }}
                >
                    {label}
                </span>
            </div>

            {/* Right side: Coming Soon button */}
            <motion.div
                initial={{ opacity: 0.8 }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative inline-flex"
            >
                <Button
                    size="sm"
                    disabled
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5
                        bg-info-bg text-foreground
                        border border-primary/20
                        cursor-not-allowed opacity-80"
                    >
                    <Link2 className="w-3.5 h-3.5 shrink-0" />
                    Connect to Jira
                </Button>

                <span className="absolute -top-4 -right-2 text-[9px] font-medium px-1.5 py-1 rounded-full bg-primary text-light leading-tight whitespace-nowrap">
                    Coming soon
                </span>
            </motion.div>
        </div>
    );
}