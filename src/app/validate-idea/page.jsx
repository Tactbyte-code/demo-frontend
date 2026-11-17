import ValidateIdeaHero from "@/features/validate/components/landing/ValidateIdeaHero";
import HowItWorks from "@/features/validate/components/landing/HowItWorks";
import WhatYouGet from "@/features/validate/components/landing/WhatYouGet";
import WhyValidate from "@/features/validate/components/landing/WhyValidate";
import WhoItsFor from "@/features/validate/components/landing/WhoItsFor";
import FAQ from "@/features/validate/components/landing/FAQ";
import Footer from "@/features/validate/components/landing/Footer";

export default function ValidateIdeaLandingPage() {
    return (
        <main className="min-h-screen bg-[#FDFBFF]">
            <ValidateIdeaHero />
            <HowItWorks />
            <WhatYouGet />
            <WhyValidate />
            <WhoItsFor />
            <FAQ />
            <Footer />
        </main>
    );
}