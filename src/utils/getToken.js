import { auth } from '@/lib/firebase';

export async function getToken() {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) throw new Error("Not authenticated");
    return await firebaseUser.getIdToken();
}