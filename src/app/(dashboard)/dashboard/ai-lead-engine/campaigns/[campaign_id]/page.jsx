"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft, RefreshCw, Sparkles, Pencil, Trash2, Lock, Users,
  Search, SlidersHorizontal, MessageSquare, History, CheckSquare,
  ThumbsUp, ThumbsDown, Star, ChevronDown, Plus,
  X, Loader2, AlertCircle, ExternalLink, Tag,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  getCampaign,
  updateCampaign,
  deleteCampaign,
  getCampaignHistory,
  getKeywords,
  createKeyword,
  deleteKeyword,
  getLeads,
  updateLeadStatus,
  syncLeads
} from "@/lib/api/campaigns";
import LeadRow from "../_components/LeadRow";

// ── Constants ────────────────────────────────────────────────────────────────
const TABS = ["Leads", "Keywords", "Filters", "AI Reply Settings", "Sync History"];
const TAB_ICONS = {
  Leads: <Users className="w-3.5 h-3.5" />,
  Keywords: <Search className="w-3.5 h-3.5" />,
  Filters: <SlidersHorizontal className="w-3.5 h-3.5" />,
  "AI Reply Settings": <MessageSquare className="w-3.5 h-3.5" />,
  "Sync History": <History className="w-3.5 h-3.5" />,
};
const MATCH_FILTERS = ["Strong Match", "Partial Match", "Lowest Match"];
const STATUS_FILTERS = ["All", "New", "Contacted", "Closed"];
const MATCH_TO_MIN_SCORE = { "Strong Match": 8, "Partial Match": 5, "Lowest Match": 0 };

// ── Shared helpers ────────────────────────────────────────────────────────────
function PlatformBadge({ name, active, onClick }) {
  const isReddit = name.toLowerCase() === "reddit";
  return (
    <span
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2 py-1 border text-xs text-muted cursor-pointer transition
        ${active ? "border-primary text-primary bg-primary/10" : "border-border hover:border-primary/40"}`}
    >
      {isReddit ? (
        <span className="w-3.5 h-3.5 rounded-full bg-orange-500 flex items-center justify-center text-white text-[8px] font-bold">r</span>
      ) : (
        <span className="w-3.5 h-3.5 font-bold text-xs">𝕏</span>
      )}
      {name}
    </span>
  );
}

function Spinner() {
  return <Loader2 className="w-4 h-4 animate-spin text-primary" />;
}

function ErrorBanner({ message }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {message}
    </div>
  );
}

// ── Keywords Tab ──────────────────────────────────────────────────────────────
function KeywordsTab({ campaignId }) {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newKw, setNewKw] = useState("");
  const [newType, setNewType] = useState("positive");
  const [adding, setAdding] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getKeywords(campaignId);   // ✅ correct endpoint
      setKeywords(data ?? []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [campaignId]);

  useEffect(() => { load(); }, [load]);

  const handleAdd = async () => {
    if (!newKw.trim()) return;
    setAdding(true);
    setError(null);
    try {
      const created = await createKeyword(campaignId, {
        keyword: newKw.trim(),
        match_type: newType,
      });
      setKeywords((prev) => [...prev, created]);
      setNewKw("");
    } catch (e) {
      setError(e.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteKeyword(campaignId, id);
      setKeywords((prev) => prev.filter((k) => k.id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="py-6 space-y-5">
      {error && <ErrorBanner message={error} />}

      <div className="flex items-center gap-2">
        <input
          value={newKw}
          onChange={(e) => setNewKw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add keyword..."
          className="flex-1 bg-transparent border border-border px-3 py-2 text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50"
        />
        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          className="bg-background border border-border px-2 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50"
        >
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
        </select>
        <button
          onClick={handleAdd}
          disabled={adding}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-primary text-white hover:bg-primary/90 transition disabled:opacity-50"
        >
          {adding ? <Spinner /> : <Plus className="w-3.5 h-3.5" />}
          Add
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Spinner /></div>
      ) : keywords.length === 0 ? (
        <p className="text-xs text-muted text-center py-12">No keywords yet. Add one above.</p>
      ) : (
        <div className="divide-y divide-border border border-border">
          {keywords.map((kw) => (
            <div key={kw.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-1.5 py-0.5 border font-medium ${
                  kw.match_type === "positive"
                    ? "border-green-500/30 text-green-400 bg-green-500/10"
                    : "border-red-500/30 text-red-400 bg-red-500/10"
                }`}>
                  {kw.match_type}
                </span>
                <span className="text-xs text-foreground">{kw.keyword}</span>
              </div>
              <button onClick={() => handleDelete(kw.id)} className="text-muted hover:text-red-400 transition">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ── Sync History Tab ──────────────────────────────────────────────────────────
function SyncHistoryTab({ campaignId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCampaignHistory(campaignId);
        setHistory(data ?? []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [campaignId]);

  return (
    <div className="py-6 space-y-4">
      {error && <ErrorBanner message={error} />}
      {loading ? (
        <div className="flex justify-center py-12"><Spinner /></div>
      ) : history.length === 0 ? (
        <p className="text-xs text-muted text-center py-12">No sync history yet.</p>
      ) : (
        <div className="divide-y divide-border border border-border">
          {history.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-xs font-medium text-foreground">
                  Sync
                </p>
                <p
                  className="text-[11px] text-muted mt-0.5"
                  title={new Date(entry.created_at).toLocaleString()}
                >
                  {timeAgo(entry.created_at)}
                </p>
              </div>
              {/* <div className="flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  {entry.strong_matches ?? 0} strong
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full border border-primary inline-block" />
                  {entry.partial_matches ?? 0} partial
                </span>
              </div> */}
              <p className="text-md">
                {entry.created_at}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// ── Filters Tab ───────────────────────────────────────────────────────────────
function FiltersTab({ campaign, onUpdate }) {
  const [minScore, setMinScore] = useState(campaign?.min_score ?? 5);
  const [platforms, setPlatforms] = useState(campaign?.platforms ?? []);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateCampaign(campaign.id, { min_score: minScore, platforms });
      setSaved(true);
      onUpdate?.({ min_score: minScore, platforms });
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="py-6 space-y-6 max-w-md">
      {error && <ErrorBanner message={error} />}

      <div>
        <label className="text-xs text-muted block mb-2">Minimum Lead Score</label>
        <div className="flex items-center gap-4">
          <input
            type="range" min={0} max={10} step={0.5}
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="text-sm font-bold text-primary w-8">{minScore}</span>
        </div>
      </div>

      <div>
        <label className="text-xs text-muted block mb-2">Platforms</label>
        <div className="flex items-center gap-2 flex-wrap">
          {["Reddit", "X"].map((p) => (
            <button
              key={p}
              onClick={() =>
                setPlatforms((prev) =>
                  prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
                )
              }
              className={`px-3 py-1.5 text-xs border transition ${
                platforms.includes(p)
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted hover:border-primary/40"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-white hover:bg-primary/90 transition disabled:opacity-50"
      >
        {saving && <Spinner />}
        {saved ? "Saved!" : "Save Filters"}
      </button>
    </div>
  );
}

// ── AI Reply Tab ───────────────────────────────────────────────────────────────
function AIReplyTab({ campaign, onUpdate }) {
  const [prompt, setPrompt] = useState(campaign?.prompt ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateCampaign(campaign.id, { prompt });
      setSaved(true);
      onUpdate?.({ prompt });
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="py-6 space-y-4 max-w-xl">
      {error && <ErrorBanner message={error} />}
      <div>
        <label className="text-xs text-muted block mb-2">AI Reply Prompt</label>
        <p className="text-[11px] text-muted mb-3">
          This prompt guides the AI when generating replies to leads. Be specific about tone, offer, and CTA.
        </p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={8}
          placeholder="e.g. You are a friendly outreach rep for nice. Reply naturally to people looking for web app development..."
          className="w-full bg-transparent border border-border px-3 py-2 text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 resize-none"
        />
      </div>
      <button
        onClick={save}
        disabled={saving}
        className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-white hover:bg-primary/90 transition disabled:opacity-50"
      >
        {saving && <Spinner />}
        {saved ? "Saved!" : "Save Prompt"}
      </button>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function CampaignPage() {
  const { campaign_id } = useParams();
  const router = useRouter();

  const [campaign, setCampaign] = useState(null);
  const [leads, setLeads] = useState([]);
  const [activeTab, setActiveTab] = useState("Leads");
  const [matchFilter, setMatchFilter] = useState("Strong Match");
  const [statusFilter, setStatusFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState(null);

  const [loadingCampaign, setLoadingCampaign] = useState(true);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Load campaign
  useEffect(() => {
    (async () => {
      try {
        const data = await getCampaign(campaign_id);
        setCampaign(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoadingCampaign(false);
      }
    })();
  }, [campaign_id]);

  // Load leads when on Leads tab or filters change
  useEffect(() => {
    if (activeTab !== "Leads") return;
    (async () => {
      setLoadingLeads(true);
      try {
        const params = {};
        const minScore = MATCH_TO_MIN_SCORE[matchFilter];
        if (minScore !== undefined) params.min_score = minScore;
        if (statusFilter !== "All") params.status = statusFilter.toLowerCase();
        if (platformFilter) params.platform = platformFilter.toLowerCase();

        const data = await getLeads(campaign_id, params);
        setLeads(data ?? []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoadingLeads(false);
      }
    })();
  }, [campaign_id, activeTab, matchFilter, statusFilter, platformFilter]);

  const handleLeadStatusChange = (leadId, newStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
  };

  const handleDelete = async () => {
    if (!confirm(`Delete campaign "${campaign?.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deleteCampaign(campaign_id);
      router.push("/dashboard/ai-lead-engine/campaigns");
    } catch (e) {
      setError(e.message);
      setDeleting(false);
    }
  };

  const handleLeadSync = async () => {
    try {
      setSyncing(true);
      await syncLeads(campaign_id);
      alert("Syncing started")
    } catch (e) {
      setError(e.message);
    }
    finally{
      setSyncing(false);
    }
  };

  const handleCampaignUpdate = (patch) => setCampaign((prev) => ({ ...prev, ...patch }));

  if (loadingCampaign) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        {error && <ErrorBanner message={error} />}
        <Link href="/dashboard/ai-lead-engine/campaigns" className="text-xs text-primary hover:underline">
          ← Back to Campaigns
        </Link>
      </div>
    );
  }

  const platforms = campaign.platforms ?? [];

  // Helper function
  function getSyncLabel(lastSyncedAt, nextAllowedAt) {
    if (!lastSyncedAt) return "Never synced";

    const last = new Date(lastSyncedAt);
    const now = new Date();
    const diffMs = now - last;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    let lastLabel;
    if (diffMins < 1) lastLabel = "just now";
    else if (diffMins < 60) lastLabel = `${diffMins}m ago`;
    else if (diffHours < 24) lastLabel = `${diffHours}h ago`;
    else lastLabel = `${diffDays}d ago`;

    if (nextAllowedAt) {
      const next = new Date(nextAllowedAt);
      if (next > now) {
        const waitMs = next - now;
        const waitMins = Math.ceil(waitMs / 60000);
        const waitHours = Math.ceil(waitMs / 3600000);

        // Show hours if 60+ minutes remaining, otherwise minutes
        const waitLabel = waitMins >= 60 ? `${waitHours}h` : `${waitMins}m`;

        return `Last synced ${lastLabel} · Next in ${waitLabel}`;
      }
    }

    return `Last synced ${lastLabel}`;
  }
  const now = new Date();
  const nextAllowed = campaign.next_allowed_at ? new Date(campaign.next_allowed_at) : null;
  const isCoolingDown = nextAllowed && nextAllowed > now;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="px-8 pt-6 pb-4">
        <Link
          href="/dashboard/ai-lead-engine/campaigns"
          className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition mb-5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Campaigns
        </Link>

        {error && <div className="mb-4"><ErrorBanner message={error} /></div>}

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold mb-1">{campaign.name}</h1>
            <p className="text-xs text-muted max-w-3xl leading-relaxed">{campaign.description}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {platforms.map((p) => <PlatformBadge key={p} name={p} />)}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-6 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {getSyncLabel(campaign.last_synced_at, campaign.next_allowed_at)}
              </span>

              <button
                onClick={handleLeadSync}
                disabled={syncing || isCoolingDown}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-border text-foreground hover:border-primary/40 transition disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? "Syncing…" : "Sync now"}
              </button>

            </div>
            {/* <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-primary bg-primary/10 text-primary hover:bg-primary/20 transition">
              <Sparkles className="w-3.5 h-3.5" />
              Optimize Leads
            </button> */}
            {/* <Link
              href={`/dashboard/ai-lead-engine/campaigns/${campaign_id}/edit`}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-border text-foreground hover:border-primary/40 transition"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </Link> */}
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition disabled:opacity-50"
            >
              {deleting ? <Spinner /> : <Trash2 className="w-3.5 h-3.5" />}
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-border">
        <div className="border-r border-border p-5 flex flex-col gap-2">
          <span className="text-xs text-muted">Strong Matches</span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            </div>
            <span className="text-2xl font-bold">{campaign.strong_matches ?? 0}</span>
          </div>
          <span className="text-[11px] text-muted">+{campaign.strong_delta ?? 0} from last sync</span>
        </div>

        <div className="border-r border-border p-5 flex flex-col gap-2">
          <span className="text-xs text-muted">Partial Matches</span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full border-2 border-dashed border-primary" />
            <span className="text-2xl font-bold">{campaign.partial_matches ?? 0}</span>
          </div>
          <span className="text-[11px] text-muted">+{campaign.partial_delta ?? 0} from last sync</span>
        </div>

        <div className="border-r border-border p-5 flex flex-col gap-2">
          <span className="text-xs text-muted">Last Sync</span>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold">{campaign.last_sync ?? "Never"}</span>
          </div>
          <span className="text-[11px] text-muted">{campaign.last_sync_label ?? "—"}</span>
        </div>

        <div className="p-5 flex flex-col gap-2">
          <span className="text-xs text-muted">Next Sync</span>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-muted" />
            <span className="text-sm font-bold text-muted">Syncs disabled</span>
          </div>
          <span className="text-[11px] text-muted">Start a free trial to enable automatic syncs</span>
        </div>
      </div> */}

      {/* Tabs */}
      <div className="border-b border-border px-8">
        <div className="flex items-center">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-medium border-b-2 transition ${
                activeTab === tab
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {TAB_ICONS[tab]}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-8">
        <AnimatePresence mode="wait">
          {activeTab === "Leads" && (
            <motion.div key="leads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="py-6">
              <div className="flex flex-col gap-4 mb-4">
                <span className="text-xs text-muted">{leads.length} results</span>

                {/* <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">Match:</span>
                    <div className="flex items-center gap-1.5">
                      {MATCH_FILTERS.map((f) => (
                        <button key={f} onClick={() => setMatchFilter(f)}
                          className={`px-3 py-1.5 text-xs rounded-full border transition ${matchFilter === f ? "border-primary text-primary bg-primary/10" : "border-border text-muted hover:border-primary/40"}`}>
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">Status:</span>
                    <div className="flex items-center gap-1.5">
                      {STATUS_FILTERS.map((s) => (
                        <button key={s} onClick={() => setStatusFilter(s)}
                          className={`px-3 py-1.5 text-xs rounded-full border transition ${statusFilter === s ? "border-primary text-primary bg-primary/10" : "border-border text-muted hover:border-primary/40"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div> */}

                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-muted">Platform:</span>
                    {platforms.map((p) => (
                      <PlatformBadge
                        key={p}
                        name={p}
                        active={platformFilter === p}
                        onClick={() => setPlatformFilter((prev) => (prev === p ? null : p))}
                      />
                    ))}
                  </div>
                  <button className="flex items-center gap-1.5 text-xs border border-border px-3 py-1.5 text-muted hover:border-primary/40 transition">
                    Newest Found <ChevronDown className="w-3 h-3" />
                  </button>
                </div> */}
              </div>

              {/* <div className="mb-4">
                <button className="flex items-center gap-1.5 text-xs border border-border px-3 py-1.5 text-muted hover:border-primary/40 transition">
                  <CheckSquare className="w-3.5 h-3.5" /> Select visible
                </button>
              </div> */}

              <div className="border-t border-border">
                {loadingLeads ? (
                  <div className="flex justify-center py-16"><Spinner /></div>
                ) : leads.length === 0 ? (
                  <p className="text-xs text-muted text-center py-16">No leads found for current filters.</p>
                ) : (
                  leads.map((lead, i) => (
                    <LeadRow
                      key={lead.id}
                      lead={lead}
                      index={i}
                      campaignId={campaign_id}
                      updateLeadStatus={updateLeadStatus}
                      // onStatusChange={onStatusChange}
                    />
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "Keywords" && (
            <motion.div key="keywords" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <KeywordsTab campaignId={campaign_id} />
            </motion.div>
          )}

          {activeTab === "Filters" && (
            <motion.div key="filters" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <FiltersTab campaign={campaign} onUpdate={handleCampaignUpdate} />
            </motion.div>
          )}

          {activeTab === "AI Reply Settings" && (
            <motion.div key="ai-reply" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <AIReplyTab campaign={campaign} onUpdate={handleCampaignUpdate} />
            </motion.div>
          )}

          {activeTab === "Sync History" && (
            <motion.div key="sync-history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <SyncHistoryTab campaignId={campaign_id} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}