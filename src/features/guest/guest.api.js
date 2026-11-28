import api from "@/lib/axios";

/**
 * Claim a single guest-generated report after login.
 *
 * @param {Object} params
 * @param {"reddit" | "validate" | "playstore"} params.feature
 * @param {string} params.reportId
 */
export const claimGuestReports = async ({ feature, reportId }) => {
    const response = await api.post("/guest/claim-reports", {
        feature,
        report_id: reportId,
    });

    console.log("claim report response: ", response);

    return response?.data;
};