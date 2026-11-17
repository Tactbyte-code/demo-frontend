import api from "@/lib/axios";

export const claimGuestReports = async () => {
    const response = await api.post("/guest/claim-reports");
    console.log('claim report response: ', response);

    return response?.data;
};