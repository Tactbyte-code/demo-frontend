"use client";
import { useEffect, useState } from "react";
import { getSources, uploadSource as uploadSourceApi } from "@/lib/api/ai-workspace";

export function useSources(workspaceId) {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSources();
  }, [workspaceId]);

  async function fetchSources() {
    try {
      const res = await getSources(workspaceId);
      setSources(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function uploadSource(file) {
    try {
      const newSource = await uploadSourceApi(workspaceId, file);
      setSources((prev) => [newSource, ...prev]);
    } catch (err) {
      console.error(err);
    }
  }

  return { sources, loading, uploadSource };
}