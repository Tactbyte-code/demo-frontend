// src/components/CreditInitializer.jsx
"use client";

import { useCreditStore } from "@/store/useCreditStore";
import { useEffect } from "react";

export default function CreditInitializer() {
  const { getCredits } = useCreditStore();

  useEffect(() => {
    getCredits();
  }, [getCredits]);

  return null; // This component is invisible
}