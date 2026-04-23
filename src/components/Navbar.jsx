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
  Briefcase,
  LayoutGrid,
  Tag,
  Book,
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

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
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

  // ✅ FIXED CLICK HANDLER
  const handleHowItWorksClick = (e) => {
    e.preventDefault();

    if (pathname === "/") {
      const el = document.getElementById("how-it-works");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/#how-it-works");
    }
  };

  const navItems = [
    { name: "How It Works", href: "/#how-it-works", icon: Briefcase },
    { name: "Market Friction", href: "#market-friction", icon: AlertTriangle },
    { name: "Who Is It For", href: "#who-for", icon: Users },
    { name: "Pricing", href: "/pricing", icon: Tag },
    // { name: "Resources", href: "/resources", icon: Book },
  ];

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
        className="fixed top-0 left-0 w-full flex justify-center z-50 py-3 px-4 md:py-4"
      >
        <div className="w-full lg:w-[93%] flex rounded-lg justify-between items-center border border-gray-200 lg:border-navbar-border backdrop-blur-xl bg-white lg:bg-black/40 px-3 py-2.5 shadow-2xl relative">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-slate-900 p-2 hover:bg-slate-100 rounded-md"
            >
              <Menu size={15} />
            </button>

            <div className="hidden lg:flex gap-1 text-[13px] font-medium">
              {navItems.map((item) =>
                item?.name === "How It Works" ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={handleHowItWorksClick}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-white/90 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <item.icon className="w-3.5 h-3.5 opacity-70" />
                    <span>{item.name}</span>
                  </a>
                ) : (
                  <Link
                    key={item?.name}
                    href={item?.href}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-white/90 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <item.icon className="w-3.5 h-3.5 opacity-70" />
                    <span>{item?.name}</span>
                  </Link>
                ),
              )}

              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 ${isFeaturesOpen
                  ? "bg-white/10 text-white"
                  : "text-white/90 hover:bg-white/5"
                  }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Features</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${isFeaturesOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>

          <Link
            href="/"
            className="absolute left-[53%] -translate-x-1/2 top-1/2 -translate-y-1/2"
          >
            <div className="relative h-13 w-35 md:h-9 md:w-36 lg:h-10 lg:w-44">
              <Image
                src="/images/logo_with_text_2.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <UserProfileButton />
            ) : (
              <Link
                href="/login"
                className="bg-slate-900 lg:bg-white/15 hover:bg-slate-800 lg:hover:bg-white/60 text-white lg:hover:text-black px-4 py-2 text-[12px] font-bold flex items-center gap-2 rounded-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Desktop Features Mega Menu (Untouched) */}
        <AnimatePresence>
          {isFeaturesOpen && (
            <motion.div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="absolute hidden lg:block rounded-sm top-full left-1/2 -translate-x-1/2 w-[93%] bg-surface/90 backdrop-blur-2xl border border-glass-border p-8 shadow-2xl z-50 origin-top"
            >
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-4 space-y-2 border-r border-glass-border pr-8">
                  <FeatureItem icon={Activity} title="Real-time Analytics" desc="Track app performance instantly." />
                  <FeatureItem icon={Shield} title="Enterprise Security" desc="Bank-grade encryption." />
                  <FeatureItem icon={Globe} title="Global Scale" desc="Deploy infrastructure globally." />
                </div>
                <div className="col-span-8 grid grid-cols-2 gap-6">
                  <MegaMenuCard href='/dashboard/reddit' img="/images/f3.png" label="New Update" title="Reddit Analysis" />
                  <MegaMenuCard href='/dashboard/playstore' img="/images/f4.jpeg" label="Case Study" title="Playstore Analysis" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

                  <Link href="/dashboard/playstore"
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
      </motion.nav>
    </>
  );
}

// Sub-components
function FeatureItem({ icon: Icon, title, desc }) {
  return (
    <div className="p-3 hover:bg-primary/10 transition-all cursor-pointer group rounded-sm">
      <div className="flex items-center gap-3 mb-1">
        <Icon className="w-5 h-5 text-primary" />
        <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{title}</h4>
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