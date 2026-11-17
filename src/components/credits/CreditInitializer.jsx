"use client";

import { useEffect } from "react";
import { useCreditStore } from "@/store/useCreditStore";
import { getToken } from "@/lib/getToken";

export default function CreditInitializer() {
  const { getCredits } = useCreditStore();

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const token = await getToken();

        if (token) {
          await getCredits(true);
        }
      } catch (error) {

        // Ignore unauthenticated users.
        if (
          error instanceof Error &&
          error.message === "Not authenticated"
        ) {
          return;
        }

        console.error("Failed to initialize credits: ", error);

      }
    };

    fetchCredits();
  }, [getCredits]);

  return null;
}