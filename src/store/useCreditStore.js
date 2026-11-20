import api from "@/lib/axios";
import { create } from "zustand";

export const useCreditStore = create((set, get) => ({
    credits: 0,
    loadingCredits: false,
    hasFetched: false,

    setLoadingCredits: (status) => set({ loadingCredits: status }),

    // Reset credits when the user logs out
    resetCredits: () =>
        set({
            credits: 0,
            loadingCredits: false,
            hasFetched: false,
        }),

    getCredits: async (forceRefresh = false) => {
        if (get().hasFetched && !forceRefresh) return;

        set({ loadingCredits: true });

        try {
            const response = await api.get("/credits/balance");
            console.log('get credits: ', response);

            set({
                credits: response.data?.balance ?? 0,
                hasFetched: true,
            });
        } catch (error) {
            console.error("Failed to fetch credits:", error);

            set({
                credits: 0,
                hasFetched: false,
            });
        } finally {
            set({ loadingCredits: false });
        }
    },

    addCreditsLocally: (amount) =>
        set((state) => ({
            credits: state.credits + amount,
        })),

    deductCreditsLocally: (amount) =>
        set((state) => ({
            credits: Math.max(0, state.credits - amount),
        })),
}));
