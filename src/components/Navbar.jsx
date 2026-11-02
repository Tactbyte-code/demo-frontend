"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  LogIn,
  Activity,
  Zap,
  Search,
  Briefcase,
  LayoutGrid,
  Menu,
  X,
  ArrowRight,
  Users,
  AlertTriangle,
  Target,
  MessageSquare,
  Eye,
  FileText,
  Star,
  BarChart2,
  TrendingUp,
  ShoppingBag,
  Flame,
  HelpCircle,
  Navigation,
  MapPin,
  Rss,
  Lightbulb,
  ShieldCheck,
  DollarSign,
  Rocket,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import UserProfileButton from "@/components/ui/UserProfileButton";
import { scrollToSection } from "@/lib/scrollToSection";

export default function Navbar() {

  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);

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
    timeoutRef.current = setTimeout(() => setIsFeaturesOpen(false), 300);
  };

  useEffect(() => {
    document.body.style.overflow =
      isFeaturesOpen || isMobileMenuOpen ? "hidden" : "unset";
  }, [isFeaturesOpen, isMobileMenuOpen]);

  const navItems = [
    { name: "How It Works", path: "how-it-works", href: "/#how-it-works", icon: Briefcase },
    { name: "Market Friction", path: "market-friction", href: "/#market-friction", icon: AlertTriangle },
    { name: "Who Is It For", path: "who-for", href: "/#who-for", icon: Users },
    // { name: "Pricing", href: "/pricing", icon: Tag },
  ];

  const useCases = {
    reddit: [
      { icon: Target, title: "Validate a product idea", desc: "Find real demand before building" },
      { icon: MapPin, title: "Find market gaps", desc: "Spot what competitors are missing" },
      { icon: MessageSquare, title: "Understand customer pain", desc: "Read raw, unfiltered frustrations" },
      { icon: Eye, title: "Spy on competitors", desc: "See what users hate about rivals" },
      { icon: FileText, title: "Build your pitch deck", desc: "Back your problem slide with data" },
    ],
    playstore: [
      { icon: Star, title: "Find competitor weaknesses", desc: "See what 1-star reviews reveal" },
      { icon: BarChart2, title: "Prioritize your roadmap", desc: "Rank features users request most" },
      { icon: TrendingUp, title: "Track sentiment over time", desc: "See if ratings are improving" },
      { icon: Target, title: "Validate before building", desc: "Check if your idea already exists" },
      { icon: ShoppingBag, title: "Improve your app listing", desc: "Learn what language converts users" },
    ],
    validate: [
      { icon: Lightbulb, title: "Test market willingness", desc: "Gauge if people actually need your solution" },
      { icon: ShieldCheck, title: "De-risk your MVP", desc: "Avoid spending months building the wrong thing" },
      { icon: Users, title: "Define target audience", desc: "Identify exact buyer personas and demographics" },
      { icon: DollarSign, title: "Assess monetization potential", desc: "Determine if users will pay for a solution" },
      { icon: Rocket, title: "Accelerate go-to-market", desc: "Launch with data-backed positioning from day 1" },
    ],
    keyword: [
      { icon: Flame, title: "Spot trends early", desc: "Find problems gaining traction first" },
      { icon: Rss, title: "Monitor your niche", desc: "Track keywords across communities" },
      { icon: HelpCircle, title: "Identify content opportunities", desc: "See what your audience asks" },
      { icon: Navigation, title: "Power your SEO strategy", desc: "Discover organic keywords from pain" },
      { icon: FileText, title: "Build your pitch narrative", desc: "Prove market demand with data" },
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
                item.name != "Pricing" ? (
                  <div
                    key={item.name}
                    // href={item.href}
                    // onClick={e => handleScrollToSection(e, item.path)}
                    onClick={() => scrollToSection(item.path)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-none transition-all cursor-pointer
                      ${isScrolled
                        ? "text-foreground hover:bg-primary/10 font-semibold"
                        : "hover:bg-primary/10 drop-shadow-sm text-foreground font-semibold"
                      }`}
                  >
                    <item.icon className="w-4 h-4 opacity-70" />
                    <span>{item.name}</span>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-none transition-all cursor-pointer
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

                {/* Invisible hover bridge: keeps the menu open while the cursor
      travels from the button down to the dropdown */}
                {isFeaturesOpen && (
                  <div
                    aria-hidden="true"
                    className="absolute top-full -left-10 -right-10 h-14"
                  />
                )}
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <UserProfileButton />
              ) : (
                <Link
                  href="/login"
                  className="relative inline-flex items-center gap-2 px-5 py-2 text-xs font-bold tracking-wide text-white transition-all duration-300 border rounded-full bg-gradient-to-r from-purple-800 via-indigo-900 to-fuchsia-800 border-purple-400/60 hover:border-fuchsia-300 hover:from-purple-700 hover:via-fuchsia-800 hover:to-pink-700 hover:shadow-lg hover:shadow-fuchsia-500/35 hover:-translate-y-0.5 active:translate-y-0 group"
                >
                  <LogIn className="w-4 h-4 transition-transform duration-300 text-fuchsia-200 group-hover:scale-110" />
                  <span className="text-sm">Login</span>
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

        <AnimatePresence>
          {isFeaturesOpen && (
            <motion.div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: 8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.99 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute hidden lg:block top-full left-1/2 -translate-x-1/2 w-180 bg-popover/90 backdrop-blur-xl border border-border/60 shadow-2xl rounded-2xl z-50 origin-top overflow-hidden ring-1 ring-black/[0.03] dark:ring-white/[0.05]"
            >
              <div className="flex divide-x divide-border/40">

                {/* ── LEFT: Navigation Rail (Solid Background) ── */}
                <div className="w-65 shrink-0 p-3 bg-muted dark:bg-primary flex flex-col gap-1">
                  <span className="text-[10px] font-semibold tracking-wider text-light/60 uppercase px-2.5 pt-1.5 pb-2">
                    Core Platform
                  </span>

                  {[
                    { id: "reddit", icon: Activity, title: "Reddit Analysis", desc: "Mine real user conversations.", href: "/dashboard/reddit" },
                    { id: "playstore", icon: LayoutGrid, title: "Playstore Analysis", desc: "Decode app reviews.", href: "/dashboard/playstore" },
                    { id: "validate", icon: Lightbulb, title: "Validate Idea", desc: "Analyze market demand & feasibility.", href: "/dashboard/validate-idea" },
                    { id: "keyword", icon: Search, title: "Keyword Tracking", desc: "Track trending keywords.", href: "/dashboard/lead" },
                  ].map((feature) => {
                    const currentSelected = hoveredFeature || "reddit";
                    const isActive = currentSelected === feature.id;
                    const Icon = feature.icon;

                    return (
                      <button
                        key={feature.id}
                        onMouseEnter={() => setHoveredFeature(feature.id)}
                        onClick={() => {
                          router.push(feature.href);
                          setIsFeaturesOpen(false);
                        }}
                        className="group relative flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors duration-150 outline-none select-none"
                      >
                        {/* Fluid Active Background */}
                        {isActive && (
                          <motion.div
                            layoutId="activeFeatureIndicator"
                            className="absolute inset-0 rounded-xl bg-background shadow-xs border border-border/70"
                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                          />
                        )}

                        <div
                          className={`relative z-10 p-2 rounded-lg transition-colors shrink-0 ${isActive
                            ? "bg-primary/10 text-primary"
                            : "bg-background/80 text-muted-foreground group-hover:text-foreground"
                            }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="relative z-10 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p
                              className={`text-xs font-medium tracking-tight truncate ${isActive ? "text-foreground font-semibold" : "text-light group-hover:text-foreground"
                                }`}
                            >
                              {feature.title}
                            </p>
                            <ChevronRight
                              className={`w-3 h-3 text-muted-foreground/60 transition-transform ${isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                                }`}
                            />
                          </div>
                          <p className={`text-[11px] line-clamp-1 mt-0.5 ${isActive ? "text-subtle" : "text-light/60 group-hover:text-muted-foreground"}`}>
                            {feature.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* ── RIGHT: Dynamic Context Panel ── */}
                <div className="flex-1 p-4 bg-background/50 flex flex-col justify-between min-h-[260px]">
                  <div>
                    <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase px-1 pb-2.5">
                      Applications & Solutions
                    </p>

                    <AnimatePresence mode="wait">
                      {useCases[hoveredFeature || "reddit"] ? (
                        <motion.div
                          key={hoveredFeature || "reddit"}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.12 }}
                          className="grid grid-cols-1 gap-2"
                        >
                          {useCases[hoveredFeature || "reddit"].map((item, i) => {
                            const CaseIcon = item.icon || Zap;
                            const currentTarget = hoveredFeature || "reddit";
                            const routeMap = {
                              reddit: "/dashboard/reddit",
                              playstore: "/dashboard/playstore",
                              validate: "/dashboard/validate-idea",
                              keyword: "/dashboard/ai-lead-engine/campaigns",
                            };

                            return (
                              <div
                                key={i}
                                onClick={() => {
                                  router.push(routeMap[currentTarget] || "/dashboard/reddit");
                                  setIsFeaturesOpen(false);
                                }}
                                className="group flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-border/50 hover:bg-muted/8 transition-all cursor-pointer"
                              >
                                <div className="mt-0.5 p-1.5 rounded-md bg-primary/5 text-primary shrink-0 group-hover:bg-primary/10 transition-colors">
                                  <CaseIcon className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-foreground tracking-tight group-hover:text-primary transition-colors flex items-center gap-1">
                                    {item.title}
                                    <span className="inline-block transition-transform duration-150 group-hover:translate-x-0.5 text-[10px]">
                                      &rarr;
                                    </span>
                                  </p>
                                  <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-48 gap-2 text-center">
                          <div className="p-2.5 rounded-full bg-muted/60 text-muted-foreground">
                            <Zap className="w-4 h-4" />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Select an engine to inspect use cases
                          </p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* ── BOTTOM: SaaS Micro-Bar ── */}
              <div className="px-4 py-2.5 bg-muted/40 border-t border-border/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px]">Real-time analytics engine active</span>
                </div>

                <button
                  onClick={() => {
                    const activeHref = {
                      reddit: "/dashboard/reddit",
                      playstore: "/dashboard/playstore",
                      validate: "/dashboard/validate-idea",
                      keyword: "/dashboard/lead",
                    }[hoveredFeature || "reddit"] || "/dashboard/reddit";
                    router.push(activeHref);
                    setIsFeaturesOpen(false);
                  }}
                  className="inline-flex items-center gap-1.5 font-medium text-[11px] text-primary hover:underline group"
                >
                  Explore this module
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </button>
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
              className="fixed inset-y-0 left-0 h-screen w-[80vw] bg-surface z-[70] flex flex-col lg:hidden border-r border-border-solid/30 shadow-2xl"
            >
              <div className="flex justify-between items-center p-4 shrink-0">
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

              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">

                <div className="mt-2 mb-8">
                  {/* Trigger */}
                  <button
                    onClick={() => setIsMobileFeaturesOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between px-3 py-2 text-[16px] font-medium text-foreground hover:bg-surface-card transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-surface-raised rounded-full border border-border">
                        <Zap className="w-4 h-4" />
                      </div>
                      Features
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isMobileFeaturesOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {isMobileFeaturesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden flex flex-col gap-2 mt-2"
                      >
                        <div className="mt-2 mb-8 overflow-y-auto">

                          {/* Reddit */}
                          <div className="flex flex-col gap-2">
                            <Link
                              href="/dashboard/reddit"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between p-3 bg-surface-card border border-border-solid/20 group active:scale-[0.98] transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <Activity className="w-4 h-4 text-primary" />
                                <span className="text-[15px] font-medium text-foreground">
                                  Reddit Analysis
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {/* Reddit Use Cases */}
                            <div className="ml-4 flex flex-col gap-1">
                              {useCases.reddit.map((item, i) => (
                                <div key={i} className="flex items-start gap-2 px-2 py-1">
                                  <item.icon className="w-3.5 h-3.5 text-primary mt-0.5" />
                                  <div>
                                    <p className="text-[13px] font-medium text-foreground leading-tight">
                                      {item.title}
                                    </p>
                                    <p className="text-[11px] text-muted">{item.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Playstore */}
                          <div className="flex flex-col gap-2 mt-4">
                            <Link
                              href="/dashboard/playstore"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between p-3 bg-surface-card border border-border-solid/20 group active:scale-[0.98] transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <LayoutGrid className="w-4 h-4 text-primary" />
                                <span className="text-[15px] font-medium text-foreground">
                                  Playstore Analysis
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {/* Playstore Use Cases */}
                            <div className="ml-4 flex flex-col gap-1">
                              {useCases.playstore.map((item, i) => (
                                <div key={i} className="flex items-start gap-2 px-2 py-1">
                                  <item.icon className="w-3.5 h-3.5 text-primary mt-0.5" />
                                  <div>
                                    <p className="text-[13px] font-medium text-foreground leading-tight">
                                      {item.title}
                                    </p>
                                    <p className="text-[11px] text-muted">{item.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Keyword */}
                          <div className="flex flex-col gap-2 mt-4">
                            <Link
                              href="/dashboard/lead"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between p-3 bg-surface-card border border-border-solid/20 group active:scale-[0.98] transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <Search className="w-4 h-4 text-primary" />
                                <span className="text-[15px] font-medium text-foreground">
                                  Keyword Tracking
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {/* Keyword Use Cases */}
                            <div className="ml-4 flex flex-col gap-1">
                              {useCases.keyword.map((item, i) => (
                                <div key={i} className="flex items-start gap-2 px-2 py-1">
                                  <item.icon className="w-3.5 h-3.5 text-primary mt-0.5" />
                                  <div>
                                    <p className="text-[13px] font-medium text-foreground leading-tight">
                                      {item.title}
                                    </p>
                                    <p className="text-[11px] text-muted">{item.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
                      <div className="p-2 bg-surface-raised border border-border rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
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
                      <div className="p-2 bg-surface-raised border border-border rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <item.icon className="w-4 h-4" />
                      </div>
                      {item.name}
                    </Link>
                  )
                )}

                <div className="h-px my-4" />
                {/* <Link
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
                </Link> */}
              </div>

              {!isLoggedIn && (
                <div className="shrink-0 pt-4 pb-4 px-4 border-t border-border-solid/20">
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
};

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
};