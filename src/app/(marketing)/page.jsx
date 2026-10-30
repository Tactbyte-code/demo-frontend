"use client"

import ComparisonSection from "@/components/ComparisonSection";
import FAQSection from "@/components/FAQSection";
import FeaturesSection from "@/components/FeaturesSection";
import FinalCTA from "@/components/FinalCTA";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SampleInsights from "@/components/SampleInsights";
import SolutionSection from "@/components/SolutionSection";
import TargetAudience from "@/components/TargetAudience";
import Testimonials from "@/components/Testimonials";
import AuthVerificationHandler from "@/components/AuthVerificationHandler";
import React from "react";

const page = () => {

  return (
    <>
      <AuthVerificationHandler />
      <Hero />

      <ProblemSection />

      <SolutionSection />

      <FeaturesSection />

      <TargetAudience />

      <SampleInsights />
      <ComparisonSection />
      <Testimonials />
      <FAQSection />
      <FinalCTA />
    </>
  );
};

export default page;
