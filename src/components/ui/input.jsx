import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }) {
    return (
        <InputPrimitive
            type={type}
            data-slot="input"
            className={cn(
                // Base layout & sizing — matches your other components
                "h-9 w-full min-w-0 px-3.5 py-2 text-sm rounded-none",

                // Radius — uses your --radius token
                // "rounded-[var(--radius)]",

                // Colors — your surface/text tokens
                "bg-[var(--surface)] text-[var(--text-main)] placeholder:text-[var(--text-subtle)]",

                // Border — your border-solid token
                "border border-[var(--border-solid)]",

                // Transitions — matches your globals.css * rule
                "transition-colors duration-150",

                // Focus — primary glow, matches your other input patterns
                "outline-none focus-visible:border-[var(--primary)] focus-visible:ring-3 focus-visible:ring-[color-mix(in_srgb,var(--primary)_15%,transparent)]",

                // Disabled
                "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--surface-raised)]",

                // Invalid / error state — your destructive tokens
                "aria-invalid:border-[var(--destructive)] aria-invalid:ring-3 aria-invalid:ring-[color-mix(in_srgb,var(--destructive)_15%,transparent)]",

                // Dark mode surface adjustment
                "dark:bg-[var(--surface-card)]",

                // File input
                "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--text-main)]",

                className
            )}
            {...props}
        />
    )
}

export { Input }