"use client";

import { useParams } from "next/navigation";

export default function CampaignPage() {
  const { campaign_id } = useParams();

  return <div>Campaingn id: {campaign_id}</div>;
}
