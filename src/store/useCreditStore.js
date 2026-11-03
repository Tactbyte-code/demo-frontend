
import api from '@/lib/axios';
import { create } from 'zustand';

export const useCreditStore = create((set, get) => ({
    credits: 0,
    loadingCredits: false,
    hasFetched: false,

    setLoadingCredits: (status) => set({ loadingCredits: status }),

    // Reset credits when the user logs out
    resetCredits: () => set({
        credits: 0,
        loadingCredits: false,
        hasFetched: false,
    }),

    getCredits: async (forceRefresh = false) => {
        console.log('get credits called');

        if (get().hasFetched && !forceRefresh) return;

        set({ loadingCredits: true });

        try {
            const response = await api.get('/users/credits');

            set({
                credits: response.data?.credits ?? 0,
                hasFetched: true,
            });
        } catch (error) {
            console.error("Failed to fetch credits:", error);

            set({
                credits: 0,
                hasFetched: false, // Allow retrying on failure
            });
        } finally {
            set({ loadingCredits: false });
        }
    },

    addCreditsLocally: (amount) => set((state) => ({
        credits: state.credits + amount
    })),

    deductCreditsLocally: (amount) => set((state) => ({
        credits: state.credits - amount
    }))
}));
