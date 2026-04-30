"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, Plus, Loader2 } from "lucide-react";
import { generateKeywords, createCampaign, updateCampaign } from "@/lib/api/campaigns";
import { useRouter } from "next/navigation";

const EMPTY_FORM = {
  name: "",
  description: "",
  intent: "People seeking services I offer",
  website: "",
  keywords: {
    positive: [],
    negative: [],
  },
};

// ── If `campaign` prop is passed → edit mode, else → create mode ──
export default function CampaignForm({ open, setOpen, onSuccess, campaign = null }) {
  const isEdit = Boolean(campaign);
  const router = useRouter();

  // ── STATE ──
  const [form, setForm] = useState(EMPTY_FORM);
  const [positiveInput, setPositiveInput] = useState("");
  const [negativeInput, setNegativeInput] = useState("");
  const [loadingAI, setLoadingAI]     = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errors, setErrors]           = useState({});
  const [apiError, setApiError]       = useState(null);

  // ── POPULATE FORM IN EDIT MODE ──
  useEffect(() => {
    if (campaign) {
      setForm({
        name:        campaign.name        ?? "",
        description: campaign.description ?? "",
        intent:      campaign.intent      ?? "",
        website:     campaign.website     ?? "",
        keywords: {
          positive: campaign.keywords?.filter((k) => k.match_type === "positive").map((k) => k.keyword) ?? [],
          negative: campaign.keywords?.filter((k) => k.match_type === "negative").map((k) => k.keyword) ?? [],
        },
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
    setApiError(null);
  }, [campaign, open]);

  // ── ESC CLOSE ──
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setOpen]);

  // ── SCROLL LOCK ──
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [open]);

  if (!open) return null;

  // ── FIELD UPDATE ──
  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  }

  // ── VALIDATION ──
  function validate() {
    const e = {};
    if (!form.name.trim())        e.name = "Campaign name is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.keywords.positive.length === 0) e.keywords = "Add at least one keyword";
    if (form.website && !/^https?:\/\/.+/.test(form.website)) e.website = "Must be a valid URL (https://...)";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── ADD KEYWORD ──
  function addKeyword(type) {
    const input = type === "positive" ? positiveInput : negativeInput;
    const setInput = type === "positive" ? setPositiveInput : setNegativeInput;

    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    const all = [...form.keywords.positive, ...form.keywords.negative];
    if (all.includes(trimmed)) return; // no cross-list duplicates

    setForm((prev) => ({
      ...prev,
      keywords: {
        ...prev.keywords,
        [type]: [...prev.keywords[type], trimmed],
      },
    }));
    setInput("");
    if (errors.keywords) setErrors((prev) => ({ ...prev, keywords: null }));
  }

  // ── REMOVE KEYWORD ──
  function removeKeyword(type, index) {
    setForm((prev) => ({
      ...prev,
      keywords: {
        ...prev.keywords,
        [type]: prev.keywords[type].filter((_, i) => i !== index),
      },
    }));
  }

  // ── UPDATE KEYWORD (inline edit) ──
  function updateKeyword(type, index, value) {
    const trimmed = value.toLowerCase();
    const all = [...form.keywords.positive, ...form.keywords.negative];

    // Allow editing the current item — only block if another item matches
    const others = all.filter((_, i) => {
      if (type === "positive") return i !== index;
      return i !== (index + form.keywords.positive.length);
    });

    if (others.includes(trimmed)) return; // duplicate guard

    const updated = [...form.keywords[type]];
    updated[index] = trimmed;
    setForm((prev) => ({
      ...prev,
      keywords: { ...prev.keywords, [type]: updated },
    }));
  }

  // ── AI GENERATE ──
  async function handleGenerate() {
    if (!form.description.trim()) {
      setErrors((prev) => ({ ...prev, description: "Enter a description to generate keywords" }));
      return;
    }

    setLoadingAI(true);
    try {
      const res = await generateKeywords({
        description: form.description,
        intent: form.intent,
        website: form.website,
      });

      setForm((prev) => ({
        ...prev,
        keywords: {
          ...prev.keywords,
          positive: res.keywords ?? [],
        },
      }));
    } catch (err) {
      setApiError("Failed to generate keywords. Try again.");
    } finally {
      setLoadingAI(false);
    }
  }

  // ── SUBMIT ──
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoadingSubmit(true);
    setApiError(null);

    const payload = {
      name:        form.name,
      description: form.description,
      intent:      form.intent   || null,
      website:     form.website  || null,
      keywords: [
        ...form.keywords.positive.map((k) => ({ keyword: k, match_type: "positive" })),
        ...form.keywords.negative.map((k) => ({ keyword: k, match_type: "negative" })),
      ],
    };

    try {
      if (isEdit) {
        await updateCampaign(campaign.id, payload);
      } else {
        const res = await createCampaign(payload);
        const campaignId = res.id;
        onSuccess?.();
        setOpen(false);
        router.push(`/dashboard/ai-lead-engine/campaigns/${campaignId}`);
      }
      
    } catch (err) {
      setApiError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoadingSubmit(false);
    }
  }

  // ── KEYWORD SECTION (reusable for positive + negative) ──
  function KeywordSection({ type }) {
    const isPositive = type === "positive";
    const input      = isPositive ? positiveInput : negativeInput;
    const setInput   = isPositive ? setPositiveInput : setNegativeInput;
    const list       = form.keywords[type];
    const limit      = isPositive ? 10 : 5;
    const label      = isPositive ? "Positive keywords" : "Negative keywords";
    const hint       = isPositive
      ? "Posts matching these will be surfaced as leads"
      : "Posts matching these will be excluded";

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-xs text-muted">{hint}</p>
          </div>
          {isPositive && (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loadingAI}
              className="flex items-center gap-2 px-3 py-1.5 text-xs bg-green-500/10 text-green-600 border border-green-500/20 hover:bg-green-500/20 transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingAI
                ? <Loader2 className="w-3 h-3 animate-spin" />
                : <Sparkles className="w-3 h-3" />
              }
              {loadingAI ? "Generating..." : "Generate with AI"}
            </button>
          )}
        </div>

        {/* LIST */}
        <div className="flex flex-col gap-1.5">
          {list.map((k, i) => (
            <div
              key={i}
              className={`flex items-center border px-3 py-2 ${
                isPositive ? "border-border" : "border-red-200 bg-red-50/40"
              }`}
            >
              <input
                value={k}
                onChange={(e) => updateKeyword(type, i, e.target.value)}
                className="flex-1 outline-none text-sm bg-transparent"
              />
              <button type="button" onClick={() => removeKeyword(type, i)}>
                <X className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {/* ADD INPUT */}
        {list.length < limit && (
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword(type))}
              placeholder={`Add ${type} keyword...`}
              className="flex-1 px-3 py-2 border text-sm"
            />
            <button
              type="button"
              onClick={() => addKeyword(type)}
              className="px-4 bg-primary text-white text-sm flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── RENDER ──
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      {/* BACKDROP */}
      <div className="absolute inset-0" onClick={() => setOpen(false)} />

      {/* MODAL */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-xl mx-4 bg-white rounded-xl shadow-lg flex flex-col gap-5 max-h-[90vh] overflow-y-auto p-6"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">
            {isEdit ? "Edit Campaign" : "New Campaign"}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-1 rounded-md hover:bg-gray-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* API ERROR */}
        {apiError && (
          <div className="px-3 py-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
            {apiError}
          </div>
        )}

        {/* NAME */}
        <div>
          <label className="text-sm font-semibold">Campaign name *</label>
          <input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="e.g. Web Dev Leads"
            className={`w-full mt-1 px-3 py-2 border text-sm ${errors.name ? "border-red-400" : "border-border"}`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-semibold">Description *</label>
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            maxLength={300}
            placeholder="Describe what you offer or what you're looking for..."
            className={`w-full mt-1 px-3 py-2 border text-sm min-h-[100px] resize-none ${errors.description ? "border-red-400" : "border-border"}`}
          />
          <div className="flex justify-between mt-1">
            {errors.description
              ? <p className="text-xs text-red-500">{errors.description}</p>
              : <span />
            }
            <p className="text-xs text-muted">{form.description.length}/300</p>
          </div>
        </div>

        {/* INTENT */}
        {/* <div>
          <label className="text-sm font-semibold">Intent</label>
          <input
            value={form.intent}
            onChange={(e) => updateField("intent", e.target.value)}
            placeholder="e.g. People seeking services I offer"
            className="w-full mt-1 px-3 py-2 border border-border text-sm"
          />
          <p className="text-xs text-muted mt-1">Helps AI score and filter leads more accurately</p>
        </div> */}

        {/* WEBSITE */}
        <div>
          <label className="text-sm font-semibold">Website</label>
          <input
            value={form.website}
            onChange={(e) => updateField("website", e.target.value)}
            placeholder="https://yoursite.com"
            className={`w-full mt-1 px-3 py-2 border text-sm ${errors.website ? "border-red-400" : "border-border"}`}
          />
          {errors.website && <p className="text-xs text-red-500 mt-1">{errors.website}</p>}
        </div>

        {/* DIVIDER */}
        <div className="border-t border-border" />

        {/* KEYWORDS */}
        {errors.keywords && (
          <p className="text-xs text-red-500 -mb-2">{errors.keywords}</p>
        )}
        <KeywordSection type="positive" />
        <KeywordSection type="negative" />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loadingSubmit}
          className="mt-2 px-4 py-2 bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingSubmit && <Loader2 className="w-4 h-4 animate-spin" />}
          {loadingSubmit ? "Saving..." : isEdit ? "Save Changes" : "Create Campaign"}
        </button>
      </form>
    </div>
  );
}