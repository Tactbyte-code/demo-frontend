import ComparisonSection from '@/components/ComparisonSection';
import FeaturesSection from '@/components/FeaturesSection';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import SampleInsights from '@/components/SampleInsights';
import SolutionSection from '@/components/SolutionSection';
import TargetAudience from '@/components/TargetAudience';
import Testimonials from '@/components/Testimonials';
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
      <ComparisonSection />
      <Testimonials />
    </>
  )
}

export default page;