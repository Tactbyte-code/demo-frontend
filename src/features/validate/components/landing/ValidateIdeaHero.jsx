"use client";

import { useState } from "react";
import {
    ArrowRight,
    Sparkles,
    Lightbulb,
    BrainCircuit,
    ChartNoAxesCombined,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/getToken";
import { initializeGuestSession } from "@/lib/api/guest";
import { useCreateQuery } from "../../hooks/useCreateQuery";
import ProductHeader from "@/components/layout/ProductHeader";
import LoginModal from "@/components/auth/loginModal/LoginModal";

const steps = [
    {
        number: "1",
        title: "Share your idea",
        description: "Tell us about your concept",
        icon: Lightbulb,
    },
    {
        number: "2",
        title: "AI researches it",
        description: "We analyze market data",
        icon: BrainCircuit,
    },
    {
        number: "3",
        title: "Get your insights",
        description: "Make informed decisions",
        icon: ChartNoAxesCombined,
    },
];

const ValidateIdeaHero = () => {
    const router = useRouter();

    const [idea, setIdea] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [pendingIdea, setPendingIdea] = useState(null);

    const { mutateAsync: submitIdea } = useCreateQuery();

    const handleIdeaChange = (e) => {
        setIdea(e.target.value);
        if (error) setError("");

        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    // Submit the validation query and navigate to its analysis page.
    const submitValidation = async (ideaText) => {
        const payload = {
            idea: ideaText,
        };

        const data = await submitIdea(payload);

        const queryId = data?.id;
        const status = data?.status;

        if (!queryId || !status) {
            throw new Error("No query ID was returned from the server.");
        }

        if (status === "CREATED") {
            router.push(`/validate-idea/analysis/${queryId}`);
        } else {
            throw new Error("Failed to start idea validation. Please try again.");
        }
    };

    const handleValidate = async (e) => {
        e.preventDefault();

        const trimmedIdea = idea.trim();

        if (trimmedIdea.length < 10) {
            setError("Please describe your idea in at least 10 characters.");
            return;
        }

        if (isSubmitting) return;

        try {
            setError("");
            setIsSubmitting(true);

            const token = await getToken();

            // Initialize a guest session only when an anonymous
            // visitor submits a validation request.
            if (!token) {
                const guestSession = await initializeGuestSession();

                if (guestSession?.guest_session_created === false) {
                    setPendingIdea(trimmedIdea);
                    setShowLoginModal(true);
                    return;
                };
            }

            await submitValidation(trimmedIdea);

        } catch (err) {
            setError(
                err.response?.data?.detail ||
                err.message ||
                "Failed to submit validation query"
            );

            console.error("Query submission error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Resume the pending validation after successful login.
    const handleLoginSuccess = async () => {
        const ideaText = pendingIdea;

        setShowLoginModal(false);
        setPendingIdea(null);

        if (!ideaText) return;

        try {
            setError("");
            setIsSubmitting(true);

            const token = await getToken();

            if (!token) {
                throw new Error("Authentication failed. Please try again.");
            }

            await submitValidation(ideaText);

        } catch (err) {
            setError(
                err.response?.data?.detail ||
                err.message ||
                "Failed to submit validation query"
            );

            console.error("Validation submission error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Navbar */}
            <ProductHeader />

            {/* Section content */}
            <section id="validate-idea-hero" className="relative isolate min-h-screen overflow-hidden bg-[#FFFAFF] lg:h-screen lg:min-h-0 lg:max-h-screen">
                {/* Background decoration */}
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div
                        className="absolute right-0 top-0 h-[260px] w-[420px] opacity-[0.15]"
                        style={{
                            backgroundImage:
                                "radial-gradient(#A855F7 1.3px, transparent 1.3px)",
                            backgroundSize: "22px 22px",
                            maskImage:
                                "linear-gradient(to bottom left, black, transparent)",
                        }}
                    />

                    <div
                        className="absolute bottom-0 left-0 h-[240px] w-[380px] opacity-[0.10]"
                        style={{
                            backgroundImage:
                                "radial-gradient(#D946EF 1.3px, transparent 1.3px)",
                            backgroundSize: "22px 22px",
                            maskImage:
                                "linear-gradient(to top right, black, transparent)",
                        }}
                    />

                    <div className="absolute -right-40 top-20 h-[400px] w-[600px] rotate-[-25deg] rounded-[100%] border border-[#C084FC]/15" />
                    <div className="absolute -right-32 top-32 h-[320px] w-[500px] rotate-[-25deg] rounded-[100%] border border-[#EC4899]/15" />

                    <div className="absolute -left-40 top-[35%] h-[350px] w-[500px] rounded-full bg-[#E9D5FF]/20 blur-[100px]" />
                </div>

                {/* Main container */}
                <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 pb-5 pt-24 sm:px-10 lg:h-full lg:min-h-0 lg:px-12 lg:pb-5 lg:pt-24">

                    {/* Hero content */}
                    <main className="flex flex-1 flex-col items-center justify-center py-12 lg:min-h-0 lg:py-5">

                        <div className="mx-auto w-full max-w-[850px] text-center">

                            {/* Heading */}
                            <h1 className="mx-auto max-w-200 text-[36px] font-extrabold leading-[1.13] tracking-tight text-[#1C103E] sm:text-5xl lg:text-[56px]">
                                Your next big idea deserves{" "}
                                <span className="bg-linear-to-r from-[#7024E8] via-[#A22BDD] to-[#F02D87] bg-clip-text text-transparent">
                                    validation.
                                </span>
                            </h1>

                            {/* Idea form */}
                            <form
                                onSubmit={handleValidate}
                                className="idea-form-glow mx-auto mt-8 w-full max-w-[790px] rounded-[24px] bg-white p-5 text-left shadow-[0_18px_55px_rgba(113,56,213,0.14)] transition-shadow duration-300 hover:shadow-[0_22px_65px_rgba(113,56,213,0.19)] sm:p-7"
                            >
                                <div className="mb-3 flex items-center gap-3 px-1">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2E6FF]">
                                        <Lightbulb className="h-5 w-5 text-[#8528DF]" />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="idea-input"
                                            className="text-base font-bold text-[#27144D] sm:text-lg"
                                        >
                                            What are you planning to build?
                                        </label>

                                        <p className="mt-0.5 text-xs text-[#88769F]">
                                            Describe your startup idea in your own words.
                                        </p>
                                    </div>
                                </div>

                                <textarea
                                    id="idea-input"
                                    value={idea}
                                    onChange={handleIdeaChange}
                                    placeholder="I want to build a platform that helps..."
                                    maxLength={2000}
                                    rows={3}
                                    className="min-h-[110px] w-full resize-none overflow-hidden rounded-xl border border-[#E7D2FF] bg-[#FCFAFF] px-5 py-4 text-sm font-medium leading-7 text-[#352344] outline-none transition placeholder:text-[#9384A9] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 sm:text-base"
                                />

                                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-2 px-1">
                                        <Sparkles className="h-3.5 w-3.5 shrink-0 fill-[#8B35E8] text-[#8B35E8]" />
                                        <span className="text-xs font-medium text-[#725B99]">
                                            Be as descriptive as possible
                                        </span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !idea.trim()}
                                        className="flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#7628ED] via-[#B22AE1] to-[#F02D83] px-7 text-sm font-bold text-white shadow-lg shadow-[#9326D5]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#9326D5]/35 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Validating...
                                            </>
                                        ) : (
                                            <>
                                                Validate My Idea
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
                        </div>
                    </main>

                    {/* How it works */}
                    <footer className="w-full shrink-0 pb-3 pt-5 lg:pt-3">
                        <div className="mx-auto max-w-[1050px]">

                            <div className="mb-5 flex items-center justify-center gap-3">
                                <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D8B9F5]" />

                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B65B5]">
                                    How it works
                                </p>

                                <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D8B9F5]" />
                            </div>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center md:gap-4">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;

                                    return (
                                        <div key={step.number} className="contents">

                                            <div className="group relative flex items-center gap-4 rounded-2xl border border-[#E9DDF5] bg-white px-5 py-4 shadow-[0_4px_18px_rgba(75,35,120,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D2B4F0] hover:shadow-[0_12px_28px_rgba(113,56,213,0.11)]">

                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F3E8FF] to-[#FCE7F3] transition-transform duration-300 group-hover:scale-105">
                                                    <Icon
                                                        className="h-6 w-6 text-[#8528DF]"
                                                        strokeWidth={1.8}
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="mb-1 flex items-center gap-2">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#A27BC8]">
                                                            Step {step.number}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-sm font-bold tracking-tight text-[#29154F] sm:text-base">
                                                        {step.title}
                                                    </h3>

                                                    <p className="mt-1 text-xs font-medium leading-5 text-[#88769F]">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {index !== steps.length - 1 && (
                                                <div className="hidden items-center justify-center md:flex">
                                                    <ArrowRight
                                                        className="h-5 w-5 text-[#C4A3E5]"
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

            {/* Login modal for returning guest visitors */}
            {showLoginModal && (
                <LoginModal
                    onClose={() => {
                        setShowLoginModal(false);
                        setPendingIdea(null);
                    }}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </>
    );
};

export default ValidateIdeaHero;
