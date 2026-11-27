"use client";

import { useState } from "react";
import {
    ArrowRight,
    Sparkles,
    Link2,
    Search,
    ChartNoAxesCombined,
    ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ProductHeader from "@/components/layout/ProductHeader";
import { getToken } from "@/lib/getToken";
import { useCreditStore } from "@/store/useCreditStore";
import CreditPurchaseModal from "@/components/credits/CreditPurchaseModal";
import { createQuery } from "@/lib/api/playstore";
import { initializeGuestSession } from "@/lib/api/guest";
import LoginModal from "@/components/auth/loginModal/LoginModal";

const steps = [
    {
        number: "1",
        title: "Share an app URL",
        description: "Paste any Google Play Store app link",
        icon: Link2,
    },
    {
        number: "2",
        title: "AI analyzes reviews",
        description: "We uncover patterns in user feedback",
        icon: Search,
    },
    {
        number: "3",
        title: "Discover insights",
        description: "Understand users and opportunities",
        icon: ChartNoAxesCombined,
    },
];

function GooglePlayIcon({ className = "h-7 w-7" }) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="play-blue" x1="5" y1="5" x2="25" y2="25">
                    <stop stopColor="#00A0FF" />
                    <stop offset="1" stopColor="#0066DA" />
                </linearGradient>
                <linearGradient id="play-green" x1="10" y1="38" x2="35" y2="22">
                    <stop stopColor="#00D26A" />
                    <stop offset="1" stopColor="#00A85A" />
                </linearGradient>
                <linearGradient id="play-yellow" x1="25" y1="10" x2="44" y2="24">
                    <stop stopColor="#FFDF00" />
                    <stop offset="1" stopColor="#FFB800" />
                </linearGradient>
                <linearGradient id="play-red" x1="25" y1="25" x2="43" y2="38">
                    <stop stopColor="#FF5A5F" />
                    <stop offset="1" stopColor="#E94235" />
                </linearGradient>
            </defs>

            <path
                d="M7.2 5.2C6.4 6 6 7.2 6 8.8V39.2C6 40.8 6.4 42 7.2 42.8L26 24L7.2 5.2Z"
                fill="url(#play-blue)"
            />
            <path
                d="M32.2 17.8L10.2 4.9C9.1 4.2 8 4.1 7.2 5.2L26 24L32.2 17.8Z"
                fill="url(#play-green)"
            />
            <path
                d="M26 24L32.2 30.2L40.2 25.5C42.6 24.1 42.6 23.9 40.2 22.5L32.2 17.8L26 24Z"
                fill="url(#play-yellow)"
            />
            <path
                d="M7.2 42.8C8 43.9 9.1 43.8 10.2 43.1L32.2 30.2L26 24L7.2 42.8Z"
                fill="url(#play-red)"
            />
        </svg>
    );
}

const isValidPlayStoreUrl = (value) => {
    try {
        const parsedUrl = new URL(
            value.startsWith("http://") || value.startsWith("https://")
                ? value
                : `https://${value}`
        );

        return (
            parsedUrl.hostname === "play.google.com" &&
            parsedUrl.pathname === "/store/apps/details" &&
            Boolean(parsedUrl.searchParams.get("id"))
        );
    } catch {
        return false;
    }
};

const PlaystoreHero = () => {
    const router = useRouter();

    const [appUrl, setAppUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [pendingAppId, setPendingAppId] = useState(null);

    const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);

    const getCredits = useCreditStore((state) => state.getCredits);

    const handleUrlChange = (e) => {
        setAppUrl(e.target.value);

        if (error) {
            setError("");
        }
    };

    const submitAnalysis = async (appId) => {
        const token = await getToken();

        // Authenticated users must have sufficient credits.
        if (token) {
            await getCredits(true);

            const freshCredits = useCreditStore.getState().credits;

            if (freshCredits < 15) {
                setIsCreditModalOpen(true);
                return;
            }
        }

        const body = {
            app_id: appId,
            max_review: 500,
        };

        const response = await createQuery(body);

        const queryId = response?.id;
        const status = response?.status;

        if (!queryId || !status) {
            throw new Error(
                "No analysis ID was returned from the server."
            );
        }

        if (status === "CREATED") {
            router.push(`/playstore/analysis/${queryId}`);
        } else if (status === "FAILED") {
            setError(
                response.failure_reason ||
                "Failed to create Play Store analysis."
            );
        }
    };

    const handleAnalyze = async (e) => {
        e.preventDefault();

        const trimmedUrl = appUrl.trim();

        if (!trimmedUrl) {
            setError("Please enter a Google Play Store app URL.");
            return;
        }

        if (!isValidPlayStoreUrl(trimmedUrl)) {
            setError(
                "Please enter a valid Google Play Store app URL containing an app ID."
            );
            return;
        }

        // Extract and validate the app ID.
        const appId = new URL(
            trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")
                ? trimmedUrl
                : `https://${trimmedUrl}`
        ).searchParams.get("id")?.trim();

        if (!appId || !/^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)+$/.test(appId)) {
            setError("Please enter a valid Google Play Store app ID.");
            return;
        };

        if (isSubmitting) return;

        try {
            setError("");
            setIsSubmitting(true);

            const token = await getToken();

            console.log("Authenticated token exists: ", !!token);

            if (!token) {
                const guestSession = await initializeGuestSession();

                console.log("Guest session response:", guestSession);
                console.log(
                    "Guest session created:",
                    guestSession?.guest_session_created
                );

                if (guestSession?.guest_session_created === false) {
                    console.log("Returning anonymous visitor - showing login modal");

                    setPendingAppId(appId);
                    setShowLoginModal(true);

                    return;
                }

                console.log("First-time anonymous visitor - proceeding");
            }

            // --------------------------------------------------
            // 2. Submit analysis
            // --------------------------------------------------
            await submitAnalysis(appId);

        } catch (err) {
            setError(
                err.response?.data?.detail ||
                err.message ||
                "Failed to submit Play Store analysis."
            );

            console.error("Play Store submission error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLoginSuccess = async () => {
        const appId = pendingAppId;

        setShowLoginModal(false);
        setPendingAppId(null);

        if (!appId) return;

        try {
            setError("");
            setIsSubmitting(true);

            // Automatically resume the pending analysis.
            // submitAnalysis will now detect the authenticated user
            // and perform the credit check.
            await submitAnalysis(appId);

        } catch (err) {
            setError(
                err.response?.data?.detail ||
                err.message ||
                "Failed to submit Play Store analysis."
            );

            console.error("Play Store submission error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <ProductHeader />

            <section
                id="playstore-hero"
                className="relative isolate min-h-screen overflow-hidden bg-[#F8FCF9] lg:h-screen lg:min-h-0 lg:max-h-screen"
            >
                {/* Google Play inspired background */}
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div
                        className="absolute right-0 top-0 h-[280px] w-[440px] opacity-[0.13]"
                        style={{
                            backgroundImage:
                                "radial-gradient(#34A853 1.3px, transparent 1.3px)",
                            backgroundSize: "22px 22px",
                            maskImage:
                                "linear-gradient(to bottom left, black, transparent)",
                        }}
                    />

                    <div
                        className="absolute bottom-0 left-0 h-[250px] w-[400px] opacity-[0.10]"
                        style={{
                            backgroundImage:
                                "radial-gradient(#4285F4 1.3px, transparent 1.3px)",
                            backgroundSize: "22px 22px",
                            maskImage:
                                "linear-gradient(to top right, black, transparent)",
                        }}
                    />

                    <div className="absolute -right-40 top-20 h-[420px] w-[600px] rotate-[-25deg] rounded-[100%] border border-[#34A853]/15" />

                    <div className="absolute -right-32 top-32 h-[340px] w-[500px] rotate-[-25deg] rounded-[100%] border border-[#FBBC04]/15" />

                    <div className="absolute -left-40 top-[35%] h-[350px] w-[500px] rounded-full bg-[#D8F3DF]/40 blur-[100px]" />

                    <div className="absolute right-[15%] bottom-[10%] h-[300px] w-[350px] rounded-full bg-[#DCEBFF]/30 blur-[100px]" />
                </div>

                {/* Main container */}
                <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 pb-5 pt-24 sm:px-10 lg:h-full lg:min-h-0 lg:px-12 lg:pb-5 lg:pt-24">
                    <main className="flex flex-1 flex-col items-center justify-center py-12 lg:min-h-0 lg:py-5">
                        <div className="mx-auto w-full max-w-[850px] text-center">

                            {/* Heading */}
                            <h1 className="mx-auto max-w-[800px] text-[36px] font-extrabold leading-[1.13] tracking-tight text-[#142B1B] sm:text-5xl lg:text-[56px]">
                                Understand what users{" "}
                                <span className="bg-gradient-to-r from-[#188038] via-[#34A853] to-[#00A878] bg-clip-text text-transparent">
                                    really think.
                                </span>
                            </h1>

                            {/* <p className="mx-auto mt-5 max-w-[680px] text-[15px] font-medium leading-7 text-[#718477] sm:text-base lg:text-[17px]">
                                Turn thousands of app reviews into actionable
                                insights. Discover user pain points, feature
                                requests, sentiment, and opportunities.
                            </p> */}

                            {/* URL form */}
                            <form
                                onSubmit={handleAnalyze}
                                className="mx-auto mt-9 w-full max-w-[790px] rounded-lg border border-[#DCEBE0] bg-white p-5 text-left shadow-[0_18px_55px_rgba(35,110,57,0.10)] transition-shadow duration-300 hover:shadow-[0_22px_65px_rgba(35,110,57,0.15)] sm:p-7"
                            >
                                <div className="mb-4 flex items-center gap-3 px-1">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#E5F5E9]">
                                        <GooglePlayIcon className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="playstore-url"
                                            className="text-base font-bold text-[#1C3824] sm:text-lg"
                                        >
                                            Enter your Play Store app URL
                                        </label>

                                        <p className="mt-0.5 text-xs text-[#829488]">
                                            Paste the link to the app you want
                                            to analyze.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                                        <Link2 className="h-4 w-4 text-[#8BA394]" />
                                    </div>

                                    <input
                                        id="playstore-url"
                                        type="url"
                                        value={appUrl}
                                        onChange={handleUrlChange}
                                        placeholder="https://play.google.com/store/apps/details?id=..."
                                        className="h-[58px] w-full rounded-lg border border-[#D9E9DE] bg-[#FAFCFA] pl-11 pr-4 text-sm font-medium text-[#263D2D] outline-none transition placeholder:text-[#A0B0A5] focus:border-[#34A853] focus:ring-4 focus:ring-[#34A853]/10 sm:text-base"
                                    />
                                </div>

                                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-2 px-1">
                                        <ShieldCheck className="h-4 w-4 shrink-0 text-[#34A853]" />

                                        <span className="text-xs font-medium text-[#748A7A]">
                                            Works with public Google Play app links
                                        </span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !appUrl.trim()}
                                        className="flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#188038] via-[#269B49] to-[#34A853] px-7 text-sm font-bold text-white shadow-lg shadow-[#188038]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#188038]/30 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                Analyze App
                                                <ArrowRight className="h-4 w-4" />
                                            </>
                                        )}
                                    </button>
                                </div>

                                {error && (
                                    <p className="px-1 pt-3 text-sm font-medium text-red-500">
                                        {error}
                                    </p>
                                )}
                            </form>

                            {/* Supporting note */}
                            <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-[#829488]">
                                <Sparkles className="h-3.5 w-3.5 text-[#34A853]" />
                                <span>
                                    Get a clearer picture of your app's user
                                    experience.
                                </span>
                            </div>
                        </div>
                    </main>

                    {/* How it works */}
                    <footer className="w-full shrink-0 pb-3 pt-5 lg:pt-3">
                        <div className="mx-auto max-w-[1050px]">
                            <div className="mb-5 flex items-center justify-center gap-3">
                                <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#B9DCC2]" />

                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#64836D]">
                                    How it works
                                </p>

                                <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#B9DCC2]" />
                            </div>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center md:gap-4">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;

                                    return (
                                        <div key={step.number} className="contents">
                                            <div className="group relative flex items-center gap-4 rounded-xl border border-[#E0ECE3] bg-white px-5 py-4 shadow-[0_4px_18px_rgba(35,110,57,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B9DCC2] hover:shadow-[0_12px_28px_rgba(35,110,57,0.10)]">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#E4F5E8] to-[#E5F0FF] transition-transform duration-300 group-hover:scale-105">
                                                    <Icon
                                                        className="h-6 w-6 text-[#188038]"
                                                        strokeWidth={1.8}
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="mb-1 flex items-center gap-2">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#7FA18A]">
                                                            Step {step.number}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-sm font-bold tracking-tight text-[#24432D] sm:text-base">
                                                        {step.title}
                                                    </h3>

                                                    <p className="mt-1 text-xs font-medium leading-5 text-[#829488]">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {index !== steps.length - 1 && (
                                                <div className="hidden items-center justify-center md:flex">
                                                    <ArrowRight
                                                        className="h-5 w-5 text-[#A9CDB2]"
                                                        strokeWidth={1.8}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </footer>
                </div>
            </section>

            <CreditPurchaseModal
                isOpen={isCreditModalOpen}
                onClose={() => setIsCreditModalOpen(false)}
                redirectAfterPurchase={false}
            />

            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </>
    );
};

export default PlaystoreHero;