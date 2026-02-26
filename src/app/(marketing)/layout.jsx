import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollButton from "@/components/ScrollButton";

export default function MarketingLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="grow">
                {children}
            </main>
            {/* This button will be visible across all marketing pages */}
            <ScrollButton />
            <Footer />
        </div>
    );
}