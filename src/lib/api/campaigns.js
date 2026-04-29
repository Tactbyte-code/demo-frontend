// src/lib/api/campaigns.js
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

export const getCampaignHistory = async (id) => {
  const res = await api.get(`/ai-lead-engine/campaigns/${id}/history`);
  return res.data;
};

export const getKeywords = async (cid) => {
  const res = await api.get(`/ai-lead-engine/campaigns/${cid}/keywords`);
  return res.data;
};

export const createKeyword = async (cid, body) => {
  const res = await api.post(`/ai-lead-engine/campaigns/${cid}/keywords`, body);
  return res.data;
};

export const deleteKeyword = async (cid, kid) => {
  const res = await api.delete(
    `/ai-lead-engine/campaigns/${cid}/keywords/${kid}`
  );
  return res.data;
};