import RedditAnalysisCard from "./AnalysisCard";

export default function RedditAnalysisList({ analyses, onOpenAnalysis, isPlaceholderData }) {
    return (
        <div className="space-y-3">
            {analyses.map((analysis) => (
                <RedditAnalysisCard
                    key={analysis.id ?? analysis.query_id}
                    analysis={analysis}
                    onClick={() => onOpenAnalysis(analysis.id ?? analysis.query_id, analysis.status)}
                    isPlaceholderData={isPlaceholderData}
                />
            ))}
        </div>
    );
}