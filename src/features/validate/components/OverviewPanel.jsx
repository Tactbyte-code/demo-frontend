export default function OverviewPanel({ report }) {
  const { overall, narrative } = report;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Executive Verdict</h2>
        <p className="text-gray-700 text-lg leading-relaxed border-l-4 border-indigo-500 pl-4 bg-indigo-50/50 py-3 pr-3 rounded-r">
          {overall.verdict}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Primary Risks
          </h2>
          <ul className="space-y-3">
            {overall.risks.map((risk, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {risk.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Recommended Next Steps
          </h2>
          <ul className="space-y-3">
            {narrative.next_steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}