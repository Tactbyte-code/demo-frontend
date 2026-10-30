// ReportHeader.jsx
import React from 'react'
import HeaderMeta from './HeaderMeta'
import IdeaSummary from './IdeaSummary'
import ParameterSnapshot from './ParameterSnapshot'
import ScoreCard from './ScoreCard'
import VerdictBanner from './VerdictBanner'

export default function ReportHeader({ report, onSelectTab }) {
  const { idea, overall, data_quality, parameters } = report
  
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <HeaderMeta status={report.status} generatedAt={report.generated_at} />
        <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <IdeaSummary idea={idea} />
            {/* Pass the parameters down so the snapshot knows which ones are locked */}
            <ParameterSnapshot 
              breakdown={overall.score_breakdown} 
              parameters={parameters} 
              onSelect={onSelectTab} 
            />
          </div>
          <ScoreCard overall={overall} dataQuality={data_quality} />
        </div>
        <VerdictBanner verdict={overall.verdict} />
      </div>
    </header>
  )
}