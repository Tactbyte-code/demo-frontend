// src/lib/api/ai-workspace.js
import api from "@/lib/axios";

/* =========================
   Workspaces
========================= */
export const getWorkspaces = async () => {
  const res = await api.get("/ai-workspace");
  return res.data;
};

export const getWorkspace = async (id) => {
  const res = await api.get(`/ai-workspace/${id}`);
  return res.data;
};

export const createWorkspace = async (body) => {
  const res = await api.post("/ai-workspace", body);
  return res.data;
};

/* =========================
   Sources
========================= */
export const getSources = async (workspaceId) => {
  const res = await api.get(`/ai-workspace/${workspaceId}/sources`);
  return res.data;
};

export const uploadSource = async (workspaceId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post(`/ai-workspace/${workspaceId}/sources`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteSource = async (workspaceId, sourceId) => {
  const res = await api.delete(`/ai-workspace/${workspaceId}/sources/${sourceId}`);
  return res.data;
};

/* =========================
   Chat
========================= */
export const getMessages = async (workspaceId, sessionId) => {
  const res = await api.get(`/ai-workspace/${workspaceId}/sessions/${sessionId}/messages`);
  return res.data;
};

export const sendMessage = async (workspaceId, sessionId, message) => {
  const res = await api.post(`/ai-workspace/${workspaceId}/sessions/${sessionId}/messages`, { message });
  return res.data;
};

export const getChatSessions = async (workspaceId) => {
  const res = await api.get(`/ai-workspace/${workspaceId}/sessions`);
  return res.data;
};

export const createChatSession = async (workspaceId) => {
  const res = await api.post(`/ai-workspace/${workspaceId}/sessions`);
  return res.data;
};

export const deleteChatSession = async (workspaceId, sessionId) => {
  const res = await api.delete(`/ai-workspace/${workspaceId}/sessions/${sessionId}`);
  return res.data;
};