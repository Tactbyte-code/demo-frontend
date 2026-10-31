import api from '@/lib/axios';
import { create } from 'zustand';

export const useCreditStore = create((set, get) => ({
    credits: 0,
    loadingCredits: false,
    hasFetched: false, 

    // Add this utility to manually control the loading state
    setLoadingCredits: (status) => set({ loadingCredits: status }),

    getCredits: async (forceRefresh = false) => {
        if (get().hasFetched && !forceRefresh) return;

        set({ loadingCredits: true });
        try {
            const response = await api.get('/users/credits');
            set({
                credits: response.data?.credits ?? 0,
                hasFetched: true 
            });
        } catch (error) {
            console.error("Failed to fetch credits:", error);
            set({ credits: 0, hasFetched: true });
        } finally {
            // This will still automatically set it to false after a fetch
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








// import { useCreditStore } from '@/store/useCreditStore';
// import api from '../path-to-your-api';

// export const ActionComponent = () => {
//     // Only extract the function to prevent this specific component 
//     // from re-rendering every time the credit number changes
//     const getCredits = useCreditStore((state) => state.getCredits);

//     const handleAction = async () => {
//         try {
//             // 1. Make the API call that adds or deducts credits on the backend
//             await api.post('/users/spend-credits', { amount: 10 });
            
//             // 2. Force a fresh fetch to sync the UI with the backend
//             await getCredits(true); 
            
//         } catch (error) {
//             console.error("Transaction failed:", error);
//         }
//     };

//     return (
//         <button onClick={handleAction}>
//             Spend 10 Credits
//         </button>
//     );
// };