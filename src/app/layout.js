import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import AuthGuard from "@/components/auth/AuthGuard";  // ← add this

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Demo",
  description: "Problem Discovery System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
          <AuthGuard>  {/* ← wrap children */}
            {children}
          </AuthGuard>
        </Providers>
      </body>
    </html>
  );
}


// ```

// ---

// ## What this does
// ```
// Every page load → AuthGuard runs
//         ↓
// Is this a public route ? → skip all checks
//         ↓
// No Firebase user → redirect to / login
//         ↓
// No localStorage user → redirect to / login
//         ↓
// is_onboarded = false → redirect to / onboarding
//         ↓
// is_onboarded = true + on login / signup → redirect to / dashboard
//         ↓
// All good → render page normally