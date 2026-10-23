import { titleCase } from '../lib/format'

export const PARAM_SHORT = {
  pain: 'Pain',
  market: 'Market',
  competition: 'Competition',
  demand: 'Demand',
  unit_economics: 'Unit econ.',
  cost: 'Cost',
  regulatory: 'Regulatory',
  survival_funding: 'Funding',
  macro: 'Macro',
}

export const PARAM_ORDER = Object.keys(PARAM_SHORT)

export const paramShort = (key) => PARAM_SHORT[key] ?? titleCase(key)
