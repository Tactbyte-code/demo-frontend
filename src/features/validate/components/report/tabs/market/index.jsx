import React from 'react'
import { Stack, TwoCol } from '@/features/validate/components/report/ui'
import ParameterHeader from '../shared/ParameterHeader'
import MarketStats from './MarketStats'
import MarketFunnel from './MarketFunnel'
import MarketLevelCard from './MarketLevelCard'
import CrossCheckCard from './CrossCheckCard'
import GrowthCard from './GrowthCard'
import MarketComponents from './MarketComponents'

export default function MarketTab({ report }) {
  const m = report.parameters.market
  const users = {
    tam: m.tam?.inputs?.find((i) => i.name === 'addressable_users')?.value,
    sam: m.sam?.serviceable_users,
    som: m.som?.obtainable_users,
  }
  return (
    <Stack>
      <ParameterHeader paramKey="market" score={m.score} confidence={m.confidence} />
      <MarketStats market={m} />
      <MarketFunnel market={m} users={users} />
      <MarketLevelCard name="TAM" desc="Total addressable market" data={m.tam} users={users.tam} userNoun="addressable" color="#4f46e5" />
      <MarketLevelCard name="SAM" desc="Serviceable addressable market" data={m.sam} users={users.sam} userNoun="serviceable" color="#7c3aed" />
      <MarketLevelCard name="SOM" desc={`Obtainable market (${m.som?.horizon_years} years)`} data={m.som} users={users.som} userNoun="obtainable" color="#c026d3" />
      <TwoCol>
        <CrossCheckCard tam={m.tam} check={m.cross_check} />
        <GrowthCard growth={m.growth} tam={m.tam} />
      </TwoCol>
      <MarketComponents components={m.components} />
    </Stack>
  )
}
