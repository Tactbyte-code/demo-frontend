import PlaystoreHero from "@/features/playstore/components/landing/PlaystoreHero";
import PlaystoreHowItWorks from "@/features/playstore/components/landing/PlaystoreHowItWorks";
import PlaystoreWhatYouGet from "@/features/playstore/components/landing/PlaystoreWhatYouGet";

export default function PlaystoreIdeaLandingPage() {
    return (
        <main className="min-h-screen bg-[#FDFBFF]">
            <PlaystoreHero />
            <PlaystoreHowItWorks />
            <PlaystoreWhatYouGet />
        </main>
    );
}