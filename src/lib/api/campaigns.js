import api from "@/lib/axios";

export const getCampaigns = async () => {
  const res = await api.get("/ai-lead-engine/campaigns");
  return res.data;
};

export const generateKeywords = async (description) => {
  const res = await api.post("/ai-lead-engine/generate-keywords", description);
  return res.data;
};

export const getCampaign = async (id) => {
  const res = await api.get(`/ai-lead-engine/campaigns/${id}`);
  return res.data;
};

export const createCampaign = async (body) => {
  const res = await api.post("/ai-lead-engine/campaigns", body);
  return res.data;
};

export const updateCampaign = async (id, body) => {
  const res = await api.patch(`/ai-lead-engine/campaigns/${id}`, body);
  return res.data;
};

export const deleteCampaign = async (id) => {
  const res = await api.delete(`/ai-lead-engine/campaigns/${id}`);
  return res.data;
};

export const getLeads = async (id, params = {}) => {
  const res = await api.get(`/ai-lead-engine/campaigns/${id}/leads`, {
    params,
  });
  return res.data;
};

export const updateLeadStatus = async (cid, lid, status) => {
  const res = await api.patch(
    `/ai-lead-engine/campaigns/${cid}/leads/${lid}/status`,
    null,
    { params: { status } }
  );
  return res.data;
};

export const createLeadAction = async (cid, lid, body) => {
  const res = await api.post(
    `/ai-lead-engine/campaigns/${cid}/leads/${lid}/actions`,
    body
  );
  return res.data;
};