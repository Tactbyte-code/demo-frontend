import AnalysisCard from "./AnalysisCard";

export default function AnalysisList({
    analyses,
    onOpenAnalysis,
    isPlaceholderData
}) {
    return (
        <div className="space-y-3">
            {analyses.map((analysis) => (
                <AnalysisCard
                    key={analysis.id ?? analysis.query_id}
                    analysis={analysis}
                    onClick={() =>
                        onOpenAnalysis(analysis.id ?? analysis.query_id, analysis.status)
                    }
                    isPlaceholderData={isPlaceholderData}
                />
            ))}
        </div>
    );
}
