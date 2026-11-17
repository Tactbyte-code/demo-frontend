"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaLightbulb, FaSpinner } from "react-icons/fa";
import ValidateIdeaListPage from "@/features/validate/components/ValidateIdeaListPage";
import { useCreateQuery } from "@/features/validate/hooks/useCreateQuery";
import LocationFetcher from "@/components/location/LocationFetcher";
import { useCreditStore } from "@/store/useCreditStore";
import CreditPurchaseModal from "@/components/credits/CreditPurchaseModal";
import api from "@/lib/axios";
import { getToken } from "@/lib/getToken";

const ValidateIdeaPage = () => {

    const router = useRouter();

    const { mutateAsync: submitIdea, isPending: loading } = useCreateQuery();

    const [localError, setLocalError] = useState(null);
    const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);

    // 1. Add state to hold the location data
    const [locationData, setLocationData] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        industry: "",
        stage: "concept",
    })

    const canSubmit = form.title.trim().length > 0 && form.description.trim().length >= 20;

    const handleSubmit = async (e) => {
        e.preventDefault()

        // if (credits < 66) {
        //     setIsCreditModalOpen(true);
        //     return;
        // }

        if (!canSubmit || loading) return;

        setLocalError(null);

        // 2. Attach the location data to your payload
        const payload = {
            title: form.title,
            description: form.description,
            industry: form.industry,
            stage: form.stage,
            location: locationData, // This will contain lat, lng, city, state, country, etc.
        }

        try {
            const token = await getToken();

            // Initialize a guest session only for anonymous visitors.
            // The backend sets the HttpOnly guest_session cookie.
            if (!token) {
                await api.post("/guest/session");
            };

            const data = await submitIdea(payload)
            console.log("Query created successfully: ", data)

            const queryId = data?.id;
            const status = data?.status;

            if (!queryId || !status) {
                throw new Error("No query ID was returned from the server.")
            }

            if (status === "CREATED") {
                router.push(`/dashboard/validate-idea/${queryId}`)
            }

        } catch (err) {
            setLocalError(err.response?.data?.detail || err.message || "Failed to submit validation query")
            console.error("Submission error:", err)
        }
    };

    return (
        <div className="min-h-[91vh] flex flex-col px-4 py-6 md:p-8 bg-slate-50 text-slate-900">

            <div className="w-full flex justify-end mb-6">
                {/* 3. Pass the state setter as the callback prop */}
                <LocationFetcher onLocationFetched={(data) => setLocationData(data)} />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center w-full pb-10">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-xl"
                >
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4 text-indigo-600 text-xl shadow-sm">
                            <FaLightbulb />
                        </div>
                        <h1
                            className="text-3xl font-bold text-slate-900 tracking-tight mb-2"
                        >
                            Validate Your Venture Idea
                        </h1>
                        <p className="text-slate-500 text-sm max-w-md mx-auto">
                            Evaluate your concept across market sizing, defensibility,
                            risk distribution, and investment viability parameters.
                        </p>
                    </div>

                    {localError && (
                        <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                            {localError}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="border border-slate-200 bg-white rounded-2xl p-6 shadow-sm space-y-4"
                    >
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Venture / Feature Title
                            </label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="e.g. AI-powered clinical documentation pipeline"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                Idea Description & Mechanics
                            </label>
                            <textarea
                                value={form.description}
                                onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                }
                                rows={4}
                                placeholder="What pain point does it solve? Who pays for it? How does the product create defensibility?"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                            />
                            <span className="text-xs text-slate-500 mt-1 block">
                                {form.description.length < 20
                                    ? `Requires ${20 - form.description.length} more characters`
                                    : "Ready for quantitative scoring"}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Sector / Industry
                                </label>
                                <input
                                    type="text"
                                    value={form.industry}
                                    onChange={(e) =>
                                        setForm({ ...form, industry: e.target.value })
                                    }
                                    placeholder="e.g. Enterprise SaaS"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Maturity Stage
                                </label>
                                <select
                                    value={form.stage}
                                    onChange={(e) =>
                                        setForm({ ...form, stage: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                >
                                    <option value="concept">Concept / Hypothesis</option>
                                    <option value="prototype">Working Alpha / Prototype</option>
                                    <option value="live">In-Market with Pilot Traction</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!canSubmit || loading}
                            className="w-full mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 text-sm tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2"
                        >
                            {loading && <FaSpinner className="animate-spin text-sm" />}
                            {loading ? "Submitting Query..." : "Run Institutional Validation"}
                        </button>
                    </form>
                </motion.div>

                <ValidateIdeaListPage />
            </div>

            {/* Mount the modal outside of your standard document flow */}
            <CreditPurchaseModal
                isOpen={isCreditModalOpen}
                onClose={() => setIsCreditModalOpen(false)}
            />
        </div>
    )
}

export default ValidateIdeaPage;