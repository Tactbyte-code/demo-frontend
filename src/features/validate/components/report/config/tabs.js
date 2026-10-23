import OverviewTab from '../tabs/overview'
import PainTab from '../tabs/pain'
import MarketTab from '../tabs/market'
import DemandTab from '../tabs/demand'
import CompetitionTab from '../tabs/competition'
import UnitEconomicsTab from '../tabs/unit-economics'
import CostTab from '../tabs/cost'
import RegulatoryTab from '../tabs/regulatory'
import FundingTab from '../tabs/funding'
import MacroTab from '../tabs/macro'
import AssumptionsTab from '../tabs/assumptions'
import DataTab from '../tabs/data'

/**
 * `param` links a tab to report.parameters[param]; its score is shown as a badge in the tab bar.
 * The tab key equals the parameter key so header tiles can open the right tab.
 */
export const TABS = [
  { key: 'overview', label: 'Overview', Component: OverviewTab },
  { key: 'pain', label: 'Pain Points', param: 'pain', Component: PainTab },
  { key: 'market', label: 'Market', param: 'market', Component: MarketTab },
  { key: 'demand', label: 'Demand', param: 'demand', Component: DemandTab },
  { key: 'competition', label: 'Competition', param: 'competition', Component: CompetitionTab },
  { key: 'unit_economics', label: 'Unit Economics', param: 'unit_economics', Component: UnitEconomicsTab },
  { key: 'cost', label: 'Cost', param: 'cost', Component: CostTab },
  { key: 'regulatory', label: 'Regulatory', param: 'regulatory', Component: RegulatoryTab },
  { key: 'survival_funding', label: 'Funding', param: 'survival_funding', Component: FundingTab },
  { key: 'macro', label: 'Macro', param: 'macro', Component: MacroTab },
  { key: 'assumptions', label: 'Assumptions', Component: AssumptionsTab },
  { key: 'data', label: 'Data & Sources', Component: DataTab },
]
