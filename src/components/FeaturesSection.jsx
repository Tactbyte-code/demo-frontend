"use client";

import { useState } from "react";
import Link from "next/link";
import {
    MessageSquare,
    Play,
    Sparkles,
    Lightbulb,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";

const features = [
    {
        id: "reddit",
        featureNumber: "Feature 01",
        title: "Reddit Pain Point Analyzer",
        shortTitle: "Reddit Analyzer",
        tag: "Social Intelligence",
        description:
            "Discover recurring customer frustrations, feature requests, and unmet needs from thousands of Reddit discussions using AI-powered clustering and summarization.",
        videoSrc: "/videos/reddit.mp4",
        ctaText: "Explore Reddit Analyzer",
        ctaHref: "/dashboard/reddit",
        highlights: [
            "Summarizes thousands of discussions effectively",
            "Groups similar customer pain points",
            "Find hidden startup opportunities",
        ],
        icon: MessageSquare,
    },
    {
        id: "playstore",
        featureNumber: "Feature 02",
        title: "Google Play Review Intelligence",
        shortTitle: "Play Store Insights",
        tag: "App Store Analytics",
        description:
            "Analyze app reviews at scale to uncover bugs, feature requests, usability issues, and user sentiment without reading every review manually.",
        videoSrc: "/videos/play.mp4",
        ctaText: "Explore Play Store Insights",
        ctaHref: "/dashboard/playstore",
        highlights: [
            "AI-generated review summaries",
            "Developer-friendly bug and feature reports",
            "Prioritize features users actually request",
        ],
        icon: Play,
    },
    {
        id: "validate-idea",
        featureNumber: "Feature 03",
        title: "Validate Startup Idea",
        shortTitle: "Validate Idea",
        tag: "Idea Validation",
        description:
            "Test and validate your product concepts against authentic market demand signals, real customer pain points, and competitive gaps in minutes.",
        videoSrc: "/videos/validate-idea.mp4",
        ctaText: "Validate Your Idea",
        ctaHref: "/dashboard/validate-idea",
        highlights: [
            "Real-time market demand scoring",
            "Competitor gap and risk breakdown",
            "Instant AI-driven viability report",
        ],
        icon: Lightbulb,
    },
    {
        id: "lead-engine",
        featureNumber: "Feature 04",
        title: "AI Lead Engine",
        shortTitle: "Lead Engine",
        tag: "Growth & Conversion",
        description:
            "Identify businesses and users actively discussing problems related to your product. Turn customer conversations into qualified sales opportunities.",
        videoSrc: "/videos/lead.mp4",
        ctaText: "Launch Lead Engine",
        ctaHref: "/dashboard/ai-lead-engine/campaigns",
        highlights: [
            "Intent-based lead discovery",
            "Find prospects before competitors",
            "Generate high-quality outreach lists",
        ],
        icon: Sparkles,
    },
];

export default function FeaturesTabsSection() {
    const [selectedFeatureId, setSelectedFeatureId] = useState("reddit");

    const selectedFeature =
        features.find((f) => f.id === selectedFeatureId) || features[0];

    const IconComponent = selectedFeature.icon;

    return (
        <section className="py-12 sm:py-16 md:py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="mb-8 sm:mb-12 md:mb-14 max-w-2xl">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary font-black mb-3">
                        Key Features
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight sm:leading-none">
                        Powerful AI. <br />
                        <span className="text-primary font-black">Actionable Insights.</span>
                    </h2>
                    <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-muted-foreground font-normal leading-relaxed">
                        Every feature is designed to help teams discover opportunities,
                        understand customers, and make better product decisions.
                    </p>
                </div>

                {/* Container */}
                <div className="border border-border overflow-hidden shadow-sm rounded-lg sm:rounded-none">
                    {/* Navigation Tabs - Swipeable on Mobile/Tablet */}
                    <div className="border-b border-border bg-primary overflow-x-auto scrollbar-none">
                        <div className="flex md:grid md:grid-cols-4 w-full min-w-max md:min-w-0">
                            {features.map((feature) => {
                                const TabIcon = feature.icon;
                                const isSelected = selectedFeatureId === feature.id;

                                return (
                                    <button
                                        key={feature.id}
                                        type="button"
                                        onClick={() => setSelectedFeatureId(feature.id)}
                                        className={`flex-1 cursor-pointer px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-center gap-2 border-r border-white/20 last:border-r-0 transition-all ${
                                            isSelected
                                                ? "bg-primary text-white"
                                                : "text-white/60 bg-border-solid hover:bg-primary/70 hover:text-white"
                                        }`}
                                    >
                                        <TabIcon className="w-4 h-4 shrink-0" />
                                        <span className="text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap">
                                            {feature.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content Panel */}
                    <div className="p-4 sm:p-6 md:p-10 bg-surface">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
                            {/* Text Content Column */}
                            <div className="flex-1 flex items-start gap-3 sm:gap-4 md:gap-5">
                                {/* Left: Fixed Icon */}
                                <div className="p-2.5 sm:p-3 border border-border bg-background text-primary rounded-full shrink-0">
                                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                </div>

                                {/* Right: Aligned Metadata, Title, Description, Highlights, and CTA */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary font-bold mb-1">
                                        {selectedFeature.featureNumber} • {selectedFeature.tag}
                                    </p>
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-foreground tracking-tight mb-2 sm:mb-3">
                                        {selectedFeature.title}
                                    </h3>

                                    <p className="text-muted-foreground mb-4 sm:mb-6 text-xs sm:text-sm md:text-base font-normal leading-relaxed">
                                        {selectedFeature.description}
                                    </p>

                                    {/* Highlights List */}
                                    <div className="space-y-2.5 sm:space-y-3 pt-3 sm:pt-4 mb-6 sm:mb-8 border-t border-border">
                                        {selectedFeature.highlights.map((highlight) => (
                                            <div
                                                key={highlight}
                                                className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                                <span className="text-foreground font-medium">
                                                    {highlight}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Dynamic Route CTA */}
                                    <div>
                                        <Link
                                            href={selectedFeature.ctaHref}
                                            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-primary text-white font-semibold text-xs sm:text-sm hover:opacity-95 transition-opacity rounded-sm"
                                        >
                                            <span>{selectedFeature.ctaText}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Video Player Showcase */}
                            <div className="flex-1 w-full bg-black border border-white/10 overflow-hidden shadow-xl sm:shadow-2xl rounded-sm relative">
                                <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 border-b border-white/10 bg-black/80">
                                    <div className="flex gap-1.5 sm:gap-2">
                                        <div className="w-2 h-2 bg-[#FF5F56] rounded-full" />
                                        <div className="w-2 h-2 bg-[#FFBD2E] rounded-full" />
                                        <div className="w-2 h-2 bg-[#27C93F] rounded-full" />
                                    </div>
                                    <span className="font-mono text-[9px] sm:text-[10px] text-white/50 truncate max-w-[200px]">
                                        {selectedFeature.title}
                                    </span>
                                </div>

                                <div className="relative aspect-video w-full bg-black/40 flex items-center justify-center">
                                    <video
                                        key={selectedFeature.videoSrc}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        className="w-full h-full object-cover"
                                    >
                                        <source src={selectedFeature.videoSrc} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}