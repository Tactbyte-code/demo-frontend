import { cn } from "@/lib/utils"

export function FormField({ label, error, children }) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-xs font-bold ml-1 text-muted-foreground">
                    {label}
                </label>
            )}

            {children}

            {error && (
                <p className="text-xs text-red-500 ml-1 font-semibold">
                    {error}
                </p>
            )}
        </div>
    )
}