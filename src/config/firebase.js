import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB5xT3vlWcTUP7N-qbq3iutSa2mMjztdwk",
    authDomain: "ai-problem-finder.firebaseapp.com",
    projectId: "ai-problem-finder",
    storageBucket: "ai-problem-finder.firebasestorage.app",
    messagingSenderId: "881777451229",
    appId: "1:881777451229:web:3f170905693c1cbe5afb34",
    measurementId: "G-WJXL439SNK",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();