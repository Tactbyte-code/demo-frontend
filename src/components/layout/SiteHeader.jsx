"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { ArrowRight, User, Zap, ChevronDown, Menu, X, Tag } from "lucide-react";
import LoginModal from "@/components/auth/loginModal/LoginModal";
import { scrollToSection } from "@/lib/scrollToSection";
import { features, navItems, navButtonClass } from "@/components/layout/siteNav";

export default function SiteHeader() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLoginSuccess = () => setShowLoginModal(false);

  // Sections live on the home page; from any other page, go there first.
  const goToSection = (id) => {
    if (pathname === "/") scrollToSection(id);
    else router.push(`/#${id}`);
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-[88px] shrink-0 items-center justify-between border-b border-[#EAE2F1] bg-[#FDFBFF]/85 px-4 backdrop-blur-md sm:px-10 lg:px-16">
        {/* Logo */}
        <Link href="/" className="flex min-w-0 items-center gap-0">
          <div className="relative h-10 w-10 shrink-0 sm:h-18 sm:w-18">
            <Image src="/images/logo-new-no-bg.png" alt="ProblemPulse Logo" fill className="object-contain transition-all" priority />
          </div>
          <span className="bg-linear-to-r from-[#5F19C5] via-[#9326D5] to-[#FA418B] bg-clip-text text-base font-bold tracking-tight whitespace-nowrap sm:text-2xl text-transparent">ProblemPulse</span>
        </Link>

        {/* Navigation links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const NavIcon = item.icon;
            return (
              <button key={item.id} type="button" onClick={() => goToSection(item.id)} className={navButtonClass}>
                <NavIcon className="h-4 w-4 opacity-70" />
                {item.name}
              </button>
            );
          })}

          <div className="relative" onMouseEnter={() => setFeaturesOpen(true)} onMouseLeave={() => setFeaturesOpen(false)}>
            <button type="button" aria-haspopup="true" aria-expanded={featuresOpen} onClick={() => setFeaturesOpen((open) => !open)} className={navButtonClass}>
              <Zap className="h-4 w-4 opacity-70" />
              Features
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${featuresOpen ? "rotate-180" : ""}`} />
            </button>

            {featuresOpen && (
              <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-2">
                <div className="rounded-2xl border border-[#EAE2F1] bg-white p-2 shadow-[0_18px_40px_rgba(95,25,197,0.10)]">
                  {features.map((feature) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <Link key={feature.number} href={feature.href} className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-[#F4EFFA]">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${feature.iconBg} ${feature.iconColor}`}>
                          <FeatureIcon size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#292333]">{feature.title}</p>
                          <p className="mt-0.5 text-xs leading-5 text-[#756B80]">{feature.tag}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link href="/pricing" className={navButtonClass}>
            <Tag className="h-4 w-4 opacity-70" />
            Pricing
          </Link>
        </nav>

        {/* Navbar actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {user ? (
            <Link
              href="/my-account"
              className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#5F19C5] to-[#FA418B] px-3 py-2 text-xs font-semibold whitespace-nowrap text-white sm:px-5 sm:py-2.5 sm:text-sm shadow-md shadow-[#9326D5]/20 transition hover:opacity-90"
            >
              <User className="h-4 w-4" />
              My Account
            </Link>
          ) : (
            <button onClick={() => setShowLoginModal(true)} className="flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#5F19C5] via-[#9326D5] to-[#FA418B] px-3 py-2 text-xs font-semibold whitespace-nowrap text-white shadow-md shadow-[#9326D5]/20 transition sm:px-5 sm:py-2.5 sm:text-sm hover:scale-[1.02] hover:shadow-lg">
              Get Started
              <ArrowRight className="hidden size-4 sm:block" />
            </button>
          )}

          <button type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} onClick={() => setMobileOpen((open) => !open)} className="shrink-0 rounded-lg border border-[#EAE2F1] p-2.5 text-[#5F19C5] transition hover:bg-[#F4EFFA] lg:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="absolute left-0 right-0 top-full border-b border-[#EAE2F1] bg-[#FDFBFF] px-5 pb-5 pt-3 shadow-[0_18px_40px_rgba(95,25,197,0.08)] sm:px-10 lg:hidden">
            {navItems.map((item) => {
              const NavIcon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    goToSection(item.id);
                    setMobileOpen(false);
                  }}
                  className={`${navButtonClass} w-full`}
                >
                  <NavIcon className="h-4 w-4 opacity-70" />
                  {item.name}
                </button>
              );
            })}

            <Link href="/pricing" onClick={() => setMobileOpen(false)} className={`${navButtonClass} w-full`}>
              <Tag className="h-4 w-4 opacity-70" />
              Pricing
            </Link>

            <p className="mt-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-[#968AA3]">Features</p>
            {features.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <Link key={feature.number} href={feature.href} onClick={() => setMobileOpen(false)} className={`${navButtonClass} w-full`}>
                  <FeatureIcon className={`h-4 w-4 ${feature.iconColor}`} />
                  {feature.title}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />}
    </>
  );
}
