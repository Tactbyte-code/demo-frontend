/** Tiny scale helpers shared by the SVG charts. */
export const linear = (d0, d1, r0, r1) => (v) => r0 + ((v - d0) / (d1 - d0 || 1)) * (r1 - r0)
export const ticks = (lo, hi, n = 4) => Array.from({ length: n + 1 }, (_, i) => lo + ((hi - lo) * i) / n)
export const round1 = (v) => Number(Number(v).toFixed(1))
