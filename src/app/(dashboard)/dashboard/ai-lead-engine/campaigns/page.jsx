"use client";

import { useEffect, useState } from "react";
import { Plus, Target, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import { getCampaigns } from "@/lib/api/campaigns";
import CampaignForm from "./_components/CampaignForm";
import Link from "next/link";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCampaignForm, setShowCampaignForm] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  async function fetchCampaigns() {
    try {
      const data = await getCampaigns();

      if (Array.isArray(data)) {
        setCampaigns(data);
      } else if (Array.isArray(data?.data)) {
        setCampaigns(data.data);
      } else {
        setCampaigns([]);
      }
    } catch (err) {
      console.error(err);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ── EMPTY STATE ───────────────────────────── */}
      {!loading && campaigns.length === 0 ? (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="p-5 border border-border rounded-full">
              <FolderOpen className="w-6 h-6 text-muted" />
            </div>

            <div>
              <h2 className="text-lg font-bold">No campaigns yet</h2>
              <p className="text-sm text-muted">
                Create your first campaign to start finding leads
              </p>
            </div>

            <button
              onClick={() => setShowCampaignForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-primary text-white"
            >
              <Plus className="w-4 h-4" />
              Create Campaign
            </button>
          </div>
        </div>
      ) : (
        /* ── MAIN PAGE ───────────────────────────── */
        <div className="min-h-screen bg-background text-foreground">
          {/* HEADER */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-border">
            <div>
              <h1 className="text-lg font-bold">Campaigns</h1>
              <p className="text-xs text-muted">
                Manage your lead generation campaigns
              </p>
            </div>

            <button
              onClick={() => setShowCampaignForm(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-primary text-white"
            >
              <Plus className="w-3.5 h-3.5" />
              Create Campaign
            </button>
          </div>

          {/* CONTENT */}
          <div className="px-8 py-6">
            {loading ? (
              <div className="text-sm text-muted">
                Loading campaigns...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {campaigns.map((campaign, i) => (
                  <Link href={`/dashboard/ai-lead-engine/campaigns/${campaign.id}`} key={campaign.id || i}>
                    <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border border-border bg-surface p-5 hover:border-primary/40 transition"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 border border-border rounded-full">
                        <Target className="w-4 h-4 text-primary" />
                      </div>

                      <span className="text-[10px] text-muted">
                        {campaign.created_at
                          ? new Date(campaign.created_at).toLocaleDateString()
                          : "—"}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold mb-1">
                      {campaign.name || "Untitled Campaign"}
                    </h3>

                    <p className="text-xs text-muted">
                      {campaign.description || "No description"}
                    </p>
                  </motion.div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── GLOBAL MODAL ───────────────────────────── */}
      <CampaignForm
        open={showCampaignForm}
        setOpen={setShowCampaignForm}
        onSuccess={fetchCampaigns}
      />
    </>
  );
}