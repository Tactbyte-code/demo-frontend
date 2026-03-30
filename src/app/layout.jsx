import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import AuthGuard from "@/middleware/AuthGuard";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Demo AI App",
  description: "Problem Discovery System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", geist.variable)} suppressHydrationWarning>
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
          <AuthGuard>
            {children}
          </AuthGuard>
        </Providers>
      </body>
    </html>
  );
}

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