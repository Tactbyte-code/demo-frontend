import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import AuthGuard from "@/middleware/AuthGuard";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://problempusle.site";

export const metadata = {
  title: "Problem Pulse",
  description: "AI Problem Discovery System",
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ProblemPulse",
    alternateName: ["ProblemPulse", "ProblemPulseAI"],
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: siteUrl,
    description:
      "ProblemPulse helps businesses discover customer pain points, competitor weaknesses, and market opportunities using Reddit and Play Store data.",
    brand: {
      "@type": "Brand",
      name: "ProblemPulse",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html
      lang="en"
      className={cn("scroll-smooth", "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`
            ${poppins.variable}
            antialiased
            font-sans
            bg-background
            text-foreground
            selection:bg-primary/20
            selection:text-primary
        `}
      >
        <Providers>
          <AuthGuard>{children}</AuthGuard>
        </Providers>

      </body>
    </html>
  );
};

// Auth flow logic ->
// Every page load → AuthGuard runs
//         ↓
// Is this a public route ? → skip all checks
//         ↓
// No Firebase user → redirect to /login
//         ↓
// is_onboarded = false → redirect to /onboarding
//         ↓
// is_onboarded = true + on login/signup → redirect to /dashboard
//         ↓
// All good → render page normally