import api from "../axios";

export const initializeGuestSession = async () => {
    const response = await api.post("/guest/session");

    return response.data;
};

export const claimGuestReports = async () => {
    const response = await api.post("/guest/claim-reports");

    return response.data;
};
