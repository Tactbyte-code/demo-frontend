import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const CONVICTION = {
    high: { color: 'var(--success)', tint: 'var(--success-bg)', label: 'High conviction' },
    mid: { color: 'var(--warning)', tint: 'var(--warning-bg)', label: 'Moderate conviction' },
    low: { color: 'var(--destructive)', tint: 'var(--destructive-bg)', label: 'Low conviction' },
    none: { color: 'var(--text-subtle)', tint: 'var(--surface-raised)', label: 'Not yet scored' },
}

export const getConviction = (score) => {
    if (typeof score !== 'number') return CONVICTION.none
    if (score >= 70) return CONVICTION.high
    if (score >= 40) return CONVICTION.mid
    return CONVICTION.low
}

export const getTierColor = (level) => {
    const normalized = String(level || '').toLowerCase()
    if (['high', 'critical', 'severe'].includes(normalized)) return { color: 'var(--destructive)', tint: 'var(--destructive-bg)' }
    if (['medium', 'moderate'].includes(normalized)) return { color: 'var(--warning)', tint: 'var(--warning-bg)' }
    if (['low', 'minor'].includes(normalized)) return { color: 'var(--success)', tint: 'var(--success-bg)' }
    return { color: 'var(--text-subtle)', tint: 'var(--surface-raised)' }
}

export const formatLabel = (key) =>
    String(key || '').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

export const getHostname = (url) => {
    try {
        return new URL(url).hostname.replace(/^www\./, '')
    } catch {
        return url
    }
}

export const formatDate = (isoString) => {
    if (!isoString) return null
    const date = new Date(isoString)
    if (Number.isNaN(date.getTime())) return null
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}