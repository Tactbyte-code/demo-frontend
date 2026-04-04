import { create } from 'zustand';

export const useQueryStore = create((set, get) => ({
    queries: {}, // { [query]: { queryId, status, error } }

    getQueryResult: (query) => get().queries[query] || null,

    setQueryResult: (query, result) =>
        set((state) => ({
            queries: { ...state.queries, [query]: result },
        })),
}));