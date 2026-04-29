"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  LogIn,
  Activity,
  Shield,
  Zap,
  Globe,
  Search,
  Briefcase,
  LayoutGrid,
  Tag,
  Menu,
  X,
  ArrowRight,
  Users,
  AlertTriangle,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import UserProfileButton from "@/components/ui/UserProfileButton";

export default function Navbar() {

  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    if (latest > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const checkUser = () => {
    const stored = localStorage.getItem("user");
    setIsLoggedIn(!!stored);
  };

  useEffect(() => {
    checkUser();
    window.addEventListener("storage", checkUser);
    window.addEventListener("userUpdated", checkUser);
    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("userUpdated", checkUser);
    };
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth < 1024) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsFeaturesOpen(true), 100);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 1024) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsFeaturesOpen(false), 200);
  };

  useEffect(() => {
    document.body.style.overflow =
      isFeaturesOpen || isMobileMenuOpen ? "hidden" : "unset";
  }, [isFeaturesOpen, isMobileMenuOpen]);

  const handleHowItWorksClick = (e) => {
    e.preventDefault();
    if (pathname === "/") {
      const el = document.getElementById("how-it-works");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#how-it-works");
    }
  };

  const navItems = [
    { name: "How It Works", href: "/#how-it-works", icon: Briefcase },
    { name: "Market Friction", href: "#market-friction", icon: AlertTriangle },
    { name: "Who Is It For", href: "#who-for", icon: Users },
    { name: "Pricing", href: "/pricing", icon: Tag },
  ];

  const useCases = {
    reddit: [
      { title: "Validate a product idea", desc: "Find real demand before building" },
      { title: "Find market gaps", desc: "Spot what competitors are missing" },
      { title: "Understand customer pain", desc: "Read raw, unfiltered user frustrations" },
      { title: "Spy on competitors", desc: "See what users hate about rival products" },
      { title: "Build your pitch deck", desc: "Back your problem slide with real data" },
    ],
    playstore: [
      { title: "Find competitor weaknesses", desc: "See what 1-star reviews say about rival apps" },
      { title: "Prioritize your roadmap", desc: "Rank features users request most in reviews" },
      { title: "Track sentiment over time", desc: "See if an app's ratings are improving or declining" },
      { title: "Validate before building", desc: "Check if your idea already exists and underdelivers" },
      { title: "Improve your app listing", desc: "Learn what language converts users in your niche" },
    ],
    keyword: [
      { title: "Spot trends early", desc: "Find problems gaining traction before competitors do" },
      { title: "Monitor your niche", desc: "Track specific keywords across multiple communities" },
      { title: "Identify content opportunities", desc: "See what questions your audience keeps asking" },
      { title: "Power your SEO strategy", desc: "Discover organic keywords straight from user pain" },
      { title: "Build your pitch narrative", desc: "Use real search volume data to prove market demand" },
    ],
  };

  return (
    <>
      <AnimatePresence>
        {isFeaturesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 hidden lg:block"
          />
        )}
      </AnimatePresence>

      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-110%" },
        }}
        animate={isVisible ? "visible" : "hidden"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full flex justify-center z-50 py-2 px-2 md:py-4 md:px-5"
      >
        {/* ── DESKTOP NAVBAR ── */}
        <div className="hidden lg:flex w-full justify-center px-6 pt-0">
          <div
            className={`w-full max-w-8xl flex items-center rounded-full justify-between pl-10 pr-5 py-2 border transition-all duration-300
              ${isScrolled
                ? "bg-primary/20 backdrop-blur-xl border-primary/30 shadow-lg"
                : "bg-transparent border-transparent shadow-none"
              }
            `}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-17 w-55">
                <Image
                  src="/images/logo_with_text_2.png"
                  alt="Logo"
                  fill
                  className="object-contain transition-all"
                  priority
                />
              </div>
            </Link>

            {/* Center nav */}
            <div className="flex items-center gap-2 text-[13px] font-medium">
              {navItems.map((item) =>
                item.name === "How It Works" ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={handleHowItWorksClick}
                    className={`flex items-center gap-2 px-3 py-2 rounded-none transition-all
                      ${isScrolled
                        ? "text-foreground hover:bg-primary/10 font-semibold"
                        : "hover:bg-primary/10 drop-shadow-sm text-foreground font-semibold"
                      }`}
                  >
                    <item.icon className="w-4 h-4 opacity-70" />
                    <span>{item.name}</span>
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-none transition-all
                      ${isScrolled
                        ? "text-foreground hover:bg-primary/10 font-semibold"
                        : "hover:bg-primary/10 drop-shadow-sm text-foreground font-semibold"
                      }`}
                  >
                    <item.icon className="w-4 h-4 opacity-70" />
                    <span>{item.name}</span>
                  </Link>
                )
              )}

              {/* Features trigger */}
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-none transition-all
                    ${isFeaturesOpen
                      ? "text-foreground hover:bg-primary/10 font-semibold"
                      : isScrolled
                        ? "text-foreground font-semibold"
                        : "hover:bg-primary/10 drop-shadow-sm text-foreground font-semibold"
                    }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Features</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${isFeaturesOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <UserProfileButton />
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2 text-[12px] font-bold rounded-full bg-slate-900 dark:bg-white text-white dark:text-black hover:opacity-90 transition-all flex items-center gap-2 shadow-sm"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* ── MOBILE NAVBAR ── */}
        <div
          className={`flex lg:hidden w-full items-center justify-between px-5 py-2 rounded-full mt-1 transition-all duration-300
            ${isScrolled
              ? "bg-primary/20 backdrop-blur-xl border border-primary/30 shadow-lg"
              : "bg-transparent border-transparent shadow-none"
            }
          `}
        >
          {/* Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            className={`p-2 rounded-full transition-all
            ${isScrolled
                ? "text-foreground hover:bg-primary/10"
                : "text-foreground hover:bg-primary/10 drop-shadow-sm"
              }`}
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <Link href="/">
            <div className="relative h-13 w-50">
              <Image
                src="/images/logo_with_text_2.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Login / profile */}
          <div>
            {isLoggedIn ? (
              <UserProfileButton />
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-[12px] font-bold bg-slate-900 dark:bg-white text-light flex items-center gap-1.5 shadow-sm hover:opacity-90 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login
              </Link>
            )}
          </div>
        </div>

        {/* ── DESKTOP FEATURES MEGA MENU ── */}
        <AnimatePresence>
          {isFeaturesOpen && (
            <motion.div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="absolute hidden lg:block rounded-none top-full left-1/2 -translate-x-1/2 w-[93%] bg-navbar-bg backdrop-blur-2xl border border-slate-200/80 shadow-2xl z-50 origin-top overflow-hidden"
            >
              <div className="flex">
                {/* ── LEFT: Feature list ── */}
                <div className="w-[38%] border-r border-slate-100 dark:border-white/8 p-6 flex flex-col gap-4">
                  {[
                    {
                      id: "reddit",
                      icon: Activity,
                      title: "Reddit Analysis",
                      desc: "Mine real user conversations for product insight.",
                    },
                    {
                      id: "playstore",
                      icon: LayoutGrid,
                      title: "Playstore Analysis",
                      desc: "Decode app reviews to find competitor weaknesses.",
                    },
                    {
                      id: "keyword",
                      icon: Search,
                      title: "Keyword Tracking",
                      desc: "Track trending keywords across communities.",
                    },
                  ].map((feature) => (
                    <button
                      key={feature.id}
                      onMouseEnter={() => setHoveredFeature(feature.id)}
                      onMouseLeave={() => setHoveredFeature(null)}
                      className={`flex items-start gap-3 px-4 py-4 rounded-none text-left transition-all group
                ${hoveredFeature === feature.id ? "bg-primary/10" : "hover:bg-primary/5"}`}
                    >
                      <div className={`p-2 rounded-full mt-0.5 transition-colors
                ${hoveredFeature === feature.id ? "bg-primary/15 text-primary" : "bg-surface-raised text-muted"}`}>
                        <feature.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className={`text-sm font-semibold transition-colors
                  ${hoveredFeature === feature.id ? "text-primary" : "text-foreground"}`}>
                          {feature.title}
                        </p>
                        <p className="text-xs text-muted mt-0.5">{feature.desc}</p>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 ml-auto mt-1 transition-all
                ${hoveredFeature === feature.id ? "opacity-100 translate-x-0 text-primary" : "opacity-0 -translate-x-1"}`} />
                    </button>
                  ))}
                </div>

                {/* ── RIGHT: Use cases panel ── */}
                <div className="flex-1 p-6">
                  <AnimatePresence mode="wait">
                    {hoveredFeature ? (
                      <motion.div
                        key={hoveredFeature}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.18 }}
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-4 px-1">
                          Use cases
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {useCases[hoveredFeature].map((item, i) => (
                            <div
                              key={i}
                              className="px-4 py-3 rounded-none border border-border-solid hover:border-primary/30 hover:bg-primary/5 transition-all group cursor-default"
                            >
                              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                {item.title}
                              </p>
                              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col items-center justify-center text-center gap-3 py-8"
                      >
                        <div className="p-3 rounded-full bg-surface-raised">
                          <Zap className="w-5 h-5 text-muted" />
                        </div>
                        <p className="text-sm text-muted">Hover a feature to explore use cases</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── MOBILE SIDE DRAWER ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-[60] lg:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-surface z-[70] p-0 flex flex-col lg:hidden border-r border-border-solid/30 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-0 p-4">
                <div className="h-15 w-48 relative">
                  <Image
                    src="/images/logo_with_text_2.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted hover:text-foreground p-2 bg-surface-card rounded-full transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-1 p-6">
                <p className="text-xs font-semibold text-muted uppercase tracking-wide px-1 mb-2">
                  Main Menu
                </p>

                {navItems.map((item) =>
                  item.name === "How It Works" ? (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        handleHowItWorksClick(e);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-[16px] py-1.5 px-3 text-foreground font-medium hover:bg-surface-card transition-colors group"
                    >
                      <div className="p-2 bg-surface-raised rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <item.icon className="w-4 h-4" />
                      </div>
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-1.5 text-foreground text-[16px] font-medium hover:bg-surface-card transition-colors group"
                    >
                      <div className="p-2 bg-surface-raised rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <item.icon className="w-4 h-4" />
                      </div>
                      {item.name}
                    </Link>
                  )
                )}

                <div className="h-px my-4" />

                <p className="text-xs font-semibold text-muted uppercase tracking-wide px-1 mb-2">
                  Our Core Features
                </p>

                <Link
                  href="/dashboard/reddit"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-4 bg-surface-card border border-border-solid/20 group active:scale-[0.98] transition-all mb-2"
                >
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-[16px] font-medium text-foreground">
                      Reddit Scan
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/dashboard/playstore"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-4 bg-surface-card border border-border-solid/20 group active:scale-[0.98] transition-all mb-2"
                >
                  <div className="flex items-center gap-3">
                    <LayoutGrid className="w-4 h-4 text-primary" />
                    <span className="text-[16px] font-medium text-foreground">
                      Playstore Analysis
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {!isLoggedIn && (
                <div className="mt-auto pt-6 pb-4 px-4">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-primary text-white py-4 font-semibold flex items-center justify-center gap-2 shadow-xl shadow-primary/30 active:scale-95 transition-transform"
                  >
                    Get Started
                    <ArrowRight size={22} />
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Sub-components
function FeatureItem({ icon: Icon, title, desc }) {
  return (
    <div className="p-3 hover:bg-primary/10 transition-all cursor-pointer group rounded-full">
      <div className="flex items-center gap-3 mb-1">
        <Icon className="w-5 h-5 text-primary" />
        <h4 className="font-bold text-subtle group-hover:text-primary transition-colors">{title}</h4>
      </div>
      <p className="text-xs text-muted ml-8">{desc}</p>
    </div>
  );
}

function MegaMenuCard({ href, img, label, title }) {
  return (
    <Link href={href} className="relative aspect-video overflow-hidden bg-background border border-border-solid group cursor-pointer shadow-sm">
      <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <Image src={img} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute bottom-4 left-4 z-20">
        <span className="bg-primary/20 backdrop-blur-md text-primary text-[10px] px-2 py-0.5 border border-primary/20 mb-2 block w-fit font-bold">{label}</span>
        <p className="text-foreground group-hover:text-white font-bold text-sm transition-colors">{title}</p>
      </div>
    </Link>
  );
}