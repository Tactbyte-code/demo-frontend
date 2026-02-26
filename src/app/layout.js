import { Poppins } from "next/font/google";
import "./globals.css";

// 1. Configure the primary brand font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

// 2. Define global SEO metadata
export const metadata = {
  title: "Demo | High-Fidelity Market Intelligence",
  description: "Decode digital noise and build with conviction using AI-powered sentiment analysis.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} antialiased font-sans bg-white text-foreground selection:bg-primary/10 selection:text-primary`}
      >
        {/* The {children} here will either be wrapped by:
            - (marketing)/layout.jsx (Navbar + Footer)
            - OR (dashboard)/layout.jsx (Sidebar)
        */}
        {children}
      </body>
    </html>
  );
}