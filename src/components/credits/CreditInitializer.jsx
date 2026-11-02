"use client";

import { useEffect } from "react";
import { useCreditStore } from "@/store/useCreditStore";
import { getToken } from "@/utils/getToken";

export default function CreditInitializer() {
  const { getCredits } = useCreditStore();

  useEffect(() => {
    // 1. Check your auth state here. 
    // This could be checking a token in localStorage, reading a cookie, or checking your auth state variable.
    const fetchToken = async () => {
      // Replace this with your actual token retrieval logic
      const token = await getToken();

      return token;
    }

    const token = fetchToken();

    if (token) {
      getCredits();
    }

    // If you are using an auth state variable instead of localStorage, add it to the dependency array:
    // }, [getCredits, isAuthenticated]);
  }, [getCredits]);

  return null;
}