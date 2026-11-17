import { auth } from "@/lib/firebase";

export async function getToken({
    required = false,
    forceRefresh = false,
} = {}) {
    // Wait until Firebase has restored the initial auth state.
    await auth.authStateReady();

    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
        if (required) {
            throw new Error("Authentication required");
        }

        return null;
    }

    return await firebaseUser.getIdToken(forceRefresh);
}


// 1. For guest-compatible analysis requests:
// const token = await getToken();
// const headers = {};
// if (token) {
//     headers.Authorization = `Bearer ${token}`;
// }

// 2. For authenticated-only requests:
// const token = await getToken({ required: true });