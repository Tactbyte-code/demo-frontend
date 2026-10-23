import React from 'react'
import { Caveats, Stack, TwoCol } from '@/features/validate/components/report/ui'
import ParameterHeader from '../shared/ParameterHeader'
import HealthGauge from './HealthGauge'
import DerivedMetrics from './DerivedMetrics'
import ModelInputs from './ModelInputs'
import RetentionCurve from './RetentionCurve'
import PaybackChart from './PaybackChart'
import PricingBenchmarks from './PricingBenchmarks'

export default function UnitEconomicsTab({ report }) {
  const u = report.parameters.unit_economics
  return (
    <Stack>
      <ParameterHeader paramKey="unit_economics" score={u.score} confidence={u.confidence} />
      <TwoCol>
        <HealthGauge ratio={u.derived?.ltv_cac_ratio} />
        <DerivedMetrics derived={u.derived} />
      </TwoCol>
      <TwoCol>
        <ModelInputs model={u.model} />
        <PricingBenchmarks benchmarks={u.pricing_benchmarks} />
      </TwoCol>
      <TwoCol>
        <RetentionCurve model={u.model} />
        <PaybackChart model={u.model} derived={u.derived} />
      </TwoCol>
      <Caveats items={u.caveats} />
    </Stack>
  )
}
