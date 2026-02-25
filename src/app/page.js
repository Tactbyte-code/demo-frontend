import FeaturesSection from '@/components/FeaturesSection';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import SampleInsights from '@/components/SampleInsights';
import SolutionSection from '@/components/SolutionSection';
import TargetAudience from '@/components/TargetAudience';
import React from 'react';

const page = () => {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <TargetAudience />
      <SampleInsights />
    </>
  )
}

export default page;