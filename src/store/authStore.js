import { create } from "zustand";

export const useAuthStore = create((set) => ({
    // Firebase user
    user: null,

    // Authentication loading state
    loading: true,

    // Authentication error
    authError: null,

    // Update authentication state
    setAuthState: (user) =>
        set({
            user,
            loading: false,
            authError: null,
        }),

    // Update loading state
    setLoading: (loading) => set({ loading }),

    // Update authentication error
    setAuthError: (error) =>
        set({
            user: null,
            loading: false,
            authError: error,
        }),

    // Clear authentication state
    clearAuth: () =>
        set({
            user: null,
            loading: false,
            authError: null,
        }),
}));


// how to use zustand store in a component

// "use client";
// import { useAuthStore } from "@/store/authStore";

// export default function ExampleComponent() {
//     const user = useAuthStore((state) => state.user);
//     const loading = useAuthStore((state) => state.loading);

//     const isAuthenticated = !!user;

//     if (loading) {
//         return <p>Checking authentication...</p>;
//     }

//     return (
//         <div>
//             {isAuthenticated ? (
//                 <p>
//                     Welcome, {user.displayName || user.email}
//                 </p>
//             ) : (
//                 <p>You are browsing as a guest.</p>
//             )}
//         </div>
//     );
// }