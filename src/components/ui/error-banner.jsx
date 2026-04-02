"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle } from "lucide-react"

export function ErrorBanner({ message }) {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <div className="rounded-2xl p-4 flex items-center gap-3 bg-red-100 text-red-600">
                        <AlertCircle size={16} />
                        <p className="text-xs font-bold">{message}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}