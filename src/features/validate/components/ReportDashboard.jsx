"use client";
import { useState } from "react";
import OverviewPanel from "./OverviewPanel";
import ParameterPanel from "./ParameterPanel";

export default function ReportDashboard({ report }) {
  const overviewTab = { id: "overview", label: "Overview" };
  
  // Dynamically map the 9 parameters from the score_breakdown array
  const parameterTabs = report.overall.score_breakdown.map((param) => ({
    id: param.parameter || param.label.toLowerCase().replace(/ /g, '_'),
    label: param.label,
    meta: param
  }));
  
  const allTabs = [overviewTab, ...parameterTabs];
  const [activeTabId, setActiveTabId] = useState(allTabs[0].id);

  const activeParamMeta = parameterTabs.find(t => t.id === activeTabId)?.meta;
  const activeParamData = activeParamMeta ? report.parameters[activeParamMeta.parameter] : null;
  const activeNarrative = activeParamMeta ? report.narrative.sections[activeParamMeta.parameter] : null;

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8">
      
      {/* Scrollable Tab Navigation */}
      <div className="border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
        <nav className="flex space-x-8 min-w-max" aria-label="Tabs">
          {allTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTabId === tab.id
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Dynamic Content Area */}
      <div className="min-h-[500px]">
        {activeTabId === "overview" ? (
          <OverviewPanel report={report} />
        ) : (
          <ParameterPanel 
            paramMeta={activeParamMeta} 
            paramData={activeParamData} 
            narrativeSection={activeNarrative} 
          />
        )}
      </div>
    </div>
  );
}