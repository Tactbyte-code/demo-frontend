import StatusBadge from "./StatusBadge";

export default function ParameterPanel({ paramMeta, paramData, narrativeSection }) {
  if (paramMeta.status === "insufficient_data") {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center mt-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{paramMeta.label}</h3>
        <StatusBadge status="insufficient_data" label="Insufficient Data" />
        <p className="text-gray-500 mt-4 max-w-md mx-auto">{paramData?.reason || narrativeSection?.summary}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{paramMeta.label}</h2>
          <p className="text-gray-600 text-sm max-w-2xl">{narrativeSection?.summary}</p>
        </div>
        <div className="text-left md:text-right">
          <div className="text-3xl font-black text-gray-800 mb-1">
            {paramMeta.score?.toFixed(1)} <span className="text-lg text-gray-400 font-medium">/ 100</span>
          </div>
          <StatusBadge status={paramMeta.rating} label={`${paramMeta.rating} Rating`} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {paramMeta.parameter === "pain" && <PainDetails data={paramData} />}
        {paramMeta.parameter === "market" && <MarketDetails data={paramData} />}
        {paramMeta.parameter === "competition" && <CompetitionDetails data={paramData} />}
        {paramMeta.parameter === "regulatory" && <RegulatoryDetails data={paramData} />}
        
        {!["pain", "market", "competition", "regulatory"].includes(paramMeta.parameter) && (
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center py-10">
              <p className="text-gray-500 italic">Detailed metrics for this section are available in the raw data export.</p>
           </div>
        )}
      </div>
    </div>
  );
}

// --- Sub-components for specific data structures ---

function PainDetails({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Key Pain Points & Evidence</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {data.themes?.map((theme, i) => (
          <div key={i} className="p-4 bg-red-50/30 rounded-lg border border-red-100 flex flex-col justify-between">
            <h4 className="font-semibold text-gray-800 mb-2">{theme.label}</h4>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-2 pt-2 border-t border-red-100">
              <span>{theme.post_count} occurrences</span>
              <span className="font-medium text-red-600">Intensity: {theme.avg_intensity}/5</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketDetails({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { label: "Total Addressable Market (TAM)", val: data.tam },
        { label: "Serviceable Addressable (SAM)", val: data.sam },
        { label: "Serviceable Obtainable (SOM)", val: data.som }
      ].map((market, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
          <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase">{market.label}</h4>
          <div className="text-3xl font-bold text-indigo-600 mb-1">
            {market.val?.users ? (market.val.users / 1000000).toFixed(1) + 'M' : 'N/A'}
          </div>
          <p className="text-xs text-gray-400">Users ({market.val?.label})</p>
        </div>
      ))}
    </div>
  );
}

function CompetitionDetails({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.direct_competitors?.map((comp, i) => (
        <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-2 gap-4">
            <h4 className="font-bold text-gray-900 text-lg">{comp.name}</h4>
            <StatusBadge status="default" label={comp.pricing_model} />
          </div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{comp.offering}</p>
        </div>
      ))}
    </div>
  );
}

function RegulatoryDetails({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Regulatory Requirements</h3>
      <ul className="space-y-3">
        {data.requirements?.map((req, i) => (
          <li key={i} className="flex gap-3 text-sm text-gray-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="text-indigo-500 font-bold shrink-0">•</span>
            <span>
              <strong className="text-gray-900">{req.authority}:</strong> {req.requirement}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}