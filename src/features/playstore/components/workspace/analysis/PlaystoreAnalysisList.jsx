import PlaystoreAnalysisCard from "./PlaystoreAnalysisCard";

export default function PlaystoreAnalysisList({
    analyses,
    onOpenAnalysis,
    isPlaceholderData,
}) {
    return (
        <div className="space-y-3">
            {analyses.map((analysis) => (
                <PlaystoreAnalysisCard
                    key={analysis.id ?? analysis.query_id}
                    analysis={analysis}
                    onClick={() =>
                        onOpenAnalysis(
                            analysis.id ?? analysis.query_id,
                            analysis.status
                        )
                    }
                    isPlaceholderData={isPlaceholderData}
                />
            ))}
        </div>
    );
}
