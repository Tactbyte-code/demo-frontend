"use client";
import { useEffect, useState } from "react";
import {
  getSources,
  requestUploadUrl,
  uploadToSupabase,
  confirmUpload,
  deleteSource as deleteSourceApi,
} from "@/lib/api/ai-workspace";

const CACHE_KEY = (id) => `sources_${id}`;

export function useSources(workspaceId) {
  const [sources, setSources] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY(workspaceId));
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSources();
  }, [workspaceId]);

  function persist(data) {
    setSources(data);
    try {
      localStorage.setItem(CACHE_KEY(workspaceId), JSON.stringify(data));
    } catch {}
  }

  function patchSource(id, patch) {
    setSources((prev) => {
      const updated = prev.map((s) => s.id === id ? { ...s, ...patch } : s);
      try {
        localStorage.setItem(CACHE_KEY(workspaceId), JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }

  async function fetchSources() {
    try {
      const res = await getSources(workspaceId);
      persist(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function uploadSource(file) {
    // 1. optimistic placeholder
    const tempId = `temp_${Date.now()}`;
    const placeholder = {
      id: tempId,
      filename: file.name,
      source_type: file.name.split(".").pop(),
      status: "uploading",
      created_at: new Date().toISOString(),
    };
    setSources((prev) => {
      const next = [placeholder, ...prev];
      try { localStorage.setItem(CACHE_KEY(workspaceId), JSON.stringify(next)); } catch {}
      return next;
    });

    try {
      // 2. get signed url + source record
      const { source, upload_url } = await requestUploadUrl(workspaceId, file.name);

      // replace placeholder with real record (still uploading)
      setSources((prev) => {
        const next = prev.map((s) =>
          s.id === tempId ? { ...source, status: "uploading" } : s
        );
        try { localStorage.setItem(CACHE_KEY(workspaceId), JSON.stringify(next)); } catch {}
        return next;
      });

      // 3. upload file bytes directly to supabase
      await uploadToSupabase(upload_url, file);

      // 4. confirm with backend → status becomes "processing"
      const confirmed = await confirmUpload(workspaceId, source.id);
      patchSource(source.id, { status: confirmed.status });

    } catch (err) {
      console.error(err);
      // remove placeholder or mark failed
      setSources((prev) => {
        const next = prev.filter((s) => s.id !== tempId);
        try { localStorage.setItem(CACHE_KEY(workspaceId), JSON.stringify(next)); } catch {}
        return next;
      });
    }
  }

  async function deleteSource(sourceId) {
    const prev = sources;
    persist(sources.filter((s) => s.id !== sourceId));
    try {
      await deleteSourceApi(workspaceId, sourceId);
    } catch (err) {
      console.error(err);
      persist(prev);
    }
  }

  return { sources, loading, uploadSource, deleteSource };
}