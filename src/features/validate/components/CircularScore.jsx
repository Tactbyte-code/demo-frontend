"use client"
import React from 'react'
import { motion } from 'framer-motion'

export const CircularScore = ({ score, color, reduceMotion }) => {
    const size = 120
    const strokeWidth = 10
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const clamped = Math.max(0, Math.min(100, score ?? 0))
    const offset = circumference - (clamped / 100) * circumference

    return (
        <div className="relative shrink-0 drop-shadow-sm" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth={strokeWidth}
                />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : 0.1 }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[var(--text-header)] tabular-nums tracking-tight">
                    {typeof score === 'number' ? score : '—'}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-subtle)] mt-1">
                    Score
                </span>
            </div>
        </div>
    )
}