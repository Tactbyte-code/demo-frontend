"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { ArrowUpRight, Sparkles } from "lucide-react";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import TargetAudience from "@/components/TargetAudience";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/Footer";
import { features, purpleTheme } from "@/components/layout/siteNav";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const firebaseUser = useAuthStore((state) => state.firebaseUser);

  console.log('user: ', user);
  console.log('firebaseUser: ', firebaseUser);


  return (
    <main className="relative flex min-h-screen flex-col overflow-clip bg-[#FDFBFF] text-[#292333]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full bg-[#D82C9E]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-[#5F19C5]/10 blur-3xl" />

      <SiteHeader />

      {/* Main content */}
      <section className="relative z-10 flex min-h-[calc(100svh-88px)] flex-1 flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 lg:py-8">
        {/* Hero */}
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D82C9E]/20 bg-linear-to-r from-[#5F19C5]/5 via-[#9326D5]/5 to-[#FA418B]/10 px-4 py-2 text-xs font-semibold tracking-wide text-[#9326D5]">
            <Sparkles size={14} />
            TURN INSIGHTS INTO OPPORTUNITIES
          </div>

          <h1 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[56px]">
            Find problems.
            <br />
            <span className="bg-linear-to-r from-[#5F19C5] via-[#9326D5] via-[#D82C9E] to-[#FA418B] bg-clip-text text-transparent">Build what matters.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#756B80] sm:text-base">
            Stop guessing what people need. Discover real problems, uncover market opportunities, and validate your next big idea with AI-powered research.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link key={feature.number} href={feature.href} className={`group relative flex min-h-[260px] flex-col rounded-2xl border border-[#EAE2F1] bg-white/85 p-6 shadow-[0_8px_30px_rgba(95,25,197,0.035)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(95,25,197,0.10)] sm:p-7 ${feature.hoverBorder}`}>
                <div className="mb-7 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg} ${feature.iconColor} ${feature.hoverIcon} transition duration-300`}>
                    <Icon size={23} />
                  </div>
                  <span className="text-xs font-semibold tracking-widest text-[#B8AFC4]">{feature.number}</span>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-[#292333]">{feature.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#756B80]">{feature.description}</p>

                <div className="mt-7 flex items-center justify-between border-t border-[#F0EAF5] pt-5">
                  <span className="bg-linear-to-r from-[#7138D5] to-[#D82C9E] bg-clip-text text-xs font-semibold text-transparent">{feature.tag}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4EFFA] text-[#7138D5] transition duration-300 group-hover:bg-linear-to-r group-hover:from-[#5F19C5] group-hover:to-[#FA418B] group-hover:text-white">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-9 text-center">
          <p className="text-xs text-[#968AA3]">No guesswork. No assumptions. Just insights backed by real-world data.</p>
        </div>
      </section>

      {/* Landing sections (nav targets) */}
      <div className="relative z-10" style={purpleTheme}>
        <ProblemSection />
        <SolutionSection />
        <TargetAudience />
      </div>

      {/* Footer */}
      <div className="relative z-10" style={purpleTheme}>
        <Footer />
      </div>
    </main>
  );
}
