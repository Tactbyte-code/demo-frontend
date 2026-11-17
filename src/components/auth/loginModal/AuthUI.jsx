import {
    AlertCircle,
    CheckCircle2,
    Eye,
    EyeOff,
    Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

const STRENGTH_LABELS = ["Too weak", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = [
    "#F0506E",
    "#F0506E",
    "#F9A62B",
    "#9A3DE6",
    "#7B2CBF",
];

function getPasswordStrength(password) {
    if (!password) return 0;

    let score = 0;

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
}

export function ErrorAlert({ message }) {
    if (!message) return null;

    return (
        <motion.div
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
        >
            <div className="flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-700">
                <AlertCircle size={17} className="mt-0.5 shrink-0" />
                <p className="text-xs font-medium leading-relaxed">
                    {message}
                </p>
            </div>
        </motion.div>
    );
}

export function TextField({ id, label, icon: Icon, trailing, ...inputProps }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1.5 block text-[13px] font-semibold text-slate-700"
            >
                {label}
            </label>

            <div className="relative">
                <Icon
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    id={id}
                    required
                    className={`h-10 w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70 ${
                        trailing ? "pr-20" : "pr-3.5"
                    }`}
                    {...inputProps}
                />

                {trailing && (
                    <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
                        {trailing}
                    </div>
                )}
            </div>
        </div>
    );
}

export function PasswordToggle({ visible, onToggle, label }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={visible ? `Hide ${label}` : `Show ${label}`}
            aria-pressed={visible}
            className="rounded-md p-1 text-slate-400 transition hover:text-slate-700"
        >
            {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
    );
}

export function StrengthMeter({ password }) {
    if (!password) return null;

    const score = getPasswordStrength(password);

    return (
        <div className="mt-1.5" aria-live="polite">
            <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((index) => (
                    <div
                        key={index}
                        className="h-1 flex-1 rounded-full transition-colors duration-300"
                        style={{
                            backgroundColor:
                                index < score
                                    ? STRENGTH_COLORS[score]
                                    : "#e2e8f0",
                        }}
                    />
                ))}
            </div>

            <p className="mt-0.5 text-[10px] leading-4 text-slate-500">
                <span className="font-bold text-slate-700">
                    {STRENGTH_LABELS[score]}
                </span>

                {score < 3 &&
                    " · Use 8+ characters with mixed case, a number and a symbol"}
            </p>
        </div>
    );
}

export function PrimaryButton({
    children,
    loading,
    disabled,
    className = "",
    ...props
}) {
    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={`flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#7138D5] via-[#A52BC2] to-[#FF4D83] px-5 text-sm font-bold text-white shadow-md shadow-purple-500/20 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 ${className}`}
        >
            {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                children
            )}
        </button>
    );
}

export function GoogleIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px] shrink-0"
            aria-hidden="true"
        >
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
        </svg>
    );
}