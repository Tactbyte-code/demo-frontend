"use client";

import { useEffect } from "react";
import { useCreditStore } from "@/store/useCreditStore";
import { getToken } from "@/utils/getToken";

export default function CreditInitializer() {
  const { getCredits } = useCreditStore();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();

      if (token) {
        await getCredits(true);
      };
    };

    fetchToken();
  }, [getCredits]);

  return null;
}