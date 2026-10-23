"use client";
// Adjust the import path for your custom hook as needed
import { useGetSummary } from "../hooks/useGetSummary"; 
import Header from "./Header";
import ReportDashboard from "./ReportDashboard";

export default function ReportView({ queryId }) {
  const { data: summary, isPending, isError, error } = useGetSummary(queryId);

  if (isPending) {
    return (
      <div className="animate-pulse min-h-screen bg-slate-50">
        <div className="bg-white border-b border-gray-200 h-64 w-full mb-8"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="h-12 bg-gray-200 rounded w-full mb-8"></div>
          <div className="h-96 bg-white border border-gray-200 rounded-xl w-full"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-xl border border-red-200 text-center max-w-md">
          <div className="text-red-500 mb-4 flex justify-center">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to load report</h2>
          <p className="text-gray-500">{error?.message || "An unexpected error occurred."}</p>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  return (
    <>
      <Header idea={summary.idea} overall={summary.overall} />
      <ReportDashboard report={summary} />
    </>
  );
}