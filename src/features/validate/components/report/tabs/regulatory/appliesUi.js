import { CHART } from '@/features/validate/components/report/lib/tones'

/** `applies` is true | false | 'conditional' in the report JSON. */
export const appliesUi = (a) =>
  a === true
    ? { key: 'applies', text: 'Applies', tone: 'bg-rose-50 text-rose-700 ring-rose-200', color: CHART.rose }
    : a === false
    ? { key: 'not', text: 'Not required', tone: 'bg-emerald-50 text-emerald-700 ring-emerald-200', color: CHART.emerald }
    : { key: 'conditional', text: 'Conditional', tone: 'bg-amber-50 text-amber-700 ring-amber-200', color: CHART.amber }
