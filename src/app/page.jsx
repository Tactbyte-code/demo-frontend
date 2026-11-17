"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import {
  ArrowUpRight,
  MessageSquare,
  Smartphone,
  Lightbulb,
  LogIn,
  Sparkles,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Validate Idea",
    description:
      "Evaluate your startup idea through market demand, customer pain points, competition, and economics.",
    href: "/validate-idea",
    icon: Lightbulb,
    iconColor: "text-[#FA418B]",
    iconBg: "bg-[#FA418B]/10",
    hoverBorder: "hover:border-[#FA418B]/50",
    hoverIcon: "group-hover:bg-[#FA418B] group-hover:text-white",
    tag: "Validate your thinking",
  },
  {
    number: "02",
    title: "Reddit Analysis",
    description:
      "Discover real user frustrations, recurring problems, and unmet needs through conversations across Reddit.",
    href: "/reddit",
    icon: MessageSquare,
    iconColor: "text-[#7138D5]",
    iconBg: "bg-[#7138D5]/10",
    hoverBorder: "hover:border-[#9326D5]/50",
    hoverIcon: "group-hover:bg-[#7138D5] group-hover:text-white",
    tag: "Explore communities",
  },
  {
    number: "03",
    title: "Play Store Analysis",
    description:
      "Understand what users love, dislike, and wish existed by analyzing app reviews and feedback.",
    href: "/playstore",
    icon: Smartphone,
    iconColor: "text-[#C12AAE]",
    iconBg: "bg-[#C12AAE]/10",
    hoverBorder: "hover:border-[#D82C9E]/50",
    hoverIcon: "group-hover:bg-[#C12AAE] group-hover:text-white",
    tag: "Analyze app reviews",
  },
];

export default function HomePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#FDFBFF] text-[#292333] lg:h-screen lg:min-h-0">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full bg-[#D82C9E]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-[#5F19C5]/10 blur-3xl" />

      {/* Navbar */}
      <header className="relative z-10 flex h-[88px] shrink-0 items-center justify-between border-b border-[#EAE2F1] px-5 sm:px-10 lg:px-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-0">
          <div className="relative h-18 w-18 shrink-0">
            <Image
              src="/images/logo-new-no-bg.png"
              alt="ProblemPulse Logo"
              fill
              className="object-contain transition-all"
              priority
            />
          </div>

          <span className="bg-linear-to-r from-[#5F19C5] via-[#9326D5] to-[#FA418B] bg-clip-text text-2xl font-bold tracking-tight whitespace-nowrap text-transparent">
            ProblemPulse
          </span>
        </Link>

        {/* Navbar actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/profile"
              className="rounded-xl bg-linear-to-r from-[#5F19C5] to-[#FA418B] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#9326D5]/20 transition hover:opacity-90"
            >
              My Account
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#665B72] transition hover:text-[#7138D5] sm:flex"
              >
                <LogIn size={16} />
                Log in
              </Link>

              <Link
                href="/signup"
                className="rounded-xl bg-linear-to-r from-[#5F19C5] via-[#9326D5] to-[#FA418B] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#9326D5]/20 transition hover:scale-[1.02] hover:shadow-lg"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Main content */}
      <section className="relative z-10 flex flex-1 flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 lg:py-8">

        {/* Hero */}
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-12">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D82C9E]/20 bg-linear-to-r from-[#5F19C5]/5 via-[#9326D5]/5 to-[#FA418B]/10 px-4 py-2 text-xs font-semibold tracking-wide text-[#9326D5]">
            <Sparkles size={14} />
            TURN INSIGHTS INTO OPPORTUNITIES
          </div>

          <h1 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[56px]">
            Find problems.
            <br />
            <span className="bg-linear-to-r from-[#5F19C5] via-[#9326D5] via-[#D82C9E] to-[#FA418B] bg-clip-text text-transparent">
              Build what matters.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#756B80] sm:text-base">
            Stop guessing what people need. Discover real
            problems, uncover market opportunities, and
            validate your next big idea with AI-powered
            research.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
                key={feature.number}
                href={feature.href}
                className={`group relative flex min-h-[260px] flex-col rounded-2xl border border-[#EAE2F1] bg-white/85 p-6 shadow-[0_8px_30px_rgba(95,25,197,0.035)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(95,25,197,0.10)] sm:p-7 ${feature.hoverBorder}`}
              >
                <div className="mb-7 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg} ${feature.iconColor} ${feature.hoverIcon} transition duration-300`}>
                    <Icon size={23} />
                  </div>

                  <span className="text-xs font-semibold tracking-widest text-[#B8AFC4]">
                    {feature.number}
                  </span>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-[#292333]">
                  {feature.title}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-6 text-[#756B80]">
                  {feature.description}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-[#F0EAF5] pt-5">
                  <span className="text-xs font-semibold bg-linear-to-r from-[#7138D5] to-[#D82C9E] bg-clip-text text-transparent">
                    {feature.tag}
                  </span>

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
          <p className="text-xs text-[#968AA3]">
            No guesswork. No assumptions. Just insights backed
            by real-world data.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex shrink-0 flex-col items-center justify-between gap-2 border-t border-[#EAE2F1] px-6 py-4 text-xs text-[#968AA3] sm:flex-row sm:px-10 lg:px-16">
        <p>
          © {new Date().getFullYear()} ProblemPulse. All rights reserved.
        </p>

        <p>
          Built for founders, builders, and curious minds.
        </p>
      </footer>
    </main>
  );
}









// "use client"

// import React from "react";
// import ComparisonSection from "@/components/ComparisonSection";
// import FAQSection from "@/components/FAQSection";
// import FeaturesSection from "@/components/FeaturesSection";
// import FinalCTA from "@/components/FinalCTA";
// import Hero from "@/components/Hero";
// import ProblemSection from "@/components/ProblemSection";
// import SampleInsights from "@/components/SampleInsights";
// import SolutionSection from "@/components/SolutionSection";
// import TargetAudience from "@/components/TargetAudience";
// import Testimonials from "@/components/Testimonials";
// import AuthVerificationHandler from "@/components/AuthVerificationHandler";

// const page = () => {

//   return (
//     <>
//       <AuthVerificationHandler />
//       <Hero />
//       <ProblemSection />
//       <SolutionSection />
//       <FeaturesSection />
//       <TargetAudience />
//       <SampleInsights />
//       <ComparisonSection />
//       <Testimonials />
//       <FAQSection />
//       <FinalCTA />
//     </>
//   );
// };

// export default page;