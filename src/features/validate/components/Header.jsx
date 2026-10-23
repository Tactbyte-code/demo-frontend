import StatusBadge from "./StatusBadge";

export default function Header({ idea, overall }) {
  return (
    <div className="bg-white border-b border-gray-200 pb-8 pt-10 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">
              {idea.industry}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium uppercase">
              Stage: {idea.stage}
            </span>
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
            {idea.title}
          </h1>
          
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mb-4">
            {idea.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">Target Segment</h3>
              <p className="text-sm text-slate-600">{idea.target_segment}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">Problem Statement</h3>
              <p className="text-sm text-slate-600">{idea.problem_statement}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center min-w-[200px] shadow-sm">
          <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Viability Score</p>
          <div className="text-5xl font-black text-indigo-600 mb-2">
            {overall.viability_score.toFixed(1)}
          </div>
          <StatusBadge status={overall.band} label={overall.band} />
          <p className="text-xs text-gray-400 mt-3 text-center">
            Confidence: <span className="font-medium text-gray-600 capitalize">{overall.confidence}</span>
          </p>
        </div>
      </div>
    </div>
  );
}