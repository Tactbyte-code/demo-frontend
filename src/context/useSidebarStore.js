import { create } from "zustand";

export const useSidebarStore = create((set) => ({
    sidebarOpen: true,
    setSidebarOpen: (val) => set({ sidebarOpen: val }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));