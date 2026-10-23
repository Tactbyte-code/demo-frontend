import { CHART } from '../lib/tones'

/* Ordered qualitative scales used by <LevelMeter />. Colours run good -> bad or bad -> good. */
const G = CHART.emerald
const A = CHART.amber
const R = CHART.rose

export const SATURATION = { levels: ['low', 'medium', 'high'], colors: [G, A, R] }
export const INCUMBENT_STRENGTH = { levels: ['weak', 'moderate', 'strong'], colors: [G, A, R] }
export const COMPLEXITY = {
  levels: ['low', 'low_to_medium', 'medium', 'medium_to_high', 'high'],
  colors: [G, '#84cc16', A, '#fb923c', R],
}
export const OUTLOOK = {
  levels: ['negative', 'neutral_to_negative', 'neutral', 'neutral_to_positive', 'positive'],
  colors: [R, '#fb923c', A, '#84cc16', G],
}
