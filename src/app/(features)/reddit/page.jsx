import HowItWorks from "@/features/reddit/components/landing/HowItWorks";
import RedditFinalCTA from "@/features/reddit/components/landing/RedditFinalCTA";
import RedditFooter from "@/features/reddit/components/landing/RedditFooter";
import RedditHero from "@/features/reddit/components/landing/RedditHero";
import WhatYouGet from "@/features/reddit/components/landing/WhatYouGet";
import WhyRedditProblemPulse from "@/features/reddit/components/landing/WhyRedditProblemPulse";

export default function RedditLandingPage() {
    return (
        <main className="min-h-screen bg-[#FDFBFF]">
            <RedditHero />
            <HowItWorks />
            <WhatYouGet />
            <WhyRedditProblemPulse />
            <RedditFinalCTA />
            <RedditFooter />
        </main>
    );
}

{/* <WhyValidate />
<WhoItsFor />
<FAQ />
<Footer /> */}