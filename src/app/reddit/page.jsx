import HowItWorks from "@/features/reddit/components/landing/HowItWorks";
import RedditHero from "@/features/reddit/components/landing/RedditHero";
import WhatYouGet from "@/features/reddit/components/landing/WhatYouGet";

export default function RedditLandingPage() {
    return (
        <main className="min-h-screen bg-[#FDFBFF]">
            <RedditHero />
            <HowItWorks />
            <WhatYouGet />
            {/* <WhyValidate />
            <WhoItsFor />
            <FAQ />
            <Footer /> */}
        </main>
    );
}